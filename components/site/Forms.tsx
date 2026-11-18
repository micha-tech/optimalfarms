"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

function Success({ title, message, onReset }: { title: string; message: string; onReset: () => void }) {
  return (
    <div className="card grid place-items-center p-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-light text-leaf"><CheckCircle2 size={28} /></span>
      <h3 className="mt-4 font-display text-2xl font-bold text-forest">{title}</h3>
      <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-muted">{message}</p>
      <button onClick={onReset} className="btn btn-outline mt-5">Submit another request</button>
    </div>
  );
}

const field = (label: string, name: string, type = "text", required = true, placeholder = "") => ({ label, name, type, required, placeholder });

export function ConsultingForm() {
  const { pushToast } = useApp();
  const [done, setDone] = useState(false);
  const [service, setService] = useState("Poultry farm setup consulting");

  if (done) return <Success title="Consultation request received" message="Our consulting team will contact you within one business day to discuss your farm, goals and next steps." onReset={() => setDone(false)} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); pushToast("Consultation request submitted."); }} className="card space-y-4 p-6">
      <div><label className="field">Consulting service required</label>
        <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
          {["Poultry farm setup consulting", "Layer farm management consulting", "Broiler production consulting", "Catfish farming consulting", "Tilapia farming consulting", "Farm business planning", "Farm operations advisory", "Farm equipment selection & installation", "Farm management training"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {[field("Full name", "name", "text", true, "Your full name"), field("Email address", "email", "email", true, "you@example.com"), field("Phone number", "phone", "tel", true, "+234 ..."), field("Farm location / state", "location", "text", true, "e.g. Adamawa State"), field("Expected start date", "date", "date", false)].map((f) => (
        <div key={f.name}><label className="field">{f.label}</label><input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder} className="input" /></div>
      ))}
      <div><label className="field">Tell us about your project</label><textarea name="message" className="input" placeholder="Farm size, budget, current stage, and the support you need..." required /></div>
      <button className="btn btn-primary w-full"><Send size={16} /> Request Consultation</button>
      <p className="text-center text-[0.7rem] text-muted">No payment is required to submit a consultation request.</p>
    </form>
  );
}

export function QuoteForm() {
  const { pushToast } = useApp();
  const [done, setDone] = useState(false);
  const [product, setProduct] = useState("");

  if (done) return <Success title="Quote request submitted" message="Our corporate sales team will review your requirements and send a tailored quotation, including pricing, delivery and payment terms." onReset={() => setDone(false)} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); pushToast("Corporate quote request submitted."); }} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Company name</label><input name="company" className="input" placeholder="Registered business name" required /></div>
        <div><label className="field">Contact person</label><input name="contact" className="input" placeholder="Full name" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Email address</label><input name="email" type="email" className="input" placeholder="name@company.com" required /></div>
        <div><label className="field">Phone number</label><input name="phone" type="tel" className="input" placeholder="+234 ..." required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Product of interest</label>
          <input name="product" className="input" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Processed chicken" />
        </div>
        <div><label className="field">Estimated quantity</label><input name="quantity" className="input" placeholder="e.g. 500 kg per week" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Delivery location</label><input name="location" className="input" placeholder="City, state" required /></div>
        <div><label className="field">Preferred payment terms</label>
          <select name="terms" className="input"><option>Bank transfer / card</option><option>Corporate credit (subject to approval)</option><option>Part payment / deposit</option></select>
        </div>
      </div>
      <div><label className="field">Additional requirements</label><textarea name="message" className="input" placeholder="Delivery frequency, packaging, quality specifications..." /></div>
      <button className="btn btn-primary w-full"><Send size={16} /> Submit Quote Request</button>
      <p className="text-center text-[0.7rem] text-muted">We typically respond to corporate enquiries within one business day.</p>
    </form>
  );
}

export function ContactForm() {
  const { pushToast } = useApp();
  const [done, setDone] = useState(false);

  if (done) return <Success title="Message sent" message="Thank you for contacting us. A member of our customer service team will respond shortly." onReset={() => setDone(false)} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); pushToast("Your message has been sent."); }} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Full name</label><input className="input" required placeholder="Your name" /></div>
        <div><label className="field">Email address</label><input type="email" className="input" required placeholder="you@example.com" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="field">Phone number</label><input type="tel" className="input" required placeholder="+234 ..." /></div>
        <div><label className="field">Subject</label>
          <select className="input"><option>General enquiry</option><option>Product enquiry</option><option>Order support</option><option>Complaint</option><option>Corporate sales</option><option>Careers</option></select>
        </div>
      </div>
      <div><label className="field">Message</label><textarea className="input" required placeholder="How can we help?" /></div>
      <button className="btn btn-primary w-full"><Send size={16} /> Send Message</button>
    </form>
  );
}
