import type { MetadataRoute } from "next";
import { policies } from "@/content/policies";
import { schools } from "@/content/schools";
import { site } from "@/content/site";
import { stories } from "@/content/stories";
import { schoolPages } from "@/lib/school-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const orgPages = ["", "/about", "/governance", "/schools", "/social-initiatives", "/research", "/news", "/careers", "/contact", "/policies", "/portal"];
  const now = new Date();
  return [
    ...orgPages.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...schools.flatMap((s) =>
      schoolPages.map((p) => ({
        url: `${base}/schools/${s.slug}${p.page ? `/${p.page}` : ""}`,
        lastModified: now,
        changeFrequency: (p.page === "notices" ? "daily" : "weekly") as "daily" | "weekly",
        priority: p.page === "" || p.page === "admissions" || p.page === "fees" ? 0.9 : 0.7,
      })),
    ),
    ...stories.map((s) => ({ url: `${base}/news/${s.slug}`, lastModified: now, priority: 0.5 })),
    ...policies.map((p) => ({ url: `${base}/policies/${p.slug}`, lastModified: now, priority: 0.4 })),
  ];
}
