import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Inbox } from "lucide-react";

export function StatCard({ label, value, icon: Icon, tone = "green", trend, hint }: {
  label: string; value: string | number; icon: React.ElementType; tone?: "green" | "gold" | "blue" | "red" | "forest";
  trend?: string; hint?: string;
}) {
  const tones = {
    green: "bg-leaf-light text-leaf", gold: "bg-gold-light text-[#96710f]",
    blue: "bg-[#e5f0fb] text-[#235d94]", red: "bg-[#fee9e7] text-[#b2382b]",
    forest: "bg-forest text-gold",
  };
  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[0.7rem] font-bold uppercase tracking-wider text-muted">{label}</p>
          <p className="mt-2 truncate font-display text-[1.3rem] font-bold leading-none text-forest sm:text-[1.6rem]">{value}</p>
          {hint && <p className="mt-2 truncate text-[0.7rem] text-muted">{hint}</p>}
          {trend && <p className={`mt-2 flex items-center gap-1 text-[0.7rem] font-bold ${trend.startsWith("+") ? "text-leaf" : "text-red-600"}`}>{trend.startsWith("+") ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {trend} vs last month</p>}
        </div>
        <span className={`stat-icon shrink-0 ${tones[tone]}`}><Icon size={19} /></span>
      </div>
    </div>
  );
}

export function Panel({ title, subtitle, action, children, className = "" }: {
  title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`card ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ed] px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="min-w-0"><h3 className="font-display text-[1.05rem] font-bold text-forest">{title}</h3>{subtitle && <p className="mt-0.5 text-[0.72rem] text-muted">{subtitle}</p>}</div>
        {action}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function TablePanel({ title, subtitle, action, head, rows, empty }: {
  title: string; subtitle?: string; action?: ReactNode; head: string[]; rows: ReactNode[][]; empty?: string;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ed] px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="min-w-0"><h3 className="font-display text-[1.05rem] font-bold text-forest">{title}</h3>{subtitle && <p className="mt-0.5 text-[0.72rem] text-muted">{subtitle}</p>}</div>
        {action}
      </div>
      {rows.length ? (
        <div className="table-wrap">
          <table className="data">
            <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : (
        <div className="grid place-items-center p-8 text-center text-muted sm:p-12"><Inbox size={26} /><p className="mt-2 text-[0.82rem]">{empty ?? "No records to display."}</p></div>
      )}
    </section>
  );
}

export function ProgressBar({ value, color = "bg-leaf", label }: { value: number; color?: string; label?: string }) {
  return (
    <div>
      {label && <div className="mb-1 flex justify-between text-[0.7rem]"><span className="text-muted">{label}</span><span className="font-bold text-forest">{value}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-[#e9eeea]"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
    </div>
  );
}

export function Badge({ text, tone = "green" }: { text: string; tone?: "green" | "gold" | "red" | "grey" | "blue" }) {
  return <span className={`badge badge-${tone}`}>{text}</span>;
}

export function QuickLink({ href, title, text, icon: Icon }: { href: string; title: string; text: string; icon: React.ElementType }) {
  return (
    <Link href={href} className="card card-hover flex items-start gap-3 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-light text-leaf"><Icon size={18} /></span>
      <span className="min-w-0"><span className="block text-[0.84rem] font-bold text-forest">{title}</span><span className="block text-[0.72rem] text-muted">{text}</span></span>
    </Link>
  );
}

export function ModulePlaceholder({ title, description, points }: { title: string; description: string; points: string[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card p-6">
        <span className="badge badge-gold">Module</span>
        <h3 className="mt-3 font-display text-xl font-bold text-forest sm:text-2xl">{title}</h3>
        <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">{description}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {points.map((p) => <li key={p} className="flex items-start gap-2 text-[0.78rem] text-[#4a584f]"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" /> {p}</li>)}
        </ul>
      </div>
      <div className="card grid place-items-center p-8 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf-light text-leaf"><Inbox size={26} /></span>
          <p className="mt-4 font-display text-lg font-bold text-forest">Ready for configuration</p>
          <p className="mt-2 max-w-xs text-[0.78rem] text-muted">This module is part of the phased rollout. Connect it to the live data source and approval workflows when enabling the corresponding phase.</p>
        </div>
      </div>
    </div>
  );
}
