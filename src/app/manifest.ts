import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brand.name} — ${siteConfig.brand.slogan}`,
    short_name: siteConfig.brand.shortName,
    description: siteConfig.brand.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1530",
    icons: [
      {
        src: "/brand/orbita-icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
