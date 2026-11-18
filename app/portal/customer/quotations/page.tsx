"use client";

import Link from "next/link";
import { FileCheck2, Plus, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { naira } from "@/lib/utils";

const quotes = [
  { id: "QT-2026-0088", product: "Processed chicken & poultry feed", qty: "120 kg + 20 bags", amount: 703000, date: "12 Nov 2026", valid: "26 Nov 2026", status: "Accepted" },
  { id: "QT-2026-0081", product: "Live catfish — bulk supply", qty: "200 kg/week", amount: 1440000, date: "02 Nov 2026", valid: "16 Nov 2026", status: "Expired" },
  { id: "QT-2026-0076", product: "Battery cages & feeders", qty: "10 units", amount: 1450000, date: "21 Oct 2026", valid: "04 Nov 2026", status: "Converted to order" },
];

export default function QuotationsPage() {
  return (
    <PortalShell section="customer" title="Quotations" subtitle="Bulk and corporate quotations prepared by our sales team." actions={<Link href="/corporate#quote" className="btn btn-primary"><Plus size={15} /> Request a quote</Link>}>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Quotations issued", quotes.length], ["Accepted / converted", 2], ["Total quoted value", naira(quotes.reduce((s, q) => s + q.amount, 0))]].map(([k, v]) => (
          <div key={k} className="card p-4"><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{k}</p><p className="mt-2 font-display text-xl font-bold text-forest">{v}</p></div>
        ))}
      </div>
      <div className="card mt-5 overflow-hidden">
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Quote no.</th><th>Products</th><th>Quantity</th><th>Amount</th><th>Issued</th><th>Valid until</th><th>Status</th><th></th></tr></thead>
          <tbody>{quotes.map((q) => (
            <tr key={q.id}>
              <td className="font-bold text-forest">{q.id}</td><td className="max-w-[200px] truncate">{q.product}</td><td>{q.qty}</td><td className="font-bold">{naira(q.amount)}</td>
              <td>{q.date}</td><td><span className="flex items-center gap-1"><CalendarDays size={12} className="text-muted" />{q.valid}</span></td>
              <td><Badge text={q.status} tone={q.status === "Accepted" || q.status === "Converted to order" ? "green" : q.status === "Expired" ? "red" : "gold"} /></td>
              <td>{q.status === "Accepted" ? <Link href="/checkout" className="btn btn-primary btn-sm">Order now</Link> : <Link href="/corporate" className="btn btn-outline btn-sm">Enquire</Link>}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="mt-5 card flex flex-wrap items-center gap-4 p-5">
        {[[CheckCircle2, "Approved pricing", "Corporate and customer-specific pricing applied automatically"], [Clock3, "Validity periods", "Quotes expire on the stated date unless renewed"], [XCircle, "Conversion", "Accepted quotations convert into sales orders"]].map(([Icon, title, text]) => {
          const I = Icon as React.ElementType;
          return <div key={title as string} className="flex flex-1 items-start gap-2"><I size={17} className="mt-0.5 shrink-0 text-leaf" /><span><span className="block text-[0.78rem] font-bold text-forest">{title as string}</span><span className="block text-[0.72rem] text-muted">{text as string}</span></span></div>;
        })}
      </div>
    </PortalShell>
  );
}
