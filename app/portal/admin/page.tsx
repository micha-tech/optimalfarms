"use client";

import Link from "next/link";
import { DollarSign, TrendingUp, TrendingDown, Wallet, Users, Building2, Boxes, ClipboardList, Truck, AlertTriangle, ArrowRight, Activity } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { StatCard, Panel, TablePanel, Badge, ProgressBar } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { inventory, salesTrend, topProducts, staffMembers } from "@/lib/data";
import { naira, shortDate } from "@/lib/utils";

export default function AdminDashboard() {
  const { orders, notifications } = useApp();
  return (
    <PortalShell section="admin" title="Business Overview" subtitle="Complete operational and financial position of the business." actions={<Link href="/portal/admin/reports" className="btn btn-outline"><Activity size={15} /> Analytics</Link>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total revenue" value={naira(38_640_000)} icon={DollarSign} tone="forest" trend="+14.2%" />
        <StatCard label="Gross profit" value={naira(13_120_000)} icon={TrendingUp} tone="green" trend="+9.6%" />
        <StatCard label="Operating expenses" value={naira(6_480_000)} icon={TrendingDown} tone="red" />
        <StatCard label="Net profit" value={naira(6_640_000)} icon={Wallet} tone="gold" trend="+11.8%" />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cash & bank balances" value={naira(18_420_000)} icon={Wallet} tone="blue" />
        <StatCard label="Total receivables" value={naira(12_840_000)} icon={ClipboardList} tone="gold" />
        <StatCard label="Total payables" value={naira(4_310_000)} icon={TrendingDown} tone="red" />
        <StatCard label="Inventory value" value={naira(inventory.reduce((s, i) => s + i.value, 0))} icon={Boxes} tone="green" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Panel title="Business performance" subtitle="Monthly revenue trend (₦ millions)">
          <div className="flex h-52 items-end gap-4">{salesTrend.map((m) => <div key={m.month} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-full w-full items-end"><div className="w-full rounded-t-lg bg-gradient-to-t from-forest to-gold/70" style={{ height: `${(m.value / 9) * 100}%` }} /></div><span className="text-[0.7rem] font-bold text-muted">{m.month}</span></div>)}</div>
        </Panel>
        <Panel title="Pending approvals" subtitle="Items requiring management attention">
          <div className="space-y-2">
            {[
              { icon: Building2, label: "Corporate registrations", value: 2, href: "/portal/admin/approvals" },
              { icon: Users, label: "Credit applications", value: 1, href: "/portal/admin/approvals" },
              { icon: ClipboardList, label: "Purchase orders", value: 1, href: "/portal/staff/procurement/orders" },
              { icon: AlertTriangle, label: "Discount exceptions", value: 2, href: "/portal/admin/approvals" },
              { icon: Truck, label: "Delivery exceptions", value: 1, href: "/portal/staff/delivery" },
            ].map(({ icon: Icon, label, value, href }) => <Link key={label} href={href} className="flex items-center gap-3 rounded-lg border border-[#e9eeea] p-3 hover:border-leaf"><Icon size={16} className="text-leaf" /><span className="flex-1 text-[0.76rem] font-semibold text-[#45534b]">{label}</span><span className="font-display text-lg font-bold text-forest">{value}</span></Link>)}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="Customer performance">
          <div className="grid grid-cols-2 gap-3">{[["Registered customers", "1,248"], ["Individual", "1,106"], ["Corporate", "142"], ["Pending verification", "2"], ["Credit approved", "28"], ["Overdue balances", "6"]].map(([k, v]) => <div key={k} className="rounded-lg bg-[#f7faf7] p-3"><p className="text-[0.65rem] text-muted">{k}</p><p className="mt-1 font-display text-lg font-bold text-forest">{v}</p></div>)}</div>
        </Panel>
        <Panel title="Product performance">
          <div className="space-y-3">{topProducts.slice(0, 4).map((p) => <div key={p.name}><div className="flex justify-between text-[0.72rem]"><span className="font-semibold text-forest">{p.name}</span><span className="text-muted">{naira(p.revenue)}</span></div><div className="mt-1 h-2 rounded-full bg-[#edf1ed]"><div className="h-full rounded-full bg-leaf" style={{ width: `${p.share * 3}%` }} /></div></div>)}</div>
          <div className="divider my-4" /><p className="text-[0.72rem] text-muted">Below reorder level: <strong className="text-red-600">3 products</strong></p>
        </Panel>
        <Panel title="Operational performance">
          <div className="space-y-3">{[["Orders processed", 486, "bg-leaf"], ["Delivery success rate", 96.8, "bg-gold"], ["Stock accuracy", 98.4, "bg-blue-500"], ["Supplier on-time rate", 91.2, "bg-forest"]].map(([k, v, c]) => <div key={k as string}><ProgressBar value={v as number} color={c as string} label={`${k} ${k === "Orders processed" ? "" : "%"}`} /></div>)}</div>
          <p className="mt-4 text-[0.7rem] text-muted">Average fulfilment time: <strong className="text-forest">1.8 days</strong></p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <TablePanel title="Recent orders" head={["Reference", "Customer", "Date", "Total", "Status"]} rows={orders.slice(0, 5).map((o) => [<span key="r" className="font-bold text-forest">{o.reference}</span>, o.customerName, shortDate(o.createdAt), naira(o.total), <Badge key="s" text={o.status} tone={o.status === "Delivered" ? "green" : "gold"} />])} />
        <Panel title="Farm performance & team">
          <div className="grid grid-cols-2 gap-3">{[["Poultry mortality", "1.2%"], ["Fish mortality", "2.4%"], ["Feed consumption", "18.4 t"], ["Production cost", "₦9.2m"]].map(([k, v]) => <div key={k} className="rounded-lg bg-[#f7faf7] p-3"><p className="text-[0.65rem] text-muted">{k}</p><p className="mt-1 font-display text-lg font-bold text-forest">{v}</p></div>)}</div>
          <div className="divider my-4" />
          <p className="mb-2 text-[0.72rem] font-bold text-forest">Active staff ({staffMembers.length} shown)</p>
          <div className="flex flex-wrap gap-1.5">{staffMembers.slice(0, 6).map((s) => <span key={s.name} className="badge badge-grey">{s.name}</span>)}</div>
          <Link href="/portal/admin/users" className="btn btn-outline btn-sm mt-4 w-full">Manage users & permissions <ArrowRight size={13} /></Link>
        </Panel>
      </div>
      <div className="mt-5 card flex items-center gap-3 p-4"><AlertTriangle size={17} className="text-gold" /><p className="text-[0.76rem] text-muted">You have <strong className="text-forest">{notifications.filter((n) => !n.read).length} unread notifications</strong>. Review approvals and audit activity regularly to maintain internal controls.</p></div>
    </PortalShell>
  );
}
