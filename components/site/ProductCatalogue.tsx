"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { categories, products } from "@/lib/data";
import ProductCard from "./ProductCard";
import type { ProductCategory } from "@/lib/types";

export default function ProductCatalogue() {
  const params = useSearchParams();
  const initialCategory = params.get("category") ?? "All";
  const initialService = params.get("service") === "1";
  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [serviceOnly, setServiceOnly] = useState(initialService);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const matchesStock = !onlyAvailable || p.stock > 0;
      const matchesService = !serviceOnly || !!p.service;
      return matchesCategory && matchesQuery && matchesStock && matchesService;
    });
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    if (sort === "featured") items = [...items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return items;
  }, [category, query, sort, onlyAvailable, serviceOnly]);

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-8">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-expanded={filtersOpen}
        className="btn btn-outline w-full justify-between lg:hidden"
      >
        <span className="flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</span>
        <ChevronDown size={16} className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
      </button>
      <aside className={`${filtersOpen ? "block" : "hidden"} lg:sticky lg:top-24 lg:block lg:self-start`}>
        <div className="card p-4">
          <div className="mb-3 hidden items-center gap-2 font-bold text-forest lg:flex"><SlidersHorizontal size={16} /> Filters</div>
          <div className="space-y-1.5">
            <button onClick={() => { setCategory("All"); setFiltersOpen(false); }} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.8rem] font-semibold ${category === "All" ? "bg-forest text-white" : "text-[#48564e] hover:bg-[#f2f6f2]"}`}>
              All products <span className="text-[0.7rem] opacity-70">{products.length}</span>
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.name).length;
              return (
                <button key={cat.name} onClick={() => { setCategory(cat.name); setFiltersOpen(false); }} className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[0.78rem] font-semibold ${category === cat.name ? "bg-forest text-white" : "text-[#48564e] hover:bg-[#f2f6f2]"}`}>
                  {cat.title} <span className="text-[0.7rem] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="divider my-4" />
          <label className="flex cursor-pointer items-center gap-2 text-[0.78rem] font-semibold text-forest">
            <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="h-4 w-4 accent-[#1d7a56]" />
            In stock only
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-[0.78rem] font-semibold text-forest">
            <input type="checkbox" checked={serviceOnly} onChange={(e) => setServiceOnly(e.target.checked)} className="h-4 w-4 accent-[#1d7a56]" />
            Services only
          </label>
          {(category !== "All" || query || onlyAvailable || serviceOnly) && (
            <button onClick={() => { setCategory("All"); setQuery(""); setOnlyAvailable(false); setServiceOnly(false); }} className="btn btn-ghost btn-sm mt-4 w-full text-red-600">
              <X size={13} /> Clear filters
            </button>
          )}
        </div>
      </aside>

      <div>
        <div className="card mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, breeds, feeds..." className="input pl-9" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input sm:w-52">
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-[0.8rem] text-muted">Showing <span className="font-bold text-forest">{filtered.length}</span> products</p>
          {category !== "All" && <span className="badge badge-green"><Check size={11} /> {category}</span>}
        </div>

        {filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="card grid place-items-center p-16 text-center">
            <Search size={30} className="text-muted" />
            <h3 className="mt-3 font-display text-xl font-bold text-forest">No products found</h3>
            <p className="mt-1 text-[0.82rem] text-muted">Try a different search term or clear your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
