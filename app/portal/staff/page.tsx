"use client";

import Link from "next/link";
import { ShoppingBag, ClipboardList, Boxes, Wallet, Truck, TrendingUp, AlertTriangle, Clock3, PackageCheck, Banknote, BarChart3, Sprout } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { StatCard, Panel, TablePanel, Badge, ProgressBar } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { inventory, salesTrend, stockMovements, purchaseOrders, topProducts } from "@/lib/data";
import { naira, shortDate } from "@/lib/utils";

export default function StaffDashboard() {
  const { orders, notifications } = useApp();
  const lowStock = inventory.filter((i) => i.status === "Low stock");
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <PortalShell section="staff" title="Staff Dashboard" subtitle="Today's sales, orders, inventory, finance and operations at a glance." actions={<Link href="/portal/staff/reports" className="btn btn-outline"><BarChart3 size={15} /> Full reports</Link>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's sales" value={naira(1_840_500)} icon={TrendingUp} tone="green" trend="+12.4%" />
        <StatCard label="Month-to-date sales" value={naira(8_420_000)} icon={ShoppingBag} tone="forest" trend="+8.1%" />
        <StatCard label="New orders" value={orders.filter((o) => o.status === "Order Placed").length + 3} icon={ClipboardList} tone="gold" hint="Awaiting confirmation" />
        <StatCard label="Low-stock items" value={lowStock.length} icon={AlertTriangle} tone="red" hint="Reorder attention needed" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <Panel title="Sales trend" subtitle="Revenue by month (₦ millions)" action={<select className="input w-auto py-1.5 text-[0.74rem]"><option>Last 6 months</option><option>This year</option><option>Last 12 months</option></select>}>
          <div className="flex h-52 items-end gap-4 px-2">
            {salesTrend.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end"><div className="w-full rounded-t-lg bg-gradient-to-t from-leaf to-[#65b98a] transition-all hover:from-forest" style={{ height: `${(m.value / 9) * 100}%` }} title={`₦${m.value}m`} /></div>
                <span className="text-[0.7rem] font-bold text-muted">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#edf1ed] pt-4 text-center">
            {[["Weekly sales", naira(1_240_000)], ["YTD sales", naira(38_640_000)], ["Avg. order value", naira(184_000)]].map(([k, v]) => <div key={k}><p className="text-[0.68rem] text-muted">{k}</p><p className="text-[0.85rem] font-bold text-forest">{v}</p></div>)}
          </div>
        </Panel>

        <Panel title="Pending actions" subtitle="Items that need attention">
          <div className="space-y-2">
            {[
              { icon: ClipboardList, label: "Orders awaiting confirmation", value: 3, href: "/portal/staff/orders", tone: "gold" },
              { icon: Truck, label: "Orders awaiting dispatch", value: 2, href: "/portal/staff/delivery", tone: "blue" },
              { icon: AlertTriangle, label: "Low stock alerts", value: lowStock.length, href: "/portal/staff/inventory", tone: "red" },
              { icon: Banknote, label: "Payments pending reconciliation", value: 4, href: "/portal/staff/finance/payments", tone: "green" },
              { icon: PackageCheck, label: "Purchase orders awaiting approval", value: 1, href: "/portal/staff/procurement/orders", tone: "forest" },
            ].map(({ icon: Icon, label, value, href, tone }) => (
              <Link key={label} href={href} className="flex items-center gap-3 rounded-lg border border-[#e9eeea] p-3 hover:border-leaf">
                <span className={`stat-icon ${tone === "gold" ? "bg-gold-light text-[#96710f]" : tone === "blue" ? "bg-[#e5f0fb] text-[#235d94]" : tone === "red" ? "bg-[#fee9e7] text-[#b2382b]" : tone === "green" ? "bg-leaf-light text-leaf" : "bg-forest text-gold"}`}><Icon size={16} /></span>
                <span className="flex-1 text-[0.76rem] font-semibold text-[#45534b]">{label}</span>
                <span className="font-display text-lg font-bold text-forest">{value}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <TablePanel
          title="Recent orders" subtitle="Latest customer orders across all channels" action={<Link href="/portal/staff/orders" className="text-[0.76rem] font-bold text-leaf">View all →</Link>}
          head={["Reference", "Customer", "Date", "Amount", "Payment", "Status"]}
          rows={orders.slice(0, 6).map((o) => [
            <span key="r" className="font-bold text-forest">{o.reference}</span>, o.customerName, shortDate(o.createdAt), naira(o.total),
            <Badge key="p" text={o.paymentStatus} tone={o.paymentStatus === "Paid" ? "green" : "blue"} />,
            <Badge key="s" text={o.status} tone={o.status === "Delivered" ? "green" : "gold"} />,
          ])}
        />
        <div className="space-y-5">
          <Panel title="Inventory health">
            <div className="space-y-3">
              {[["Total stock value", naira(inventory.reduce((s, i) => s + i.value, 0)), "bg-leaf"], ["Low-stock items", `${lowStock.length} items`, "bg-gold"], ["Out of stock", "0 items", "bg-red-500"], ["Stock accuracy", "98.4%", "bg-blue-500"]].map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between border-b border-[#edf1ed] pb-2 text-[0.78rem]"><span className="text-muted">{k}</span><span className="font-bold text-forest">{v}</span></div>
              ))}
            </div>
            <div className="mt-4"><ProgressBar value={82} label="Stock valuation completeness" /></div>
            <Link href="/portal/staff/inventory" className="btn btn-outline btn-sm mt-4 w-full">Open inventory</Link>
          </Panel>
          <Panel title="Top products by revenue">
            <div className="space-y-3">{topProducts.slice(0, 5).map((p) => (
              <div key={p.name}><div className="mb-1 flex justify-between text-[0.74rem]"><span className="font-semibold text-forest">{p.name}</span><span className="text-muted">{naira(p.revenue)}</span></div><ProgressBar value={p.share * 3} color="bg-gold" /></div>
            ))}</div>
          </Panel>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <TablePanel title="Latest stock movements" head={["Ref", "Product", "Type", "Qty"]} rows={stockMovements.slice(0, 4).map((m) => [m.ref, m.product, m.type, <span key="q" className={m.qty < 0 ? "text-red-600" : "text-leaf"}>{m.qty > 0 ? "+" : ""}{m.qty}</span>])} />
        <TablePanel title="Purchase orders" head={["PO", "Supplier", "Total", "Status"]} rows={purchaseOrders.slice(0, 4).map((p) => [p.po, p.supplier, naira(p.total), <Badge key="s" text={p.status} tone={p.status === "Received" ? "green" : "gold"} />])} />
        <Panel title="Recent notifications">
          <div className="space-y-3">{notifications.slice(0, 4).map((n) => (
            <div key={n.id} className="border-b border-[#edf1ed] pb-2 last:border-0"><p className="text-[0.76rem] font-bold text-forest">{n.title}</p><p className="text-[0.7rem] text-muted">{n.body}</p></div>
          ))}</div>
        </Panel>
      </div>
    </PortalShell>
  );
}
