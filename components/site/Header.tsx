"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu, X, ShoppingCart, UserRound, ChevronDown, Phone, MapPin, Mail, LayoutDashboard, ChevronRight,
} from "lucide-react";
import { categories } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";
import type { Role } from "@/lib/types";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: true },
  { label: "Farm Consulting", href: "/consulting" },
  { label: "Corporate Sales", href: "/corporate" },
  { label: "Contact Us", href: "/contact" },
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

  useEffect(() => {
    setOpen(false);
    setShopOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop contact info */}
      <div className="hidden bg-[var(--color-forest)] text-white/85 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[0.72rem]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[var(--color-gold)]" /> Gbudu Village, Yola Road, Adamawa State, Nigeria
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} className="text-[var(--color-gold)]" /> info@optimalroyalfarms.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-[var(--color-gold)]" /> +234 803 000 1122
            </span>
            <Link href="/portal/staff" className="text-white/65 hover:text-white">
              Staff Login
            </Link>
            <Link href="/portal/supplier" className="text-white/65 hover:text-white">
              Supplier Login
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-md"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-forest)] text-[var(--color-gold)] shadow-md">
              <svg
                viewBox="0 0 40 40"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 33V19" />
                <path d="M20 21c-7 0-11-4-11-10 6 0 11 3 11 10Z" />
                <path d="M20 17c0-7 4-11 11-11 0 6-4 11-11 11Z" />
                <path d="M12 33h16" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-display text-[1.05rem] font-bold text-[var(--color-forest)]">
                Optimal Royal
              </div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.19em] text-[var(--color-gold)]">
                Integrated Farms Ltd
              </div>
            </div>
          </Link>

          {/* Main navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <div key={item.label} onMouseEnter={() => item.dropdown && setShopOpen(true)} onMouseLeave={() => item.dropdown && setShopOpen(false)}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[0.82rem] font-semibold transition ${isActive(item.href) ? "text-[var(--color-leaf)]" : "text-[var(--color-muted)] hover:text-[var(--color-forest)] hover:bg-[var(--color-gold-light)]"}`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={13} />}
                </Link>
                {item.dropdown && shopOpen && (
                  <div className="absolute left-0 top-full w-full max-w-[520px] pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-xl">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={`/products?category=${encodeURIComponent(cat.name)}`}
                          className="flex items-start gap-2.5 rounded-lg p-2.5 hover:bg-[var(--color-gold-light)]"
                        >
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--color-leaf-light)] text-[var(--color-leaf)]">
                            <span className="text-xs font-bold">{cat.title.charAt(0)}</span>
                          </span>
                          <span>
                            <span className="block text-[0.8rem] font-bold text-[var(--color-forest)]">{cat.title}</span>
                            <span className="line-clamp-1 text-[0.68rem] text-[var(--color-muted)]">
                              {cat.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/products"
                        className="col-span-2 mt-1 flex items-center justify-center gap-1 rounded-lg bg-[var(--color-forest)] py-2 text-xs font-bold text-white"
                      >
                        View all products <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & action buttons */}
          <div className="flex items-center gap-1.5">
            <Link href="/track" className="hidden rounded-lg px-2.5 py-2 text-[0.78rem] font-bold text-[var(--color-forest)] hover:bg-[var(--color-gold-light)] xl:block">
              Track Order
            </Link>
            <Link href="/cart" className="relative grid h-9 w-9 place-items-center rounded-lg text-[var(--color-forest)] hover:bg-[var(--color-gold-light)]" aria-label="Shopping cart">
              <ShoppingCart size={19} />
              {hydrated && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[var(--color-gold)] px-1 text-[0.62rem] font-bold text-[var(--color-forest)]">
                  {cartCount}
                </span>
              )}
            </Link>
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <Link
                href={user ? portalHref(user.role) : "/login"}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 text-[0.78rem] font-bold text-[var(--color-forest)] hover:border-[var(--color-leaf)]"
              >
                <UserRound size={16} />
                {hydrated ? (user ? (user.role === "corporate" ? "Business" : "Account") : "Login") : "Login"}
              </Link>
              {accountOpen && (
                <div className="absolute right-0 top-full w-60 pt-3">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-xl">
                    {user ? (
                      <>
                        <div className="border-b border-[var(--color-border)] px-2.5 py-2">
                          <p className="text-[0.8rem] font-bold text-[var(--color-forest)]">
                            {user.name}
                          </p>
                          <p className="text-[0.68rem] text-[var(--color-muted)]">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href={portalHref(user.role)}
                          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-[var(--color-gold-light)]"
                        >
                          <LayoutDashboard size={15} /> My Dashboard
                        </Link>
                        <Link
                          href="/portal/customer/orders"
                          className="block rounded-lg px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-[var(--color-gold-light)]"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setAccountOpen(false);
                          }}
                          className="block w-full rounded-lg px-2.5 py-2 text-left text-[0.78rem] font-semibold text-[var(--color-forest)] hover:bg-red-50"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block rounded-lg px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-[var(--color-gold-light)]"
                        >
                          Sign in
                        </Link>
                        <Link
                          href="/register"
                          className="block rounded-lg px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-[var(--color-gold-light)]"
                        >
                          Create account
                        </Link>
                        <Link
                          href="/register?type=corporate"
                          className="block rounded-lg px-2.5 py-2 text-[0.78rem] font-semibold hover:bg-[var(--color-gold-light)]"
                        >
                          Register as a Business
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link href="/products" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Shop Now
            </Link>
            {/* Mobile menu button */}
            <button
              className="grid h-9 w-9 place-items-center rounded-lg text-[var(--color-forest)] hover:bg-[var(--color-gold-light)] lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
            <div className="container-x flex flex-col gap-0.5 py-3">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive(item.href) ? "bg-[var(--color-leaf-light)] text-[var(--color-forest)]" : "text-[var(--color-forest)]"}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/track" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--color-forest)]">
                Track Order
              </Link>
              <div className="divider my-2" />
              {user ? (
                <Link
                  href={portalHref(user.role)}
                  className="btn btn-dark"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" className="btn btn-outline">
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-primary">
                    Register
                  </Link>
                </div>
              )}
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="rounded-lg bg-[var(--color-gold-light)] px-3 py-2 text-xs font-semibold text-[var(--color-forest)]"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}