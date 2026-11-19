"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Toasts from "./Toasts";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Public marketing/storefront chrome. Portals render their own enterprise
 * shell (sidebar + topbar + footer), so the consumer header, footer and
 * floating WhatsApp button are intentionally omitted there.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      {!isPortal && <Header />}
      <main className="min-h-[60vh]">{children}</main>
      {!isPortal && <Footer />}
      {!isPortal && <WhatsAppButton />}
      <Toasts />
    </>
  );
}
