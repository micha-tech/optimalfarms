import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, PackageCheck, ArrowRight, Leaf } from "lucide-react";
import { products } from "@/lib/data";
import ProductImage from "@/components/site/ProductImage";
import ProductPurchase from "@/components/site/ProductPurchase";
import ProductCard from "@/components/site/ProductCard";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product?.name ?? "Product", description: product?.shortDescription };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const fallbackRelated = related.length ? related : products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <div className="container-x py-8">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-muted">
          <Link href="/" className="hover:text-leaf">Home</Link> /
          <Link href="/products" className="hover:text-leaf">Products</Link> /
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-leaf">{product.category}</Link> /
          <span className="font-semibold text-forest">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="group overflow-hidden rounded-2xl border border-[#e4ebe5] bg-white">
              <ProductImage src={product.image} category={product.category} alt={product.name} className="h-[340px] w-full md:h-[480px]" />
            </div>
            <div className="mt-3 flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${i === 0 ? "border-leaf" : "border-transparent"}`}>
                  <ProductImage src={product.image} category={product.category} alt={product.name} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-green">{product.category}</span>
              {product.badge && <span className="badge badge-gold">{product.badge}</span>}
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-forest">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-[0.78rem] text-muted">
              <span className="flex items-center gap-1"><Star size={14} className="fill-gold text-gold" /> <b className="text-forest">{product.rating.toFixed(1)}</b> ({product.reviewCount} verified reviews)</span>
              <span>·</span>
              <span>SKU: {product.slug.toUpperCase()}-{product.id.slice(-1)}</span>
            </div>
            <p className="mt-4 text-[0.91rem] leading-relaxed text-[#4c5a52]">{product.description}</p>

            <div className="mt-6"><ProductPurchase product={product} /></div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">Product details</h2>
            <div className="card mt-4 p-6">
              <h3 className="text-[0.9rem] font-bold text-forest">Specifications</h3>
              <div className="mt-3 divide-y divide-[#edf1ed]">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-[0.82rem]">
                    <span className="font-semibold text-muted">{spec.label}</span>
                    <span className="text-forest">{spec.value}</span>
                  </div>
                ))}
                <div className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-[0.82rem]">
                  <span className="font-semibold text-muted">Unit</span><span className="text-forest">{product.unit}</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-[0.82rem]">
                  <span className="font-semibold text-muted">Minimum order</span><span className="text-forest">{product.minOrder}</span>
                </div>
              </div>
              {product.storage && (
                <>
                  <h3 className="mt-6 text-[0.9rem] font-bold text-forest">Storage & handling</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{product.storage}</p>
                </>
              )}
            </div>

            <h2 className="mt-9 font-display text-2xl font-bold text-forest">Customer reviews</h2>
            <div className="card mt-4 p-6">
              <div className="flex items-center gap-5 border-b border-[#edf1ed] pb-5">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-forest">{product.rating.toFixed(1)}</p>
                  <div className="mt-1 flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-gold" />)}</div>
                  <p className="mt-1 text-[0.68rem] text-muted">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3].map((star, i) => (
                    <div key={star} className="flex items-center gap-2 text-[0.7rem] text-muted">
                      <span className="w-8">{star} ★</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#edf1ed]"><div className="h-full rounded-full bg-gold" style={{ width: `${[78, 18, 4][i]}%` }} /></div>
                      <span className="w-8 text-right">{[78, 18, 4][i]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-lg bg-[#f8faf7] p-4">
                <p className="text-[0.82rem] leading-relaxed text-[#4c5a52]">“Consistent quality and reliable delivery. The team communicated clearly at every stage of the order.”</p>
                <p className="mt-2 text-[0.72rem] font-bold text-forest">Verified customer · Lagos, Nigeria</p>
              </div>
              <p className="mt-3 text-[0.72rem] text-muted">Only verified customers who completed a purchase may submit reviews. Reviews are moderated before publication.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-display text-lg font-bold text-forest">Our promise</h3>
              <div className="mt-4 space-y-4">
                {[
                  { icon: ShieldCheck, title: "Quality inspected", text: "Checked before it leaves the farm." },
                  { icon: Truck, title: "Tracked delivery", text: "Milestone updates until delivery." },
                  { icon: PackageCheck, title: "Proof of delivery", text: "Confirmation captured on arrival." },
                  { icon: Leaf, title: "Responsibly produced", text: "Managed with care and traceability." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-leaf-light text-leaf"><Icon size={17} /></span>
                    <span><span className="block text-[0.8rem] font-bold text-forest">{title}</span><span className="block text-[0.72rem] text-muted">{text}</span></span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/corporate" className="card flex items-center justify-between p-5 transition hover:border-leaf">
              <span><span className="block font-display text-[1rem] font-bold text-forest">Buying in bulk?</span><span className="text-[0.74rem] text-muted">Request a tailored corporate quote.</span></span>
              <ArrowRight size={18} className="text-leaf" />
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-[#e6ece7] pt-10">
          <div className="mb-6 flex items-end justify-between"><h2 className="font-display text-2xl font-bold text-forest">You may also like</h2><Link href="/products" className="text-[0.78rem] font-bold text-leaf">View all <ArrowRight size={13} className="inline" /></Link></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{fallbackRelated.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </div>
    </>
  );
}
