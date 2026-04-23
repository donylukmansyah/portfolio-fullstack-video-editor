"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Send, MessageSquare, User, AtSign } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "@/app/actions/contact";

const initialContactFormState: ContactFormState = {
  ok: false,
  message: "",
  retryAfterSeconds: 0,
  cooldownNonce: null,
  status: "idle",
};

function formatCooldownMessage(remainingSeconds: number, isSuccessState: boolean) {
  const unit = remainingSeconds === 1 ? "second" : "seconds";

  if (isSuccessState) {
    return `Message sent successfully. You can send another one in ${remainingSeconds} ${unit}.`;
  }

  return `Please wait ${remainingSeconds} ${unit} before sending another message.`;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    initialContactFormState,
  );

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <div className="sm:col-span-3 neo-panel p-5">
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
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
            required
            rows={4}
            placeholder="Tell me about your project..."
            className="w-full resize-none rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-base text-foreground shadow-[2px_2px_0px_0px_var(--border)] outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:ring-2 focus:ring-main placeholder:text-foreground/40"
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <ContactFormStatus
          key={
            state.cooldownNonce ??
            `${state.status}:${state.message || "empty"}`
          }
          state={state}
          isPending={isPending}
        />
      </form>
    </div>
  );
}

type ContactFormStatusProps = {
  state: ContactFormState;
  isPending: boolean;
};

function ContactFormStatus({ state, isPending }: ContactFormStatusProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    state.retryAfterSeconds,
  );

  useEffect(() => {
    if (state.retryAfterSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [state.retryAfterSeconds]);

  const isCoolingDown = remainingSeconds > 0;
  const feedbackMessage = isCoolingDown
    ? formatCooldownMessage(remainingSeconds, state.status === "success")
    : state.status === "rate_limited"
      ? ""
      : state.message;
  const feedbackClassName =
    state.ok && !isCoolingDown
      ? "border-border bg-secondary-background text-foreground"
      : state.status === "success"
        ? "border-border bg-secondary-background text-foreground"
        : "border-border bg-main/15 text-foreground";

  return (
    <>
      {feedbackMessage ? (
        <p
          className={`rounded-base border-2 px-3 py-2 text-sm ${feedbackClassName}`}
          aria-live="polite"
        >
          {feedbackMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending || isCoolingDown}
        className="neo-btn-main flex items-center justify-center gap-2 py-2.5"
        id="contact-submit-button"
      >
        <Send size={14} />
        <span>
          {isPending
            ? "Sending..."
            : isCoolingDown
              ? `Wait ${remainingSeconds}s`
              : "Send Message"}
        </span>
      </button>
    </>
  );
}
