"use client";

import { Download, FileText } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Panel } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";
import { naira, shortDate } from "@/lib/utils";

export default function StatementsPage() {
  const { orders, user, pushToast } = useApp();
  const mine = orders.filter((o) => !user || o.customerEmail === user.email || o.customerId === user.id);
  let running = 0;
  const rows = mine.map((o) => {
    const debit = o.paymentStatus === "Credit Approved" ? o.total : 0;
    const credit = o.paymentStatus === "Paid" ? o.total : 0;
    running += debit - credit;
    return { o, debit, credit, balance: running };
  });

  return (
    <PortalShell section="customer" title="Statements of Account" subtitle="A running record of invoices, payments and credit notes.">
      <Panel title="Statement of account" subtitle={`${user?.company ?? user?.name ?? "Customer"} · as at ${new Date().toLocaleDateString("en-NG")}`} action={<button onClick={() => pushToast("Statement export prepared by the reporting service.", "info")} className="btn btn-outline btn-sm"><Download size={14} /> Export PDF</button>}>
        <div className="table-wrap"><table className="data">
          <thead><tr><th>Date</th><th>Transaction</th><th>Reference</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead>
          <tbody>
            <tr><td>01 Nov 2026</td><td>Opening balance</td><td>—</td><td>—</td><td>—</td><td className="font-bold">{naira(0)}</td></tr>
            {rows.map(({ o, debit, credit, balance }) => (
              <tr key={o.id}><td>{shortDate(o.createdAt)}</td><td>{debit ? "Credit invoice" : "Payment received"}</td><td>{o.reference}</td><td>{debit ? naira(debit) : "—"}</td><td>{credit ? naira(credit) : "—"}</td><td className="font-bold text-forest">{naira(balance)}</td></tr>
            ))}
            <tr className="bg-[#f7faf7]"><td colSpan={5} className="font-bold text-forest">Closing balance</td><td className="font-display text-lg font-bold text-forest">{naira(running)}</td></tr>
          </tbody>
        </table></div>
      </Panel>
      <div className="mt-5 flex items-center gap-3 rounded-xl bg-leaf-light p-4 text-[0.78rem] text-[#1c5d42]"><FileText size={18} /><span>Credit invoices appear automatically in your statement. Payment receipts and credit notes are reflected once approved and posted.</span></div>
    </PortalShell>
  );
}
