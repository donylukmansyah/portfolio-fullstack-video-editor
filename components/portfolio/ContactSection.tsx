"use client";

import { useState } from "react";
import { Mail, Send, MessageSquare, User, AtSign } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    const mailtoLink = `mailto:donylukmansyah@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${encodeURIComponent(formState.email)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <section className="pb-10 pt-6" id="contact">
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="neo-label">Contact</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        {/* Info panel */}
        <div className="sm:col-span-2 flex flex-col gap-4">
          <div className="neo-panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
                <MessageSquare size={16} className="text-main-foreground" />
              </div>
              <h3 className="text-lg font-heading text-foreground">
                Let&apos;s Talk
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed text-foreground/80">
              Have a project in mind? Want to collaborate? Or just want to say
              hi? Feel free to reach out — I&apos;d love to hear from you!
            </p>
          </div>

          <a
            href="mailto:donylukmansyah@gmail.com"
            className="neo-panel flex items-center gap-3 p-4 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)] transition-transform group-hover:scale-105">
              <Mail size={18} className="text-main-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-heading text-foreground/60">Email</p>
              <p className="truncate text-sm font-heading text-foreground">
                donylukmansyah@gmail.com
              </p>
            </div>
          </a>
        </div>

        {/* Form panel */}
        <div className="sm:col-span-3 neo-panel p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-heading text-foreground cursor-pointer"
              >
                <User size={12} className="pointer-events-none" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base text-foreground shadow-[2px_2px_0px_0px_var(--border)] outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:ring-2 focus:ring-main placeholder:text-foreground/40"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-heading text-foreground cursor-pointer"
              >
                <AtSign size={12} className="pointer-events-none" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base text-foreground shadow-[2px_2px_0px_0px_var(--border)] outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:ring-2 focus:ring-main placeholder:text-foreground/40"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-heading text-foreground cursor-pointer"
              >
                <MessageSquare size={12} className="pointer-events-none" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base text-foreground shadow-[2px_2px_0px_0px_var(--border)] outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:ring-2 focus:ring-main placeholder:text-foreground/40"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="neo-btn-main flex items-center justify-center gap-2 py-2.5"
              id="contact-submit-button"
            >
              <Send size={14} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
