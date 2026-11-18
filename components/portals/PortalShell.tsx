"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell, Search, LogOut, Menu, X, ChevronRight, LayoutDashboard, ShoppingBag, ClipboardList,
  Truck, FileText, Wallet, MapPin, CreditCard, Users, Building2, Boxes, ArrowLeftRight,
  Warehouse, Sprout, Bird, Fish, Rabbit, ShoppingCart, Receipt, Banknote, BarChart3,
  Settings2, ShieldCheck, ScrollText, PackageCheck, FileCheck2, TruckIcon, UserCog,
  Handshake, CircleDollarSign, Home, HelpCircle, Store, Factory,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import type { Role } from "@/lib/types";
import { shortDate } from "@/lib/utils";

type Section = "customer" | "staff" | "admin" | "supplier";

type NavItem = { label: string; href: string; icon: React.ElementType };
type NavGroup = { label?: string; items: NavItem[] };

const base = "/portal";

const navigation: Record<Section, NavGroup[]> = {
  customer: [
    { items: [
      { label: "Dashboard", href: `${base}/customer`, icon: LayoutDashboard },
      { label: "Shop Products", href: "/products", icon: ShoppingBag },
      { label: "My Cart", href: "/cart", icon: ShoppingCart },
      { label: "My Orders", href: `${base}/customer/orders`, icon: ClipboardList },
      { label: "Track Order", href: "/track", icon: Truck },
      { label: "My Invoices", href: `${base}/customer/invoices`, icon: FileText },
      { label: "Payments", href: `${base}/customer/payments`, icon: Wallet },
    ]},
    { label: "Account", items: [
      { label: "Credit Account", href: `${base}/customer/credit`, icon: CreditCard },
      { label: "Statements", href: `${base}/customer/statements`, icon: Receipt },
      { label: "Saved Addresses", href: `${base}/customer/addresses`, icon: MapPin },
      { label: "Quotations", href: `${base}/customer/quotations`, icon: FileCheck2 },
      { label: "Profile & Settings", href: `${base}/customer/settings`, icon: Settings2 },
    ]},
    { label: "Help", items: [
      { label: "Support / Complaints", href: `${base}/customer/support`, icon: HelpCircle },
    ]},
  ],
  staff: [
    { items: [{ label: "Dashboard", href: `${base}/staff`, icon: LayoutDashboard }]},
    { label: "Sales", items: [
      { label: "Sales & Orders", href: `${base}/staff/orders`, icon: ShoppingBag },
      { label: "Customers", href: `${base}/staff/customers`, icon: Users },
      { label: "Corporate Accounts", href: `${base}/staff/corporate`, icon: Building2 },
      { label: "Credit Management", href: `${base}/staff/credit`, icon: CreditCard },
      { label: "Quotations", href: `${base}/staff/quotations`, icon: FileCheck2 },
    ]},
    { label: "Inventory & Production", items: [
      { label: "Products & Pricing", href: `${base}/staff/products`, icon: Boxes },
      { label: "Inventory", href: `${base}/staff/inventory`, icon: Warehouse },
      { label: "Stock Movements", href: `${base}/staff/stock-movements`, icon: ArrowLeftRight },
      { label: "Poultry Production", href: `${base}/staff/production/poultry`, icon: Bird },
      { label: "Fish Farming", href: `${base}/staff/production/fish`, icon: Fish },
      { label: "Livestock", href: `${base}/staff/production/livestock`, icon: Rabbit },
    ]},
    { label: "Procurement", items: [
      { label: "Suppliers", href: `${base}/staff/suppliers`, icon: Handshake },
      { label: "Purchase Requisitions", href: `${base}/staff/procurement/requisitions`, icon: ClipboardList },
      { label: "Purchase Orders", href: `${base}/staff/procurement/orders`, icon: FileText },
      { label: "Goods Received Notes", href: `${base}/staff/procurement/grn`, icon: PackageCheck },
      { label: "Supplier Invoices", href: `${base}/staff/procurement/invoices`, icon: Receipt },
    ]},
    { label: "Finance & Logistics", items: [
      { label: "Accounts Receivable", href: `${base}/staff/finance/receivables`, icon: CircleDollarSign },
      { label: "Accounts Payable", href: `${base}/staff/finance/payables`, icon: Banknote },
      { label: "Payments & Receipts", href: `${base}/staff/finance/payments`, icon: Wallet },
      { label: "Expenses", href: `${base}/staff/finance/expenses`, icon: Receipt },
      { label: "Delivery & Logistics", href: `${base}/staff/delivery`, icon: TruckIcon },
      { label: "Reports", href: `${base}/staff/reports`, icon: BarChart3 },
    ]},
  ],
  admin: [
    { items: [{ label: "Business Overview", href: `${base}/admin`, icon: LayoutDashboard }]},
    { label: "Control", items: [
      { label: "Users & Permissions", href: `${base}/admin/users`, icon: UserCog },
      { label: "Approvals", href: `${base}/admin/approvals`, icon: FileCheck2 },
      { label: "Reports & Analytics", href: `${base}/admin/reports`, icon: BarChart3 },
      { label: "Audit Logs", href: `${base}/admin/audit`, icon: ScrollText },
      { label: "System Settings", href: `${base}/admin/settings`, icon: Settings2 },
    ]},
    { label: "Shortcuts", items: [
      { label: "Staff Operations", href: `${base}/staff`, icon: Factory },
      { label: "Corporate Website", href: "/", icon: Home },
    ]},
  ],
  supplier: [
    { items: [{ label: "Supplier Dashboard", href: `${base}/supplier`, icon: LayoutDashboard }]},
    { label: "Supply", items: [
      { label: "Purchase Orders", href: `${base}/supplier/purchase-orders`, icon: FileText },
      { label: "Delivery Confirmations", href: `${base}/supplier/deliveries`, icon: TruckIcon },
      { label: "Upload Invoices", href: `${base}/supplier/invoices`, icon: UploadIcon },
      { label: "Goods Received Status", href: `${base}/supplier/grn`, icon: PackageCheck },
    ]},
    { label: "Account", items: [
      { label: "Payment Status", href: `${base}/supplier/payments`, icon: Wallet },
      { label: "Statements", href: `${base}/supplier/statements`, icon: Receipt },
      { label: "Profile & Documents", href: `${base}/supplier/profile`, icon: Store },
    ]},
  ],
};

