"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Truck, CheckCircle2, Clock3, PackageCheck, Camera, AlertCircle, Navigation } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dateTime, deliveryStages, naira, stageIndex } from "@/lib/utils";

export default function TrackOrder() {
  const params = useSearchParams();
  const { orders } = useApp();
  const [ref, setRef] = useState(params.get("ref") ?? "");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [foundId, setFoundId] = useState<string | null>(params.get("ref") ? "auto" : null);
  const [error, setError] = useState("");

  useEffect(() => {
    const initial = params.get("ref");
    if (initial && orders.some((o) => o.reference === initial)) setFoundId(orders.find((o) => o.reference === initial)!.id);
  }, [params, orders]);

  const order = foundId === "auto" ? orders.find((o) => o.reference === params.get("ref")) : orders.find((o) => o.id === foundId);

  const search = () => {
    const match = orders.find((o) =>
      (o.reference.toLowerCase() === ref.trim().toLowerCase() || o.trackingCode.toLowerCase() === ref.trim().toLowerCase()) &&
      (!email || o.customerEmail.toLowerCase() === email.trim().toLowerCase()) &&
      (!code || o.trackingCode.toLowerCase() === code.trim().toLowerCase())
    );
    if (match) { setFoundId(match.id); setError(""); }
    else setError("No order matched those details. Check the reference, email or tracking code and try again.");
  };

  const current = order ? stageIndex(order.status) : 0;

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-4xl font-bold text-forest">Track your order</h1>
      <p className="mt-2 max-w-2xl text-[0.88rem] text-muted">Follow your order from confirmation to delivery. Enter the reference from your confirmation message, or the secure tracking code provided to guest customers.</p>

      <div className="card mt-7 p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
          <div><label className="field">Order reference or tracking code</label><input className="input" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="ORF-261100-XXXX" /></div>
          <div><label className="field">Email address (optional)</label><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <div><label className="field">Secure code (optional)</label><input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="TRK-000000" /></div>
          <button onClick={search} className="btn btn-primary h-[42px]"><Search size={16} /> Track</button>
        </div>
        {error && <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] text-red-600"><AlertCircle size={14} /> {error}</p>}
      </div>

      {order && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="card p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Order reference</p>
                  <h2 className="font-display text-2xl font-bold text-forest">{order.reference}</h2>
                  <p className="mt-1 text-[0.76rem] text-muted">Placed {dateTime(order.createdAt)}</p>
                </div>
                <span className={`badge ${order.status === "Delivered" ? "badge-green" : order.status === "Cancelled" ? "badge-red" : "badge-gold"}`}>{order.status}</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Payment", order.paymentStatus], ["Method", order.paymentMethod], ["Delivery", order.deliveryMethod], ["Total", naira(order.total)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-[#f7faf7] p-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">{k}</p>
                    <p className="mt-1 text-[0.78rem] font-bold text-forest">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 md:p-6">
              <h3 className="font-display text-xl font-bold text-forest">Delivery progress</h3>
              {order.status === "Delivered" ? (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-leaf-light p-4 text-leaf"><CheckCircle2 size={22} /><div><p className="text-[0.85rem] font-bold">Delivered successfully</p><p className="text-[0.74rem]">Proof of delivery captured at the customer location.</p></div></div>
              ) : (
                <div className="mt-6">
                  <div className="relative flex justify-between">
                    <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-[#e9eeea]" />
                    <div className="absolute left-0 top-3 h-1 rounded-full bg-leaf transition-all" style={{ width: `${(current / (deliveryStages.length - 1)) * 100}%` }} />
                    {deliveryStages.map((stage, i) => (
                      <div key={stage} className="relative z-10 flex w-1/12 flex-col items-center">
                        <span className={`grid h-6 w-6 place-items-center rounded-full border-2 text-[0.6rem] font-bold ${i <= current ? "border-leaf bg-leaf text-white" : "border-[#d5dfd7] bg-white text-muted"}`}>{i < current ? <CheckCircle2 size={13} /> : i + 1}</span>
                        <span className={`mt-2 hidden text-center text-[0.58rem] font-semibold leading-tight sm:block ${i <= current ? "text-leaf" : "text-muted"}`}>{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl bg-forest p-4">
                    <p className="text-[0.68rem] uppercase tracking-wider text-gold">Current stage</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">{order.status}</p>
                    <p className="mt-1 text-[0.75rem] text-white/70">Stage {current + 1} of {deliveryStages.length}</p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-[0.82rem] font-bold text-forest">Delivery history</h4>
                <div className="mt-3 space-y-0">
                  {[...order.timeline].reverse().map((event, i) => (
                    <div key={`${event.status}-${i}`} className="flex gap-3">
                      <div className="flex flex-col items-center"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${i === 0 ? "bg-leaf" : "bg-[#c8d4cb]"}`} />{i < order.timeline.length - 1 && <div className="w-px flex-1 bg-[#e1e8e2]" />}</div>
                      <div className="pb-4">
                        <p className="text-[0.8rem] font-bold text-forest">{event.status}</p>
                        <p className="text-[0.7rem] text-muted">{dateTime(event.at)}</p>
                        {event.note && <p className="mt-1 text-[0.72rem] text-[#4c5a52]">{event.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card overflow-hidden">
              <div className="grid h-44 place-items-center bg-[#e4ede5]">
                <div className="text-center text-forest/50">
                  <Navigation size={30} className="mx-auto" />
                  <p className="mt-2 text-[0.72rem] font-semibold">Delivery map</p>
                  <p className="text-[0.65rem]">Live GPS available when a logistics partner provides tracking</p>
                </div>
              </div>
              <div className="space-y-3 p-5 text-[0.78rem]">
                <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-leaf" /><span>{order.address ? `${order.address.recipient}, ${order.address.street}, ${order.address.city}, ${order.address.state}` : "Address on file"}</span></p>
                <p className="flex items-center gap-2"><Truck size={15} className="shrink-0 text-leaf" /> {order.deliveryMethod}</p>
                {order.timeline.some((e) => e.note?.includes("Driver")) && <p className="flex items-start gap-2"><Camera size={15} className="shrink-0 text-leaf" /> {order.timeline.find((e) => e.note?.includes("Driver"))?.note}</p>}
                <p className="flex items-center gap-2"><Clock3 size={15} className="shrink-0 text-leaf" /> Estimated delivery: 1–2 business days after dispatch</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-display text-lg font-bold text-forest">Items in this order</h3>
              <div className="mt-3 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between gap-3 text-[0.78rem]">
                    <span className="text-[#45534b]">{item.quantity} × {item.name}</span>
                    <span className="font-bold text-forest">{naira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="divider my-3" />
              <div className="flex justify-between text-[0.85rem] font-bold text-forest"><span>Total</span><span>{naira(order.total)}</span></div>
            </div>
            <Link href="/portal/customer/invoices" className="btn btn-outline w-full">View invoices & receipts</Link>
            <Link href="/contact" className="btn btn-ghost w-full">Need help with this order?</Link>
          </div>
        </div>
      )}

      {!order && foundId === null && (
        <div className="card mt-8 grid place-items-center p-14 text-center">
          <PackageCheck size={32} className="text-muted" />
          <h2 className="mt-4 font-display text-xl font-bold text-forest">Enter your order details above</h2>
          <p className="mt-2 max-w-md text-[0.82rem] text-muted">You can also view all your orders from your customer dashboard after signing in.</p>
          <Link href="/portal/customer/orders" className="btn btn-outline mt-5">Go to my orders</Link>
        </div>
      )}
    </div>
  );
}
