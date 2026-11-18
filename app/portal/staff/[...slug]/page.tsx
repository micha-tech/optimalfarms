"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import PortalShell from "@/components/portals/PortalShell";
import { ModulePlaceholder, TablePanel, Badge, Panel, ProgressBar } from "@/components/portals/UI";
import { purchaseOrders, suppliers, products, inventory } from "@/lib/data";
import { naira, shortDate } from "@/lib/utils";
import type { ReactNode } from "react";

interface ModuleConfig {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  action?: { label: string; href: string };
}

const modules: Record<string, ModuleConfig> = {
  customers: { title: "Customers", subtitle: "Individual and corporate customer records", description: "Maintain customer profiles, contact details, purchase history, balances and communication preferences from one place.", points: ["Individual and corporate records", "Purchase history and order timeline", "Customer-specific pricing", "Statements and balances", "Support ticket history", "Verified contact details"], action: { label: "Corporate accounts", href: "/portal/staff/corporate" } },
  corporate: { title: "Corporate Accounts", subtitle: "Business registrations and verification", description: "Review CAC documents, verify business details and approve or reject corporate registration applications.", points: ["CAC and TIN document review", "Approve / reject / request documents", "Suspend accounts", "Authorised representative records", "Multiple branches and warehouses", "Approved pricing groups"], action: { label: "View approvals", href: "/portal/admin/approvals" } },
  credit: { title: "Credit Management", subtitle: "Credit applications, limits and ageing", description: "Assess credit applications, set limits and payment terms, monitor utilisation and manage overdue corporate balances.", points: ["Credit application workflow", "Approved limits and credit days", "Utilisation and available credit", "Overdue invoices and ageing", "Credit notes and adjustments", "Credit suspension controls"] },
  quotations: { title: "Quotations", subtitle: "Prepare and convert customer quotes", description: "Build formal quotations with customer-specific pricing, delivery charges, validity dates and payment terms, then convert accepted quotes into orders.", points: ["Bulk and corporate quotes", "Approved pricing rules", "Validity tracking", "Email delivery", "Convert to sales order", "Recurring supply schedules"] },
  products: { title: "Products & Pricing", subtitle: "Catalogue, variants and price control", description: "Create and maintain products, categories, variants, descriptions, images, availability and approved selling prices.", points: ["Product and category management", "Retail, wholesale and corporate prices", "Variants, breeds and weights", "Minimum order quantities", "Low-stock alert thresholds", "Price change audit log"] },
  "production/poultry": { title: "Poultry Production", subtitle: "Broilers, layers and day-old chicks", description: "Track houses, batches, placement, mortality, feed consumption, vaccination, weight monitoring and egg production.", points: ["House / pen and batch records", "Daily mortality and feed intake", "Medication and vaccination logs", "Broiler growth and readiness", "Layer egg production and breakages", "Production cost per batch"] },
  "production/fish": { title: "Fish Farming", subtitle: "Catfish and tilapia pond management", description: "Record pond details, stocking, feeding, water quality, sampling, mortality, harvest quantities and transfers.", points: ["Pond identification and type", "Fingerling stocking batches", "Daily feed consumption and cost", "Water quality readings", "Average weight and sampling", "Harvest and sales records"] },
  "production/livestock": { title: "Livestock Management", subtitle: "Rabbits, goats and cattle", description: "Maintain individual animal identification, breed, age, weight, health, feeding, breeding and disposal records.", points: ["Animal identification records", "Purchase cost and age", "Health and vaccination history", "Feeding and weight monitoring", "Breeding records", "Sales and disposal"] },
  suppliers: { title: "Suppliers", subtitle: "Approved supplier register", description: "Maintain supplier profiles, categories, payment terms, bank details, supporting documents and outstanding payables.", points: ["Supplier registration and approval", "Bank account verification workflow", "Product categories supplied", "Payment terms", "Supplier statements", "Payables and ageing"] },
  "procurement/requisitions": { title: "Purchase Requisitions", subtitle: "Departmental purchase requests", description: "Capture requests from departments with item, quantity, reason, required date and approval routing before a purchase order is raised.", points: ["Department requisitions", "Reason and required date", "Budget and approval checks", "Convert approved requisition to PO", "Attachment support", "Full approval history"] },
  "procurement/orders": { title: "Purchase Orders", subtitle: "Issue and track purchase orders", description: "Generate purchase orders after approval, send them to suppliers and track receipt status through to GRN and invoice matching.", points: ["Unique PO numbers", "Supplier, items, quantities and prices", "Delivery location and expected date", "Payment terms", "Approval status", "Three-way match readiness"] },
  "procurement/grn": { title: "Goods Received Notes", subtitle: "Receipt inspection and inventory update", description: "Record ordered, received and rejected quantities, condition and batch details. Approved GRNs update inventory automatically.", points: ["PO reference and supplier", "Ordered vs received vs rejected", "Condition and batch numbers", "Receiving employee", "Approval before stock update", "Traceable inventory receipt"] },
  "procurement/invoices": { title: "Supplier Invoices", subtitle: "Verification, matching and approval", description: "Capture supplier invoices, verify them against purchase orders and GRNs, schedule payments and monitor outstanding balances.", points: ["Three-way matching (PO / GRN / invoice)", "Invoice verification and approval", "Part payments", "Payment scheduling", "Supplier statements", "Payables ageing"] },
  "finance/receivables": { title: "Accounts Receivable", subtitle: "Customer invoices and collections", description: "Monitor opening balances, invoices, credit notes, receipts, adjustments and closing balances for every customer.", points: ["Customer ledger", "Due dates and reminders", "Ageing analysis", "Credit notes and adjustments", "Collection performance", "Statement generation"] },
  "finance/payables": { title: "Accounts Payable", subtitle: "Supplier obligations", description: "Track supplier invoices, debit notes, payments, outstanding balances and due dates with full ageing analysis.", points: ["Supplier ledger", "Approved invoice register", "Debit notes", "Payment vouchers", "Payables ageing", "Payment advice"] },
  "finance/payments": { title: "Payments & Receipts", subtitle: "Cash, bank and gateway transactions", description: "Record and reconcile all money in and out, including payment gateway charges, refunds and unverified bank transfers.", points: ["Receipt vouchers", "Payment vouchers", "Gateway verification and charges", "Bank reconciliation", "Refund tracking", "Pending reconciliation queue"] },
  "finance/expenses": { title: "Expenses", subtitle: "Operating expense management", description: "Record, categorise and approve operating expenses with departmental and period analysis.", points: ["Expense categories", "Department and branch tracking", "Approval workflow", "Supporting documents", "Budget comparison", "Expense analysis reports"] },
};

