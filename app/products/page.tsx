import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ProductCatalogue from "@/components/site/ProductCatalogue";

export const metadata: Metadata = {
  title: "Products & Services",
  description: "Browse poultry, fish, livestock, feeds, equipment, processed products and professional farm consulting services.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-[#e6ece7] bg-white">
        <div className="container-x py-10 md:py-14">
          <nav className="mb-4 flex items-center gap-1.5 text-[0.72rem] text-muted">
            <Link href="/" className="hover:text-leaf">Home</Link> / <span className="font-semibold text-forest">Products</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-forest md:text-5xl">Our products & services</h1>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
            Quality produce, dependable farm inputs and professional advisory services. Select a category or search for exactly what you need.
          </p>
        </div>
      </section>
      <div className="container-x py-10">
        <Suspense fallback={<div className="card p-10 text-center text-muted">Loading products…</div>}>
          <ProductCatalogue />
        </Suspense>
      </div>
    </>
  );
}
