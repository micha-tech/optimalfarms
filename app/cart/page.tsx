"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Tag, ShieldCheck, Truck, AlertCircle } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { products } from "@/lib/data";
import { naira } from "@/lib/utils";
import ProductImage from "@/components/site/ProductImage";

export default function CartPage() {
  const { cart, setQuantity, removeFromCart, cartSubtotal, pushToast } = useApp();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);

  const lines = cart.map((item) => ({ item, product: products.find((p) => p.id === item.productId)! })).filter((l) => l.product);
  const discount = applied ? cartSubtotal * 0.1 : 0;
  const taxable = Math.max(0, cartSubtotal - discount);
  const vat = taxable * 0.075;
  const total = taxable + vat;

  return (
    <div className="container-x py-10 md:py-14">
      <nav className="mb-6 text-[0.72rem] text-muted"><Link href="/" className="hover:text-leaf">Home</Link> / <span className="font-semibold text-forest">Shopping Cart</span></nav>
      <h1 className="font-display text-4xl font-bold text-forest">Your shopping cart</h1>
      <p className="mt-2 text-[0.88rem] text-muted">{lines.length === 0 ? "Your cart is currently empty." : `${lines.length} product line${lines.length > 1 ? "s" : ""} in your cart.`}</p>

      {lines.length === 0 ? (
        <div className="card mt-8 grid place-items-center p-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf-light text-leaf"><ShoppingCart size={30} /></span>
          <h2 className="mt-5 font-display text-2xl font-bold text-forest">Nothing here yet</h2>
          <p className="mt-2 max-w-md text-[0.85rem] text-muted">Browse our products and add what you need. We have poultry, fish, feeds, equipment and more.</p>
          <Link href="/products" className="btn btn-primary mt-6">Start shopping <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {lines.map(({ item, product }) => (
              <div key={`${item.productId}-${item.variant ?? ""}`} className="card flex gap-4 p-4">
                <Link href={`/products/${product.slug}`}>
                  <ProductImage src={product.image} category={product.category} alt={product.name} className="h-24 w-24 shrink-0 rounded-lg" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${product.slug}`} className="font-display text-[1.05rem] font-bold text-forest hover:text-leaf">{product.name}</Link>
                      <p className="text-[0.7rem] text-muted">{product.category}</p>
                      {item.variant && <span className="badge badge-grey mt-1.5">{item.variant}</span>}
                      {product.estimatedWeight && <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] text-[#9a7412]"><AlertCircle size={12} /> Estimated weight — final invoice may be adjusted.</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600" aria-label="Remove item"><Trash2 size={16} /></button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                    <div className="flex items-center rounded-lg border border-[#d9e2db]">
                      <button onClick={() => setQuantity(item.productId, item.quantity - 1)} className="grid h-8 w-8 place-items-center text-forest hover:bg-[#f4f7f4]"><Minus size={14} /></button>
                      <span className="w-10 border-x border-[#e8ede9] py-1.5 text-center text-[0.82rem] font-bold">{item.quantity}</span>
                      <button onClick={() => setQuantity(item.productId, item.quantity + 1)} className="grid h-8 w-8 place-items-center text-forest hover:bg-[#f4f7f4]"><Plus size={14} /></button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-forest">{naira(product.price * item.quantity)}</p>
                      <p className="text-[0.68rem] text-muted">{naira(product.price)} {product.unit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/products" className="inline-flex items-center gap-1 pt-2 text-[0.8rem] font-bold text-leaf">← Continue shopping</Link>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="font-display text-xl font-bold text-forest">Order summary</h2>
              <div className="mt-4 space-y-2.5 text-[0.82rem]">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-bold text-forest">{naira(cartSubtotal)}</span></div>
                {applied && <div className="flex justify-between text-leaf"><span>Promo (ORF10)</span><span className="font-bold">−{naira(discount)}</span></div>}
                <div className="flex justify-between"><span className="text-muted">VAT (7.5%)</span><span className="font-bold text-forest">{naira(vat)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="text-[0.75rem] text-muted">Calculated at checkout</span></div>
                <div className="divider my-3" />
                <div className="flex justify-between"><span className="font-bold text-forest">Estimated total</span><span className="font-display text-xl font-bold text-forest">{naira(total)}</span></div>
              </div>
              <div className="mt-5 flex gap-2">
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="input" />
                <button
                  onClick={() => {
                    if (promo.trim().toUpperCase() === "ORF10") { setApplied(true); pushToast("Promo code applied — 10% discount."); }
                    else pushToast("That promo code is not valid.", "error");
                  }}
                  className="btn btn-outline shrink-0"
                ><Tag size={15} /> Apply</button>
              </div>
              <Link href="/checkout" className="btn btn-primary mt-4 w-full btn-lg">Proceed to Checkout <ArrowRight size={16} /></Link>
              <Link href="/checkout?guest=1" className="btn btn-ghost mt-2 w-full text-[0.78rem]">Continue as guest</Link>
              <div className="mt-5 space-y-2 border-t border-[#edf1ed] pt-4 text-[0.72rem] text-muted">
                <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-leaf" /> Secure payment, verified against provider records</p>
                <p className="flex items-center gap-2"><Truck size={14} className="text-leaf" /> Delivery options shown at checkout</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
