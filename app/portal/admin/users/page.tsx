"use client";

import { useState } from "react";
import { UserCog, Plus, Search, ShieldCheck, KeyRound } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { Badge, TablePanel, Panel } from "@/components/portals/UI";
import { staffMembers } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

const roles = ["Super Administrator", "Managing Director", "Finance Manager", "Accountant", "Sales Manager", "Sales Representative", "Procurement Manager", "Procurement Officer", "Store Manager", "Inventory Officer", "Farm Manager", "Poultry Supervisor", "Fish Farm Supervisor", "Livestock Supervisor", "Production Officer", "Quality Control Officer", "Dispatch Officer", "Delivery Driver", "Customer Service Officer", "Auditor", "Supplier User"];

export default function UsersPage() {
  const { pushToast } = useApp();
  const [search, setSearch] = useState("");
  const rows = staffMembers.filter((s) => `${s.name} ${s.role} ${s.dept}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <PortalShell section="admin" title="Users & Permissions" subtitle="Manage staff accounts, roles and role-based access control." actions={<button onClick={() => pushToast("New user form opened.", "info")} className="btn btn-primary"><Plus size={15} /> Add user</button>}>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#edf1ed] p-4"><div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input pl-9" placeholder="Search staff" value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          <div className="table-wrap"><table className="data">
            <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>2FA</th><th></th></tr></thead>
            <tbody>{rows.map((s) => <tr key={s.name}><td className="font-bold text-forest">{s.name}</td><td>{s.role}</td><td>{s.dept}</td><td><Badge text={s.status} tone="green" /></td><td><Badge text="Enabled" tone="blue" /></td><td><button onClick={() => pushToast(`Permissions for ${s.name} opened.`, "info")} className="text-[0.74rem] font-bold text-leaf">Manage</button></td></tr>)}</tbody>
          </table></div>
        </div>
        <div className="space-y-5">
          <Panel title="System roles">
            <div className="max-h-80 space-y-1 overflow-y-auto pr-1">{roles.map((r) => <div key={r} className="flex items-center gap-2 rounded-lg bg-[#f7faf7] px-3 py-1.5 text-[0.73rem] text-[#45534b]"><ShieldCheck size={13} className="text-leaf" /> {r}</div>)}</div>
          </Panel>
          <Panel title="Access control">
            <p className="text-[0.76rem] leading-relaxed text-muted">Permissions are granted per role. Separation of duties is enforced: store officers cannot approve their own adjustments, buyers cannot approve their own purchases, and drivers see only assigned deliveries.</p>
            <button onClick={() => pushToast("Two-factor authentication policy settings opened.", "info")} className="btn btn-outline btn-sm mt-4 w-full"><KeyRound size={14} /> 2FA policy</button>
          </Panel>
        </div>
      </div>
    </PortalShell>
  );
}
