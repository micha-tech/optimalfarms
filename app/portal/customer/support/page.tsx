"use client";

import { useState } from "react";
import { MessageSquare, AlertTriangle, CheckCircle2, Send, LifeBuoy } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { shortDate } from "@/lib/utils";

const tickets = [
  { id: "TKT-1042", subject: "Shortage in smoked catfish order", date: "2026-11-10T10:00:00.000Z", status: "Resolved", priority: "High" },
  { id: "TKT-1038", subject: "Request to change delivery address", date: "2026-11-04T14:30:00.000Z", status: "Closed", priority: "Medium" },
];

export default function SupportPage() {
  const { pushToast } = useApp();
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState("Damaged products");

  return (
    <PortalShell section="customer" title="Support / Complaints" subtitle="Report an issue and track its resolution.">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <div className="flex items-center gap-2"><LifeBuoy size={19} className="text-leaf" /><h3 className="font-display text-xl font-bold text-forest">Open a support ticket</h3></div>
          {sent ? (
            <div className="mt-6 grid place-items-center rounded-xl bg-leaf-light p-8 text-center"><CheckCircle2 size={30} className="text-leaf" /><p className="mt-3 font-display text-lg font-bold text-forest">Ticket submitted</p><p className="mt-1 text-[0.8rem] text-muted">Our customer service team has been notified and will respond shortly.</p><button onClick={() => setSent(false)} className="btn btn-outline mt-4">Submit another</button></div>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); pushToast("Support ticket created."); }}>
              <div><label className="field">Issue type</label><select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>{["Damaged products", "Wrong products delivered", "Quantity shortage", "Delayed delivery", "Product quality issue", "Payment issue", "Other enquiry"].map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className="field">Order reference (if applicable)</label><input className="input" placeholder="ORF-261100-XXXX" /></div>
              <div><label className="field">Describe the issue</label><textarea className="input" required placeholder="Tell us what happened so we can help..." /></div>
              <div><label className="field">Attach photos (optional)</label><input type="file" multiple accept=".jpg,.jpeg,.png,.pdf" className="input text-[0.75rem]" /></div>
              <p className="text-[0.72rem] text-muted">Returns, refunds and replacements follow approved company policies and product-specific rules, especially for live animals and perishable goods.</p>
              <button className="btn btn-primary w-full"><Send size={15} /> Submit Ticket</button>
            </form>
          )}
        </div>
        <div className="space-y-5">
          <div className="card overflow-hidden">
            <div className="border-b border-[#edf1ed] px-5 py-4"><h3 className="font-display text-lg font-bold text-forest">Your tickets</h3></div>
            <div className="divide-y divide-[#edf1ed]">
              {tickets.map((t) => (
                <div key={t.id} className="p-4">
                  <div className="flex items-center justify-between gap-2"><p className="text-[0.82rem] font-bold text-forest">{t.subject}</p><Badge text={t.status} tone={t.status === "Resolved" ? "green" : "grey"} /></div>
                  <p className="mt-1 text-[0.7rem] text-muted">{t.id} · {shortDate(t.date)} · Priority: {t.priority}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-display text-lg font-bold text-forest">Need a faster answer?</h3>
            <p className="mt-2 text-[0.8rem] text-muted">Our team is available by phone, email and WhatsApp during business hours.</p>
            <div className="mt-4 space-y-2 text-[0.78rem] text-[#45534b]">
              <p className="flex items-center gap-2"><MessageSquare size={14} className="text-leaf" /> WhatsApp: +234 803 000 1122</p>
              <p className="flex items-center gap-2"><AlertTriangle size={14} className="text-gold" /> Urgent order issues: +234 805 000 3344</p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
