"use client";

import { useState } from "react";
import { UserRound, Bell, LockKeyhole, Save } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { useApp } from "@/components/providers/AppProvider";

export default function SettingsPage() {
  const { user, pushToast } = useApp();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [twoFA, setTwoFA] = useState(false);

  return (
    <PortalShell section="customer" title="Profile & Settings" subtitle="Manage your personal details, preferences and security.">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card p-6 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest font-display text-2xl font-bold text-gold">{name.slice(0, 2).toUpperCase() || "OR"}</span>
          <h3 className="mt-4 font-display text-xl font-bold text-forest">{user?.name}</h3>
          <p className="text-[0.78rem] text-muted">{user?.company ?? "Individual customer"}</p>
          <p className="mt-1 text-[0.74rem] text-muted">{user?.email}</p>
          <div className="mt-4 flex justify-center gap-2"><span className="badge badge-green">Email verified</span><span className="badge badge-green">Phone verified</span></div>
          <div className="mt-6 border-t border-[#edf1ed] pt-4 text-left text-[0.76rem] text-muted">
            <p>Account status: <strong className="text-forest">{user?.status ?? "Active"}</strong></p>
            <p>Account type: <strong className="text-forest capitalize">{user?.role}</strong></p>
            <p>Customer ID: <strong className="text-forest">{user?.id}</strong></p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card p-6">
            <div className="flex items-center gap-2"><UserRound size={18} className="text-leaf" /><h3 className="font-display text-lg font-bold text-forest">Personal information</h3></div>
            <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); pushToast("Profile updated."); }}>
              <div className="sm:col-span-2"><label className="field">Full name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label className="field">Email address</label><input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><label className="field">Phone number</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div className="sm:col-span-2"><button className="btn btn-primary"><Save size={15} /> Save changes</button></div>
            </form>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2"><Bell size={18} className="text-leaf" /><h3 className="font-display text-lg font-bold text-forest">Notification preferences</h3></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Order confirmations", "Payment confirmation", "Delivery updates", "Promotional offers", "Credit balance reminders", "In-app notifications"].map((n) => (
                <label key={n} className="flex items-center gap-2 rounded-lg bg-[#f7faf7] px-3 py-2 text-[0.76rem] text-[#45534b]"><input type="checkbox" defaultChecked={!n.includes("Promotional")} className="h-4 w-4 accent-[#1d7a56]" /> {n}</label>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2"><LockKeyhole size={18} className="text-leaf" /><h3 className="font-display text-lg font-bold text-forest">Security</h3></div>
            <div className="mt-4 space-y-3">
              <button onClick={() => pushToast("Password change link would be sent to your email.", "info")} className="btn btn-outline btn-sm">Change password</button>
              <label className="flex items-start gap-2 text-[0.78rem] text-[#45534b]"><input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1d7a56]" /><span>Enable two-factor authentication (recommended for corporate accounts)</span></label>
              <p className="text-[0.72rem] text-muted">Login history: last sign-in today from this browser. Session management and suspicious activity checks are enforced server-side in production.</p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
