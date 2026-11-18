import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Target, HeartHandshake, ShieldCheck, Leaf, Users, Building2, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About Us", description: "Learn about Optimal Royal Integrated Farms Limited, our vision, mission, values, farm operations and quality standards." };

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "We do the right thing, keep our word and maintain transparent records." },
  { icon: Award, title: "Quality", text: "We set high standards for the health, safety and consistency of everything we produce." },
  { icon: HeartHandshake, title: "Partnership", text: "We grow with our customers, suppliers and communities through honest collaboration." },
  { icon: Leaf, title: "Responsibility", text: "We farm with respect for animals, people and the environment." },
];

const operations = [
  { title: "Poultry", text: "Day-old chicks, broilers, layers, cockerels and point-of-lay birds managed with vaccination, feeding, weight and mortality records." },
  { title: "Fishery", text: "Catfish and tilapia raised in monitored ponds with daily water-quality checks, sampling and harvest planning." },
  { title: "Livestock", text: "Rabbits, goats and cattle with individual identification, health, feeding and weight records." },
  { title: "Processing", text: "Processed and smoked products handled under hygiene procedures with batch traceability and cold-chain control." },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-pattern grid-pattern py-16 text-white md:py-20">
        <div className="container-x">
          <p className="eyebrow">About us</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Good food begins with good farming</h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-white/80">
            Optimal Royal Integrated Farms Limited is a professionally managed agricultural production, sales and distribution company committed to quality, traceability and dependable service.
          </p>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="section-title mt-2">An integrated farm built on discipline and care</h2>
            <div className="mt-5 space-y-4 text-[0.9rem] leading-relaxed text-[#4c5a52]">
              <p>We operate an integrated farming model that connects poultry, fish, livestock, feed supply, processing and distribution. This allows us to manage quality at source, plan production accurately and deliver consistent value to households, retailers, restaurants, hotels and corporate organisations.</p>
              <p>Our digital platform connects orders, payments, stock movements, deliveries and financial records — giving our team and our customers clear, reliable information at every step.</p>
              <p>From a small order of smoked fish to a scheduled bulk supply contract, every customer receives the same attention to quality, documentation and service.</p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[["RC Registration", "RC 0000000"], ["Company type", "Limited Liability"], ["Founded", "Agricultural enterprise"], ["Location", "Adamawa State, Nigeria"]].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-[#e4ebe5] bg-white px-4 py-3">
                  <p className="text-[0.66rem] font-bold uppercase tracking-wider text-muted">{k}</p>
                  <p className="mt-0.5 text-[0.84rem] font-bold text-forest">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Eye, title: "Our Vision", text: "To be a leading, digitally enabled agricultural production and distribution company known for quality, professionalism and trusted partnerships." },
              { icon: Target, title: "Our Mission", text: "To produce and deliver safe, high-quality farm products and professional advisory services that improve livelihoods and help customers succeed." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-gold"><Icon size={21} /></span>
                <h3 className="mt-4 font-display text-xl font-bold text-forest">{title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
            <div className="card p-6 sm:col-span-2">
              <h3 className="font-display text-xl font-bold text-forest">Our business objectives</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {["Deliver consistently safe, quality products", "Grow a trusted national customer base", "Operate efficient, traceable farm systems", "Support farmers with professional advisory services", "Maintain strong financial and operational controls", "Build long-term supplier and community relationships"].map((o) => (
                  <li key={o} className="flex items-start gap-2 text-[0.8rem] text-[#4c5a52]"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-leaf" /> {o}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 text-center"><p className="eyebrow">What guides us</p><h2 className="section-title mt-2">Our core values</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-leaf-light text-leaf"><Icon size={22} /></span>
                <h3 className="mt-4 font-display text-lg font-bold text-forest">{title}</h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="operations" className="container-x py-14 md:py-20">
        <div className="mb-8"><p className="eyebrow">Our operations</p><h2 className="section-title mt-2">Farming, production and capacity</h2><p className="mt-2 max-w-2xl text-[0.88rem] text-muted">Each production unit is managed with records that connect to inventory, sales and cost reporting.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {operations.map((op, i) => (
            <div key={op.title} className="card flex gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f1f5f0] font-display text-lg font-bold text-leaf">0{i + 1}</span>
              <div><h3 className="font-display text-xl font-bold text-forest">{op.title}</h3><p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{op.text}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[["5,000+", "Birds across poultry houses"], ["1,800+ kg", "Fish harvest capacity"], ["24/7", "Monitored production environment"]].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-forest p-6 text-center text-white"><p className="font-display text-3xl font-bold text-gold">{n}</p><p className="mt-1 text-[0.76rem] text-white/70">{l}</p></div>
          ))}
        </div>
      </section>

      <section id="quality" className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Quality & food safety</p>
            <h2 className="section-title mt-2">Care at every stage</h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">Our quality procedures are designed around prevention, traceability and continuous improvement. Records are retained and reviewed, and every dispatch is checked before it leaves the farm.</p>
            <ul className="mt-6 space-y-3">
              {["Health checks, vaccination and medication records for livestock", "Daily water-quality and feed-consumption monitoring in fish ponds", "Hygiene controls in processing, smoking and packing areas", "Batch numbers, production dates and expiry tracking for perishable goods", "Quality inspection completed before dispatch", "Proof of delivery captured at the customer's location"].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.84rem] text-[#435149]"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-leaf" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-forest">Sustainability & environment</h3>
              <p className="mt-2 text-[0.83rem] leading-relaxed text-muted">We manage feed conversion carefully, maintain clean water systems, handle waste responsibly and continuously look for ways to reduce the environmental impact of our operations.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-forest">Management & team</h3>
              <p className="mt-2 text-[0.83rem] leading-relaxed text-muted">Our farm is led by experienced agricultural and business professionals supported by dedicated supervisors, production officers, quality control staff, sales and logistics teams.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Farm management", "Veterinary support", "Quality control", "Sales & customer care", "Finance & procurement"].map((t) => <span key={t} className="badge badge-grey"><Users size={11} /> {t}</span>)}
              </div>
            </div>
            <Link href="/contact" className="card flex items-center justify-between p-5"><span><span className="block font-display text-lg font-bold text-forest">Visit or partner with us</span><span className="text-[0.76rem] text-muted">We welcome farm visits by appointment.</span></span><ArrowRight size={18} className="text-leaf" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
