"use client";

import { useState } from "react";
import {
  Bird, Fish, Rabbit, Wheat, Flame, Lightbulb, Egg, Truck, Sprout,
} from "lucide-react";
import { categoryTheme } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types";

const icons: Record<string, React.ElementType> = {
  bird: Bird, fish: Fish, goat: Rabbit, wheat: Wheat, flame: Flame,
  lightbulb: Lightbulb, egg: Egg, truck: Truck, sprout: Sprout,
};

export function CategoryGlyph({ name, size = 26, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = icons[name] ?? Sprout;
  return <Icon size={size} strokeWidth={1.5} className={className} />;
}

export default function ProductImage({
  src, category, alt, className = "", icon,
}: {
  src?: string;
  category: ProductCategory | string;
  alt: string;
  className?: string;
  icon?: string;
}) {
  const [failed, setFailed] = useState(false);
  const theme = categoryTheme[category as ProductCategory] ?? categoryTheme["Feeds & Equipment"];
  const glyph = icon ?? theme.icon;

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
    >
      <div className="absolute inset-0 opacity-25" style={{
        backgroundImage: "radial-gradient(rgba(11,48,38,.35) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }} />
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="relative flex flex-col items-center gap-1 text-forest/45">
          <CategoryGlyph name={glyph} size={Math.max(30, (className.match(/h-\[?(\d+)/)?.[1] ? 44 : 42))} />
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-70">Optimal Royal</span>
        </div>
      )}
    </div>
  );
}
