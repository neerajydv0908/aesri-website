import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AESRI",
    description: site.mission.en,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e7",
    theme_color: "#1a3827",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
