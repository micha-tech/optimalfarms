"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Zap, FileText, Check, MessageCircle } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { naira } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductPurchase({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [qty, setQty] = useState(product.minOrder || 1);
  const [variant, setVariant] = useState(product.variants[0]?.label ?? "");

  const price = product.price + (product.variants.find((v) => v.label === variant)?.priceAdjustment ?? 0);

  return (
    <div className="card p-5">
      <p className="font-display text-2xl font-bold text-forest sm:text-3xl">{naira(price)}</p>
      <p className="text-[0.78rem] text-muted">{product.unit} · Minimum order {product.minOrder}</p>

      <div className="mt-5">
        <label className="field">{product.service ? "Select service" : "Available options"}</label>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button key={v.label} onClick={() => setVariant(v.label)} className={`min-h-[38px] rounded-lg border px-3 py-2 text-[0.76rem] font-semibold transition ${variant === v.label ? "border-leaf bg-leaf-light text-leaf" : "border-[#dde5de] text-[#55635b] hover:border-leaf"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label className="field">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-[#d9e2db]">
            <button onClick={() => setQty(Math.max(product.minOrder, qty - 1))} className="grid h-10 w-10 place-items-center text-forest hover:bg-[#f4f7f4]"><Minus size={15} /></button>
            <input value={qty} onChange={(e) => setQty(Math.max(product.minOrder, Number(e.target.value) || product.minOrder))} aria-label="Quantity" className="w-14 border-x border-[#e8ede9] py-2 text-center text-base font-bold outline-none sm:w-16" />
            <button onClick={() => setQty(qty + 1)} className="grid h-10 w-10 place-items-center text-forest hover:bg-[#f4f7f4]"><Plus size={15} /></button>
          </div>
          <span className="text-[0.76rem] text-muted">≈ <strong className="text-forest">{naira(price * qty)}</strong></span>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        <button onClick={() => addToCart(product, qty, variant)} className="btn btn-primary w-full btn-lg"><ShoppingCart size={17} /> Add to Cart</button>
        <button onClick={() => { addToCart(product, qty, variant); window.location.href = "/checkout"; }} className="btn btn-dark w-full"><Zap size={16} /> Buy Now</button>
        <Link href={`/corporate?product=${encodeURIComponent(product.name)}`} className="btn btn-outline w-full"><FileText size={16} /> Request a Quote</Link>
      </div>

      <div className="mt-5 space-y-2 border-t border-[#edf1ed] pt-4 text-[0.75rem] text-[#4d5b53]">
        <p className="flex items-center gap-2"><Check size={14} className="text-leaf" /> {product.service ? "Consultation request — no payment required until agreed" : product.stock > 0 ? `${product.stock} units available` : "Currently out of stock"}</p>
        <p className="flex items-center gap-2"><Check size={14} className="text-leaf" /> Secure payment or approved corporate credit</p>
        {product.estimatedWeight && <p className="flex items-start gap-2"><Check size={14} className="mt-0.5 shrink-0 text-gold" /> Final invoice may be adjusted based on confirmed dispatch weight.</p>}
        <p className="flex items-center gap-2"><Check size={14} className="text-leaf" /> Delivery available across Nigeria</p>
      </div>

      <a href="https://wa.me/2348030001122" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#e7f7ec] py-2.5 text-[0.76rem] font-bold text-[#12833f] hover:bg-[#d9f1e1]">
        <MessageCircle size={15} /> Ask a question on WhatsApp
      </a>
    </div>
  );
}
