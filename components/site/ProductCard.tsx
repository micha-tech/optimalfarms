"use client";

import Link from "next/link";
import { Plus, Star, Heart } from "lucide-react";
import ProductImage from "./ProductImage";
import { useApp } from "@/components/providers/AppProvider";
import { naira } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useApp();
  const saved = wishlist.includes(product.id);

  return (
    <div
      className="card card-hover group relative flex h-full flex-col overflow-hidden border"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block"
      >
        <ProductImage
          src={product.image}
          category={product.category}
          alt={product.name}
          className="h-44 w-full"
        />
        {product.badge && (
          <span
            className="badge badge-gold absolute left-3 top-3 bg-white/95 shadow-sm"
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Save product"
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition ${saved ? "text-red-500" : "text-[var(--color-forest)]/60 hover:text-red-500"}`}
        >
          <Heart
            size={15}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </Link>
      <div className="flex flex-1 flex-col p-4 flex-col pt-6">
        <span className="mb-1.5 text-[0.64rem] font-bold uppercase tracking-wider text-[var(--color-leaf)]">
          {product.category}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-[1.05rem] font-bold leading-snug text-[var(--color-forest)] hover:text-[var(--color-leaf)]"
        >
          {product.name}
        </Link>
        <p
          className="mt-1.5 line-clamp-2 text-[0.76rem] leading-relaxed text-[var(--color-muted)]"
        >
          {product.shortDescription}
        </p>
        <div className="mt-2 flex items-center gap-1 text-[0.7rem] text-[var(--color-muted)]">
          <Star size={12} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
          <span className="font-bold text-[var(--color-forest)]">
            {product.rating.toFixed(1)}
          </span>
          <span>({product.reviewCount})</span>
          <span className="mx-1">·</span>
          <span>Min. {product.minOrder} {product.unit.replace("per ", "")}</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="font-display text-[1.15rem] font-bold text-[var(--color-forest)]">
              {naira(product.price)}
            </p>
            <p className="text-[0.66rem] text-[var(--color-muted)]">
              {product.unit}
            </p>
          </div>
          <button
            onClick={() => {
              var _a;
              ;(_a = useApp) === null || _a === void 0
                ? void 0
                : _a.call(useApp).addToCart(product, product.minOrder);
            }}
            className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-leaf)] text-white transition hover:bg-[var(--color-forest)]"
            title="Add to cart"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}