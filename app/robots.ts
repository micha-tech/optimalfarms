import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/portal/", "/cart", "/checkout"] },
    sitemap: "https://optimalroyalfarms.com/sitemap.xml",
  };
}
