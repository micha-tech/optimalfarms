"use client";

import { ScrollText, Download, Search } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";

const logs = [
  { at: "18 Nov 2026, 09:42", user: "Dr. Solomon Adeyemi", action: "Corporate account approved", entity: "CORP-0090", sensitivity: "Sensitive" },
  { at: "18 Nov 2026, 08:15", user: "Grace Adeleke", action: "Order status changed to Ready for Dispatch", entity: "ORF-261118-AX41", sensitivity: "Standard" },
  { at: "17 Nov 2026, 16:30", user: "Halima Sani", action: "Payment receipt posted", entity: "PAY-001842", sensitivity: "Financial" },
  { at: "17 Nov 2026, 14:10", user: "Amina Yusuf", action: "Stock adjustment submitted for approval", entity: "ADJ-0043", sensitivity: "Sensitive" },
  { at: "17 Nov 2026, 11:05", user: "Tunde Bakare", action: "Supplier bank detail change requested", entity: "SUP-0001", sensitivity: "Sensitive" },
  { at: "16 Nov 2026, 17:22", user: "Chinedu Balogun", action: "Price change recorded: Live Catfish ₦1,700 → ₦1,800", entity: "PRD-0004", sensitivity: "Financial" },
  { at: "16 Nov 2026, 09:00", user: "System", action: "Automated backup completed", entity: "BACKUP-1611", sensitivity: "System" },
];

export default function AuditPage() {
  const { pushToast } = useApp();
  return (
    <PortalShell section="admin" title="Audit Logs" subtitle="Immutable record of sensitive changes and transactions." actions={<button onClick={() => pushToast("Audit log export prepared.", "info")} className="btn btn-outline"><Download size={15} /> Export</button>}>
      <div className="card mb-5 flex items-center gap-3 p-4"><Search size={16} className="text-muted" /><input className="input" placeholder="Search by user, action or entity" /><select className="input w-auto"><option>All sensitivity levels</option><option>Sensitive</option><option>Financial</option><option>Standard</option><option>System</option></select></div>
      <div className="card overflow-hidden">
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Timestamp</th><th>User / system</th><th>Action</th><th>Entity</th><th>Classification</th></tr></thead>
          <tbody>{logs.map((l, i) => <tr key={i}><td>{l.at}</td><td className="font-bold text-forest">{l.user}</td><td>{l.action}</td><td>{l.entity}</td><td><Badge text={l.sensitivity} tone={l.sensitivity === "Sensitive" ? "red" : l.sensitivity === "Financial" ? "gold" : l.sensitivity === "System" ? "blue" : "grey"} /></td></tr>)}</tbody>
        </table></div>
      </div>
      <div className="mt-5 card flex items-start gap-3 p-5"><ScrollText size={18} className="shrink-0 text-leaf" /><p className="text-[0.78rem] leading-relaxed text-muted">Every sensitive change is recorded with user, timestamp, previous and new values, and supporting reference. Posted financial transactions are reversed rather than deleted. Auditors have read-only access to reports and transaction histories.</p></div>
    </PortalShell>
  );
}
