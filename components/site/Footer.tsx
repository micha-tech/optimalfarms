import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

const groups = [
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Farm Operations", "/about#operations"],
      ["Quality Assurance", "/about#quality"],
      ["Farm Consulting", "/consulting"],
      ["Corporate Sales", "/corporate"],
      ["Contact Us", "/contact"],
    ],
  },
  {
    title: "Shop",
    links: [
      ["All Products", "/products"],
      ["Poultry & Live Birds", "/products?category=Poultry%20%26%20Live%20Birds"],
      ["Fishery Products", "/products?category=Fishery%20Products"],
      ["Livestock", "/products?category=Livestock"],
      ["Feeds & Equipment", "/products?category=Feeds%20%26%20Equipment"],
      ["Processed Products", "/products?category=Processed%20Products"],
    ],
  },
  {
    title: "Customer Care",
    links: [
      ["Track Your Order", "/track"],
      ["Guest Checkout", "/checkout?guest=1"],
      ["My Account", "/portal/customer"],
      ["Payments", "/portal/customer/payments"],
      ["Support / Complaints", "/portal/customer/support"],
      ["FAQs", "/contact#faq"],
    ],
  },
  {
    title: "Portals",
    links: [
      ["Customer Portal", "/portal/customer"],
      ["Staff Portal", "/portal/staff"],
      ["Supplier Portal", "/portal/supplier"],
      ["Administrator", "/portal/admin"],
      ["Register Business", "/register?type=corporate"],
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-forest)]"
    >
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-gold)] text-[var(--color-forest)]">
              <svg
                viewBox="0 0 40 40"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 33V19" />
                <path d="M20 21c-7 0-11-4-11-10 6 0 11 3 11 10Z" />
                <path d="M20 17c0-7 4-11 11-11 0 6-4 11-11 11Z" />
                <path d="M12 33h16" />
              </svg>
            </div>
            <div>
              <div className="font-display text-lg font-bold text-[var(--color-forest)]">
                Optimal Royal
              </div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.19em] text-[var(--color-gold)]">
                Integrated Farms Ltd
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed">
            Good food begins with good farming. We produce, process and distribute
            quality poultry, fish, livestock and farm inputs — backed by professional
            farm consulting and dependable service.
          </p>
          <div className="mt-5 space-y-2 text-[0.78rem]">
            <p className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
              Gbudu Village, Yola Road, Adamawa State, Nigeria
            </p>
            <p className="flex items-center gap-2">
              <Phone size={15} className="text-[var(--color-gold)]" />
              +234 803 000 1122
            </p>
            <p className="flex items-center gap-2">
              <Mail size={15} className="text-[var(--color-gold)]" />
              info@optimalroyalfarms.com
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  <Icon size={15} />
                </a>
              )
            )}
          </div>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h4
              className="mb-4 text-[0.8rem] font-bold uppercase tracking-wider text-[var(--color-gold)]"
            >
              {group.title}
            </h4>
            <ul className="space-y-2.5">
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[0.78rem] hover:text-[var(--color-gold)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div
          className="container-x flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between"
        >
          <p>© {new Date().getFullYear()} Optimal Royal Integrated Farms Limited.
            All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/contact#policies"
              className="hover:text-[var(--color-gold)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact#policies"
              className="hover:text-[var(--color-gold)]"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact#policies"
              className="hover:text-[var(--color-gold)]"
            >
              Data Protection (NDPA)
            </Link>
            <Link
              href="/contact#policies"
              className="inline-flex items-center gap-1 hover:text-[var(--color-gold)]"
            >
              RC Registration <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}