"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to send.");
      }
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell me about your project"
        className={inputClass}
      />
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl bg-gradient-to-r from-accent via-accent-cyan to-accent-pink bg-[length:200%_100%] bg-left px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-right disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-accent">Thanks — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          {errorMessage} You can also email me directly at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
