import { Globe } from "lucide-react";
import { TikTokIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/Icons";
import type { SocialLink } from "@/features/portfolio/types";

interface SocialLinksProps {
  links: SocialLink[];
}

function SocialIcon({ type }: { type: SocialLink["type"] }) {
  switch (type) {
    case "tiktok":
      return <TikTokIcon size={15} />;
    case "instagram":
      return <InstagramIcon size={15} />;
    case "linkedin":
      return <LinkedInIcon size={15} />;
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
          className="neo-icon size-9"
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
