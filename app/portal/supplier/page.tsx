"use client";

import Link from "next/link";
import { FileText, Truck, Wallet, BadgeCheck, ArrowRight, Clock3, PackageCheck, Upload } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { StatCard, Panel, Badge, QuickLink } from "@/components/portals/UI";
import { purchaseOrders } from "@/lib/data";
import { naira } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

export default function SupplierDashboard() {
  const { user, pushToast } = useApp();
  return (
    <PortalShell section="supplier" title="Supplier Dashboard" subtitle={`Welcome, ${user?.company ?? user?.name}. Manage orders, deliveries, invoices and payments.`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open purchase orders" value="2" icon={FileText} tone="blue" />
        <StatCard label="Pending confirmations" value="1" icon={Truck} tone="gold" />
        <StatCard label="Outstanding payments" value={naira(2_450_000)} icon={Wallet} tone="red" />
        <StatCard label="Approved invoices" value="8" icon={BadgeCheck} tone="green" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Panel title="Purchase orders issued to you" subtitle="Accept, acknowledge and confirm delivery dates" action={<Link href="/portal/supplier/purchase-orders" className="text-[0.76rem] font-bold text-leaf">View all →</Link>}>
          <div className="table-wrap"><table className="data">
            <thead><tr><th>PO number</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>{purchaseOrders.map((p) => <tr key={p.po}><td className="font-bold text-forest">{p.po}</td><td>{p.date}</td><td>{p.items}</td><td className="font-bold">{naira(p.total)}</td><td><Badge text={p.status} tone={p.status === "Received" ? "green" : "gold"} /></td><td><Link href="/portal/supplier/purchase-orders" className="text-leaf"><ArrowRight size={15} /></Link></td></tr>)}</tbody>
          </table></div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Quick actions">
            <div className="grid gap-2">
              <QuickLink href="/portal/supplier/invoices" title="Upload an invoice" text="Submit supplier invoice documents" icon={Upload} />
              <QuickLink href="/portal/supplier/deliveries" title="Confirm a delivery" text="Acknowledge dispatch and delivery dates" icon={Truck} />
              <QuickLink href="/portal/supplier/grn" title="GRN status" text="View goods received notes" icon={PackageCheck} />
              <QuickLink href="/portal/supplier/payments" title="Payment status" text="Track approved and paid invoices" icon={Wallet} />
            </div>
          </Panel>
          <div className="card p-5"><div className="flex items-center gap-2"><Clock3 size={17} className="text-gold" /><h3 className="font-display text-[1rem] font-bold text-forest">Next payment</h3></div><p className="mt-2 text-[0.76rem] text-muted">₦1,120,000 scheduled for 28 Nov 2026 against invoice SUP-INV-0182.</p><button onClick={() => pushToast("Payment advice downloaded.", "info")} className="btn btn-outline btn-sm mt-3 w-full">Download payment advice</button></div>
        </div>
      </div>
    </PortalShell>
  );
}
