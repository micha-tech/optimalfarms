"use client";

import { Settings2, Save, Database, Bell, LockKeyhole, CreditCard, Truck, Mail } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Panel } from "@/components/portals/UI";
import { useApp } from "@/components/providers/AppProvider";

export default function AdminSettingsPage() {
  const { pushToast } = useApp();
  return (
    <PortalShell section="admin" title="System Settings" subtitle="Business rules, integrations and platform configuration.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Business rules">
          <div className="space-y-3">
            {[
              ["Confirm payment before dispatch", true], ["Verify bank transfers against provider", true], ["Reserve stock on order confirmation", true],
              ["Release unpaid reserved stock after 48 hours", true], ["Require approval for stock adjustments", true],
              ["Require proof of delivery before Delivered", true], ["Enforce corporate credit limits", true], ["Log all sensitive changes", true],
            ].map(([label, value]) => <label key={label as string} className="flex items-center justify-between gap-3 rounded-lg border border-[#edf1ed] p-2.5 text-[0.78rem] text-[#45534b]"><span>{label as string}</span><input type="checkbox" defaultChecked={value as boolean} className="h-4 w-4 accent-[#1d7a56]" /></label>)}
          </div>
          <button onClick={() => pushToast("Business rules saved.")} className="btn btn-primary mt-4"><Save size={15} /> Save rules</button>
        </Panel>
        <div className="space-y-5">
          <Panel title="Integrations">
            <div className="space-y-2">{[
              { icon: CreditCard, name: "Payment gateways", detail: "Paystack · Flutterwave · Bank reconciliation" },
              { icon: Mail, name: "Communications", detail: "Email · SMS · WhatsApp Business API" },
              { icon: Truck, name: "Maps & logistics", detail: "Google Maps · GPS tracking · partner APIs" },
              { icon: Database, name: "Accounting", detail: "Internal module or Zoho Books integration" },
            ].map(({ icon: Icon, name, detail }) => <div key={name} className="flex items-start gap-3 rounded-lg border border-[#edf1ed] p-3"><Icon size={17} className="mt-0.5 shrink-0 text-leaf" /><span><span className="block text-[0.8rem] font-bold text-forest">{name}</span><span className="block text-[0.7rem] text-muted">{detail}</span></span></div>)}</div>
            <p className="mt-3 text-[0.7rem] text-muted">Credentials are stored server-side only. Secrets must never be exposed in browser code.</p>
          </Panel>
          <Panel title="Security & notifications">
            <div className="space-y-2 text-[0.78rem]">
              {[["Two-factor authentication", "Required for privileged roles"], ["Session timeout", "30 minutes"], ["Automated backups", "Daily, encrypted"], ["Data retention", "7 years for financial records"], ["Password policy", "12 characters, complexity required"]].map(([k, v]) => <div key={k} className="flex justify-between border-b border-[#edf1ed] pb-2"><span className="text-muted">{k}</span><span className="font-bold text-forest">{v}</span></div>)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[0.74rem] text-[#45534b]"><Bell size={15} className="text-leaf" /> Notification routing configured for all staff roles.</div>
          </Panel>
        </div>
      </div>
    </PortalShell>
  );
}
