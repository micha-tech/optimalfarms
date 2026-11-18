import type { Metadata } from "next";
import Link from "next/link";
import { Building2, FileText, CreditCard, Truck, Users, BadgeCheck, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/site/Forms";

export const metadata: Metadata = { title: "Corporate Sales", description: "Bulk orders, corporate accounts, approved credit terms and tailored quotations for businesses." };

const benefits = [
  { icon: FileText, title: "Tailored quotations", text: "Product-specific bulk pricing, delivery charges, validity periods and payment terms." },
  { icon: CreditCard, title: "Approved credit terms", text: "Purchase on approved credit with a defined limit, credit days and clear statements." },
  { icon: Truck, title: "Multi-location delivery", text: "Save branches, warehouses, stores and offices with scheduled bulk delivery." },
  { icon: Users, title: "Dedicated account support", text: "A clear point of contact for orders, invoices, statements and service issues." },
];

export default function CorporatePage() {
  return (
    <>
      <section className="hero-pattern grid-pattern py-16 text-white md:py-20">
        <div className="container-x">
          <p className="eyebrow">Corporate sales</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">A dependable supply partner for your organisation</h1>
          <p className="mt-4 max-w-2xl text-[0.94rem] leading-relaxed text-white/80">We work with restaurants, hotels, supermarkets, retailers, distributors, schools and corporate organisations to supply quality farm products reliably — with the documentation, controls and flexibility your business needs.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" className="btn btn-gold">Request a Corporate Quote <ArrowRight size={16} /></a>
            <Link href="/register?type=corporate" className="btn border border-white/30 bg-white/10 text-white">Register as a Business</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-7 grid gap-4 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title} className="card p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-light text-leaf"><Icon size={19} /></span>
                  <h3 className="mt-3 font-display text-[1.02rem] font-bold text-forest">{title}</h3>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-2"><BadgeCheck size={20} className="text-gold" /><h2 className="font-display text-2xl font-bold text-forest">How corporate credit works</h2></div>
            <p className="mt-3 text-[0.84rem] leading-relaxed text-muted">Approved corporate customers can purchase on credit within an approved limit. Your account dashboard always shows your limit, utilisation and available balance.</p>
            <div className="mt-5 rounded-xl border border-[#e4ebe5] bg-[#f8faf7] p-5">
              <div className="flex items-center justify-between text-[0.78rem] font-bold text-forest"><span>Approved credit limit</span><span>₦5,000,000</span></div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#e5ebe6]"><div className="h-full w-[24%] rounded-full bg-leaf" /></div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[0.68rem] text-muted">Utilised</p><p className="text-[0.8rem] font-bold text-forest">₦1.2m</p></div>
                <div><p className="text-[0.68rem] text-muted">Available</p><p className="text-[0.8rem] font-bold text-leaf">₦3.8m</p></div>
                <div><p className="text-[0.68rem] text-muted">Outstanding</p><p className="text-[0.8rem] font-bold text-forest">₦1.2m</p></div>
              </div>
            </div>
            <ul className="mt-5 space-y-2">
              {["Register your business and upload CAC / TIN documents", "Submit a credit application for review", "Receive approval with limit and payment terms", "Order, receive invoices and view statements online"].map((t, i) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.8rem] text-[#45534b]"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest text-[0.65rem] font-bold text-white">{i + 1}</span> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Business registration</p><h2 className="section-title mt-2">Set up your corporate account</h2><p className="mt-2 max-w-2xl text-[0.88rem] text-muted">Corporate accounts are reviewed and approved by an authorised administrator before credit purchasing and corporate pricing become available.</p></div>
            <Link href="/register?type=corporate" className="btn btn-dark">Start Registration <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Building2, title: "Business information", text: "Registered name, CAC number, company type, addresses, TIN and nature of business." },
              { icon: Users, title: "Authorised representative", text: "Representative details, designation, contact information and authorisation evidence." },
              { icon: ShieldCheck, title: "Verification documents", text: "CAC certificate, company status documents, TIN evidence and other supporting files." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-light text-[#96710f]"><Icon size={21} /></span>
                <h3 className="mt-4 font-display text-[1.05rem] font-bold text-forest">{title}</h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-[0.76rem] text-muted"><CheckCircle2 size={15} className="text-leaf" /> Accepted document formats: PDF, JPG and PNG. Documents are accessible only to authorised personnel.</p>
        </div>
      </section>

      <section id="quote" className="container-x scroll-mt-24 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Request a quote</p>
            <h2 className="section-title mt-2">Tell us what you need</h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">Give us an idea of the products, quantities, delivery location and payment terms you prefer. Our sales team will prepare a formal quotation and follow up with you.</p>
            <div className="card mt-6 p-5">
              <h3 className="font-display text-lg font-bold text-forest">Our corporate customers include</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Restaurants", "Hotels", "Supermarkets", "Retail chains", "Distributors", "Schools", "Corporate canteens", "Food processors"].map((t) => <span key={t} className="badge badge-green">{t}</span>)}
              </div>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
