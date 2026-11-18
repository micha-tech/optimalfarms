import type { ProductCategory } from "./types";

export const naira = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

export const dateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const uid = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

export const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const categoryTheme: Record<ProductCategory, { from: string; to: string; icon: string }> = {
  "Poultry & Live Birds": { from: "#FEF3C7", to: "#FDE68A", icon: "bird" },
  "Fishery Products": { from: "#CFFAFE", to: "#A5F3FC", icon: "fish" },
  Livestock: { from: "#FCE7F3", to: "#FBCFE8", icon: "goat" },
  "Feeds & Equipment": { from: "#DCFCE7", to: "#BBF7D0", icon: "wheat" },
  "Processed Products": { from: "#FFEDD5", to: "#FED7AA", icon: "flame" },
  "Consulting Services": { from: "#EDE9FE", to: "#DDD6FE", icon: "lightbulb" },
};

export const deliveryStages = [
  "Order Placed",
  "Payment Confirmed",
  "Order Confirmed",
  "Order Processing",
  "Products Being Prepared",
  "Quality Inspection Completed",
  "Ready for Dispatch",
  "Driver Assigned",
  "Dispatched",
  "In Transit",
  "Out for Delivery",
  "Delivered",
] as const;

export const stageIndex = (status: string) => {
  const i = deliveryStages.findIndex((s) => s === status);
  return i < 0 ? 0 : i;
};
