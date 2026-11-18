import type { MetadataRoute } from "next";
import { products } from "@/lib/data";

const base = "https://optimalroyalfarms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/products", "/consulting", "/corporate", "/contact", "/track", "/login", "/register"].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...routes, ...productRoutes];
}
