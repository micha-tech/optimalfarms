"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ArrowRight, UserRound, Building2, ShieldCheck, Truck, LayoutDashboard, Eye, EyeOff } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { demoUsers } from "@/lib/data";
import type { Role } from "@/lib/types";

const portals: { role: Role; label: string; icon: React.ElementType; href: string; note: string }[] = [
  { role: "individual", label: "Customer", icon: UserRound, href: "/portal/customer", note: "Orders, invoices, addresses" },
  { role: "corporate", label: "Business", icon: Building2, href: "/portal/customer", note: "Bulk orders and credit" },
  { role: "staff", label: "Staff", icon: ShieldCheck, href: "/portal/staff", note: "Daily farm operations" },
  { role: "admin", label: "Administrator", icon: LayoutDashboard, href: "/portal/admin", note: "Full business visibility" },
  { role: "supplier", label: "Supplier", icon: Truck, href: "/portal/supplier", note: "POs, invoices, payments" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs, pushToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const go = (role: Role) => {
    router.push(role === "admin" ? "/portal/admin" : role === "staff" ? "/portal/staff" : role === "supplier" ? "/portal/supplier" : "/portal/customer");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || password.length < 4) {
      setError("We couldn't sign you in with those details. Use a demo account below or enter any password of 4+ characters with a demo email.");
      return;
    }
    login(user);
    go(user.role);
  };

  return (
    <div className="container-x py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#e4ebe5] bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hero-pattern grid-pattern p-8 text-white md:p-10">
          <p className="eyebrow">Welcome back</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">Sign in to your account</h1>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-white/75">Access the right tools for your role — from shopping and order tracking to farm operations, finance and supplier management.</p>
          <div className="mt-9 space-y-3">
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <button key={p.role} onClick={() => { loginAs(p.role); go(p.role); }} className="flex w-full items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-left backdrop-blur transition hover:border-gold hover:bg-white/15">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/20 text-gold"><Icon size={17} /></span>
                  <span className="flex-1"><span className="block text-[0.82rem] font-bold">{p.label} portal</span><span className="block text-[0.68rem] text-white/60">{p.note}</span></span>
                  <ArrowRight size={15} className="text-white/60" />
                </button>
              );
            })}
          </div>
          <p className="mt-7 text-[0.7rem] leading-relaxed text-white/55">Demo access: click any portal above, or use the demo email addresses with any password of 4+ characters. In production, credentials are verified by the server with hashed passwords and optional two-factor authentication.</p>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold text-forest">Sign in with email</h2>
          <p className="mt-1 text-[0.82rem] text-muted">Enter your registered email address and password.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><label className="field">Email address</label><div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input type="email" className="input pl-9" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="you@example.com" required /></div></div>
            <div><label className="field">Password</label><div className="relative"><LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input type={show ? "text" : "password"} className="input pl-9 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></div>
            {error && <p className="rounded-lg bg-red-50 p-3 text-[0.76rem] text-red-700">{error}</p>}
            <div className="flex items-center justify-between text-[0.76rem]">
              <label className="flex items-center gap-2 text-[#4c5a52]"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#1d7a56]" /> Remember me</label>
              <button type="button" onClick={() => pushToast("Password reset link would be sent by email.", "info")} className="font-bold text-leaf">Forgot password?</button>
            </div>
            <button className="btn btn-primary w-full btn-lg">Sign in <ArrowRight size={16} /></button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[0.7rem] text-muted"><div className="h-px flex-1 bg-[#e8ede9]" /> New here? <div className="h-px flex-1 bg-[#e8ede9]" /></div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/register" className="btn btn-outline">Create an account</Link>
            <Link href="/register?type=corporate" className="btn btn-outline">Register as a Business</Link>
          </div>
          <Link href="/checkout?guest=1" className="mt-3 block text-center text-[0.78rem] font-bold text-leaf">Continue as guest instead →</Link>

          <div className="mt-7 rounded-xl bg-[#f6f9f6] p-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Demo credentials</p>
            <div className="mt-2 space-y-1 text-[0.72rem] text-[#4c5a52]">
              {demoUsers.map((u) => <p key={u.id}><span className="font-bold text-forest">{u.role}:</span> {u.email}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
