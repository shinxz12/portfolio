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
    "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground";

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
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-foreground">Thanks, I&apos;ll get back to you soon.</p>
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
