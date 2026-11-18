import Link from "next/link";
import {
  ArrowRight, ShieldCheck, Truck, Leaf, Award, Sprout, Bird, Fish, Flame, Wheat,
  CheckCircle2, Quote, Camera, Newspaper, MapPin, Phone, Mail, BadgeCheck, Clock3,
} from "lucide-react";
import { categories, featuredProducts, gallery, testimonials } from "@/lib/data";
import ProductCard from "@/components/site/ProductCard";
import NewsletterForm from "@/components/site/NewsletterForm";
import { CategoryGlyph } from "@/components/site/ProductImage";

const featured = featuredProducts();

const reasons = [
  { icon: ShieldCheck, title: "Quality Assured", text: "Strict hygiene, health and quality checks at every stage — from farm to dispatch." },
  { icon: Sprout, title: "Integrated Farming", text: "Poultry, fish, livestock and crop inputs managed as one connected production system." },
  { icon: Truck, title: "Reliable Delivery", text: "Farm-managed and partner logistics with clear milestones and delivery confirmation." },
  { icon: Award, title: "Professional Support", text: "Experienced specialists ready to advise on setup, production and business growth." },
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

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-pattern grid-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 right-1/3 h-[500px] w-[500px] rounded-full border border-white/5" />
        <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-gold backdrop-blur">
              <BadgeCheck size={14} /> Integrated Farm · Processing · Distribution
            </div>
            <h1 className="font-display text-[2.7rem] font-bold leading-[1.08] text-white sm:text-5xl lg:text-[4.1rem]">
              Good Food Begins <br /><span className="text-gold">with Good Farming.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-white/80">
              Optimal Royal Integrated Farms Limited produces and delivers quality poultry, fish, livestock, feeds and farm inputs — with the care, traceability and professionalism your business or household deserves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-gold btn-lg">Shop Now <ArrowRight size={17} /></Link>
              <Link href="/corporate" className="btn btn-lg border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20">Request a Corporate Quote</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {[["20+", "Years combined expertise"], ["12", "Product lines"], ["100%", "Batch traceability"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-gold">{n}</p>
                  <p className="text-[0.72rem] text-white/65">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] border border-white/10" />
              <div className="card overflow-hidden rounded-[1.6rem] border-white/10 bg-white/95 p-3 shadow-2xl">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Live Catfish", image: featured.find((p) => p.slug === "live-catfish")?.image, icon: "fish" },
                    { name: "Day-Old Chicks", image: featured.find((p) => p.slug === "day-old-chicks")?.image, icon: "bird" },
                    { name: "Processed Chicken", image: featured.find((p) => p.slug === "processed-chicken")?.image, icon: "flame" },
                    { name: "Poultry Feed", image: featured.find((p) => p.slug === "poultry-feed")?.image, icon: "wheat" },
                  ].map((item) => (
                    <div key={item.name} className="group relative h-36 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-leaf-light)] to-[var(--color-gold-light)]" />
                      <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/85 via-[var(--color-forest)]/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <p className="text-[0.78rem] font-bold">{item.name}</p>
                        <p className="text-[0.65rem] text-white/70">Farm fresh daily</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-[var(--color-gold-light)] px-4 py-3">
                  <div className="flex items-center gap-2 text-[var(--color-forest)]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-leaf)] text-white"><CheckCircle2 size={16} /></span>
                    <span className="text-[0.75rem] font-bold">Quality checked before dispatch</span>
                  </div>
                  <Link href="/products" className="text-[var(--color-leaf)]"><ArrowRight size={17} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {[["Quality Assured", ShieldCheck], ["Farm Fresh Produce", Leaf], ["Secure Payments", Award], ["Nationwide Delivery", Truck]].map(([label, Icon]) => {
            const I = Icon as React.ElementType;
            return (
              <div key={label as string} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-gold-light)] text-[var(--color-leaf)]"><I size={19} /></span>
                <span className="text-[0.78rem] font-bold text-[var(--color-forest)] sm:text-[0.85rem]">{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-x py-16 md:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Our Produce</p>
            <h2 className="section-title mt-2">Featured products</h2>
            <p className="mt-2 max-w-xl text-[0.88rem] text-muted">Farm-fresh produce and reliable inputs, carefully prepared for households, retailers and corporate buyers.</p>
          </div>
          <Link href="/products" className="btn btn-outline">View all products <ArrowRight size={15} /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <div className="mb-9 text-center">
            <p className="eyebrow">Browse by category</p>
            <h2 className="section-title mt-2">Everything your farm and kitchen needs</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="card card-hover group flex items-start gap-4 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--color-leaf-light)] text-[var(--color-leaf)] transition group-hover:bg-[var(--color-forest)] group-hover:text-[var(--color-gold)]">
                  <CategoryGlyph name={cat.icon} size={23} />
                </span>
                <span>
                  <span className="block font-display text-[1.05rem] font-bold text-[var(--color-forest]">{cat.title}</span>
                  <span className="mt-1 block text-[0.78rem] leading-relaxed text-muted">{cat.description}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-bold text-[var(--color-leaf)]">Explore <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 className="section-title mt-2">A farming partner you can rely on</h2>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              We combine practical farming experience with disciplined systems. Every order, stock movement and delivery is connected — so you get accurate information, consistent quality and dependable service.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-gold-light]] text-[#9a7412]"><Icon size={19} /></span>
                  <div>
                    <h4 className="text-[0.9rem] font-bold text-[var(--color-forest]">{title}</h4>
                    <p className="mt-1 text-[0.76rem] leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn btn-dark mt-8">Learn more about us <ArrowRight size={15} /></Link>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=80" alt="Farm operations at Optimal Royal Integrated Farms" className="h-[420px] w-full object-cover" />
            </div>
            <div className="card absolute -bottom-6 -left-4 max-w-[230px] p-4 shadow-xl">
              <div className="flex items-center gap-2 text-[var(--color-leaf)]"><Leaf size={17} /><span className="text-[0.7rem] font-bold uppercase tracking-wider">Sustainable practices</span></div>
              <p className="mt-2 text-[0.78rem] text-muted">Responsible feed use, waste management and careful water stewardship across our farms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section id="operations" className="bg-[var(--color-cream] py-16 md:py-20">
        <div className="container-x">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our operations</p>
              <h2 className="section-title mt-2">From production to your doorstep</h2>
              <p className="mt-2 max-w-2xl text-[0.88rem] text-muted">Our integrated operations work together so that produce, inventory, sales and delivery records stay connected.</p>
            </div>
            <Link href="/about#quality" className="btn btn-outline">Quality assurance <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operations.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-forest] text-gold"><Icon size={21} /></span>
                <h3 className="mt-4 font-display text-[1.05rem] font-bold text-[var(--color-forest]">{title}</h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{text}</p>
                <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                  <p className="font-display text-lg font-bold text-[var(--color-leaf)]">{/* stat */}</p>
                  <p className="text-[0.68rem] text-muted">{/* label */}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-16 md:py-20">
        <div className="mb-9 text-center">
          <p className="eyebrow">Customer stories</p>
          <h2 className="section-title mt-2">Trusted by farmers and businesses</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card flex flex-col p-6">
              <Quote size={26} className="text-[var(--color-gold]/70" />
              <p className="mt-4 flex-1 text-[0.85rem] leading-relaxed text-[#425149]">" {t.quote} "</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#edf1ed] pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-leaf-light]] text-[0.7rem] font-bold text-[var(--color-leaf)]">{t.initials}</span>
                <span>
                  <span className="block text-[0.8rem] font-bold text-[var(--color-forest]">{t.name}</span>
                  <span className="block text-[0.7rem] text-muted">{t.role}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE CTA */}
      <section className="container-x pb-16">
        <div className="hero-pattern grid-pattern overflow-hidden rounded-2xl px-7 py-12 md:px-14 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">For businesses</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Buying for a restaurant, hotel or retail chain?</h2>
              <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-white/75">Register as a corporate customer to request bulk quotes, negotiate pricing, purchase on approved credit and manage multiple delivery locations from one account.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/corporate" className="btn btn-gold">Request a Corporate Quote <ArrowRight size={15} /></Link>
                <Link href="/register?type=corporate" className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20">Register as a Business</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Bulk", "pricing"], ["Credit", "terms"], ["Multi-branch", "delivery"]].map(([a, b]) => (
                <div key={a} className="rounded-xl border border-white/15 bg-white/10 px-4 py-5 text-center backdrop-blur">
                  <p className="text-[0.82rem] font-bold text-gold">{a}</p>
                  <p className="mt-1 text-[0.66rem] text-white/65">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY & NEWS */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2"><Camera size={17} className="text-gold" /><p className="eyebrow">Farm gallery</p></div>
            <h2 className="section-title mb-6">Life on the farm</h2>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((g) => (
                <div key={g.title} className="group relative h-28 overflow-hidden rounded-xl bg-[var(--color-leaf-light]]">
                  <div className="absolute inset-0 grid place-items-center text-[var(--color-forest]/35"><CategoryGlyph name={g.icon} size={34} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest]/85 to-transparent opacity-80" />
                  <div className="absolute bottom-0 p-2.5 text-white">
                    <p className="text-[0.71rem] font-bold leading-tight">{g.title}</p>
                    <p className="mt-0.5 hidden text-[0.6rem] text-white/70 group-hover:block">{g.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about#operations" className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-bold text-[var(--color-leaf)]">View farm operations <ArrowRight size={13} /></Link>
          </div>
          <div>
            <div className="mb-6 flex items-center gap-2"><Newspaper size={17} className="text-gold" /><p className="eyebrow">News & insights</p></div>
            <h2 className="section-title mb-6">Latest from the farm</h2>
            <div className="space-y-3">
              {news.map((n) => (
                <div key={n.title} className="card flex gap-4 p-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[var(--color-cream] text-center">
                    <span>
                      <span className="block font-display text-lg font-bold leading-none text-[var(--color-forest]">{n.date.split(" ")[0]}</span>
                      <span className="block text-[0.62rem] uppercase text-muted">{n.date.split(" ")[1]}</span>
                    </span>
                  </div>
                  <div>
                    <span className="badge badge-green mb-1">{n.tag}</span>
                    <h3 className="text-[0.88rem] font-bold leading-snug text-[var(--color-forest]">{n.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT + NEWSLETTER */}
      <section className="bg-[var(--color-forest] py-14 text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Stay connected</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Fresh updates from our farm</h2>
            <p className="mt-3 max-w-lg text-[0.86rem] text-white/70">Get product announcements, seasonal offers and practical farming advice delivered to your inbox.</p>
            <div className="mt-6"><NewsletterForm /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <MapPin size={20} className="text-gold" />
              <h3 className="mt-3 text-[0.9rem] font-bold">Visit the farm</h3>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-white/65">Gbudu Village, Yola Road, Adamawa State, Nigeria</p>
              <p className="mt-2 flex items-center gap-1.5 text-[0.74rem] text-white/65"><Clock3 size={13} className="text-gold" /> Mon–Sat, 8:00am–6:00pm</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <Phone size={20} className="text-gold" />
              <h3 className="mt-3 text-[0.9rem] font-bold">Talk to our team</h3>
              <p className="mt-2 text-[0.78rem] text-white/65">+234 803 000 1122</p>
              <p className="mt-1 flex items-center gap-1.5 text-[0.78rem] text-white/65"><Mail size={13} className="text-gold" /> info@optimalroyalfarms.com</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-[0.76rem] font-bold text-gold">Send us a message <ArrowRight size={13} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}