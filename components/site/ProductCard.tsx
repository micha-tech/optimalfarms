"use client";

import Link from "next/link";
import { Plus, Star, Heart } from "lucide-react";
import ProductImage from "./ProductImage";
import { useApp } from "@/components/providers/AppProvider";
import { naira } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const saved = wishlist.includes(product.id);

  return (
    <div className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage
          src={product.image}
          category={product.category}
          alt={product.name}
          className="aspect-square w-full"
        />
        {product.badge && (
          <span className="badge badge-gold absolute left-2 top-2 bg-white/95 shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="badge badge-green absolute bottom-2 left-2 bg-white/95 shadow-sm">
          {product.stock > 0 ? "In stock" : "Pre-order"}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          aria-label="Save product"
          className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition ${saved ? "text-red-500" : "text-forest/60 hover:text-red-500"}`}
        >
          <Heart size={15} fill={saved ? "currentColor" : "none"} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <span className="mb-1 text-[0.62rem] font-bold uppercase tracking-wide text-leaf">
          {product.category}
        </span>
        <Link href={`/products/${product.slug}`} className="product-title line-clamp-2 hover:text-forest">
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-[0.68rem] text-muted">
          <Star size={11} className="fill-gold text-gold" />
          <span className="font-bold text-forest">{product.rating.toFixed(2)}</span>
          <span>({product.reviewCount})</span>
          <span className="mx-0.5">·</span>
          <span>Min. {product.minOrder}</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="price leading-tight">{naira(product.price)}</p>
            <p className="text-[0.65rem] text-muted">{product.unit}</p>
          </div>
          <button
            onClick={() => addToCart(product, product.minOrder)}
            className="btn btn-primary btn-sm flex items-center gap-1"
            title={`Add ${product.minOrder} to cart`}
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
