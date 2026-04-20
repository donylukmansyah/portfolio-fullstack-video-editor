export type MainCategory = "All" | "Video Editor" | "Graphic Designer" | "Software Engineer";

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnailLabel: string;
  thumbnail?: string;
  category: Exclude<MainCategory, "All">;
  subCategory: string;
  youtubeUrl: string;
  gradient: string;
  type?: "video" | "image";
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
