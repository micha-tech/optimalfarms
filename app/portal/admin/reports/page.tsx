"use client";

import Link from "next/link";
import { BarChart3, TrendingUp, Users, Boxes, Truck, Download } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Panel, StatCard, ProgressBar } from "@/components/portals/UI";
import { salesTrend, topProducts } from "@/lib/data";
import { naira } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

export default function AdminReportsPage() {
  const { pushToast } = useApp();
  return (
    <PortalShell section="admin" title="Reports & Analytics" subtitle="Business intelligence across revenue, customers, products, farm and operations." actions={<button onClick={() => pushToast("Executive report pack prepared.", "info")} className="btn btn-primary"><Download size={15} /> Export pack</button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue growth" value="+14.2%" icon={TrendingUp} tone="green" trend="+3.1%" />
        <StatCard label="Gross margin" value="33.9%" icon={BarChart3} tone="forest" trend="+1.4%" />
        <StatCard label="Repeat customers" value="42.8%" icon={Users} tone="blue" trend="+5.2%" />
        <StatCard label="Stock turnover" value="6.4×" icon={Boxes} tone="gold" />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Revenue trend (₦m)"><div className="flex h-56 items-end gap-4">{salesTrend.map((m) => <div key={m.month} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-full w-full items-end"><div className="w-full rounded-t-lg bg-gradient-to-t from-forest to-gold" style={{ height: `${(m.value / 9) * 100}%` }} /></div><span className="text-[0.7rem] text-muted">{m.month}</span></div>)}</div></Panel>
        <Panel title="Product profitability">
          <div className="space-y-4">{topProducts.map((p) => <div key={p.name}><div className="flex justify-between text-[0.76rem]"><span className="font-semibold text-forest">{p.name}</span><span className="text-muted">{naira(p.revenue)} · {p.share}% share</span></div><div className="mt-1.5"><ProgressBar value={p.share * 3} color="bg-gold" /></div></div>)}</div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[
          { icon: Users, title: "Customer insights", text: "Purchasing patterns, top accounts, overdue balances and retention." },
          { icon: Boxes, title: "Inventory insights", text: "Stock turnover, slow-moving products, expiry and valuation trends." },
          { icon: Truck, title: "Operational insights", text: "Delivery success, fulfilment time, supplier performance and discrepancies." },
        ].map(({ icon: Icon, title, text }) => <div key={title} className="card p-5"><Icon size={20} className="text-leaf" /><h3 className="mt-3 font-display text-[1.05rem] font-bold text-forest">{title}</h3><p className="mt-1.5 text-[0.78rem] text-muted">{text}</p></div>)}
      </div>
      <Link href="/portal/staff/reports" className="btn btn-outline mt-5">Open full report library →</Link>
    </PortalShell>
  );
}
