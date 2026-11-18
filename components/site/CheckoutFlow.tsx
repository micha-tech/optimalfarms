"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check, ChevronRight, ChevronLeft, MapPin, Truck, CreditCard, Building2, Wallet,
  CalendarDays, ShieldCheck, CheckCircle2, PackageCheck, ClipboardList, UserRound, AlertCircle,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { products } from "@/lib/data";
import { naira, uid } from "@/lib/utils";
import type { Address, Order, Role } from "@/lib/types";

const steps = ["Customer", "Delivery", "Options", "Review", "Payment", "Confirmed"];

const deliveryMethods = [
  { name: "Farm pickup", fee: 0, note: "Collect from our farm by appointment" },
  { name: "Farm-managed delivery", fee: 2500, note: "Delivered by our own team" },
  { name: "Scheduled delivery", fee: 3500, note: "Choose a date and time window" },
  { name: "Third-party logistics", fee: 4200, note: "Delivered through a logistics partner" },
  { name: "Bulk corporate delivery", fee: 15000, note: "For large orders and regular supply" },
];

const payments = [
  { name: "Paystack (Card / USSD)", icon: CreditCard, note: "Secure online payment — instant confirmation" },
  { name: "Bank transfer", icon: Building2, note: "Verified against actual bank transaction" },
  { name: "Payment link", icon: Wallet, note: "We send a secure payment link to your email" },
  { name: "Part payment / deposit", icon: Wallet, note: "Pay a deposit, balance before dispatch" },
  { name: "Corporate credit", icon: ClipboardList, note: "Available to approved corporate accounts only" },
];

const blankAddress = (): Address => ({
  id: uid("addr"), label: "Delivery address", recipient: "", phone: "", state: "", lga: "", city: "",
  street: "", houseNumber: "", landmark: "", postalCode: "", instructions: "",
});

