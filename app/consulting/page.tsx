import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Sprout, Layers, Fish, GraduationCap, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { ConsultingForm } from "@/components/site/Forms";

export const metadata: Metadata = { title: "Farm Consulting", description: "Professional poultry, fish and livestock farm setup, management, planning and training services." };

const services = [
  { icon: Sprout, title: "Poultry farm setup", text: "Site assessment, housing design, breed selection, equipment planning and startup budgets." },
  { icon: Layers, title: "Layer farm management", text: "Production planning, feed programmes, egg handling, record keeping and productivity improvement." },
  { icon: ClipboardCheck, title: "Broiler production", text: "Stocking plans, brooding, feeding schedules, health programmes and readiness-for-sale guidance." },
  { icon: Fish, title: "Catfish & tilapia farming", text: "Pond design, stocking, water quality, feeding, harvesting and cost management." },
  { icon: GraduationCap, title: "Management training", text: "Practical training for farm owners, supervisors and production staff." },
  { icon: Wrench, title: "Equipment selection & installation", text: "Choosing, installing and maintaining cages, feeders, drinkers, brooders and fish-farming equipment." },
];

const steps = [
  { n: "01", title: "Send a request", text: "Tell us about your farm, goals, location and timeline." },
  { n: "02", title: "Consultation", text: "We discuss your requirements on-site or remotely and assess what is needed." },
  { n: "03", title: "Written proposal", text: "You receive a clear scope, deliverables, timeline and cost." },
  { n: "04", title: "Implementation support", text: "Our team supports setup, training and ongoing advisory as agreed." },
];

export default function ConsultingPage() {
  return (
    <>
      <section className="hero-pattern grid-pattern py-16 text-white md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Farm consulting</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Expert advice for productive farming</h1>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-white/80">From feasibility and farm setup to production improvement and staff training, our consulting team helps you make confident decisions and avoid costly mistakes.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="btn btn-gold">Book a Consultation <ArrowRight size={16} /></a>
              <Link href="/products/poultry-feed" className="btn border border-white/30 bg-white/10 text-white">Explore farm inputs</Link>
            </div>
          </div>
          <div className="card p-6 text-forest">
            <h3 className="font-display text-xl font-bold">Consulting covers</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Feasibility studies", "Farm design & layout", "Breed & equipment choice", "Production planning", "Health & biosecurity", "Staff training", "Record-keeping systems", "Ongoing advisory"].map((s) => (
                <span key={s} className="flex items-center gap-2 rounded-lg bg-[#f4f8f4] px-3 py-2 text-[0.76rem] font-semibold"><CheckCircle2 size={14} className="text-leaf" /> {s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="mb-8 text-center"><p className="eyebrow">Our services</p><h2 className="section-title mt-2">Professional support across your farm</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card card-hover p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-light text-leaf"><Icon size={21} /></span>
              <h3 className="mt-4 font-display text-[1.1rem] font-bold text-forest">{title}</h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 text-center"><p className="eyebrow">How it works</p><h2 className="section-title mt-2">A simple, structured process</h2></div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-xl border border-[#e4ebe5] bg-cream p-5">
                <span className="font-display text-3xl font-bold text-gold/70">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-forest">{s.title}</h3>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="container-x scroll-mt-24 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Book a consultation</p>
            <h2 className="section-title mt-2">Tell us what you want to achieve</h2>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">Consulting services are handled as consultation requests rather than ordinary physical products. Submit the form and our team will follow up with the right specialist for your project.</p>
            <div className="card mt-6 p-5">
              <h3 className="font-display text-lg font-bold text-forest">Why work with our team?</h3>
              <ul className="mt-3 space-y-2 text-[0.8rem] text-[#4c5a52]">
                {["Practical experience across poultry, fish and livestock", "Guidance connected to real farm operations", "Clear written proposals and deliverables", "Support with records, systems and staff capability"].map((t) => <li key={t} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-leaf" /> {t}</li>)}
              </ul>
            </div>
          </div>
          <ConsultingForm />
        </div>
      </section>
    </>
  );
}
