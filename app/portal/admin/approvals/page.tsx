"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, FileWarning, Clock3, ShieldCheck } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge, Panel } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";

const corporate = [
  { id: "CORP-0092", name: "Savannah Hotels Limited", cac: "RC 1839201", tin: "12345678-0001", date: "16 Nov 2026", docs: 4 },
  { id: "CORP-0091", name: "Northwind Retail Ltd", cac: "RC 2091184", tin: "88771234-0001", date: "14 Nov 2026", docs: 3 },
];

const exceptions = [
  { id: "EXP-0021", type: "Discount exception", detail: "15% discount requested on order ORF-261112-BY08 (limit 10%)", by: "Grace Adeleke", date: "18 Nov 2026" },
  { id: "EXP-0020", type: "Credit limit exception", detail: "Order exceeds approved credit limit by ₦420,000", by: "Sales Representative", date: "17 Nov 2026" },
  { id: "EXP-0019", type: "Supplier bank change", detail: "GreenField Agro Supplies — bank account detail change", by: "Tunde Bakare", date: "16 Nov 2026" },
];

export default function ApprovalsPage() {
  const { pushToast } = useApp();
  const [resolved, setResolved] = useState<string[]>([]);
  const act = (id: string, action: string) => { setResolved([...resolved, id]); pushToast(`${id}: ${action}`, "success"); };

  return (
    <PortalShell section="admin" title="Approvals" subtitle="Review corporate registrations, credit exceptions and sensitive changes.">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Pending corporate registrations" subtitle="CAC documents and business details awaiting verification">
          <div className="space-y-3">{corporate.map((c) => (
            <div key={c.id} className={`rounded-xl border border-[#e9eeea] p-4 ${resolved.includes(c.id) ? "opacity-50" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-display text-[1.05rem] font-bold text-forest">{c.name}</p><p className="text-[0.7rem] text-muted">{c.id} · submitted {c.date}</p></div><Badge text="Pending Verification" tone="gold" /></div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[0.72rem]"><div className="rounded-lg bg-[#f7faf7] p-2"><p className="text-muted">CAC number</p><p className="font-bold text-forest">{c.cac}</p></div><div className="rounded-lg bg-[#f7faf7] p-2"><p className="text-muted">TIN</p><p className="font-bold text-forest">{c.tin}</p></div><div className="rounded-lg bg-[#f7faf7] p-2"><p className="text-muted">Documents</p><p className="font-bold text-forest">{c.docs} files</p></div></div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button disabled={resolved.includes(c.id)} onClick={() => act(c.id, "approved")} className="btn btn-primary btn-sm"><CheckCircle2 size={13} /> Approve</button>
                <button disabled={resolved.includes(c.id)} onClick={() => act(c.id, "additional documents requested")} className="btn btn-outline btn-sm"><FileWarning size={13} /> Request documents</button>
                <button disabled={resolved.includes(c.id)} onClick={() => act(c.id, "rejected")} className="btn btn-ghost btn-sm text-red-600"><XCircle size={13} /> Reject</button>
                <button disabled={resolved.includes(c.id)} onClick={() => act(c.id, "suspended")} className="btn btn-ghost btn-sm"><ShieldCheck size={13} /> Suspend</button>
              </div>
            </div>
          ))}</div>
        </Panel>
        <Panel title="Management exceptions" subtitle="Requests outside approved limits">
          <div className="space-y-3">{exceptions.map((e) => (
            <div key={e.id} className={`rounded-xl border border-[#e9eeea] p-4 ${resolved.includes(e.id) ? "opacity-50" : ""}`}>
              <div className="flex items-center justify-between gap-2"><p className="text-[0.82rem] font-bold text-forest">{e.type}</p><Badge text="Awaiting decision" tone="gold" /></div>
              <p className="mt-1.5 text-[0.76rem] text-[#4c5a52]">{e.detail}</p>
              <p className="mt-1 text-[0.68rem] text-muted">Raised by {e.by} · {e.date} · {e.id}</p>
              <div className="mt-3 flex gap-2"><button disabled={resolved.includes(e.id)} onClick={() => act(e.id, "exception approved")} className="btn btn-primary btn-sm">Approve</button><button disabled={resolved.includes(e.id)} onClick={() => act(e.id, "exception declined")} className="btn btn-outline btn-sm">Decline</button></div>
            </div>
          ))}</div>
          <div className="mt-4 flex gap-2 rounded-lg bg-gold-light p-3 text-[0.75rem] text-[#72580c]"><Clock3 size={15} className="shrink-0" /> Exceptions are logged in the audit trail with the deciding administrator and timestamp.</div>
        </Panel>
      </div>
    </PortalShell>
  );
}
