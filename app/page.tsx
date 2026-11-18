import Link from "next/link";
import {
  ArrowRight, ShieldCheck, Truck, Leaf, Award, Sprout, Bird, Fish, Flame, Wheat,
  Quote, Camera, Newspaper, MapPin, Phone, Mail, BadgeCheck, Clock3, Wallet,
} from "lucide-react";
import { categories, featuredProducts, products, gallery, testimonials } from "@/lib/data";
import ProductCard from "@/components/site/ProductCard";
import NewsletterForm from "@/components/site/NewsletterForm";
import { CategoryGlyph } from "@/components/site/ProductImage";

const featured = featuredProducts();

const byCategory = (category: string, limit = 4) =>
  products.filter((p) => p.category === category).slice(0, limit);

const promises = [
  { icon: ShieldCheck, title: "Quality Assured", text: "Hygiene, health and quality checks at every stage." },
  { icon: Sprout, title: "Integrated Farming", text: "Poultry, fish and inputs managed as one system." },
  { icon: Truck, title: "Nationwide Delivery", text: "Farm-managed logistics with clear milestones." },
  { icon: Award, title: "Expert Support", text: "Specialists ready to advise on setup and growth." },
];

const operations = [
  { icon: Bird, title: "Poultry Production", text: "Broilers, layers, cockerels and day-old chicks raised with monitored feeding, vaccination and weight records." },
  { icon: Fish, title: "Fish Farming", text: "Catfish and tilapia produced in monitored ponds with daily water-quality and feed-consumption records." },
  { icon: Flame, title: "Processing & Smoking", text: "Hygienic processing, smoking and packing with batch traceability and cold-chain handling." },
  { icon: Wheat, title: "Feeds & Inputs", text: "Quality feeds, equipment and consumables supplied to support productive farming operations." },
];

const news = [
  { date: "12 Nov 2026", tag: "Company", title: "Optimal Royal expands catfish pond capacity to meet growing demand" },
  { date: "28 Oct 2026", tag: "Farming Tips", title: "Getting brooding right: five essentials for healthy day-old chicks" },
  { date: "09 Oct 2026", tag: "New Product", title: "Smoked chicken now available for restaurants and retail partners" },
];

