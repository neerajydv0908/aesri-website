import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { SchoolFooter } from "@/components/school/school-footer";
import { SchoolHeader, SchoolTopBar, type SchoolNavData } from "@/components/school/school-header";
import { getSchool, schools } from "@/content/schools";
import { isPending } from "@/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return schools.map((s) => ({ school: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ school: string }> }): Promise<Metadata> {
  const { school: slug } = await params;
  const school = getSchool(slug);
  if (!school) return {};
  return {
    title: { default: `${school.name.en}, ${school.place.en}`, template: `%s · ${school.name.en}` },
    description: school.intro.en,
    openGraph: { siteName: school.name.en, images: [{ url: school.card.src.src }] },
  };
}

export default async function SchoolLayout({ children, params }: { children: React.ReactNode; params: Promise<{ school: string }> }) {
  const { school: slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();
  const sister = schools.find((s) => s.slug !== slug)!;

  const nav: SchoolNavData = {
    key: school.key,
    slug: school.slug,
    name: school.name,
    short: school.short,
    place: school.place,
    phone: isPending(school.phone) ? null : school.phone,
    sister: { slug: sister.slug, name: sister.name },
  };

  const vars = {
    "--school-deep": school.colors.deep,
    "--school-accent": school.colors.accent,
    "--school-soft": school.colors.soft,
  } as CSSProperties;

  return (
    <div data-school={school.key} style={vars}>
      <SchoolTopBar school={nav} />
      <SchoolHeader school={nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SchoolFooter school={school} sister={sister} />
    </div>
  );
}
