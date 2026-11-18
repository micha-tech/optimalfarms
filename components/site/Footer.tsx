import Link from "next/link";
import {
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight,
  Truck, ShieldCheck, Headphones, FileCheck2,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const groups = [
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

const promises = [
  { icon: Truck, title: "Convenient Delivery", text: "Nationwide delivery with clear milestones and confirmation on arrival." },
  { icon: ShieldCheck, title: "Safe Payment", text: "Pay into verified company accounts only — never to a personal account." },
  { icon: Headphones, title: "Reliable Support", text: "Talk to our farm specialists before, during and after your order." },
  { icon: FileCheck2, title: "Shop Confidently", text: "Order online or request a proforma invoice for corporate purchasing." },
];

export default function Footer() {
  return (
    <footer>
      {/* Service promises */}
      <div className="border-b border-border bg-white">
        <div className="container-x grid gap-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-light text-forest">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-[0.78rem] font-bold uppercase tracking-wide text-forest">{title}</p>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-forest text-white/70">
        <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-nav text-white">
                <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 33V19" />
                  <path d="M20 21c-7 0-11-4-11-10 6 0 11 3 11 10Z" />
                  <path d="M20 17c0-7 4-11 11-11 0 6-4 11-11 11Z" />
                  <path d="M12 33h16" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display text-[1.05rem] font-bold text-white">Optimal Royal</div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-nav">Integrated Farms Ltd</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[0.8rem] leading-relaxed">
              Good food begins with good farming. We produce, process and deliver quality poultry,
              fish, livestock and farm inputs — backed by professional farm consulting and dependable service.
            </p>
            <div className="mt-5 space-y-2 text-[0.78rem]">
              <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-nav" /> Gbudu Village, Yola Road, Adamawa State, Nigeria</p>
              <p className="flex items-center gap-2"><Phone size={15} className="text-nav" /> +234 803 000 1122</p>
              <p className="flex items-center gap-2"><Mail size={15} className="text-nav" /> info@optimalroyalfarms.com</p>
            </div>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social media" className="grid h-8 w-8 place-items-center rounded-[5px] border border-white/20 text-white/70 hover:border-nav hover:text-nav">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-[0.75rem] font-bold uppercase tracking-wider text-white">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-[0.78rem] hover:text-nav">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter inside footer */}
        <div className="border-t border-white/10">
          <div className="container-x flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.85rem] font-bold text-white">Fresh updates from our farm</p>
              <p className="text-[0.75rem] text-white/60">Product announcements, seasonal offers and practical farming advice.</p>
            </div>
            <div className="w-full max-w-md"><NewsletterForm /></div>
          </div>
        </div>
      </div>

      <div className="bg-forest-2 text-white/55">
        <div className="container-x flex flex-col gap-3 py-4 text-[0.72rem] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Optimal Royal Integrated Farms Limited. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/contact#policies" className="hover:text-nav">Privacy Policy</Link>
            <Link href="/contact#policies" className="hover:text-nav">Terms of Service</Link>
            <Link href="/contact#policies" className="hover:text-nav">Data Protection (NDPA)</Link>
            <Link href="/contact#policies" className="inline-flex items-center gap-1 hover:text-nav">RC Registration <ArrowUpRight size={11} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
