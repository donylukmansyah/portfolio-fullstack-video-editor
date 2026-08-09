import type { ProfileData } from "@/features/portfolio/types";

export const profileData: ProfileData = {
  name: "Dony Lukmansyah",
  subtitle: "Video Editor, Motion Design",
  location: "Indonesia",
  avatar: "/img/profile/dony.jpg",
  bio: "21 year old video editor editing and creating visual stories with passion and purpose.",
  websiteUrl: "https://donylukmansyah.vercel.app",
  socialLinks: [
    {
      id: "tiktok",
      name: "TikTok",
      url: "https://www.tiktok.com/@belajarpremiere",
      type: "tiktok",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/donylukmansyah/",
      type: "instagram",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/donylukmansyah",
      type: "linkedin",
    },
  ],
};