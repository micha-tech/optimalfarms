"use client";

import { Download, FileSpreadsheet, BarChart3, Printer } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Panel } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { salesTrend, topProducts, inventory } from "@/lib/data";
import { naira } from "@/lib/utils";

const reports = [
  ["Sales report", "Revenue, orders and channels by period"],
  ["Purchases report", "Purchase orders, GRNs and supplier invoices"],
  ["Inventory valuation", "Stock quantities and values by location"],
  ["Stock movement report", "All inventory transactions and references"],
  ["Customer ageing", "Outstanding receivables by age bucket"],
  ["Supplier ageing", "Outstanding payables by age bucket"],
  ["Income statement", "Revenue, cost of sales and expenses"],
  ["Statement of financial position", "Assets, liabilities and equity"],
  ["Cash flow report", "Cash and bank movements"],
  ["Expense analysis", "Spend by category, department and period"],
  ["Product profitability", "Margin by product and category"],
  ["Gross profit analysis", "Gross margin trends"],
  ["Cost of sales", "Cost of goods sold by product"],
  ["Tax summary", "VAT and tax records"],
  ["Bank reconciliation", "Bank versus ledger balances"],
];

export default function ReportsPage() {
  const { pushToast } = useApp();
  return (
    <PortalShell section="staff" title="Reports" subtitle="Operational and financial reports, exportable to Excel and PDF.">
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Panel title="Available reports" subtitle="Select a report to generate, preview or export">
          <div className="grid gap-2 sm:grid-cols-2">
            {reports.map(([title, desc]) => (
              <button key={title} onClick={() => pushToast(`${title} generated. Export ready.`, "info")} className="flex items-start gap-2.5 rounded-xl border border-[#e9eeea] p-3 text-left hover:border-leaf">
                <FileSpreadsheet size={17} className="mt-0.5 shrink-0 text-leaf" />
                <span><span className="block text-[0.78rem] font-bold text-forest">{title}</span><span className="block text-[0.68rem] text-muted">{desc}</span></span>
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2"><button className="btn btn-outline btn-sm"><Download size={14} /> Export Excel</button><button className="btn btn-outline btn-sm"><Download size={14} /> Export PDF</button><button className="btn btn-ghost btn-sm"><Printer size={14} /> Print</button></div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Revenue trend (₦m)">
            <div className="flex h-40 items-end gap-3">{salesTrend.map((m) => <div key={m.month} className="flex flex-1 flex-col items-center gap-1"><div className="h-full w-full rounded-t bg-leaf/80" style={{ height: `${(m.value / 9) * 100}%` }} /><span className="text-[0.65rem] text-muted">{m.month}</span></div>)}</div>
          </Panel>
          <Panel title="Product revenue share">
            <div className="space-y-3">{topProducts.map((p) => <div key={p.name}><div className="flex justify-between text-[0.72rem]"><span className="font-semibold text-forest">{p.name}</span><span className="text-muted">{p.share}%</span></div><div className="mt-1 h-2 rounded-full bg-[#edf1ed]"><div className="h-full rounded-full bg-gold" style={{ width: `${p.share * 3}%` }} /></div></div>)}</div>
          </Panel>
          <Panel title="Report controls">
            <p className="text-[0.75rem] leading-relaxed text-muted">Reports respect role-based access. Financial figures reconcile against sales, payments, inventory and accounting records. Posted transactions cannot be deleted — corrections are made by reversal with an audit trail.</p>
          </Panel>
        </div>
      </div>
    </PortalShell>
  );
}
