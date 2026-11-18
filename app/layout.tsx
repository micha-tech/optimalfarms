import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Toasts from "@/components/site/Toasts";
import WhatsAppButton from "@/components/site/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Optimal Royal Integrated Farms Limited | Good Food Begins with Good Farming",
    template: "%s | Optimal Royal Integrated Farms",
  },
  description:
    "Quality poultry, fish, livestock, feeds and farm consulting from Optimal Royal Integrated Farms Limited. Order online, pay securely and track your delivery.",
  keywords: ["poultry", "catfish", "livestock", "poultry feed", "farm consulting", "Nigeria", "integrated farming"],
  openGraph: {
    title: "Optimal Royal Integrated Farms Limited",
    description: "Good Food Begins with Good Farming. Quality farm produce, inputs and professional farm consulting.",
    type: "website",
    siteName: "Optimal Royal Farms Digital Platform",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f302f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="bg-[var(--color-cream)] text-[var(--color-ink)] font-sans antialiased">
        <AppProvider>
          <Header />
          <main className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <Toasts />
        </AppProvider>
      </body>
    </html>
  );
}
