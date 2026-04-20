import type { PortfolioItem } from "@/types/Portfolio";
import Image from "next/image";
import { Play } from "lucide-react";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <a
      href={item.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-card group block overflow-hidden rounded-base border-2 border-border bg-secondary-background shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
      style={{ animationDelay: `${index * 80}ms` }}
      id={`portfolio-item-${item.id}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden border-b-2 border-border bg-foreground/10">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-main/30 via-background to-foreground/5" />
        )}


        {/* Play button - neobrutalism style */}
        {/* Play button - neobrutalism style (Hidden for images) */}
        {item.type !== 'image' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-main-foreground text-main-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="px-3 py-3">
        <p className="line-clamp-1 text-sm font-heading text-foreground">
          {item.title}
        </p>
      </div>
    </a>
  );
}
