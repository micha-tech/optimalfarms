"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Download, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { deliveryStages, naira, shortDate, stageIndex } from "@/lib/utils";

export default function StaffOrdersPage() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = orders.filter((o) =>
    (filter === "All" || o.status === filter) &&
    `${o.reference} ${o.customerName} ${o.items.map((i) => i.name).join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );
  const detail = orders.find((o) => o.id === selected);

  return (
    <PortalShell section="staff" title="Sales & Orders" subtitle="Confirm, amend and monitor every customer order.">
      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input pl-9" placeholder="Search orders, customers or products" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div className="flex items-center gap-2"><Filter size={15} className="text-muted" /><select className="input w-auto min-w-[170px]" value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Order Placed</option><option>Order Confirmed</option><option>Order Processing</option><option>Ready for Dispatch</option><option>Dispatched</option><option>Delivered</option><option>Cancelled</option></select></div>
        <button className="btn btn-outline"><Download size={15} /> Export</button>
      </div>

      <div className="card overflow-hidden">
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Order</th><th>Customer</th><th>Type</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead>
          <tbody>{filtered.map((o) => (
            <tr key={o.id}>
              <td className="font-bold text-forest">{o.reference}</td>
              <td><p className="font-semibold">{o.customerName}</p><p className="text-[0.68rem] text-muted">{o.customerEmail}</p></td>
              <td><Badge text={o.customerType} tone={o.customerType === "corporate" ? "blue" : "grey"} /></td>
              <td>{shortDate(o.createdAt)}</td>
              <td>{o.items.length}</td>
              <td className="font-bold text-forest">{naira(o.total)}</td>
              <td><Badge text={o.paymentStatus} tone={o.paymentStatus === "Paid" ? "green" : "gold"} /></td>
              <td><Badge text={o.status} tone={o.status === "Delivered" ? "green" : o.status === "Cancelled" ? "red" : "gold"} /></td>
              <td><button onClick={() => setSelected(o.id)} className="grid h-8 w-8 place-items-center rounded-lg text-leaf hover:bg-leaf-light"><Eye size={16} /></button></td>
            </tr>
          ))}{filtered.length === 0 && <tr><td colSpan={9} className="py-10 text-center text-muted">No orders found.</td></tr>}</tbody>
        </table></div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3"><div><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Order detail</p><h3 className="font-display text-2xl font-bold text-forest">{detail.reference}</h3></div><button onClick={() => setSelected(null)} className="text-muted">✕</button></div>
            <div className="mt-5 grid grid-cols-2 gap-3">{[["Customer", detail.customerName], ["Date", shortDate(detail.createdAt)], ["Payment", detail.paymentStatus], ["Total", naira(detail.total)], ["Delivery", detail.deliveryMethod], ["Tracking", detail.trackingCode]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-[#f7faf7] p-3"><p className="text-[0.66rem] font-bold uppercase text-muted">{k}</p><p className="mt-1 text-[0.8rem] font-bold text-forest">{v}</p></div>
            ))}</div>
            <h4 className="mt-6 text-[0.82rem] font-bold text-forest">Items</h4>
            <div className="mt-2 space-y-2">{detail.items.map((i, idx) => <div key={idx} className="flex justify-between border-b border-[#edf1ed] pb-2 text-[0.78rem]"><span>{i.quantity} × {i.name}{i.variant ? ` (${i.variant})` : ""}</span><span className="font-bold">{naira(i.price * i.quantity)}</span></div>)}</div>
            <h4 className="mt-6 text-[0.82rem] font-bold text-forest">Update status</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {deliveryStages.slice(2, 12).map((stage) => (
                <button key={stage} disabled={stageIndex(detail.status) >= stageIndex(stage)} onClick={() => updateOrderStatus(detail.id, stage as typeof detail.status)} className={`btn btn-sm ${stageIndex(detail.status) >= stageIndex(stage) ? "btn-ghost opacity-50" : "btn-outline"}`}>{stage}</button>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gold-light p-4 text-[0.75rem] text-[#72580c]"><AlertCircle size={14} className="mr-1 inline" /> Changes to confirmed orders are logged in the audit trail. Stock is reserved on confirmation and released only according to policy.</div>
            <Link href={`/track?ref=${encodeURIComponent(detail.reference)}`} className="btn btn-primary mt-4 w-full"><CheckCircle2 size={15} /> View customer tracking page</Link>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
