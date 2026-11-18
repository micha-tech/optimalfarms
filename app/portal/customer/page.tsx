"use client";

import Link from "next/link";
import { ShoppingBag, Clock3, CheckCircle2, Truck, Wallet, CreditCard, MapPin, FileText, PackageCheck, ArrowRight, AlertCircle } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { StatCard, Panel, Badge, QuickLink } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { naira, shortDate } from "@/lib/utils";

export default function CustomerDashboard() {
  const { orders, user, addresses } = useApp();
  const mine = orders.filter((o) => !user || o.customerEmail === user.email || o.customerId === user.id);
  const count = (status: string) => mine.filter((o) => o.status === status).length;
  const outstanding = mine.filter((o) => o.paymentStatus === "Pending").reduce((s, o) => s + o.total, 0);
  const availableCredit = user?.creditLimit ? user.creditLimit - (user.creditUsed ?? 0) : 0;

  return (
    <PortalShell section="customer" title="Customer Dashboard" subtitle={`Welcome back, ${user?.name ?? "customer"}. Here is your account at a glance.`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={mine.length} icon={ShoppingBag} tone="forest" />
        <StatCard label="Pending orders" value={count("Order Placed") + count("Order Processing") + count("Order Confirmed")} icon={Clock3} tone="gold" />
        <StatCard label="Delivered" value={count("Delivered")} icon={CheckCircle2} tone="green" />
        <StatCard label="Outstanding payments" value={naira(outstanding)} icon={Wallet} tone="red" />
      </div>

      {user?.role === "corporate" && (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="card bg-forest p-5 text-white md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-[0.7rem] font-bold uppercase tracking-wider text-gold">Corporate credit account</p><h3 className="mt-1 font-display text-2xl font-bold">{user.company ?? user.name}</h3></div>
              <Badge text="Approved" tone="gold" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[["Approved limit", naira(user.creditLimit ?? 0)], ["Utilised", naira(user.creditUsed ?? 0)], ["Available credit", naira(availableCredit)]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/10 p-3"><p className="text-[0.68rem] text-white/65">{k}</p><p className="mt-1 font-display text-lg font-bold text-white">{v}</p></div>
              ))}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gold" style={{ width: `${((user.creditUsed ?? 0) / (user.creditLimit || 1)) * 100}%` }} /></div>
            <Link href="/portal/customer/credit" className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-bold text-gold">Manage credit account <ArrowRight size={13} /></Link>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 text-leaf"><CreditCard size={18} /><h3 className="font-display text-lg font-bold text-forest">Payment terms</h3></div>
            <p className="mt-2 text-[0.78rem] text-muted">Credit days: <strong className="text-forest">30 days</strong></p>
            <p className="mt-1 text-[0.78rem] text-muted">Next payment due: <strong className="text-forest">15 Dec 2026</strong></p>
            <Link href="/portal/customer/statements" className="btn btn-outline btn-sm mt-4 w-full">View statement</Link>
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <Panel title="Recent orders" subtitle="Your latest purchases and their progress" action={<Link href="/portal/customer/orders" className="text-[0.76rem] font-bold text-leaf">View all →</Link>}>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Reference</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {mine.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="font-bold text-forest">{o.reference}</td>
                    <td>{shortDate(o.createdAt)}</td>
                    <td>{o.items.length} line(s)</td>
                    <td className="font-bold text-forest">{naira(o.total)}</td>
                    <td><Badge text={o.paymentStatus} tone={o.paymentStatus === "Paid" ? "green" : o.paymentStatus === "Credit Approved" ? "blue" : "gold"} /></td>
                    <td><Badge text={o.status} tone={o.status === "Delivered" ? "green" : o.status === "Cancelled" ? "red" : "gold"} /></td>
                    <td><Link href={`/track?ref=${encodeURIComponent(o.reference)}`} className="text-leaf"><ArrowRight size={15} /></Link></td>
                  </tr>
                ))}
                {mine.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-muted">No orders yet. <Link href="/products" className="font-bold text-leaf">Start shopping</Link>.</td></tr>}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Quick actions">
            <div className="grid gap-2">
              <QuickLink href="/products" title="Shop products" text="Browse fresh produce and inputs" icon={ShoppingBag} />
              <QuickLink href="/track" title="Track an order" text="See live delivery milestones" icon={Truck} />
              <QuickLink href="/portal/customer/invoices" title="Invoices & receipts" text="Download your documents" icon={FileText} />
              <QuickLink href="/portal/customer/addresses" title="Saved addresses" text={`${addresses.length} address(es) on file`} icon={MapPin} />
            </div>
          </Panel>
          <div className="card flex gap-3 border-gold/30 bg-gold-light p-4">
            <AlertCircle size={18} className="shrink-0 text-[#96710f]" />
            <div><p className="text-[0.8rem] font-bold text-forest">Need something in bulk?</p><p className="mt-1 text-[0.74rem] text-[#6b5a25]">Request a tailored quote with delivery and payment terms.</p><Link href="/corporate" className="mt-2 inline-flex items-center gap-1 text-[0.74rem] font-bold text-leaf">Request a quote <ArrowRight size={12} /></Link></div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          { icon: PackageCheck, title: "Quality checked", text: "Every order is quality inspected before dispatch." },
          { icon: Truck, title: "Clear milestones", text: "Follow your order from placement to delivery." },
          { icon: FileText, title: "Digital records", text: "Invoices and receipts available whenever you need them." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="card flex gap-3 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-leaf-light text-leaf"><Icon size={17} /></span><span><span className="block text-[0.8rem] font-bold text-forest">{title}</span><span className="block text-[0.72rem] text-muted">{text}</span></span></div>
        ))}
      </div>
    </PortalShell>
  );
}