function SectionHead({ title, href = "/products", label = "More Products" }: { title: string; href?: string; label?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="section-title">{title}</h2>
      <Link href={href} className="btn btn-primary btn-sm inline-flex items-center gap-1.5">
        {label} <ArrowRight size={13} />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO — promotional banner, as on the reference marketplace */}
      <section className="hero-pattern grid-pattern relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 right-1/3 h-[500px] w-[500px] rounded-full border border-white/5" />
        <div className="container-x relative grid gap-10 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-nav backdrop-blur">
              <BadgeCheck size={14} /> Integrated Farm · Processing · Distribution
            </div>
            <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.12] text-white sm:text-5xl lg:text-[3.6rem]">
              Good Food Begins <br /><span className="text-nav">with Good Farming.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.9rem] leading-relaxed text-white/80">
              Shop quality poultry, fish, livestock, feeds and farm inputs — produced and delivered
              by Optimal Royal Integrated Farms Limited with care, traceability and dependable service.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-leaf btn-lg">Shop All Products <ArrowRight size={16} /></Link>
              <Link href="/corporate" className="btn btn-lg border border-white/30 bg-white/10 text-white hover:bg-white/20">Request a Corporate Quote</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              {[["20+", "Years combined expertise"], ["16", "Product lines"], ["100%", "Batch traceability"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-nav">{n}</p>
                  <p className="text-[0.7rem] text-white/65">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] border border-white/10" />
              <div className="overflow-hidden rounded-[10px] bg-white p-3 shadow-2xl">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Day-Old Chicks", image: featured.find((p) => p.slug === "day-old-chicks")?.image },
                    { name: "Live Catfish", image: featured.find((p) => p.slug === "live-catfish")?.image },
                    { name: "Processed Chicken", image: featured.find((p) => p.slug === "processed-chicken")?.image },
                    { name: "Poultry Feed", image: featured.find((p) => p.slug === "poultry-feed")?.image },
                  ].map((item) => (
                    <div key={item.name} className="group relative h-36 overflow-hidden rounded-[5px]">
                      <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <p className="text-[0.78rem] font-bold">{item.name}</p>
                        <p className="text-[0.63rem] text-white/70">Farm fresh daily</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-[5px] bg-lime-light px-4 py-3">
                  <div className="flex items-center gap-2 text-forest">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-nav text-white"><ShieldCheck size={16} /></span>
                    <span className="text-[0.73rem] font-bold">Quality checked before dispatch</span>
                  </div>
                  <Link href="/products" className="text-forest"><ArrowRight size={17} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-5 md:grid-cols-4">
          {[
            ["Quality Assured", ShieldCheck], ["Farm Fresh Produce", Leaf],
            ["Secure Payments", Wallet], ["Nationwide Delivery", Truck],
          ].map(([label, Icon]) => {
            const I = Icon as React.ElementType;
            return (
              <div key={label as string} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-light text-forest"><I size={17} /></span>
                <span className="text-[0.76rem] font-bold text-forest sm:text-[0.82rem]">{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why shop — tinted strip like the reference */}
      <section className="soft-strip border-b border-border">
        <div className="container-x py-8">
          <h2 className="section-title mb-5 text-center">Why Shop With Optimal Farms?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3 rounded-[10px] bg-white p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-light text-forest"><Icon size={17} /></span>
                <div>
                  <h3 className="text-[0.8rem] font-bold text-forest">{title}</h3>
                  <p className="mt-1 text-[0.72rem] leading-relaxed text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category shortcuts */}
      <section className="container-x pt-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[0.78rem] font-bold uppercase tracking-wide text-muted">Shop by category:</span>
          {categories.slice(0, 5).map((cat) => (
            <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`} className="btn btn-outline btn-sm">
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x py-10">
        <SectionHead title="Featured Products" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Category product rows */}
      <section className="container-x pb-12">
        <SectionHead
          title="Day Old Chicks & Live Birds"
          href="/products?category=Poultry%20%26%20Live%20Birds"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {byCategory("Poultry & Live Birds").map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container-x pb-12">
        <SectionHead title="Fish, Livestock & Processed Goods" href="/products" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...byCategory("Fishery Products", 2), ...byCategory("Livestock", 2)].map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container-x pb-14">
        <SectionHead
          title="Feeds, Equipment & Inputs"
          href="/products?category=Feeds%20%26%20Equipment"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {byCategory("Feeds & Equipment").map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Operations */}
      <section id="operations" className="soft-strip py-14">
        <div className="container-x">
          <SectionHead title="From Production To Your Doorstep" href="/about#operations" label="Learn More" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operations.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-forest text-nav"><Icon size={21} /></span>
                <h3 className="mt-4 text-[0.9rem] font-bold text-forest">{title}</h3>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="container-x py-14">
        <SectionHead title="Popular Categories" href="/products" label="View All" />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {categories.slice(0, 6).map((cat) => (
            <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-3 rounded-[10px] border border-border p-5 text-center hover:border-nav">
              <span className="category-glyph"><CategoryGlyph name={cat.icon} size={26} /></span>
              <span className="text-[0.76rem] font-bold leading-tight text-forest">{cat.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="soft-strip py-14">
        <div className="container-x">
          <SectionHead title="Hear What People Say About Us" href="/contact" label="Talk To Us" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card flex flex-col p-6">
                <Quote size={24} className="text-nav" />
                <p className="mt-4 flex-1 text-[0.82rem] leading-relaxed text-ink">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-lime-light text-[0.7rem] font-bold text-forest">{t.initials}</span>
                  <span>
                    <span className="block text-[0.8rem] font-bold text-forest">{t.name}</span>
                    <span className="block text-[0.7rem] text-muted">{t.role}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="container-x py-14">
        <div className="hero-pattern grid-pattern overflow-hidden rounded-[10px] px-7 py-12 md:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow !text-nav">For businesses</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Buying for a restaurant, hotel or retail chain?</h2>
              <p className="mt-3 max-w-2xl text-[0.85rem] leading-relaxed text-white/75">Register as a corporate customer to request bulk quotes, negotiate pricing, purchase on approved credit and manage multiple delivery locations from one account.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/corporate" className="btn btn-leaf">Request a Corporate Quote <ArrowRight size={15} /></Link>
                <Link href="/register?type=corporate" className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20">Register as a Business</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Bulk", "pricing"], ["Credit", "terms"], ["Multi-branch", "delivery"]].map(([a, b]) => (
                <div key={a} className="rounded-[10px] border border-white/15 bg-white/10 px-4 py-5 text-center backdrop-blur">
                  <p className="text-[0.8rem] font-bold text-nav">{a}</p>
                  <p className="mt-1 text-[0.65rem] text-white/65">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & news */}
      <section className="container-x pb-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2"><Camera size={17} className="text-leaf" /><p className="eyebrow">Farm gallery</p></div>
            <h2 className="section-title mb-6">Life on the farm</h2>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((g) => (
                <div key={g.title} className="group relative h-28 overflow-hidden rounded-[5px] bg-lime-light">
                  <div className="absolute inset-0 grid place-items-center text-forest/35"><CategoryGlyph name={g.icon} size={34} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/85 to-transparent opacity-80" />
                  <div className="absolute bottom-0 p-2.5 text-white">
                    <p className="text-[0.7rem] font-bold leading-tight">{g.title}</p>
                    <p className="mt-0.5 hidden text-[0.6rem] text-white/70 group-hover:block">{g.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about#operations" className="mt-4 inline-flex items-center gap-1 text-[0.76rem] font-bold text-forest">View farm operations <ArrowRight size={13} /></Link>
          </div>
          <div>
            <div className="mb-6 flex items-center gap-2"><Newspaper size={17} className="text-leaf" /><p className="eyebrow">News & insights</p></div>
            <h2 className="section-title mb-6">Latest from the farm</h2>
            <div className="space-y-3">
              {news.map((n) => (
                <div key={n.title} className="card flex gap-4 p-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[5px] bg-lime-light text-center">
                    <span>
                      <span className="block font-display text-lg font-bold leading-none text-forest">{n.date.split(" ")[0]}</span>
                      <span className="block text-[0.62rem] uppercase text-muted">{n.date.split(" ")[1]}</span>
                    </span>
                  </div>
                  <div>
                    <span className="badge badge-green mb-1">{n.tag}</span>
                    <h3 className="text-[0.85rem] font-bold leading-snug text-forest">{n.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact + newsletter */}
      <section className="bg-forest py-12 text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !text-nav">Stay connected</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Fresh updates from our farm</h2>
            <p className="mt-3 max-w-lg text-[0.84rem] text-white/70">Get product announcements, seasonal offers and practical farming advice delivered to your inbox.</p>
            <div className="mt-6"><NewsletterForm /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[10px] border border-white/15 bg-white/5 p-5">
              <MapPin size={20} className="text-nav" />
              <h3 className="mt-3 text-[0.9rem] font-bold text-white">Visit the farm</h3>
              <p className="mt-2 text-[0.76rem] leading-relaxed text-white/65">Gbudu Village, Yola Road, Adamawa State, Nigeria</p>
              <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-white/65"><Clock3 size={13} className="text-nav" /> Mon–Sat, 8:00am–6:00pm</p>
            </div>
            <div className="rounded-[10px] border border-white/15 bg-white/5 p-5">
              <Phone size={20} className="text-nav" />
              <h3 className="mt-3 text-[0.9rem] font-bold text-white">Talk to our team</h3>
              <p className="mt-2 text-[0.76rem] text-white/65">+234 803 000 1122</p>
              <p className="mt-1 flex items-center gap-1.5 text-[0.76rem] text-white/65"><Mail size={13} className="text-nav" /> info@optimalroyalfarms.com</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-[0.74rem] font-bold text-nav">Send us a message <ArrowRight size={13} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
