export type Role = "guest" | "individual" | "corporate" | "staff" | "admin" | "supplier";

export type ProductCategory =
  | "Poultry & Live Birds"
  | "Fishery Products"
  | "Livestock"
  | "Feeds & Equipment"
  | "Processed Products"
  | "Consulting Services";

export interface ProductVariant {
  label: string;
  priceAdjustment?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  minOrder: number;
  stock: number;
  estimatedWeight?: boolean;
  service?: boolean;
  featured?: boolean;
  badge?: string;
  image: string;
  variants: ProductVariant[];
  specifications: { label: string; value: string }[];
  storage?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: string;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  state: string;
  lga: string;
  city: string;
  street: string;
  houseNumber?: string;
  landmark?: string;
  postalCode?: string;
  instructions?: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "Order Placed"
  | "Payment Confirmed"
  | "Order Confirmed"
  | "Order Processing"
  | "Products Being Prepared"
  | "Quality Inspection Completed"
  | "Ready for Dispatch"
  | "Driver Assigned"
  | "Dispatched"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderEvent {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerId?: string;
  customerType: Role;
  items: (CartItem & { name: string; price: number; unit: string })[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Credit Approved" | "Failed";
  status: OrderStatus;
  deliveryMethod: string;
  address: Address | null;
  createdAt: string;
  timeline: OrderEvent[];
  trackingCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  company?: string;
  status?: "Active" | "Pending Verification" | "Suspended";
  creditLimit?: number;
  creditUsed?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  type: "order" | "stock" | "finance" | "system";
}

export interface Toast {
  id: string;
  message: string;
  tone: "success" | "error" | "info";
}
