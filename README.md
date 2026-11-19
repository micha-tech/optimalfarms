# Optimal Royal Farms Digital Platform

A Next.js application for **Optimal Royal Integrated Farms Limited** — corporate website, online store, customer portal, staff/farm management portal, supplier portal and super-administrator portal running from one shared application shell and data layer.

> Good Food Begins with Good Farming.

## What is included

### Public website
- Homepage with hero, featured products, categories, operations, quality assurance, testimonials, corporate CTA, gallery, news and newsletter
- About Us, Products & Services (filterable catalogue + product detail pages), Farm Consulting, Corporate Sales, Contact/FAQs/policies
- Shopping cart with quantities, variants, promo codes and VAT estimation
- Multi-step checkout with guest checkout, delivery addresses, delivery options, review, payment methods and order confirmation
- Order tracking with 12 delivery milestones, history, driver details and proof-of-delivery status
- WhatsApp, email and social links

### Customer portal
Dashboard, orders, tracking, invoices/receipts, payments, corporate credit account (limits, utilisation, ageing), statements, saved addresses, quotations, support tickets and profile settings.

### Staff / farm management portal
Operational dashboard, sales and orders (with status progression), customers, corporate accounts, credit management, quotations, products and pricing, inventory, stock movements, poultry/fish/livestock production, procurement (requisitions, POs, GRNs, supplier invoices), suppliers, receivables/payables, payments/receipts, expenses, delivery/logistics and a report library.

### Supplier portal
Dashboard, purchase orders with acknowledgement, delivery confirmations, invoice upload, GRN status, payment status, statements and profile/document management.

### Super administrator portal
Business overview (revenue, profit, receivables, payables, inventory), users and role-based permissions, approvals (corporate registrations and management exceptions), analytics, audit logs and system settings/business rules.

## Architecture

```
app/
  (public pages)                 homepage, about, products, consulting, corporate, contact
  cart / checkout / track / login / register
  portal/
    customer/                    customer portal pages
    staff/                       staff dashboard + custom modules + [...slug] module pages
    admin/                       management dashboards, approvals, users, audit, settings
    supplier/                    supplier dashboard + [...slug] module pages
components/
  providers/AppProvider.tsx      shared state: auth, cart, orders, addresses, notifications
  site/                          header, footer, product cards, forms, checkout, tracking
  portals/                       role-based shell and reusable dashboard UI
lib/
  data.ts                        catalogue and operational seed data
  types.ts                       domain types
  utils.ts                       formatting, stages, helpers
```

### Design system
The visual language follows the Afrimash agricultural marketplace reference: a white, compact e-commerce canvas, deep farm green `#0F4E08` for primary actions and prices, fresh lime green `#7AB312` for the sticky category bar, lime tinted `#EEF6E7` surfaces, `Open Sans` body text and `Lexend Deca` headings. Buttons use pill-shaped CTAs with 5px compact actions, product tiles are square-imaged cards with green prices, and the header leads with search. All tokens live in `app/globals.css` (`@theme`), so the whole app re-themes from one place.

### Mobile and enterprise UI
The storefront and the four portals share one responsive design language from `app/globals.css`:
- Public pages use a compact three-tier header; on phones the logo shrinks, the menu becomes a full navigation panel and the catalogue filters collapse behind a **Filters** button so products stay visible immediately.
- Portal routes render only the enterprise shell (sidebar, topbar, footer) via `components/site/SiteChrome.tsx` — the marketplace header, footer and floating WhatsApp button are suppressed there. Each portal page has a single `h1` in the content area; the topbar shows a breadcrumb-style section label.
- Touch targets are at least 38–44px, form inputs use 16px text on phones to prevent iOS zoom, dense portal grids step down from 4 → 2 → 1 columns, and wide tables scroll inside their cards. Fluid heading sizes and a shared 10px surface radius keep every screen consistent from 320px upward.

### Demo state and authentication
This deployment-ready front end uses a shared React context persisted to `localStorage` so the whole flow is usable without credentials:

- Log in from `/login` using any demo role button, or the listed demo emails with any password of 4+ characters.
- Add products to the cart, check out as a guest or signed-in customer, and the new order immediately appears in the customer portal, staff order list, admin overview and tracking page.
- Staff can advance order milestones from **Sales & Orders** and **Delivery & Logistics**; updates appear on the customer tracking page.
- Admin approvals, support tickets, addresses and notifications persist in the browser.

No real payment is taken. Gateway verification, OTP, email/SMS/WhatsApp delivery, bank reconciliation, GPS and accounting are represented by clearly marked UI flows and integration points.

### Security model in the UI
- Five role-based portals with restricted navigation.
- Corporate credit options only for corporate accounts; supplier/staff/admin areas reject other roles.
- Business rules represented in settings: verified payment before dispatch, no double stock deduction, reserved stock, credit-limit enforcement, approval for adjustments, proof of delivery, audit trail and lender-style reversal rather than deletion.
- Secrets belong in server-side environment variables (see `.env.example`). Never prefix secret keys with `NEXT_PUBLIC_`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. In Vercel, choose **Add New → Project** and import the repository. Framework is detected as Next.js (`vercel.json` is included).
3. Add environment variables from `.env.example` in **Project Settings → Environment Variables** when you enable live integrations. Do not add secrets to browser code.
4. Click **Deploy**. Preview deployments work without any environment variables in demo mode.

## Phased production roadmap

| Phase | Scope represented here | Production work required |
|---|---|---|
| 1 | Website, catalogue, cart, guest checkout, delivery, payment selection, basic tracking | Database, real auth + OTP, Paystack/Flutterwave server-side verification, email/SMS/WhatsApp |
| 2 | Staff portal, inventory, stock movements, procurement, suppliers, delivery | Database transactions, approval workflows, FIFO/weighted-average valuation, GRN stock posting |
| 3 | Corporate registration, documents, credit, quotations, receivables/payables, reports | Secure document storage, credit assessment, accounting integration (e.g. Zoho Books) or full ledger module |
| 4 | Poultry, fish and livestock production modules | Batch-level records, feed/mortality/egg/harvest data, cost of sales integration |
| 5 | GPS tracking, loyalty, subscriptions, BI, supplier portal, driver portal, multi-branch | Logistics/API integrations, scheduled jobs, advanced analytics, branch/warehouse scoping |

Recommended production stack: PostgreSQL (Neon/Supabase), server-side auth with hashed passwords and 2FA, object storage for documents, queue workers for notifications, and server-only integration credentials.

## Notes

- Demo promo code: `ORF10` (10% discount).
- Demo OTP for registration verification: `123456`.
- Product photos load from Unsplash with a graceful branded gradient fallback if unavailable.
