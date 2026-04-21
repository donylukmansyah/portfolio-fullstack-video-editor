import type { MainCategory, PortfolioItem, ProfileData } from "@/types/Portfolio";

export const MAIN_CATEGORIES: MainCategory[] = [
  "All",
  "Video Editor",
  "Graphic Designer",
  "Software Engineer",
];

export const SUB_CATEGORIES: Record<Exclude<MainCategory, "All">, string[]> = {
  "Video Editor": ["Storytelling", "Motion Graphic", "AMV"],
  "Graphic Designer": ["Logo", "Poster", "UI/UX"],
  "Software Engineer": ["Frontend", "Backend", "Fullstack"],
};

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
      url: "https://tiktok.com/@donylukmansyah",
      type: "tiktok",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/donylukmansyah",
      type: "instagram",
    },
    {
      id: "website",
      name: "Website",
      url: "https://donylukmansyah.vercel.app",
      type: "website",
    },
  ],
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Intern Journey @jtdigitally",
    thumbnailLabel: "Intern Jurney @jtdigitally",
    category: "Video Editor",
    subCategory: "Storytelling",
    mediaType: "video",
    youtubeUrl: "#",
    gradient: "from-indigo-800 via-violet-700 to-purple-600",
  },
  {
    id: "2",
    title: "Edits @bennedgar",
    thumbnailLabel: "powered by @bennedgar",
    category: "Video Editor",
    subCategory: "Storytelling",
    mediaType: "video",
    youtubeUrl: "#",
    gradient: "from-rose-800 via-red-700 to-pink-600",
  },
  {
    id: "3",
    title: "Edits @bagusde_",
    thumbnailLabel: "powered by @bagusde_",
    category: "Video Editor",
    subCategory: "Storytelling",
    mediaType: "video",
    youtubeUrl: "#",
    gradient: "from-teal-800 via-emerald-700 to-green-600",
  },
  {
    id: "4",
    title: "Edits @astronotess",
    thumbnailLabel: "powered by @astronotess",
    category: "Video Editor",
    subCategory: "Motion Graphic",
    mediaType: "video",
    youtubeUrl: "#",
    gradient: "from-amber-800 via-orange-700 to-yellow-600",
  },
  {
    id: "5",
    title: "Powered by @rancang_web",
    thumbnailLabel: "powered by @rancang_web",
    category: "Video Editor",
    subCategory: "Motion Graphic",
    mediaType: "video",
    youtubeUrl: "#",
    gradient: "from-cyan-800 via-sky-700 to-blue-600",
  },
];
