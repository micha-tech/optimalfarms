"use client";

import { useState } from "react";
import { Search, Plus, Download, AlertTriangle, Boxes, Warehouse, TrendingUp } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge, StatCard } from "@/components/portals/UI";
import { inventory } from "@/lib/data";
import { naira } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

export default function InventoryPage() {
  const { pushToast } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = inventory.filter((i) =>
    (filter === "All" || i.status === filter) &&
    `${i.product} ${i.sku} ${i.location}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalShell section="staff" title="Inventory" subtitle="Stock quantities, valuation, locations and reorder alerts." actions={<button onClick={() => pushToast("New stock receipt form would open here.", "info")} className="btn btn-primary"><Plus size={15} /> New receipt</button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total stock value" value={naira(inventory.reduce((s, i) => s + i.value, 0))} icon={TrendingUp} tone="forest" />
        <StatCard label="Tracked items" value={inventory.length} icon={Boxes} tone="green" />
        <StatCard label="Low stock" value={inventory.filter((i) => i.status === "Low stock").length} icon={AlertTriangle} tone="red" />
        <StatCard label="Warehouses / locations" value={new Set(inventory.map((i) => i.location)).size} icon={Warehouse} tone="blue" />
      </div>

      <div className="card mt-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input pl-9" placeholder="Search product, SKU or location" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Healthy</option><option>Low stock</option></select>
        <button onClick={() => pushToast("Inventory valuation report prepared.", "info")} className="btn btn-outline"><Download size={15} /> Export</button>
      </div>

      <div className="card mt-5 overflow-hidden">
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Product</th><th>SKU</th><th>Location</th><th>Quantity</th><th>Reorder level</th><th>Stock value</th><th>Status</th><th></th></tr></thead>
          <tbody>{rows.map((i) => (
            <tr key={i.sku}>
              <td className="font-bold text-forest">{i.product}</td><td className="text-[0.74rem] text-muted">{i.sku}</td><td>{i.location}</td>
              <td className="font-bold">{i.qty.toLocaleString()} {i.unit}</td><td>{i.reorder.toLocaleString()} {i.unit}</td><td className="font-bold text-forest">{naira(i.value)}</td>
              <td><Badge text={i.status} tone={i.status === "Healthy" ? "green" : "red"} /></td>
              <td><button onClick={() => pushToast(`Stock card for ${i.product} opened.`, "info")} className="text-[0.74rem] font-bold text-leaf">View card</button></td>
            </tr>
          ))}{rows.length === 0 && <tr><td colSpan={8} className="py-10 text-center text-muted">No inventory items match your filters.</td></tr>}</tbody>
        </table></div>
      </div>
      <p className="mt-4 text-[0.72rem] text-muted">Inventory is valued using the configured costing method (FIFO / weighted average). Every movement is traceable by reference, source, destination and responsible employee.</p>
    </PortalShell>
  );
}
