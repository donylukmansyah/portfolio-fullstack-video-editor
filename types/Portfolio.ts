export type MainCategory = string;

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnailLabel: string;
  thumbnailUrl?: string | null;
  category?: string;
  subCategory?: string;
  youtubeUrl?: string | null;
  externalLinkName?: string | null;
  externalLinkUrl?: string | null;
  externalLinkLogoUrl?: string | null;
  mediaType: "video" | "image";
}

export interface PortfolioCommandItem {
  id: string;
  title: string;
  subCategory?: string | null;
}

export interface PortfolioSectionCategory {
  id: string;
  name: string;
  slug: string;
  subCategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  type: "tiktok" | "instagram" | "website";
}

export interface ProfileData {
  name: string;
  subtitle: string;
  location: string;
  avatar: string;
  bio: string;
  websiteUrl: string;
  socialLinks: SocialLink[];
}
