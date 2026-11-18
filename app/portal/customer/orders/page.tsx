"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ClipboardList, ArrowRight } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { naira, shortDate } from "@/lib/utils";

export default function MyOrdersPage() {
  const { orders, user } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const mine = orders.filter((o) => !user || o.customerEmail === user.email || o.customerId === user.id);
  const filtered = mine.filter((o) =>
    (filter === "All" || o.status === filter) &&
    `${o.reference} ${o.items.map((i) => i.name).join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );
  const statuses = ["All", "Order Placed", "Order Confirmed", "Order Processing", "Ready for Dispatch", "Dispatched", "Delivered", "Cancelled"];

  return (
    <PortalShell section="customer" title="My Orders" subtitle="View, filter and track all your orders.">
      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input pl-9" placeholder="Search by reference or product" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select className="input w-auto min-w-[180px]" value={filter} onChange={(e) => setFilter(e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
        <Link href="/products" className="btn btn-primary">New order</Link>
      </div>

      <div className="card overflow-hidden">
        {filtered.length ? (
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Order reference</th><th>Date</th><th>Products</th><th>Total</th><th>Payment</th><th>Order status</th><th>Track</th></tr></thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td><p className="font-bold text-forest">{o.reference}</p><p className="text-[0.68rem] text-muted">{o.trackingCode}</p></td>
                    <td>{shortDate(o.createdAt)}</td>
                    <td><p className="max-w-[220px] truncate">{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p></td>
                    <td className="font-bold text-forest">{naira(o.total)}</td>
                    <td><Badge text={o.paymentStatus} tone={o.paymentStatus === "Paid" ? "green" : o.paymentStatus === "Credit Approved" ? "blue" : "gold"} /></td>
                    <td><Badge text={o.status} tone={o.status === "Delivered" ? "green" : o.status === "Cancelled" ? "red" : "gold"} /></td>
                    <td><Link href={`/track?ref=${encodeURIComponent(o.reference)}`} className="inline-flex items-center gap-1 text-[0.75rem] font-bold text-leaf">Track <ArrowRight size={13} /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid place-items-center p-14 text-center"><ClipboardList size={30} className="text-muted" /><p className="mt-3 text-[0.85rem] text-muted">No orders match your filters.</p><Link href="/products" className="btn btn-primary mt-4">Shop products</Link></div>
        )}
      </div>
    </PortalShell>
  );
}
