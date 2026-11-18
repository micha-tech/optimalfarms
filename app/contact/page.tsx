import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock3, MessageCircle, ShieldCheck, FileText, HelpCircle, Lock } from "lucide-react";
import { ContactForm } from "@/components/site/Forms";

export const metadata: Metadata = { title: "Contact Us", description: "Contact Optimal Royal Integrated Farms Limited for orders, support, corporate sales and farm visits." };

const faqs = [
  { q: "Can I order without creating an account?", a: "Yes. Use Guest Checkout to place an order with your name, phone, email and delivery address. You will receive a unique order reference and a secure tracking link. You can create an account after your order if you wish." },
  { q: "How do I know my payment was received?", a: "Online card payments are confirmed automatically by our payment provider. Bank transfers are verified against the actual transaction before an order is confirmed — uploading a receipt alone is not sufficient. You will receive a payment confirmation notification." },
  { q: "Can corporate customers buy on credit?", a: "Approved corporate customers can be granted a credit limit and payment terms after verification and credit assessment. Your dashboard shows your limit, utilisation, available credit, outstanding balance and due dates." },
  { q: "What happens if live fish or livestock arrive at a different weight?", a: "For products sold by estimated weight, we disclose this at checkout. The final weight is confirmed before dispatch and the invoice is adjusted accordingly. You will be informed before the order is finalised." },
  { q: "How do I track my delivery?", a: "Use the Track Order page with your order reference and email (or secure tracking code for guest orders). You will see every milestone from order placement through to proof of delivery." },
  { q: "Where are your products available?", a: "We deliver across Nigeria using farm-managed delivery, scheduled delivery and approved logistics partners. Some live animals require special delivery arrangements, which are confirmed before dispatch." },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero-pattern grid-pattern py-16 text-white md:py-20">
        <div className="container-x">
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">We&apos;d love to hear from you</h1>
          <p className="mt-4 max-w-2xl text-[0.94rem] leading-relaxed text-white/80">Questions about products, orders, corporate supply or farm consulting? Our team is ready to help.</p>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Farm & head office", lines: ["Gbudu Village, Yola Road", "Adamawa State, Nigeria"] },
              { icon: Phone, title: "Phone", lines: ["+234 803 000 1122", "+234 805 000 3344"] },
              { icon: Mail, title: "Email", lines: ["info@optimalroyalfarms.com", "sales@optimalroyalfarms.com"] },
              { icon: Clock3, title: "Opening hours", lines: ["Monday – Saturday: 8:00am – 6:00pm", "Sunday: By appointment"] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="card flex gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-light text-leaf"><Icon size={20} /></span>
                <div><h3 className="font-display text-[1.05rem] font-bold text-forest">{title}</h3>{lines.map((l) => <p key={l} className="mt-1 text-[0.8rem] text-muted">{l}</p>)}</div>
              </div>
            ))}
            <a href="https://wa.me/2348030001122" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] p-4 text-[0.84rem] font-bold text-white">
              <MessageCircle size={18} /> Chat with us on WhatsApp
            </a>
            <div className="overflow-hidden rounded-xl border border-[#e4ebe5] bg-white">
              <div className="grid h-44 place-items-center bg-[#e9f0ea] text-center">
                <div>
                  <MapPin size={28} className="mx-auto text-leaf" />
                  <p className="mt-2 text-[0.78rem] font-bold text-forest">Gbudu Village, Yola Road, Adamawa State</p>
                  <p className="text-[0.7rem] text-muted">Map integration can be enabled with Google Maps</p>
                </div>
              </div>
            </div>
          </div>
          <div><h2 className="font-display text-2xl font-bold text-forest">Send us a message</h2><p className="mb-5 mt-1 text-[0.85rem] text-muted">Complete the form and we will get back to you as soon as possible.</p><ContactForm /></div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-gold-light text-[#96710f]"><HelpCircle size={21} /></div><p className="eyebrow mt-3">FAQs</p><h2 className="section-title mt-2">Frequently asked questions</h2></div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-[1.02rem] font-bold text-forest">
                  {f.q}<span className="text-leaf transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="policies" className="container-x scroll-mt-24 py-14 md:py-20">
        <div className="mb-8"><p className="eyebrow">Policies</p><h2 className="section-title mt-2">Terms, privacy and data protection</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: FileText, title: "Terms of Service", text: "Orders are subject to availability, confirmed pricing, approved payment or credit, and our delivery and returns policies." },
            { icon: Lock, title: "Privacy Policy", text: "We collect only the information needed to serve you, use it for order fulfilment and support, and do not sell personal data." },
            { icon: ShieldCheck, title: "NDPA-aligned practices", text: "Access to personal and corporate documents is restricted. You may request access, correction or deletion of your personal data." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-light text-leaf"><Icon size={19} /></span>
              <h3 className="mt-3 font-display text-[1.05rem] font-bold text-forest">{title}</h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
