"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div
      className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2"
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
            className="animate-in pointer-events-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3 shadow-xl"
          >
            <Icon
              size={17}
              className={`mt-0.5 shrink-0 ${
                toast.tone === "success"
                  ? "text-[var(--color-leaf)]"
                  : toast.tone === "error"
                  ? "text-red-600"
                  : "text-[var(--color-blue)]"
              }`}
            />
            <p className="flex-1 text-[0.8rem] font-medium text-[var(--color-forest)]">
              {toast.message}
            </p>
            <X size={14} className="mt-0.5 text-[var(--color-muted)]" />
          </div>
        );
      })}
    </div>
  );
}