export default function CheckoutFlow() {
  const params = useSearchParams();
  const { cart, cartSubtotal, user, addresses, addAddress, placeOrder, pushToast } = useApp();
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<Order | null>(null);
  const [guest, setGuest] = useState(params.get("guest") === "1" || !user);
  const [customer, setCustomer] = useState({
    name: user?.name ?? "", email: user?.email ?? "", phone: user?.phone ?? "",
  });
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses.find((a) => a.isDefault)?.id ?? "");
  const [showAddressForm, setShowAddressForm] = useState(addresses.length === 0);
  const [newAddress, setNewAddress] = useState<Address>(blankAddress());
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[1].name);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("Morning (8am – 12pm)");
  const [paymentMethod, setPaymentMethod] = useState(payments[0].name);
  const [promo, setPromo] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const lines = cart.map((item) => ({ item, product: products.find((p) => p.id === item.productId)! })).filter((l) => l.product);
  const fee = deliveryMethods.find((m) => m.name === deliveryMethod)?.fee ?? 0;
  const discount = discountApplied ? cartSubtotal * 0.1 : 0;
  const vat = Math.max(0, cartSubtotal - discount) * 0.075;
  const total = cartSubtotal + fee + vat - discount;
  const address = addresses.find((a) => a.id === selectedAddress) ?? null;

  const canAdvance = useMemo(() => {
    if (step === 0) return customer.name.trim().length > 1 && customer.email.includes("@") && customer.phone.trim().length > 5;
    if (step === 1) return !!address || newAddress.recipient.trim().length > 0;
    if (step === 4) return !!paymentMethod;
    return true;
  }, [step, customer, address, newAddress, paymentMethod]);

  const next = () => {
    setErrors([]);
    if (step === 1 && !address && newAddress.recipient) {
      if (!newAddress.phone || !newAddress.state || !newAddress.city || !newAddress.street) {
        setErrors(["Please complete recipient, phone, state, city and street address."]);
        return;
      }
      addAddress({ ...newAddress, isDefault: addresses.length === 0 });
      setSelectedAddress(newAddress.id);
      setShowAddressForm(false);
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    let finalAddress = address;
    if (!finalAddress && newAddress.recipient) {
      finalAddress = { ...newAddress, isDefault: addresses.length === 0 };
      addAddress(finalAddress);
    }
    const created = placeOrder({
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerType: guest ? "guest" : (user?.role ?? "individual"),
      address: finalAddress,
      deliveryMethod,
      paymentMethod,
      deliveryFee: fee,
      discount,
      note: deliveryDate ? `Preferred delivery: ${deliveryDate} (${timeWindow})` : undefined,
    });
    setOrder(created);
    setStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (order) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <div className="card overflow-hidden">
          <div className="bg-leaf px-8 py-10 text-center text-white">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15"><CheckCircle2 size={34} /></span>
            <h1 className="mt-4 font-display text-3xl font-bold">Order placed successfully</h1>
            <p className="mt-2 text-[0.88rem] text-white/80">Thank you, {order.customerName}. We have received your order and sent a confirmation to {order.customerEmail}.</p>
          </div>
          <div className="p-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {[["Order reference", order.reference], ["Tracking code", order.trackingCode], ["Total", naira(order.total)]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#f5f8f5] p-4 text-center">
                  <p className="text-[0.66rem] font-bold uppercase tracking-wider text-muted">{k}</p>
                  <p className="mt-1 break-all font-display text-[1.05rem] font-bold text-forest">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[#e4ebe5] p-5">
              <h3 className="font-display text-lg font-bold text-forest">What happens next?</h3>
              <ol className="mt-3 space-y-2 text-[0.82rem] text-[#4c5a52]">
                <li className="flex gap-2"><Check size={15} className="text-leaf" /> {order.paymentStatus === "Pending" ? "Verify your bank transfer — we confirm against the actual transaction." : order.paymentStatus === "Credit Approved" ? "Credit approved — your order moves to confirmation." : "Payment confirmed — your order moves to confirmation."}</li>
                <li className="flex gap-2"><Check size={15} className="text-leaf" /> Our team confirms and prepares your order, with quality inspection before dispatch.</li>
                <li className="flex gap-2"><Check size={15} className="text-leaf" /> You receive milestone updates and proof of delivery on arrival.</li>
              </ol>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/track?ref=${encodeURIComponent(order.reference)}`} className="btn btn-primary">Track this order <ChevronRight size={15} /></Link>
              <Link href="/products" className="btn btn-outline">Continue shopping</Link>
            </div>
            {guest && (
              <div className="mt-5 rounded-xl bg-gold-light p-4 text-[0.8rem] text-[#72580c]">
                <strong>Want an account?</strong> Creating one lets you save addresses, view invoices and track future orders easily. <Link href="/register" className="font-bold underline">Create account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-x py-16">
        <div className="card mx-auto grid max-w-lg place-items-center p-12 text-center">
          <PackageCheck size={34} className="text-muted" />
          <h1 className="mt-4 font-display text-2xl font-bold text-forest">Your cart is empty</h1>
          <p className="mt-2 text-[0.85rem] text-muted">Add products to your cart before proceeding to checkout.</p>
          <Link href="/products" className="btn btn-primary mt-5">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-4xl font-bold text-forest">Checkout</h1>
      <p className="mt-2 text-[0.86rem] text-muted">Complete the steps below to place your order securely.</p>

      <div className="mt-7 flex flex-wrap items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <div className={`flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.68rem] font-bold ${i === step ? "bg-forest text-white" : i < step ? "bg-leaf-light text-leaf" : "bg-[#eef2ee] text-muted"}`}>
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[0.6rem] ${i < step ? "bg-leaf text-white" : i === step ? "bg-white/20" : "bg-white"}`}>{i < step ? <Check size={10} /> : i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-[#e1e8e2]" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="card p-6">
          {errors.length > 0 && <div className="mb-4 rounded-lg bg-red-50 p-3 text-[0.78rem] text-red-700"><AlertCircle size={14} className="mr-1 inline" />{errors[0]}</div>}

          {step === 0 && (
            <div>
              <div className="mb-5 flex items-center gap-2"><UserRound size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Customer information</h2></div>
              <div className="mb-5 flex gap-2">
                <button onClick={() => setGuest(false)} disabled={!user} className={`btn btn-sm ${!guest ? "btn-primary" : "btn-outline"}`}>Signed-in account{!user ? " (sign in first)" : ""}</button>
                <button onClick={() => setGuest(true)} className={`btn btn-sm ${guest ? "btn-primary" : "btn-outline"}`}>Guest Checkout</button>
              </div>
              {!user && !guest && <div className="mb-4 rounded-lg bg-gold-light p-3 text-[0.78rem] text-[#72580c]">Please <Link href="/login" className="font-bold underline">sign in</Link> or use Guest Checkout.</div>}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="field">Full name</label><input className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Your full name" /></div>
                <div><label className="field">Email address</label><input type="email" className="input" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" /></div>
                <div><label className="field">Mobile phone number</label><input className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+234 803 000 0000" /></div>
              </div>
              <p className="mt-4 text-[0.75rem] text-muted">Order confirmations and delivery updates will be sent by email, SMS and WhatsApp where available.</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="mb-5 flex items-center gap-2"><MapPin size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Delivery information</h2></div>
              {addresses.length > 0 && (
                <div className="space-y-2">
                  {addresses.map((a) => (
                    <button key={a.id} onClick={() => { setSelectedAddress(a.id); setShowAddressForm(false); }} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${selectedAddress === a.id && !showAddressForm ? "border-leaf bg-leaf-light" : "border-[#e4ebe5] hover:border-leaf"}`}>
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${selectedAddress === a.id && !showAddressForm ? "border-leaf bg-leaf text-white" : "border-[#b9c6bc]"}`}>{selectedAddress === a.id && !showAddressForm && <Check size={10} />}</span>
                      <span><span className="block text-[0.82rem] font-bold text-forest">{a.label} — {a.recipient}</span><span className="block text-[0.75rem] text-muted">{a.street}, {a.city}, {a.lga}, {a.state}</span></span>
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => setShowAddressForm(!showAddressForm)} className="btn btn-outline btn-sm mt-3">+ {showAddressForm ? "Cancel" : "Add a new address"}</button>
              {showAddressForm && (
                <div className="mt-4 grid gap-3 rounded-xl border border-[#e4ebe5] bg-[#fafcf9] p-4 sm:grid-cols-2">
                  {([
                    ["recipient", "Recipient's full name"], ["phone", "Recipient's phone"], ["state", "State"], ["lga", "Local Government Area"],
                    ["city", "City / town"], ["street", "Street address"], ["houseNumber", "House / building number"], ["landmark", "Estate / landmark"], ["postalCode", "Postal code"],
                  ] as const).map(([key, label]) => (
                    <div key={key} className={key === "recipient" ? "sm:col-span-2" : ""}>
                      <label className="field">{label}</label>
                      <input className="input" value={newAddress[key] ?? ""} onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="sm:col-span-2"><label className="field">Additional delivery instructions</label><textarea className="input" value={newAddress.instructions} onChange={(e) => setNewAddress({ ...newAddress, instructions: e.target.value })} /></div>
                  <label className="flex items-center gap-2 text-[0.78rem] font-semibold text-forest sm:col-span-2"><input type="checkbox" className="h-4 w-4 accent-[#1d7a56]" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} /> Set as default delivery address</label>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-5 flex items-center gap-2"><Truck size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Delivery options</h2></div>
              <div className="space-y-2">
                {deliveryMethods.map((m) => (
                  <button key={m.name} onClick={() => setDeliveryMethod(m.name)} className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition ${deliveryMethod === m.name ? "border-leaf bg-leaf-light" : "border-[#e4ebe5] hover:border-leaf"}`}>
                    <span><span className="block text-[0.84rem] font-bold text-forest">{m.name}</span><span className="block text-[0.72rem] text-muted">{m.note}</span></span>
                    <span className="text-[0.82rem] font-bold text-leaf">{m.fee === 0 ? "Free" : naira(m.fee)}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label className="field">Preferred delivery date</label><input type="date" className="input" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} min={new Date().toISOString().slice(0, 10)} /></div>
                <div><label className="field">Time window</label><select className="input" value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)}><option>Morning (8am – 12pm)</option><option>Afternoon (12pm – 4pm)</option><option>Evening (4pm – 6pm)</option></select></div>
              </div>
              {lines.some((l) => l.product.estimatedWeight || l.product.category === "Livestock") && (
                <div className="mt-4 flex gap-2 rounded-xl bg-gold-light p-3 text-[0.76rem] text-[#72580c]"><AlertCircle size={16} className="shrink-0" /> Your order contains live animals or products sold by estimated weight. Final weight and delivery arrangements are confirmed before dispatch.</div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-5 flex items-center gap-2"><ClipboardList size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Review your order</h2></div>
              <div className="space-y-3">
                {lines.map(({ item, product }) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3 border-b border-[#edf1ed] pb-3">
                    <div><p className="text-[0.84rem] font-bold text-forest">{product.name} × {item.quantity}</p><p className="text-[0.72rem] text-muted">{item.variant ?? product.unit}</p></div>
                    <p className="font-bold text-forest">{naira(product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-4 rounded-xl bg-[#f7faf7] p-4 sm:grid-cols-2 text-[0.78rem]">
                <div><p className="text-muted">Customer</p><p className="font-bold text-forest">{customer.name}</p><p className="text-muted">{customer.email}</p></div>
                <div><p className="text-muted">Delivery</p><p className="font-bold text-forest">{deliveryMethod}</p><p className="text-muted">{address ? `${address.street}, ${address.city}, ${address.state}` : "Address captured"}</p></div>
                {deliveryDate && <div><p className="text-muted">Preferred date</p><p className="font-bold text-forest">{deliveryDate} · {timeWindow}</p></div>}
              </div>
              <div className="mt-5 flex gap-2">
                <input className="input" placeholder="Promo code (try ORF10)" value={promo} onChange={(e) => setPromo(e.target.value)} />
                <button className="btn btn-outline shrink-0" onClick={() => { if (promo.toUpperCase() === "ORF10") { setDiscountApplied(true); pushToast("Promo applied."); } else pushToast("Invalid promo code.", "error"); }}>Apply</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="mb-5 flex items-center gap-2"><CreditCard size={19} className="text-leaf" /><h2 className="font-display text-xl font-bold text-forest">Payment method</h2></div>
              <div className="space-y-2">
                {payments.map((p) => {
                  const Icon = p.icon;
                  const disabled = p.name === "Corporate credit" && user?.role !== "corporate";
                  return (
                    <button key={p.name} disabled={disabled} onClick={() => setPaymentMethod(p.name)} className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition disabled:opacity-45 ${paymentMethod === p.name ? "border-leaf bg-leaf-light" : "border-[#e4ebe5] hover:border-leaf"}`}>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-leaf"><Icon size={17} /></span>
                      <span className="flex-1"><span className="block text-[0.83rem] font-bold text-forest">{p.name}</span><span className="block text-[0.71rem] text-muted">{disabled ? "Only available to approved corporate customers" : p.note}</span></span>
                      {paymentMethod === p.name && <CheckCircle2 size={17} className="text-leaf" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex gap-2 rounded-xl bg-leaf-light p-3.5 text-[0.76rem] text-[#1c5d42]"><ShieldCheck size={17} className="shrink-0" /><span>Paymentdetails are processed by secure providers. We never treat a bank transfer as paid until the actual transaction is verified.</span></div>
            </div>
          )}

          <div className="mt-7 flex items-center justify-between border-t border-[#edf1ed] pt-5">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn btn-ghost"><ChevronLeft size={15} /> Back</button>
            {step < 4 ? (
              <button onClick={next} disabled={!canAdvance} className="btn btn-primary">Continue <ChevronRight size={15} /></button>
            ) : (
              <button onClick={submit} className="btn btn-primary btn-lg"><ShieldCheck size={17} /> Place Order · {naira(total)}</button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h3 className="font-display text-lg font-bold text-forest">Order summary</h3>
            <div className="mt-4 space-y-2 text-[0.8rem]">
              <div className="flex justify-between"><span className="text-muted">Subtotal ({cart.length} lines)</span><span className="font-bold text-forest">{naira(cartSubtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="font-bold text-forest">{fee ? naira(fee) : "Free"}</span></div>
              <div className="flex justify-between"><span className="text-muted">VAT (7.5%)</span><span className="font-bold text-forest">{naira(vat)}</span></div>
              {discount > 0 && <div className="flex justify-between text-leaf"><span>Discount</span><span className="font-bold">−{naira(discount)}</span></div>}
              <div className="divider my-3" />
              <div className="flex justify-between"><span className="font-bold text-forest">Total payable</span><span className="font-display text-xl font-bold text-forest">{naira(total)}</span></div>
            </div>
            <div className="mt-4 flex gap-2 rounded-lg bg-[#f5f8f5] p-3 text-[0.72rem] text-muted"><CalendarDays size={15} className="shrink-0 text-leaf" /> Estimated delivery updated at each milestone.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
