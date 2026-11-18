"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { pushToast } = useApp();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) return pushToast("Please enter a valid email address.", "error");
        setDone(true);
        pushToast("Thank you for subscribing to our newsletter.");
      }}
      className="flex max-w-xl flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="input flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-gold focus:shadow-none"
        required
      />
      <button type="submit" className="btn btn-gold" disabled={done}>
        {done ? <><CheckCircle2 size={16} /> Subscribed</> : <>Subscribe <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}
