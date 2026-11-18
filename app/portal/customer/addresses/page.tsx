"use client";

import { useState } from "react";
import { MapPin, Plus, Star, Trash2 } from "lucide-react";
import PortalShell from "@/components/portals/PortalShell";
import { useApp } from "@/components/providers/AppProvider";
import { uid } from "@/lib/utils";
import type { Address } from "@/lib/types";

const blank: Address = { id: "", label: "", recipient: "", phone: "", state: "", lga: "", city: "", street: "", houseNumber: "", landmark: "", postalCode: "", instructions: "" };

export default function AddressesPage() {
  const { addresses, addAddress, removeAddress } = useApp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<Address>(blank);
  const set = (key: keyof Address, value: string) => setForm({ ...form, [key]: value });

  return (
    <PortalShell section="customer" title="Saved Addresses" subtitle="Manage delivery addresses, branches and warehouses." actions={<button onClick={() => setShow(!show)} className="btn btn-primary"><Plus size={15} /> {show ? "Cancel" : "Add address"}</button>}>
      {show && (
        <form className="card mb-5 grid gap-4 p-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); addAddress({ ...form, id: uid("addr") }); setForm(blank); setShow(false); }}>
          {([
            ["label", "Address label (e.g. Home, Warehouse)"], ["recipient", "Recipient's full name"], ["phone", "Recipient's phone"], ["state", "State"],
            ["lga", "Local Government Area"], ["city", "City / town"], ["street", "Street address"], ["houseNumber", "House / building number"],
            ["landmark", "Estate / landmark"], ["postalCode", "Postal code"],
          ] as const).map(([key, label]) => (
            <div key={key} className={key === "label" ? "sm:col-span-2" : ""}><label className="field">{label}</label><input className="input" value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} required={["label", "recipient", "phone", "state", "city", "street"].includes(key)} /></div>
          ))}
          <div className="sm:col-span-2"><label className="field">Additional delivery instructions</label><textarea className="input" value={form.instructions ?? ""} onChange={(e) => set("instructions", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className="flex items-center gap-2 text-[0.78rem] font-semibold text-forest"><input type="checkbox" className="h-4 w-4 accent-[#1d7a56]" checked={!!form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Set as default delivery address</label></div>
          <div className="sm:col-span-2"><button className="btn btn-primary">Save address</button></div>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {addresses.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf-light text-leaf"><MapPin size={17} /></span><div><p className="text-[0.84rem] font-bold text-forest">{a.label}</p><p className="text-[0.7rem] text-muted">{a.recipient}</p></div></div>
              {a.isDefault && <span className="badge badge-gold"><Star size={11} /> Default</span>}
            </div>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-[#4a584f]">{a.street}{a.houseNumber ? `, ${a.houseNumber}` : ""}{a.landmark ? `, ${a.landmark}` : ""}<br />{a.city}, {a.lga}, {a.state}{a.postalCode ? ` · ${a.postalCode}` : ""}</p>
            <p className="mt-2 text-[0.74rem] text-muted">{a.phone}</p>
            {a.instructions && <p className="mt-2 rounded-lg bg-[#f7faf7] p-2 text-[0.7rem] text-muted">{a.instructions}</p>}
            <button onClick={() => removeAddress(a.id)} className="btn btn-ghost btn-sm mt-4 text-red-600"><Trash2 size={13} /> Remove</button>
          </div>
        ))}
        {addresses.length === 0 && <div className="card col-span-full grid place-items-center p-12 text-center text-muted"><MapPin size={28} /><p className="mt-2 text-[0.84rem]">No saved addresses yet.</p></div>}
      </div>
    </PortalShell>
  );
}
