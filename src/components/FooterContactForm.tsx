"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2, CheckCircle2 } from "lucide-react";

export default function FooterContactForm({ lang = "es" }: { lang?: "es" | "en" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // honeypot
  const [company, setCompany] = useState("");

  const canSend =
    name.trim().length >= 2 &&
    email.trim().length >= 5 &&
    message.trim().length >= 10;

  async function submit() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          company,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Error");
        setLoading(false);
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCompany("");
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-zinc-200">
            {lang === "es" ? "¿Prefieres dejarnos un mensaje?" : "Prefer leaving a message?"}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {lang === "es" ? "Te respondemos por correo." : "We’ll reply by email."}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-zinc-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {/* honeypot */}
          <input
            className="hidden"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2 text-sm outline-none"
            placeholder={lang === "es" ? "Nombre" : "Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="w-full rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2 text-sm outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2 text-sm outline-none"
            placeholder={lang === "es" ? "Teléfono (opcional)" : "Phone (optional)"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="min-h-[90px] w-full resize-none rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2 text-sm outline-none"
            placeholder={lang === "es" ? "Mensaje" : "Message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            onClick={submit}
            disabled={!canSend || loading}
            className="w-full rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {lang === "es" ? "Enviando..." : "Sending..."}
              </>
            ) : (
              lang === "es" ? "Enviar" : "Send"
            )}
          </Button>

          {sent && (
            <p className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4" />
              {lang === "es"
                ? "Mensaje enviado. Te contactaremos pronto."
                : "Message sent. We’ll get back to you soon."}
            </p>
          )}

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
