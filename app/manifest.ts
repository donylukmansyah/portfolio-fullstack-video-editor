import type { MetadataRoute } from "next";

import { publicSite } from "@/lib/metadata/public";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fffdf9",
    description: publicSite.defaultDescription,
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: publicSite.faviconPath,
        type: "image/x-icon",
      },
    ],
    name: publicSite.defaultTitle,
    short_name: publicSite.name,
    start_url: "/",
    theme_color: "#ff5a52",
  };
}
