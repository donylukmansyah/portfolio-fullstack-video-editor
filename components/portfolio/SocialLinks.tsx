import { Globe } from "lucide-react";
import { TikTokIcon, InstagramIcon } from "@/components/ui/Icons";
import type { SocialLink } from "@/types/Portfolio";

interface SocialLinksProps {
  links: SocialLink[];
}

function SocialIcon({ type }: { type: SocialLink["type"] }) {
  switch (type) {
    case "tiktok":
      return <TikTokIcon size={15} />;
    case "instagram":
      return <InstagramIcon size={15} />;
    case "website":
      return <Globe size={15} strokeWidth={2.5} />;
    default:
      return null;
  }
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 w-9 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-main hover:text-main-foreground hover:shadow-none"
          title={link.name}
          aria-label={link.name}
          id={`social-link-${link.id}`}
        >
          <SocialIcon type={link.type} />
        </a>
      ))}
    </div>
  );
}
