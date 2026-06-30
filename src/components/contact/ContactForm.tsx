"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(124,58,237,0.08) 0%, transparent 50%)",
        }}
      />

      <header className="relative z-10 glass-panel border-b border-white/10 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Data Universe
          </Link>
          <p className="font-mono text-xs text-highlight tracking-widest uppercase hidden sm:block">
            Contact
          </p>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 glass-panel border-primary/20 mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white text-glow">
            Get in Touch
          </h1>
          <p className="mt-4 text-white/50 max-w-md mx-auto">
            Send a message directly to Anjaneyulu Pallepagu. Enterprise inquiries,
            collaborations, and opportunities welcome.
          </p>
        </div>

        {status === "success" ? (
          <div className="glass-panel p-10 text-center border-primary/20">
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Message Sent</h2>
            <p className="text-white/50 mb-8">
              Your email has been delivered successfully. A response will follow shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-3 glass-panel text-sm font-mono text-primary hover:text-white transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                  <User className="w-3 h-3" />
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  disabled={status === "sending"}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                  <Mail className="w-3 h-3" />
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "sending"}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                minLength={3}
                disabled={status === "sending"}
                placeholder="Enterprise Data Platform Inquiry"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                <MessageSquare className="w-3 h-3" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={6}
                disabled={status === "sending"}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none disabled:opacity-50"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "w-full flex items-center justify-center gap-3 px-6 py-4",
                "bg-primary/20 border border-primary/40 text-white font-mono text-sm tracking-wide",
                "hover:bg-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
                "transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {status === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center font-mono text-[10px] text-white/20 tracking-widest">
          Messages delivered to anjaneyulupallepagu@gmail.com
        </p>
      </main>
    </div>
  );
}