"use client";

import { Wallet, CreditCard, ShieldCheck, Banknote } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge, Panel } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { naira, shortDate } from "@/lib/utils";

export default function PaymentsPage() {
  const { orders, user } = useApp();
  const mine = orders.filter((o) => !user || o.customerEmail === user.email || o.customerId === user.id);
  const paid = mine.filter((o) => o.paymentStatus === "Paid");

  return (
    <PortalShell section="customer" title="Payments" subtitle="Payment history, methods and verification status.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total paid", value: naira(paid.reduce((s, o) => s + o.total, 0)), icon: Wallet, tone: "green" },
          { label: "Pending verification", value: naira(mine.filter((o) => o.paymentStatus === "Pending").reduce((s, o) => s + o.total, 0)), icon: Banknote, tone: "gold" },
          { label: "Credit approved", value: naira(mine.filter((o) => o.paymentStatus === "Credit Approved").reduce((s, o) => s + o.total, 0)), icon: CreditCard, tone: "blue" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="card p-4"><div className="flex items-start justify-between"><div><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{label}</p><p className="mt-2 font-display text-xl font-bold text-forest">{value}</p></div><span className={`stat-icon ${tone === "green" ? "bg-leaf-light text-leaf" : tone === "gold" ? "bg-gold-light text-[#96710f]" : "bg-[#e5f0fb] text-[#235d94]"}`}><Icon size={18} /></span></div></div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <Panel title="Payment history">
          <div className="table-wrap"><table className="data">
            <thead><tr><th>Reference</th><th>Order</th><th>Date</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>{mine.map((o) => (
              <tr key={o.id}><td className="font-bold text-forest">PAY-{o.reference.slice(-6)}</td><td>{o.reference}</td><td>{shortDate(o.createdAt)}</td><td>{o.paymentMethod}</td><td className="font-bold text-forest">{naira(o.total)}</td><td><Badge text={o.paymentStatus} tone={o.paymentStatus === "Paid" ? "green" : o.paymentStatus === "Failed" ? "red" : "gold"} /></td></tr>
            ))}{mine.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-muted">No payments recorded yet.</td></tr>}</tbody>
          </table></div>
        </Panel>
        <Panel title="Payment options">
          <div className="space-y-2 text-[0.78rem]">
            {["Debit / credit card via Paystack", "Bank transfer (verified)", "USSD where supported", "Secure payment links", "Corporate credit (approved accounts)", "Part payment / deposit"].map((m) => (
              <div key={m} className="flex items-center gap-2 rounded-lg bg-[#f7faf7] px-3 py-2 text-[#45534b]"><ShieldCheck size={14} className="text-leaf" /> {m}</div>
            ))}
          </div>
          <p className="mt-4 text-[0.72rem] leading-relaxed text-muted">Bank transfers are verified against the actual bank or provider transaction. Uploading a receipt alone does not mark an order as paid.</p>
        </Panel>
      </div>
    </PortalShell>
  );
}
