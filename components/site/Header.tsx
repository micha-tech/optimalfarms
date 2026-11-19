"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu, X, ShoppingCart, UserRound, ChevronDown, Phone, Mail, Search, Truck,
  MapPin, Headphones,
} from "lucide-react";
import { categories } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";
import type { Role } from "@/lib/types";

const nav = [
  { label: "Home", href: "/" },
  { label: "Day Old Chicks", href: "/products?category=Poultry%20%26%20Live%20Birds" },
  { label: "Fish & Seafood", href: "/products?category=Fishery%20Products" },
  { label: "Livestock", href: "/products?category=Livestock" },
  { label: "Feeds & Equipment", href: "/products?category=Feeds%20%26%20Equipment" },
  { label: "Processed Goods", href: "/products?category=Processed%20Products" },
  { label: "Farm Consulting", href: "/consulting" },
  { label: "Corporate Sales", href: "/corporate" },
  { label: "Offers", href: "/products?sort=featured" },
  { label: "Help & FAQ", href: "/contact#faq" },
];

const portalHref = (role?: Role) => {
  if (role === "admin") return "/portal/admin";
  if (role === "staff") return "/portal/staff";
  if (role === "supplier") return "/portal/supplier";
  return "/portal/customer";
};

export default function Header() {
  const pathname = usePathname();
  const { cartCount, user, hydrated, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOpen(false);
    setShopOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-forest text-white/85">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-[0.68rem]">
          <div className="flex min-w-0 items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin size={12} className="text-nav" /> Gbudu Village, Yola Road, Adamawa State
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-nav" />
              <span className="hidden sm:inline">Orders / WhatsApp:</span> +234 803 000 1122
            </span>
            <span className="hidden items-center gap-1.5 lg:flex">
              <Mail size={12} className="text-nav" /> info@optimalroyalfarms.com
            </span>
          </div>
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link href="/corporate" className="hover:text-white">Wholesale & Corporate</Link>
            <Link href="/portal/staff" className="text-white/65 hover:text-white">Staff</Link>
            <Link href="/portal/supplier" className="text-white/65 hover:text-white">Supplier</Link>
          </div>
        </div>
      </div>

      {/* Sticky header: white main row + fresh-green category bar */}
      <div className="sticky top-0 z-40 shadow-sm">
        <div className="bg-white">
          <div className="container-x flex h-16 items-center gap-2 sm:h-[76px] sm:gap-4">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2 sm:w-[210px] sm:gap-2.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-forest text-nav sm:h-10 sm:w-10">
                <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 33V19" />
                  <path d="M20 21c-7 0-11-4-11-10 6 0 11 3 11 10Z" />
                  <path d="M20 17c0-7 4-11 11-11 0 6-4 11-11 11Z" />
                  <path d="M12 33h16" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display text-[0.9rem] font-bold text-forest sm:text-[1.02rem]">Optimal Royal</div>
                <div className="hidden text-[0.55rem] font-bold uppercase tracking-[0.16em] text-leaf sm:block">Integrated Farms Ltd</div>
              </div>
            </Link>

            {/* Search — the primary way into the catalogue, like the reference site */}
            <form action="/products" method="GET" className="hidden flex-1 items-center md:flex">
              <div className="relative w-full max-w-2xl">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  name="q"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search day-old chicks, catfish, feeds, equipment..."
                  className="input h-11 rounded-full pl-10 pr-28"
                  aria-label="Search products"
                />
                <button type="submit" className="btn btn-primary absolute right-1 top-1 h-9 px-5">
                  Search
                </button>
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1.5">
              <Link href="/track" className="hidden items-center gap-1.5 rounded-[5px] px-2.5 py-2 text-[0.75rem] font-bold text-forest hover:bg-lime-light xl:flex">
                <Truck size={16} /> <span className="hidden 2xl:inline">Track Order</span>
              </Link>
              <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-[5px] text-forest hover:bg-lime-light" aria-label="Shopping cart">
                <ShoppingCart size={20} />
                {hydrated && cartCount > 0 && (
                  <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-nav px-1 text-[0.62rem] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-expanded={accountOpen}
                  aria-label="Account menu"
                  className="flex h-10 items-center gap-1.5 rounded-[5px] border border-border px-3 text-[0.75rem] font-bold text-forest hover:border-nav"
                >
                  <UserRound size={17} />
                  {hydrated ? (user ? (user.role === "corporate" ? "Business" : "Account") : "Sign In") : "Sign In"}
                  <ChevronDown size={13} />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full w-60 pt-2">
                    <div className="rounded-[10px] border border-border bg-white p-2 shadow-xl">
                      {user ? (
                        <>
                          <div className="border-b border-border px-2.5 py-2">
                            <p className="text-[0.8rem] font-bold text-forest">{user.name}</p>
                            <p className="text-[0.68rem] text-muted">{user.email}</p>
                          </div>
                          <Link href={portalHref(user.role)} className="block rounded-[5px] px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-lime-light">My Dashboard</Link>
                          <Link href="/portal/customer/orders" className="block rounded-[5px] px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-lime-light">My Orders</Link>
                          <button
                            onClick={() => { logout(); setAccountOpen(false); }}
                            className="block w-full rounded-[5px] px-2.5 py-2 text-left text-[0.78rem] font-semibold text-forest hover:bg-red-50"
                          >
                            Sign out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" className="block rounded-[5px] px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-lime-light">Sign in</Link>
                          <Link href="/register" className="block rounded-[5px] px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-lime-light">Create an account</Link>
                          <Link href="/register?type=corporate" className="block rounded-[5px] px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-lime-light">Register as a Business</Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/products" className="btn btn-primary hidden sm:inline-flex">Shop Now</Link>
              <button
                className="grid h-10 w-10 place-items-center rounded-[5px] text-forest hover:bg-lime-light lg:hidden"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Fresh green category bar */}
        <nav className="hidden bg-nav lg:block" aria-label="Main navigation">
          <div className="container-x flex h-11 items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link rounded-[5px] px-2.5 py-1.5 hover:bg-forest ${isActive(item.href) ? "bg-forest text-white" : "text-[#243b0d]"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button onClick={() => setShopOpen(!shopOpen)} aria-expanded={shopOpen} aria-label="More categories" className="flex items-center gap-1.5 rounded-[5px] px-2.5 py-1.5 text-[0.75rem] font-bold text-white hover:bg-forest">
                More <ChevronDown size={13} />
              </button>
              {shopOpen && (
                <div className="absolute right-0 top-full z-50 w-[540px] pt-2">
                  <div className="grid grid-cols-2 gap-1 rounded-[10px] border border-border bg-white p-3 shadow-xl">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-start gap-2.5 rounded-[5px] p-2.5 hover:bg-lime-light"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime-light text-[0.7rem] font-bold text-leaf">
                          {cat.title.charAt(0)}
                        </span>
                        <span>
                          <span className="block text-[0.8rem] font-bold text-forest">{cat.title}</span>
                          <span className="line-clamp-1 text-[0.68rem] text-muted">{cat.description}</span>
                        </span>
                      </Link>
                    ))}
                    <Link href="/products" className="col-span-2 mt-1 rounded-[5px] bg-forest py-2 text-center text-[0.75rem] font-bold text-white">
                      View all products
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border bg-white lg:hidden">
          <div className="container-x flex flex-col gap-0.5 py-3">
            <form action="/products" method="GET" className="mb-3 flex gap-2">
              <div className="relative min-w-0 flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input name="q" placeholder="Search products..." className="input w-full pl-9" aria-label="Search products" />
              </div>
              <button type="submit" className="btn btn-primary btn-sm shrink-0">Search</button>
            </form>
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className={`rounded-[5px] px-3 py-2.5 text-[0.85rem] font-semibold ${isActive(item.href) ? "bg-lime-light text-forest" : "text-forest"}`}>
                {item.label}
              </Link>
            ))}
            <div className="divider my-2" />
            {user ? (
              <Link href={portalHref(user.role)} className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" className="btn btn-outline">Sign In</Link>
                <Link href="/register" className="btn btn-primary">Register</Link>
              </div>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {categories.slice(0, 4).map((cat) => (
                <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`} className="rounded-[5px] bg-lime-light px-3 py-2 text-[0.72rem] font-bold text-forest">
                  {cat.title}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-muted">
              <Headphones size={14} className="text-leaf" /> Need help? Call +234 803 000 1122
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
