"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Upload, Download, FileText, Truck, PackageCheck, Wallet, Receipt, Store, ShieldCheck } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Panel, Badge, TablePanel } from "@/components/portals/UI";
import { purchaseOrders } from "@/lib/data";
import { naira } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

const titles: Record<string, { title: string; subtitle: string; icon: React.ElementType }> = {
  "purchase-orders": { title: "Purchase Orders", subtitle: "View and acknowledge orders issued to your business", icon: FileText },
  deliveries: { title: "Delivery Confirmations", subtitle: "Confirm dispatch and expected delivery dates", icon: Truck },
  invoices: { title: "Upload Invoices", subtitle: "Submit invoices and delivery documents", icon: Upload },
  grn: { title: "Goods Received Status", subtitle: "View GRN and inspection outcomes", icon: PackageCheck },
  payments: { title: "Payment Status", subtitle: "Track approved invoices and payments", icon: Wallet },
  statements: { title: "Statements", subtitle: "Your account statement with Optimal Royal", icon: Receipt },
  profile: { title: "Profile & Documents", subtitle: "Business details and verification documents", icon: Store },
};

export default function SupplierModulePage() {
  const params = useParams<{ slug: string[] }>();
  const key = (params.slug ?? []).join("/");
  const cfg = titles[key] ?? titles["purchase-orders"];
  const { pushToast } = useApp();
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <PortalShell section="supplier" title={cfg.title} subtitle={cfg.subtitle}>
      {key === "purchase-orders" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">{[["Open POs", 2], ["Confirmed", 1], ["Total value", naira(purchaseOrders.reduce((s, p) => s + p.total, 0))]].map(([k, v]) => <div key={k} className="card p-4"><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{k}</p><p className="mt-2 font-display text-xl font-bold text-forest">{v}</p></div>)}</div>
          <div className="card mt-5 overflow-hidden"><div className="table-wrap"><table className="data">
            <thead><tr><th>PO number</th><th>Date</th><th>Items</th><th>Total</th><th>Delivery</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{purchaseOrders.map((p) => <tr key={p.po}><td className="font-bold text-forest">{p.po}</td><td>{p.date}</td><td>{p.items}</td><td className="font-bold">{naira(p.total)}</td><td>Farm warehouse</td><td><Badge text={acknowledged.includes(p.po) ? "Acknowledged" : p.status} tone={acknowledged.includes(p.po) ? "green" : "gold"} /></td><td><button disabled={acknowledged.includes(p.po)} onClick={() => { setAcknowledged([...acknowledged, p.po]); pushToast(`${p.po} acknowledged.`); }} className="btn btn-outline btn-sm">Acknowledge</button></td></tr>)}</tbody>
          </table></div></div>
        </>
      )}

      {key === "deliveries" && (
        <Panel title="Delivery confirmations" subtitle="Confirm your dispatch schedule">
          <div className="space-y-3">{[["PO-2026-0142", "Poultry Feed × 120 bags", "Expected 22 Nov 2026"], ["PO-2026-0141", "Day-Old Chicks × 500", "Expected 24 Nov 2026"]].map(([po, item, date]) => (
            <div key={po} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e9eeea] p-4"><div><p className="text-[0.82rem] font-bold text-forest">{po} — {item}</p><p className="text-[0.72rem] text-muted">{date}</p></div><button onClick={() => pushToast(`${po} delivery date confirmed.`, "success")} className="btn btn-primary btn-sm"><CheckCircle2 size={14} /> Confirm date</button></div>
          ))}</div>
        </Panel>
      )}

      {key === "invoices" && (
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel title="Submit a supplier invoice">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); pushToast("Supplier invoice submitted for verification."); setFiles([]); }}>
              <div><label className="field">Purchase order reference</label><select className="input"><option>PO-2026-0142</option><option>PO-2026-0141</option><option>PO-2026-0139</option></select></div>
              <div className="grid gap-4 sm:grid-cols-2"><div><label className="field">Invoice number</label><input className="input" required placeholder="SUP-INV-0000" /></div><div><label className="field">Invoice amount (₦)</label><input type="number" className="input" required placeholder="0.00" /></div></div>
              <div><label className="field">Invoice date</label><input type="date" className="input" required /></div>
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#ccd9cf] bg-[#fafcf9] p-7 text-center hover:border-leaf"><Upload size={24} className="text-leaf" /><span className="text-[0.8rem] font-bold text-forest">Upload invoice / delivery document</span><span className="text-[0.7rem] text-muted">PDF, JPG or PNG</span><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} /></label>
              {files.map((f) => <p key={f} className="text-[0.72rem] text-leaf">{f}</p>)}
              <p className="text-[0.72rem] text-muted">Invoices are verified against the purchase order and GRN before approval (three-way matching).</p>
              <button className="btn btn-primary w-full"><Upload size={15} /> Submit Invoice</button>
            </form>
          </Panel>
          <Panel title="Submitted invoices"><div className="space-y-3">{[["SUP-INV-0182", "₦1,860,000", "Approved"], ["SUP-INV-0176", "₦625,000", "Under verification"], ["SUP-INV-0169", "₦780,000", "Paid"]].map(([n, a, s]) => <div key={n} className="flex items-center justify-between rounded-lg border border-[#edf1ed] p-3"><div><p className="text-[0.8rem] font-bold text-forest">{n}</p><p className="text-[0.72rem] text-muted">{a}</p></div><Badge text={s} tone={s === "Paid" || s === "Approved" ? "green" : "gold"} /></div>)}</div></Panel>
        </div>
      )}

      {key === "grn" && (
        <TablePanel title="Goods received notes" head={["GRN", "PO reference", "Date", "Received", "Rejected", "Condition", "Status"]} rows={[
          ["GRN-0261", "PO-2026-0142", "12 Nov 2026", "120 bags", "0", "Good", <Badge key="a" text="Confirmed" tone="green" />],
          ["GRN-0259", "PO-2026-0141", "10 Nov 2026", "350 chicks", "12", "Fair", <Badge key="b" text="Partial" tone="gold" />],
          ["GRN-0254", "PO-2026-0138", "28 Oct 2026", "200 cartons", "0", "Good", <Badge key="c" text="Confirmed" tone="green" />],
        ]} />
      )}

      {key === "payments" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">{[["Approved invoices", naira(3_265_000)], ["Paid to date", naira(815_000)], ["Outstanding", naira(2_450_000)]].map(([k, v]) => <div key={k} className="card p-4"><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{k}</p><p className="mt-2 font-display text-xl font-bold text-forest">{v}</p></div>)}</div>
          <div className="mt-5"><TablePanel title="Payment history" head={["Payment advice", "Invoice", "Date", "Amount", "Status"]} rows={[
            ["ADV-0082", "SUP-INV-0169", "10 Oct 2026", naira(780_000), <Badge key="a" text="Paid" tone="green" />],
            ["ADV-0078", "SUP-INV-0164", "18 Sep 2026", naira(1_120_000), <Badge key="b" text="Paid" tone="green" />],
            ["ADV-0086", "SUP-INV-0182", "28 Nov 2026", naira(1_120_000), <Badge key="c" text="Scheduled" tone="gold" />],
          ]} /></div>
        </>
      )}

      {key === "statements" && (
        <Panel title="Supplier statement" subtitle="As at 18 November 2026" action={<button onClick={() => pushToast("Statement downloaded.", "info")} className="btn btn-outline btn-sm"><Download size={14} /> Download</button>}>
          <div className="table-wrap"><table className="data"><thead><tr><th>Date</th><th>Transaction</th><th>Reference</th><th>Invoice</th><th>Payment</th><th>Balance</th></tr></thead><tbody>
            <tr><td>01 Oct 2026</td><td>Opening balance</td><td>—</td><td>—</td><td>—</td><td className="font-bold">₦0</td></tr>
            <tr><td>12 Oct 2026</td><td>Supplier invoice</td><td>SUP-INV-0169</td><td>₦780,000</td><td>—</td><td>₦780,000</td></tr>
            <tr><td>10 Nov 2026</td><td>Payment received</td><td>ADV-0082</td><td>—</td><td>₦780,000</td><td>₦0</td></tr>
            <tr><td>14 Nov 2026</td><td>Supplier invoice</td><td>SUP-INV-0182</td><td>₦1,860,000</td><td>—</td><td>₦1,860,000</td></tr>
            <tr className="bg-[#f7faf7]"><td colSpan={5} className="font-bold text-forest">Closing balance</td><td className="font-display text-lg font-bold text-forest">₦1,860,000</td></tr>
          </tbody></table></div>
        </Panel>
      )}

      {key === "profile" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title="Business profile"><div className="space-y-3 text-[0.78rem]">{[["Supplier name", "GreenField Agro Supplies"], ["Contact person", "Mrs. Lara Adeniran"], ["Phone", "+234 805 777 8899"], ["Email", "sales@greenfieldagro.ng"], ["Categories", "Feeds & Equipment"], ["Payment terms", "Net 30"], ["Verification status", "Approved"]].map(([k, v]) => <div key={k} className="flex justify-between border-b border-[#edf1ed] pb-2"><span className="text-muted">{k}</span><span className="font-bold text-forest">{v}</span></div>)}</div><button onClick={() => pushToast("Profile update request submitted for verification.", "info")} className="btn btn-outline btn-sm mt-4">Request profile update</button></Panel>
          <Panel title="Documents & bank details"><div className="space-y-2">{[["CAC certificate", "Verified"], ["TIN evidence", "Verified"], ["Bank account details", "Verified"]].map(([n, s]) => <div key={n} className="flex items-center justify-between rounded-lg bg-[#f7faf7] p-3 text-[0.78rem]"><span className="font-semibold text-forest">{n}</span><Badge text={s} tone="green" /></div>)}</div><div className="mt-4 flex gap-2 rounded-lg bg-gold-light p-3 text-[0.74rem] text-[#72580c]"><ShieldCheck size={15} className="shrink-0" /> Bank account changes require verification and approval before they take effect.</div><label className="btn btn-outline mt-4 w-full"><Upload size={14} /> Upload document<input type="file" className="hidden" onChange={() => pushToast("Document uploaded for review.", "info")} /></label></Panel>
        </div>
      )}
    </PortalShell>
  );
}
