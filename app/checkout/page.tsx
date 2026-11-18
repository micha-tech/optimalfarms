import { Suspense } from "react";
import CheckoutFlow from "@/components/site/CheckoutFlow";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-x py-16 text-center text-muted">Preparing checkout…</div>}>
      <CheckoutFlow />
    </Suspense>
  );
}
