import type { HeaderSchool } from "@/components/layout/site-header";
import { schools } from "@/content/schools";
import { isPending } from "@/content/types";

/** Minimal school data for the client-side header (keeps the JS bundle small). */
export function headerSchools(): HeaderSchool[] {
  return schools.map((s) => ({
    slug: s.slug,
    name: s.name,
    place: s.place,
    classes: isPending(s.classesShort) ? null : s.classesShort,
    image: s.card.src,
    imageAlt: s.card.alt,
  }));
}
