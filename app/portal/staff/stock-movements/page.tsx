"use client";

import { ArrowLeftRight, Plus, Filter } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { stockMovements } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

export default function StockMovementsPage() {
  const { pushToast } = useApp();
  return (
    <PortalShell section="staff" title="Stock Movements" subtitle="Complete audit of receipts, transfers, sales, mortality and adjustments." actions={<button onClick={() => pushToast("New movement form opened.", "info")} className="btn btn-primary"><Plus size={15} /> Record movement</button>}>
      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4"><Filter size={15} className="text-muted" /><select className="input w-auto"><option>All transaction types</option><option>Dispatch</option><option>GRN Receipt</option><option>Production Receipt</option><option>Mortality</option><option>Sales</option><option>Purchase Receipt</option></select><select className="input w-auto"><option>All approvals</option><option>Approved</option><option>Pending</option></select></div>
      <div className="card overflow-hidden">
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Reference</th><th>Date</th><th>Product</th><th>Type</th><th>Quantity</th><th>From</th><th>To</th><th>Employee</th><th>Approval</th></tr></thead>
          <tbody>{stockMovements.map((m) => (
            <tr key={m.ref}>
              <td className="font-bold text-forest">{m.ref}</td><td>{m.date}</td><td>{m.product}</td><td>{m.type}</td>
              <td className={`font-bold ${m.qty < 0 ? "text-red-600" : "text-leaf"}`}>{m.qty > 0 ? "+" : ""}{m.qty.toLocaleString()}</td>
              <td>{m.from}</td><td>{m.to}</td><td>{m.employee}</td>
              <td><Badge text={m.status} tone={m.status === "Approved" ? "green" : "gold"} /></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="mt-5 card flex items-start gap-3 p-5"><ArrowLeftRight size={18} className="mt-0.5 shrink-0 text-leaf" /><p className="text-[0.78rem] leading-relaxed text-muted">Every movement carries a unique reference, product, quantity, unit, source, destination, date, responsible employee, supporting document and approval status. Adjustments require authorisation and posted records are reversed rather than deleted.</p></div>
    </PortalShell>
  );
}
