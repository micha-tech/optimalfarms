"use client";

import Link from "next/link";
import { CreditCard, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { ProgressBar, Panel, Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { naira } from "@/lib/utils";
import { salesTrend } from "@/lib/data";

export default function CreditPage() {
  const { user, orders, pushToast } = useApp();
  const isCorp = user?.role === "corporate";
  const limit = user?.creditLimit ?? 5_000_000;
  const used = user?.creditUsed ?? 0;
  const creditOrders = orders.filter((o) => o.paymentStatus === "Credit Approved");

  return (
    <PortalShell section="customer" title="My Credit Account" subtitle="Approved limit, utilisation, ageing and payment history.">
      {!isCorp ? (
        <div className="card mx-auto max-w-2xl p-10 text-center">
          <CreditCard size={34} className="mx-auto text-muted" />
          <h3 className="mt-4 font-display text-xl font-bold text-forest">Corporate credit is not active on this account</h3>
          <p className="mt-2 text-[0.84rem] text-muted">Register as a business and submit a credit application to be considered for approved credit terms.</p>
          <div className="mt-5 flex justify-center gap-3"><Link href="/register?type=corporate" className="btn btn-primary">Register as a Business</Link><Link href="/corporate" className="btn btn-outline">Learn more</Link></div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="card bg-forest p-6 text-white">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[0.68rem] font-bold uppercase tracking-wider text-gold">Approved credit limit</p><p className="mt-1 font-display text-4xl font-bold">{naira(limit)}</p></div><Badge text="Active" tone="gold" /></div>
              <div className="mt-6"><ProgressBar value={(used / limit) * 100} color="bg-gold" label="Limit utilised" /></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[["Amount utilised", naira(used)], ["Available credit", naira(limit - used)], ["Outstanding balance", naira(used)]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/10 p-3"><p className="text-[0.68rem] text-white/65">{k}</p><p className="mt-1 font-display text-lg font-bold">{v}</p></div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-forest">Credit terms</h3>
              <div className="mt-4 space-y-3 text-[0.8rem]">
                {[["Payment terms", "Net 30 days"], ["Credit days", "30"], ["Credit status", "Approved"], ["Suspension", "None"]].map(([k, v]) => <div key={k} className="flex justify-between border-b border-[#edf1ed] pb-2"><span className="text-muted">{k}</span><span className="font-bold text-forest">{v}</span></div>)}
              </div>
              <button onClick={() => pushToast("Credit limit increase request sent to the finance team.", "info")} className="btn btn-outline mt-5 w-full">Request limit increase</button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Panel title="Credit purchases" subtitle="Orders financed by your corporate credit account">
              <div className="table-wrap"><table className="data"><thead><tr><th>Order</th><th>Date</th><th>Amount</th><th>Due date</th><th>Status</th></tr></thead><tbody>
                {creditOrders.map((o) => <tr key={o.id}><td className="font-bold text-forest">{o.reference}</td><td>{new Date(o.createdAt).toLocaleDateString("en-NG")}</td><td className="font-bold">{naira(o.total)}</td><td>{new Date(new Date(o.createdAt).getTime() + 30 * 864e5).toLocaleDateString("en-NG")}</td><td><Badge text={o.status} tone="gold" /></td></tr>)}
                {creditOrders.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-muted">No credit purchases recorded yet.</td></tr>}
              </tbody></table></div>
            </Panel>
            <div className="space-y-5">
              <Panel title="Ageing analysis">
                {[["Current (0–30 days)", 780000, "bg-leaf"], ["31–60 days", 320000, "bg-gold"], ["61–90 days", 100000, "bg-orange-400"], ["Over 90 days", 0, "bg-red-500"]].map(([label, value, color]) => (
                  <div key={label as string} className="mb-3"><div className="mb-1 flex justify-between text-[0.72rem]"><span className="text-muted">{label}</span><span className="font-bold text-forest">{naira(value as number)}</span></div><div className="h-2 rounded-full bg-[#edf1ed]"><div className={`h-full rounded-full ${color}`} style={{ width: `${((value as number) / 1200000) * 100}%` }} /></div></div>
                ))}
              </Panel>
              <div className="card flex gap-3 border-gold/30 bg-gold-light p-4"><AlertCircle size={17} className="shrink-0 text-[#96710f]" /><p className="text-[0.76rem] text-[#6b5a25]">Credit orders cannot exceed your approved limit without authorised managerial approval. Overdue balances may result in credit suspension.</p></div>
            </div>
          </div>
        </>
      )}
    </PortalShell>
  );
}
