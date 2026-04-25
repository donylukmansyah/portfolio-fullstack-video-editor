import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  try {
    const parsed = new URL(supabaseUrl);
    remotePatterns.push({
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      pathname: "/storage/v1/object/public/**",
    });
  } catch {
    // Ignore invalid URLs during config bootstrap.
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    // Prefer webp over avif to save on Vercel image optimization quota/processing time
    formats: ["image/webp"],
    // Reduce number of generated variants to conserve Vercel Hobby plan quota (5,000 max)
    deviceSizes: [640, 828, 1200],
    imageSizes: [16, 32, 64, 128, 256],
    // Cache optimized images for 30 days to maximize cache hits
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
