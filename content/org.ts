/**
 * Social initiatives, research and careers content.
 *
 * Deliberately modest: AESRI publishes only initiatives, research and
 * vacancies that actually exist. Empty lists render an honest empty state.
 */
import { clips, img } from "./media";
import type { Clip, Img, SchoolKey } from "./types";

export type Commitment = {
  title: string;
  titleHi: string;
  body: string;
  evidence: string;
  media: Img | Clip;
};

export const commitments: Commitment[] = [
  {
    title: "A good school, close to home",
    titleHi: "घर के पास अच्छा विद्यालय",
    body: "Both AESRI schools are in villages — Palana and Udairamsar — so children don't have to travel to the city for an English-medium education. School vans bring children in from across each village.",
    evidence: "Two village campuses · school vans at both schools",
    media: img.aryavart.van,
  },
  {
    title: "Girls in every practical",
    titleHi: "हर प्रायोगिक कार्य में बालिकाएँ",
    body: "Our schools are co-educational, and girls take part in every practical on equal terms — including field surveying on the school ground.",
    evidence: "Co-educational schools · girls' plane-table survey at Aryavart",
    media: clips.surveyGirls,
  },
  {
    title: "Inclusive admissions",
    titleHi: "समावेशी प्रवेश",
    body: "25% of entry-level seats are reserved for children from disadvantaged groups and weaker sections under the Right to Education Act. Our offices help families understand the government's online process.",
    evidence: "RTE seats at entry level · guidance at the school office",
    media: img.aadharshila.nurseryClass,
  },
  {
    title: "The village in the classroom",
    titleHi: "कक्षा में गाँव",
    body: "Elders and guests from the community are welcome in our classrooms, sharing the kind of knowledge that no textbook holds.",
    evidence: "Community guests in class",
    media: clips.elder,
  },
];

/** Documented initiatives with dates, partners and outcomes. Add entries as they are approved. */
export const initiatives: {
  title: string;
  school: SchoolKey | "aesri";
  date: string;
  partners?: string;
  summary: string;
  outcome?: string;
}[] = [];

export const researchAreas = [
  {
    title: "Early foundations",
    body: "How nursery routines and play-based learning shape reading, number sense and habits in the first years of school.",
    status: "Planned",
  },
  {
    title: "Learning outdoors",
    body: "What field practicals — like plane-table surveying — add to understanding in subjects such as geography and mathematics.",
    status: "Planned",
  },
  {
    title: "Helping teachers see progress",
    body: "Using weekly assessment results to help teachers spot where a child needs support — with privacy safeguards designed in from the start, and only once the portal is live.",
    status: "Planned · with the Campus Portal",
  },
] as const;

export const researchEthics = [
  "No child's data is used for research without verifiable consent from a parent or guardian, separate from admission paperwork.",
  "Routine school administration is kept apart from optional research participation.",
  "Analysis uses de-identified data wherever possible; identifiable student records are never sent to external AI tools.",
  "Findings are shared back with teachers and families before they are published.",
  "Every publication will list its authors, date, method and any funding.",
] as const;

export const publications: { title: string; authors: string; date: string; summary: string; href?: string }[] = [];

export type Vacancy = {
  id: string;
  title: string;
  school: SchoolKey | "aesri";
  type: "Full-time" | "Part-time" | "Contract";
  subjects?: string;
  qualification: string;
  closesOn: string;
  summary: string;
};

/** Current openings. Leave empty when nothing is open — the page shows an honest empty state. */
export const vacancies: Vacancy[] = [];

export const hiringSteps = [
  { title: "Apply", body: "Send your CV and a short note about the classes and subjects you'd like to teach." },
  { title: "Conversation", body: "We meet shortlisted candidates at the school to talk about teaching, children and the role." },
  { title: "Checks", body: "Qualification certificates, references and background checks — required for everyone who works with children." },
  { title: "Offer", body: "A written offer that names your school, role and start date." },
] as const;
