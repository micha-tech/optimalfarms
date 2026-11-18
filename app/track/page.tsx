import { Suspense } from "react";
import TrackOrder from "@/components/site/TrackOrder";

export const metadata = { title: "Track Order" };

export default function TrackPage() {
  return <Suspense fallback={<div className="container-x py-16 text-center text-muted">Loading tracking…</div>}><TrackOrder /></Suspense>;
}
