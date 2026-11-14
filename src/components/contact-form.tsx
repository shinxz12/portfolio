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
    "mt-1.5 w-full rounded-md border border-rule bg-sheet px-3 py-2.5 text-sm outline-none transition-colors focus:border-signal";
  const labelClass = "block text-sm font-medium";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass}>
          Email
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
      </div>
      <label className={labelClass}>
        Message
        <textarea name="message" required rows={5} className={inputClass} />
      </label>
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
        className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p aria-live="polite" className="text-sm">
        {status === "sent" && "Message sent. I'll reply to your email."}
        {status === "error" && (
          <span className="text-danger">
            {errorMessage} You can also email{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
