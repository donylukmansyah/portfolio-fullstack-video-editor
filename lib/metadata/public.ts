import type { Metadata, MetadataRoute } from "next";

import { profileData } from "@/data/PortfolioData";

type PublicPath = `/${string}` | "/";

type PublicMetadataOptions = {
  title?: string;
  description?: string;
  path?: PublicPath;
  keywords?: string[];
  robots?: Metadata["robots"];
};

type PublicSitemapRoute = {
  path: PublicPath;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return new URL(withProtocol);
}

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.BETTER_AUTH_URL,
    profileData.websiteUrl,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    try {
      return normalizeSiteUrl(candidate);
    } catch {
      continue;
    }
  }

  return new URL("https://example.com");
}

export const siteUrl = resolveSiteUrl();

export const publicSite = {
  name: profileData.name,
  defaultTitle: `${profileData.name} | Video Editor & Motion Design`,
  defaultDescription:
    "21 year old video editor creating visual stories with passion and purpose. Portfolio showcasing video editing and motion design work.",
  locale: "id_ID",
  category: "portfolio",
  faviconPath: "/favicon-dony.ico",
  shareImagePath: "/opengraph-image",
  keywords: [
    "Dony Lukmansyah",
    "video editor",
    "motion designer",
    "video editor portfolio",
    "motion design portfolio",
    "creative editor Indonesia",
  ],
} as const;

export const PUBLIC_SITEMAP_ROUTES: readonly PublicSitemapRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/resume",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

function resolveTitle(title?: string) {
  return title ? `${title} | ${publicSite.name}` : publicSite.defaultTitle;
}

export function absoluteUrl(path: PublicPath = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPublicPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  robots,
}: PublicMetadataOptions = {}): Metadata {
  const resolvedTitle = resolveTitle(title);
  const resolvedDescription = description ?? publicSite.defaultDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    keywords: [...new Set([...publicSite.keywords, ...keywords])],
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: publicSite.name,
      locale: publicSite.locale,
      type: "website",
      images: [absoluteUrl(publicSite.shareImagePath)],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [absoluteUrl(publicSite.shareImagePath)],
    },
    ...(robots ? { robots } : {}),
  };
}

export function createPublicRootMetadata(): Metadata {
  const pageMetadata = createPublicPageMetadata();

  return {
    ...pageMetadata,
    metadataBase: siteUrl,
    applicationName: publicSite.name,
    authors: [
      {
        name: publicSite.name,
        url: siteUrl.toString(),
      },
    ],
    creator: publicSite.name,
    publisher: publicSite.name,
    category: publicSite.category,
    icons: {
      icon: [{ url: publicSite.faviconPath }],
      shortcut: [{ url: publicSite.faviconPath }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