function UploadIcon(props: React.ComponentProps<typeof FileText>) { return <FileText {...props} />; }

const roleLabel: Record<Role, string> = {
  guest: "Guest", individual: "Individual Customer", corporate: "Corporate Customer",
  staff: "Staff Member", admin: "Super Administrator", supplier: "Supplier User",
};

export default function PortalShell({
  section, title, subtitle, actions, children,
}: {
  section: Section;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, hydrated, loginAs, notifications, markNotificationsRead, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  if (!hydrated) return <div className="portal-shell grid min-h-screen place-items-center text-[0.85rem] text-muted">Loading portal…</div>;

  if (!user) {
    const roles: Role[] = section === "supplier" ? ["supplier"] : section === "admin" ? ["admin"] : section === "staff" ? ["staff"] : ["individual", "corporate"];
    return (
      <div className="portal-shell grid min-h-screen place-items-center p-5">
        <div className="card w-full max-w-md p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-forest text-gold"><ShieldCheck size={28} /></div>
          <h1 className="mt-4 font-display text-2xl font-bold text-forest">Sign in to continue</h1>
          <p className="mt-2 text-[0.84rem] text-muted">This area is restricted to authorised {section} users. Use a demo account below to explore.</p>
          <div className="mt-6 space-y-2">
            {roles.map((role) => (
              <button key={role} onClick={() => loginAs(role)} className="btn btn-primary w-full capitalize">{EnterIcon()} Continue as {role === "corporate" ? "Corporate Customer" : role}</button>
            ))}
          </div>
          <Link href="/login" className="btn btn-outline mt-3 w-full">Go to sign-in page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-shell flex min-h-screen">
      {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" aria-label="Close navigation" />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-[258px] overflow-y-auto border-r border-[#e2e9e3] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-[#edf1ed] px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-gold">
              <svg viewBox="0 0 40 40" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M20 33V19" /><path d="M20 21c-7 0-11-4-11-10 6 0 11 3 11 10Z" /><path d="M20 17c0-7 4-11 11-11 0 6-4 11-11 11Z" /></svg>
            </span>
            <span className="leading-tight"><span className="block font-display text-[0.9rem] font-bold text-forest">Optimal Royal</span><span className="block text-[0.55rem] font-bold uppercase tracking-wider text-gold">{section} portal</span></span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-muted lg:hidden"><X size={18} /></button>
        </div>
        <nav className="px-2 pb-8">
          {navigation[section].map((group, i) => (
            <div key={i}>
              {group.label && <p className="side-label">{group.label}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.href === `${base}/${section}` ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`side-link ${active ? "active" : ""}`}>
                      <Icon size={16} className="shrink-0" /><span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#e4eae5] bg-white px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-forest lg:hidden"><Menu size={21} /></button>
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-bold text-forest md:text-xl">{title}</h1>
              {subtitle && <p className="hidden truncate text-[0.7rem] text-muted md:block">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input className="input w-52 py-1.5 pl-8 text-[0.75rem]" placeholder="Search…" />
            </div>
            <div className="relative">
              <button onClick={() => { setBellOpen(!bellOpen); if (!bellOpen) markNotificationsRead(); }} className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#e2e9e3] text-forest hover:bg-[#f5f8f5]" aria-label="Notifications">
                <Bell size={17} />{unread > 0 && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.6rem] font-bold text-forest">{unread}</span>}
              </button>
              {bellOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-[#e4ebe5] bg-white p-2 shadow-xl">
                  <p className="px-2 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-muted">Notifications</p>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, 6).map((n) => (
                      <div key={n.id} className="rounded-lg px-2.5 py-2 hover:bg-[#f7faf7]">
                        <p className="text-[0.78rem] font-bold text-forest">{n.title}</p>
                        <p className="text-[0.71rem] text-muted">{n.body}</p>
                        <p className="mt-0.5 text-[0.64rem] text-muted">{shortDate(n.at)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-[#e2e9e3] px-2 py-1.5 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf-light text-[0.68rem] font-bold text-leaf">{user.name.slice(0, 2).toUpperCase()}</span>
              <span className="leading-tight"><span className="block max-w-[120px] truncate text-[0.75rem] font-bold text-forest">{user.name}</span><span className="block text-[0.62rem] text-muted">{roleLabel[user.role]}</span></span>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="grid h-9 w-9 place-items-center rounded-lg border border-[#e2e9e3] text-muted hover:bg-red-50 hover:text-red-600" aria-label="Sign out"><LogOut size={16} /></button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {(title || subtitle || actions) && (
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div><h2 className="font-display text-2xl font-bold text-forest">{title}</h2>{subtitle && <p className="mt-1 text-[0.82rem] text-muted">{subtitle}</p>}</div>
              {actions}
            </div>
          )}
          {children}
          <div className="mt-10 flex items-center justify-between border-t border-[#e4eae5] pt-5 text-[0.7rem] text-muted">
            <p>© {new Date().getFullYear()} Optimal Royal Integrated Farms Limited</p>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-leaf">Back to website <ChevronRight size={12} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterIcon() { return <ChevronRight size={15} />; }
