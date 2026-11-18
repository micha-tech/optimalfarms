"use client";

import { useState } from "react";
import { Truck, PackageCheck, MapPin, CheckCircle2, Camera, Clock3, AlertTriangle, Navigation, Upload } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { StatCard, Panel, Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { deliveryStages, stageIndex } from "@/lib/utils";
import type { Order } from "@/lib/types";

const buckets = [
  "Ready for Dispatch", "Driver Assigned", "Dispatched", "In Transit", "Out for Delivery", "Delivered", "Failed",
];

export default function DeliveryPage() {
  const { orders, updateOrderStatus, pushToast } = useApp();
  const [bucket, setBucket] = useState("All");
  const [pods, setPods] = useState<Record<string, boolean>>({});
  const filtered = orders.filter((o) => bucket === "All" || o.status === bucket);

  const advance = (order: Order) => {
    const i = stageIndex(order.status);
    const next = deliveryStages[Math.min(i + 1, deliveryStages.length - 1)] as Order["status"];
    updateOrderStatus(order.id, next, next === "Driver Assigned" ? "Driver: Musa Ibrahim — +234 805 220 1188" : undefined);
  };

  return (
    <PortalShell section="staff" title="Delivery & Logistics" subtitle="Assign drivers, monitor dispatches and capture proof of delivery.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Awaiting dispatch" value={orders.filter((o) => ["Ready for Dispatch", "Order Processing"].includes(o.status)).length} icon={PackageCheck} tone="gold" />
        <StatCard label="In transit" value={orders.filter((o) => ["Dispatched", "In Transit", "Out for Delivery"].includes(o.status)).length} icon={Truck} tone="blue" />
        <StatCard label="Completed deliveries" value={orders.filter((o) => o.status === "Delivered").length} icon={CheckCircle2} tone="green" />
        <StatCard label="Delivery success rate" value="96.8%" icon={Navigation} tone="forest" trend="+2.1%" />
      </div>

      <div className="card mt-5 flex flex-wrap gap-2 p-4">
        {["All", ...buckets].map((b) => <button key={b} onClick={() => setBucket(b)} className={`btn btn-sm ${bucket === b ? "btn-primary" : "btn-outline"}`}>{b}</button>)}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="card overflow-hidden">
          <div className="table-wrap"><table className="data">
            <thead><tr><th>Delivery ref</th><th>Order</th><th>Customer</th><th>Address</th><th>Method</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map((o) => (
              <tr key={o.id}>
                <td className="font-bold text-forest">DEL-{o.reference.slice(-6)}</td><td>{o.reference}</td><td>{o.customerName}</td>
                <td className="max-w-[170px] truncate">{o.address ? `${o.address.city}, ${o.address.state}` : "—"}</td><td>{o.deliveryMethod}</td>
                <td><Badge text={o.status} tone={o.status === "Delivered" ? "green" : "gold"} /></td>
                <td><button onClick={() => advance(o)} disabled={o.status === "Delivered" || o.status === "Cancelled"} className="btn btn-outline btn-sm">Advance →</button></td>
              </tr>
            ))}{filtered.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-muted">No deliveries in this stage.</td></tr>}</tbody>
          </table></div>
        </div>

        <div className="space-y-5">
          <Panel title="Proof of delivery" subtitle="Required before an order can be marked Delivered">
            <div className="space-y-3">
              {[
                { icon: Camera, label: "Delivery photograph", done: true },
                { icon: CheckCircle2, label: "Recipient name & phone", done: true },
                { icon: Clock3, label: "Delivery date & time", done: true },
                { icon: MapPin, label: "Signature or OTP confirmation", done: false },
                { icon: AlertTriangle, label: "Shortage / damage notes", done: false },
              ].map(({ icon: Icon, label, done }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-[#e9eeea] p-2.5"><Icon size={16} className={done ? "text-leaf" : "text-muted"} /><span className="flex-1 text-[0.76rem] text-[#45534b]">{label}</span><Badge text={done ? "Captured" : "Pending"} tone={done ? "green" : "gold"} /></div>
              ))}
            </div>
            <button onClick={() => pushToast("Driver proof-of-delivery portal opened (mobile-friendly).", "info")} className="btn btn-primary mt-4 w-full"><Upload size={15} /> Open driver interface</button>
          </Panel>
          <Panel title="Delivery map">
            <div className="grid h-40 place-items-center rounded-lg bg-[#e8efe9] text-center text-forest/45"><div><Navigation size={28} className="mx-auto" /><p className="mt-2 text-[0.72rem] font-semibold">Live GPS view</p><p className="text-[0.65rem]">Available with logistics partner integration</p></div></div>
          </Panel>
        </div>
      </div>
    </PortalShell>
  );
}