export default function StaffModulePage() {
  const params = useParams<{ slug: string[] }>();
  const key = (params.slug ?? []).join("/");
  const cfg = modules[key] ?? { title: "Module", subtitle: "Farm management", description: "This module is part of the platform rollout.", points: [] };

  let table: { title: string; head: string[]; rows: ReactNode[][] } | null = null;
  if (key === "suppliers") {
    table = { title: "Supplier register", head: ["Supplier", "Contact", "Category", "Terms", "Outstanding", "Status"], rows: suppliers.map((s) => [s.name, s.contact, s.category, s.terms, naira(s.outstanding), <Badge key={s.id} text={s.status} tone={s.status === "Approved" ? "green" : "gold"} />]) };
  }
  if (key === "procurement/orders") {
    table = { title: "Purchase orders", head: ["PO number", "Supplier", "Date", "Items", "Total", "Status", "GRN"], rows: purchaseOrders.map((p) => [p.po, p.supplier, p.date, p.items, naira(p.total), <Badge key={p.po} text={p.status} tone={p.status === "Received" ? "green" : "gold"} />, p.grn]) };
  }
  if (key === "products") {
    table = { title: "Catalogue items", head: ["Product", "Category", "Price", "Unit", "Stock", "Status"], rows: products.slice(0, 10).map((p) => [p.name, p.category, naira(p.price), p.unit, p.stock, <Badge key={p.id} text={p.stock > 100 ? "Active" : "Low"} tone={p.stock > 100 ? "green" : "gold"} />]) };
  }
  if (key === "credit") {
    table = { title: "Corporate credit accounts", head: ["Customer", "Limit", "Utilised", "Available", "Status"], rows: [["Royal Foods Ltd", naira(5_000_000), naira(1_200_000), naira(3_800_000), <Badge key="c" text="Approved" tone="green" />], ["Savannah Hotels Ltd", naira(2_500_000), naira(420_000), naira(2_080_000), <Badge key="c2" text="Approved" tone="green" />]] };
  }
  if (key === "finance/receivables" || key === "finance/payables") {
    table = { title: key.includes("receivables") ? "Customer ageing" : "Supplier ageing", head: ["Party", "Current", "31–60 days", "61–90 days", "Over 90", "Closing balance"], rows: [
      ["Royal Foods Ltd", naira(780000), naira(320000), naira(100000), "—", naira(1200000)],
      ["GreenField Agro Supplies", naira(1450000), naira(680000), naira(320000), "—", naira(2450000)],
      ["PrimePack Solutions", naira(480000), naira(200000), "—", "—", naira(680000)],
    ] };
  }

  return (
    <PortalShell section="staff" title={cfg.title} subtitle={cfg.subtitle} actions={cfg.action ? <Link href={cfg.action.href} className="btn btn-outline btn-sm">{cfg.action.label}</Link> : undefined}>
      <ModulePlaceholder title={cfg.title} description={cfg.description} points={cfg.points} />
      {table && <div className="mt-5"><TablePanel title={table.title} head={table.head} rows={table.rows} /></div>}
      {key === "procurement/orders" && (
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[["Awaiting approval", 1], ["Partially received", 1], ["Received this month", 2]].map(([k, v]) => <div key={k as string} className="card p-4"><p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{k}</p><p className="mt-2 font-display text-2xl font-bold text-forest">{v}</p></div>)}
        </div>
      )}
      {key === "production/poultry" && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Panel title="Poultry houses"><div className="space-y-3">{[["Broiler House 1", "2,400 birds", 88], ["Broiler House 2", "860 birds", 72], ["Layer House 1", "1,600 birds", 96], ["Day-old chick unit", "4,200 chicks", 91]].map(([n, c, v]) => <div key={n as string}><div className="mb-1 flex justify-between text-[0.76rem]"><span className="font-semibold text-forest">{n}</span><span className="text-muted">{c}</span></div><ProgressBar value={v as number} /></div>)}</div></Panel>
          <Panel title="Today's production"><div className="grid grid-cols-2 gap-3">{[["Eggs collected", "1,240"], ["Mortality", "3 birds"], ["Feed consumed", "820 kg"], ["Production rate", "92.4%"]].map(([k, v]) => <div key={k} className="rounded-lg bg-[#f7faf7] p-3"><p className="text-[0.68rem] text-muted">{k}</p><p className="mt-1 font-display text-lg font-bold text-forest">{v}</p></div>)}</div></Panel>
        </div>
      )}
      {key === "production/fish" && (
        <div className="mt-5"><TablePanel title="Pond overview" head={["Pond", "Species", "Stocked", "Avg weight", "Feed today", "Water quality"]} rows={[["Pond B1", "Catfish", "1,250", "0.9 kg", "48 kg", "Good"], ["Pond B2", "Catfish", "800", "0.6 kg", "32 kg", "Good"], ["Pond C1", "Tilapia", "620 kg", "0.35 kg", "18 kg", "Good"]]} /></div>
      )}
    </PortalShell>
  );
}
