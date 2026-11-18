"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialNotifications, demoOrders, demoUsers, products } from "@/lib/data";
import type { Address, CartItem, NotificationItem, Order, Product, Role, Toast, User } from "@/lib/types";
import { uid } from "@/lib/utils";

interface CheckoutInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType: Role;
  address: Address | null;
  deliveryMethod: string;
  paymentMethod: string;
  discount?: number;
  deliveryFee?: number;
  note?: string;
}

interface AppState {
  hydrated: boolean;
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  addresses: Address[];
  notifications: NotificationItem[];
  toasts: Toast[];
  wishlist: string[];
  login: (user: User) => void;
  loginAs: (role: Role) => void;
  logout: () => void;
  register: (data: Partial<User> & { password?: string }) => User;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (input: CheckoutInput) => Order;
  updateOrderStatus: (id: string, status: Order["status"], note?: string) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  markNotificationsRead: () => void;
  pushToast: (message: string, tone?: Toast["tone"]) => void;
  cartCount: number;
  cartSubtotal: number;
}

const STORAGE_KEY = "orf-digital-platform-v1";

interface Persisted {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  addresses: Address[];
  notifications: NotificationItem[];
  wishlist: string[];
}

const defaultPersisted: Persisted = {
  user: null,
  cart: [],
  orders: demoOrders,
  addresses: [
    { id: "a_default", label: "Home", recipient: "Adaeze Okafor", phone: "+234 803 123 4567", state: "Lagos", lga: "Ikeja", city: "Ikeja", street: "12 Adeola Odeku Street", isDefault: true },
  ],
  notifications: initialNotifications,
  wishlist: [],
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [addresses, setAddresses] = useState<Address[]>(defaultPersisted.addresses);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Persisted>;
        if (saved.user) setUser(saved.user);
        if (saved.cart) setCart(saved.cart);
        if (saved.orders) setOrders(saved.orders);
        if (saved.addresses) setAddresses(saved.addresses);
        if (saved.notifications) setNotifications(saved.notifications);
        if (saved.wishlist) setWishlist(saved.wishlist);
      }
    } catch {
      // Ignore malformed local data and use defaults.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = { user, cart, orders, addresses, notifications, wishlist };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage may be unavailable; state still works in memory.
    }
  }, [hydrated, user, cart, orders, addresses, notifications, wishlist]);

  const pushToast = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = uid("toast");
    setToasts((current) => [...current, { id, message, tone }]);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 4200);
  }, []);

  const login = useCallback((next: User) => {
    setUser(next);
    pushToast(`Welcome${next.name ? `, ${next.name.split(" ")[0]}` : ""}! You are now signed in.`);
  }, [pushToast]);

  const loginAs = useCallback((role: Role) => {
    const match = demoUsers.find((u) => u.role === role) ?? demoUsers[0];
    login(match);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    pushToast("You have been signed out.", "info");
  }, [pushToast]);

  const register = useCallback((data: Partial<User> & { password?: string }) => {
    const next: User = {
      id: uid("user"),
      name: data.name || "New Customer",
      email: data.email || "customer@example.com",
      phone: data.phone || "",
      role: data.role === "corporate" ? "corporate" : "individual",
      company: data.company,
      status: data.role === "corporate" ? "Pending Verification" : "Active",
    };
    setUser(next);
    pushToast(
      data.role === "corporate"
        ? "Registration submitted. Your account is pending verification."
        : "Account created successfully."
    );
    return next;
  }, [pushToast]);

  const addToCart = useCallback((product: Product, quantity = 1, variant?: string) => {
    setCart((current) => {
      const found = current.find((item) => item.productId === product.id && item.variant === variant);
      if (found) {
        return current.map((item) =>
          item === found ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { productId: product.id, quantity, variant }];
    });
    pushToast(`${product.name} added to your cart.`);
  }, [pushToast]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
    pushToast("Item removed from cart.", "info");
  }, [pushToast]);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback((input: CheckoutInput) => {
    const lines = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, name: product?.name ?? "Product", price: product?.price ?? 0, unit: product?.unit ?? "unit" };
    });
    const now = new Date().toISOString();
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const deliveryFee = input.deliveryFee ?? 0;
    const discount = input.discount ?? 0;
    const tax = Math.max(0, subtotal - discount) * 0.075;
    const reference = `ORF-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(Math.floor(Math.random() * 9000) + 1000)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    const paid = input.paymentMethod === "Corporate credit";

    const order: Order = {
      id: uid("order"),
      reference,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerId: user?.id,
      customerType: input.customerType,
      items: lines,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total: subtotal + deliveryFee + tax - discount,
      paymentMethod: input.paymentMethod,
      paymentStatus: paid ? "Credit Approved" : input.paymentMethod === "Bank transfer" ? "Pending" : "Paid",
      status: "Order Placed",
      deliveryMethod: input.deliveryMethod,
      address: input.address,
      createdAt: now,
      trackingCode: `TRK-${Math.floor(Math.random() * 900000) + 100000}`,
      timeline: [{ status: "Order Placed", at: now, note: input.note }],
    };

    setOrders((current) => [order, ...current]);
    setNotifications((current) => [
      { id: uid("note"), title: `New order ${reference}`, body: `${input.customerName} — ${lines.length} item(s).`, at: now, read: false, type: "order" },
      ...current,
    ]);
    setCart([]);
    return order;
  }, [cart, user]);

  const updateOrderStatus = useCallback((id: string, status: Order["status"], note?: string) => {
    const at = new Date().toISOString();
    setOrders((current) => current.map((order) =>
      order.id === id ? { ...order, status, timeline: [...order.timeline, { status, at, note }] } : order
    ));
    setNotifications((current) => {
      const order = orders.find((o) => o.id === id);
      return [{ id: uid("note"), title: `Order ${order?.reference ?? id} — ${status}`, body: note ?? "Order status updated.", at, read: false, type: "order" }, ...current];
    });
    pushToast(`Order status updated to ${status}.`);
  }, [orders, pushToast]);

  const addAddress = useCallback((address: Address) => {
    setAddresses((current) => [
      ...current.map((a) => (address.isDefault ? { ...a, isDefault: false } : a)),
      address,
    ]);
    pushToast("Delivery address saved.");
  }, [pushToast]);

  const removeAddress = useCallback((id: string) => {
    setAddresses((current) => current.filter((a) => a.id !== id));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications((current) => current.map((n) => ({ ...n, read: true })));
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (products.find((p) => p.id === item.productId)?.price ?? 0) * item.quantity, 0),
    [cart]
  );

  const value: AppState = {
    hydrated, user, cart, orders, addresses, notifications, toasts, wishlist,
    login, loginAs, logout, register, addToCart, setQuantity, removeFromCart, clearCart,
    placeOrder, updateOrderStatus, addAddress, removeAddress, toggleWishlist, markNotificationsRead, pushToast,
    cartCount, cartSubtotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
