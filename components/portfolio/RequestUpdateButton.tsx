"use client";

import { Mail } from "lucide-react";

interface Props {
  className?: string;
}

export default function RequestUpdateButton({ className }: Props = {}) {
  return (
    <a
      href="mailto:donylkmnsyh@gmail.com"
      className={`neo-btn text-xs font-heading inline-flex items-center justify-center gap-2 ${className || ""}`}
      id="request-update-button"
    >
      <Mail strokeWidth={2.5} className="size-4" /> Get in Touch
    </a>
  );
}
