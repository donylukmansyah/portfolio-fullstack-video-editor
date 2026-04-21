"use client";

import { Send, MessageSquare, User, AtSign } from "lucide-react";
import { useContactForm } from "./useContactForm";

export function ContactForm() {
  const { formState, handleChange, handleSubmit } = useContactForm();

  return (
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
  );
}
