import { Mail, MessageSquare } from "lucide-react";

export function ContactInfo() {
  return (
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
        href="mailto:donylkmnsyh@gmail.com"
        className="neo-panel flex items-center gap-3 p-4 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)] transition-transform group-hover:scale-105">
          <Mail size={18} className="text-main-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-heading text-foreground/60">Email</p>
          <p className="truncate text-sm font-heading text-foreground">
            donylkmnsyh@gmail.com
          </p>
        </div>
      </a>
    </div>
  );
}
