import { notFound } from "next/navigation";
import { getSchool, type School } from "@/content/schools";

/** Resolve the [school] param for a school page, or 404. */
export async function loadSchool(params: Promise<{ school: string }>): Promise<School> {
  const { school: slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();
  return school;
}

export type SchoolPageProps = { params: Promise<{ school: string }> };
