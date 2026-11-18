"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { UserRound, Building2, UploadCloud, ShieldCheck, CheckCircle2, ArrowRight, FileText, LockKeyhole } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import type { Role } from "@/lib/types";

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { register, pushToast } = useApp();
  const [type, setType] = useState<Role>(params.get("type") === "corporate" ? "corporate" : "individual");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [otp, setOtp] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", altPhone: "", password: "",
    company: "", cac: "", companyType: "Limited Liability", incorporation: "", address: "", operationalAddress: "",
    companyEmail: "", companyPhone: "", tin: "", nature: "", website: "",
    repName: "", repPosition: "", repPhone: "", repEmail: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "corporate" && files.length === 0) {
      pushToast("Please attach at least one verification document.", "error");
      return;
    }
    setStep("verify");
    pushToast("Verification code sent. Demo code: 123456", "info");
  };

  const finish = () => {
    if (otp !== "123456") return pushToast("Incorrect verification code. Use 123456 for this demo.", "error");
    register({
      name: type === "corporate" ? form.company || form.repName : form.name,
      email: type === "corporate" ? form.companyEmail || form.email : form.email,
      phone: type === "corporate" ? form.companyPhone || form.phone : form.phone,
      role: type,
      company: type === "corporate" ? form.company : undefined,
    });
    router.push("/portal/customer");
  };

  if (step === "verify") {
    return (
      <div className="mx-auto max-w-xl py-12">
        <div className="card p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf-light text-leaf"><ShieldCheck size={27} /></span>
          <h1 className="mt-4 font-display text-2xl font-bold text-forest">Verify your contact details</h1>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">We sent a one-time code to {type === "corporate" ? form.companyEmail || form.email : form.email}. Enter it below to complete registration.</p>
          <div className="mx-auto mt-6 max-w-xs">
            <input className="input text-center text-2xl tracking-[0.4em]" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" inputMode="numeric" />
            <p className="mt-2 text-[0.7rem] text-muted">Demo verification code: <strong className="text-forest">123456</strong></p>
            <button onClick={finish} className="btn btn-primary mt-4 w-full">Verify & Continue <ArrowRight size={15} /></button>
            <button onClick={() => setStep("form")} className="btn btn-ghost mt-2 w-full text-[0.78rem]">Go back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Join Optimal Royal</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-forest">Create your account</h1>
          <p className="mt-2 text-[0.88rem] text-muted">Order online, save addresses, track deliveries, view invoices and access corporate features.</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button onClick={() => setType("individual")} className={`card flex items-center gap-3 p-4 text-left transition ${type === "individual" ? "border-leaf bg-leaf-light" : ""}`}>
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${type === "individual" ? "bg-leaf text-white" : "bg-[#eef2ee] text-muted"}`}><UserRound size={19} /></span>
            <span><span className="block text-[0.86rem] font-bold text-forest">Individual Customer</span><span className="block text-[0.72rem] text-muted">For households and personal orders</span></span>
          </button>
          <button onClick={() => setType("corporate")} className={`card flex items-center gap-3 p-4 text-left transition ${type === "corporate" ? "border-leaf bg-leaf-light" : ""}`}>
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${type === "corporate" ? "bg-leaf text-white" : "bg-[#eef2ee] text-muted"}`}><Building2 size={19} /></span>
            <span><span className="block text-[0.86rem] font-bold text-forest">Register as a Business / Organisation</span><span className="block text-[0.72rem] text-muted">Bulk pricing, quotations and credit</span></span>
          </button>
        </div>

        <form onSubmit={submit} className="card mt-5 p-6 md:p-8">
          {type === "individual" ? (
            <>
              <h2 className="font-display text-xl font-bold text-forest">Personal information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="field">Full name</label><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Your full name" /></div>
                <div><label className="field">Email address</label><input type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder="you@example.com" /></div>
                <div><label className="field">Mobile phone number</label><input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} required placeholder="+234 803 000 0000" /></div>
                <div><label className="field">Alternative phone number (optional)</label><input className="input" value={form.altPhone} onChange={(e) => set("altPhone", e.target.value)} /></div>
                <div><label className="field">Password</label><div className="relative"><LockKeyhole size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input type="password" className="input pl-9" value={form.password} onChange={(e) => set("password", e.target.value)} required minLength={8} placeholder="At least 8 characters" /></div></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2"><Building2 size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Company information</h2></div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {([
                  ["company", "Registered business name"], ["cac", "CAC registration number"], ["companyType", "Company type"], ["incorporation", "Date of incorporation"],
                  ["address", "Registered business address"], ["operationalAddress", "Operational / business address"], ["companyEmail", "Company email"], ["companyPhone", "Official telephone number"],
                  ["tin", "Tax Identification Number (TIN)"], ["nature", "Nature of business"], ["website", "Website (optional)"],
                ] as const).map(([key, label]) => (
                  <div key={key} className={["address", "operationalAddress"].includes(key) ? "sm:col-span-2" : ""}>
                    <label className="field">{label}</label>
                    {key === "companyType" ? (
                      <select className="input" value={form.companyType} onChange={(e) => set(key, e.target.value)}><option>Limited Liability</option><option>PLC</option><option>Partnership</option><option>Sole Proprietorship</option><option>NGO / Institution</option></select>
                    ) : key === "incorporation" ? (
                      <input type="date" className="input" value={form.incorporation} onChange={(e) => set(key, e.target.value)} required />
                    ) : (
                      <input className="input" value={form[key]} onChange={(e) => set(key, e.target.value)} required={key !== "website" && key !== "tin"} />
                    )}
                  </div>
                ))}
              </div>

              <div className="divider my-7" />
              <div className="flex items-center gap-2"><UserRound size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Authorised representative</h2></div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {([["repName", "Full name"], ["repPosition", "Position / designation"], ["repPhone", "Phone number"], ["repEmail", "Email address"]] as const).map(([key, label]) => (
                  <div key={key}><label className="field">{label}</label><input className="input" value={form[key]} onChange={(e) => set(key, e.target.value)} required /></div>
                ))}
              </div>

              <div className="divider my-7" />
              <div className="flex items-center gap-2"><FileText size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Supporting documents</h2></div>
              <p className="mt-2 text-[0.78rem] text-muted">Upload CAC certificate, company status documents, TIN evidence and any other verification documents. PDF, JPG and PNG accepted.</p>
              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#ccd9cf] bg-[#fafcf9] p-7 text-center hover:border-leaf">
                <UploadCloud size={26} className="text-leaf" />
                <span className="text-[0.82rem] font-bold text-forest">Click to upload documents</span>
                <span className="text-[0.71rem] text-muted">PDF, JPG or PNG · multiple files supported</span>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
              </label>
              {files.length > 0 && <ul className="mt-3 space-y-1">{files.map((f) => <li key={f} className="flex items-center gap-1.5 text-[0.75rem] text-leaf"><CheckCircle2 size={13} /> {f}</li>)}</ul>}
              <div className="mt-5"><label className="field">Password</label><input type="password" className="input max-w-sm" value={form.password} onChange={(e) => set("password", e.target.value)} required minLength={8} placeholder="At least 8 characters" /></div>
              <div className="mt-4 flex gap-2 rounded-lg bg-gold-light p-3 text-[0.76rem] text-[#72580c]"><ShieldCheck size={16} className="shrink-0" /> Corporate accounts begin as <strong>Pending Verification</strong>. An authorised administrator will review your documents and may approve, reject, request more documents or suspend the account.</div>
            </>
          )}

          <label className="mt-5 flex items-start gap-2 text-[0.76rem] text-[#4c5a52]"><input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#1d7a56]" /> I agree to the Terms of Service and acknowledge the Privacy Policy and NDPA-aligned data protection practices.</label>
          <button className="btn btn-primary mt-5 w-full btn-lg">Create {type === "corporate" ? "Business" : "Personal"} Account <ArrowRight size={16} /></button>
          <p className="mt-4 text-center text-[0.78rem] text-muted">Already have an account? <Link href="/login" className="font-bold text-leaf">Sign in</Link></p>
        </form>

        <div className="mt-5 text-center">
          <Link href="/checkout?guest=1" className="text-[0.82rem] font-bold text-leaf">Prefer to order without an account? Use Guest Checkout →</Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense fallback={<div className="container-x py-16 text-center text-muted">Loading registration…</div>}><RegisterForm /></Suspense>;
}
