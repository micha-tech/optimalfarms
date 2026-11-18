import Link from "next/link";
import { ArrowLeft, Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-leaf-light text-leaf"><Sprout size={30} /></span>
        <p className="eyebrow mt-6">Error 404</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-forest">This page has not grown yet</h1>
        <p className="mx-auto mt-3 max-w-md text-[0.88rem] text-muted">The page you are looking for does not exist or may have moved. Let&apos;s get you back to the farm.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary"><ArrowLeft size={15} /> Back to homepage</Link>
          <Link href="/products" className="btn btn-outline">Browse products</Link>
        </div>
      </div>
    </div>
  );
}
