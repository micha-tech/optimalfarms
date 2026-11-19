"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div
      className="pointer-events-none fixed bottom-24 left-1/2 z-[60] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2 sm:bottom-5"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.tone === "success"
            ? CheckCircle2
            : toast.tone === "error"
            ? AlertCircle
            : Info;
        return (
          <div
            key={toast.id}
            className="animate-in pointer-events-auto flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3 shadow-xl"
          >
            <Icon
              size={17}
              className={`mt-0.5 shrink-0 ${
                toast.tone === "success"
                  ? "text-[var(--color-leaf)]"
                  : toast.tone === "error"
                  ? "text-red-600"
                  : "text-[#235d94]"
              }`}
            />
            <p className="flex-1 text-[0.8rem] font-medium leading-snug text-[var(--color-forest)]">
              {toast.message}
            </p>
            <X size={14} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}
