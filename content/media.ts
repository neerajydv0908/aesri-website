/**
 * Media library. Photos are imported statically so Next.js knows their size
 * and can generate responsive, blur-up placeholders automatically.
 *
 * Every item carries a `consent` flag. The management confirmed on 1 October
 * 2026 that consent is on file for every photo and video below. Add a new one
 * as `consent: "confirmed"` only once guardian consent for it is on file (see
 * /policies/photo-and-media-consent).
 */
import type { Clip, Img } from "./types";

import aadCampus from "@/public/media/aadharshila/campus.jpg";
import aadNurseryPlay from "@/public/media/aadharshila/nursery-play.jpg";
import aadNurseryClass from "@/public/media/aadharshila/nursery-classroom.jpg";
import aadCultural from "@/public/media/aadharshila/activity-cultural.jpg";
import aadJanmashtami from "@/public/media/aadharshila/activity-janmashtami.jpg";
import aadLunch from "@/public/media/aadharshila/activity-lunch.jpg";
import aadFestival from "@/public/media/aadharshila/activity-festival.jpg";
import aadGroup from "@/public/media/aadharshila/activity-class-group.jpg";
import aadPrayer from "@/public/media/aadharshila/activity-prayer.jpg";
import aadParents from "@/public/media/aadharshila/activity-parents.jpg";
import aadOffice from "@/public/media/aadharshila/founders-office.jpg";

import aryCampusWide from "@/public/media/aryavart/campus-wide.jpg";
import aryExam from "@/public/media/aryavart/open-air-exam.jpg";
import aryExam2 from "@/public/media/aryavart/open-air-exam-2.jpg";
import arySurveyGirls from "@/public/media/aryavart/survey-girls.jpg";
import arySurveyBoys from "@/public/media/aryavart/survey-boys.jpg";
import aryVan from "@/public/media/aryavart/school-van.jpg";

import deepak from "@/public/media/aesri/portrait-deepak-yadav.jpg";
import anita from "@/public/media/aesri/portrait-anita-yadav.jpg";
import citation from "@/public/media/aesri/citation-2013.jpg";
import elderStill from "@/public/media/aesri/classroom-elder.jpg";
import prizeStill from "@/public/media/aesri/prize-distribution.jpg";

export const img = {
  aadharshila: {
    campus: {
      src: aadCampus,
      alt: "The white single-storey building of Aadharshila Public School with its blue name board, school vans parked on the left and a sandy ground edged with green shrubs.",
      caption: "Aadharshila Public School, Udairamsar",
      consent: "confirmed",
    },
    nurseryPlay: {
      src: aadNurseryPlay,
      alt: "Nursery children in school uniforms playing on a slide and ride-on toys on a green play mat, with a smiling adult seated among them.",
      caption: "The nursery play area",
      consent: "confirmed",
    },
    nurseryClass: {
      src: aadNurseryClass,
      alt: "Young children seated at colourful single desks with built-in slates in a nursery classroom, a teacher standing by an easel.",
      caption: "A nursery classroom",
      consent: "confirmed",
    },
    cultural: { src: aadCultural, alt: "Children in white uniforms with red sashes performing in the school hall while teachers watch.", caption: "Cultural programme", consent: "confirmed" },
    janmashtami: { src: aadJanmashtami, alt: "Small children dressed as Krishna and Radha for Janmashtami.", caption: "Janmashtami", consent: "confirmed" },
    lunch: { src: aadLunch, alt: "Students in blazers sharing lunch at a long table.", caption: "Lunch together", consent: "confirmed" },
    festival: { src: aadFestival, alt: "Children in festive costumes seated together for a celebration.", caption: "Festival day", consent: "confirmed" },
    group: { src: aadGroup, alt: "A class of children in navy blazers standing with their teachers.", caption: "Class photo day", consent: "confirmed" },
    prayer: { src: aadPrayer, alt: "Children with folded hands in rows during a morning prayer, teachers standing at either side.", caption: "Morning prayer", consent: "confirmed" },
    parents: { src: aadParents, alt: "Parents and children in festive dress seated together at a school celebration.", caption: "Families at a celebration", consent: "confirmed" },
    office: { src: aadOffice, alt: "Mr. Deepak Yadav and Mrs. Anita Yadav seated at a desk in the school office.", caption: "The founders at the school office", consent: "confirmed" },
  },
  aryavart: {
    campusWide: {
      src: aryCampusWide,
      alt: "Students writing an examination seated on stools spread across a sandy school ground, in front of a white building with blue, yellow and red stripes.",
      caption: "Aryavart Public School, Palana",
      consent: "confirmed",
    },
    exam: { src: aryExam, alt: "An open-air examination on the sandy school ground with the striped school building behind.", caption: "Open-air examination", consent: "confirmed" },
    exam2: { src: aryExam2, alt: "Students writing their papers on stools in the winter sun beside green shrubs.", caption: "Exam morning", consent: "confirmed" },
    surveyGirls: { src: arySurveyGirls, alt: "Girls in blue uniforms and dupattas gathered around a plane table on a yellow tripod during a geography practical.", caption: "Plane-table survey", consent: "confirmed" },
    surveyBoys: { src: arySurveyBoys, alt: "A teacher guiding boys as they plot readings on a plane table, a school van in the background.", caption: "Surveying the school ground", consent: "confirmed" },
    van: { src: aryVan, alt: "A yellow school van painted with the words Aryavart Public School Palana, English medium, in Hindi.", caption: "The Aryavart school van", consent: "confirmed" },
  },
  aesri: {
    deepak: { src: deepak, alt: "Portrait of Mr. Deepak Yadav.", consent: "confirmed" },
    anita: { src: anita, alt: "Portrait of Mrs. Anita Yadav.", consent: "confirmed" },
    citation: {
      src: citation,
      alt: "A framed Hindi citation (prashasti) from Karuna International Sanstha, Bikaner, honouring Shri Deepak Yadav, dated Basant Panchami, 14 February 2013.",
      caption: "Citation from Karuna International Sanstha, Bikaner — 14 February 2013",
      consent: "confirmed",
    },
    elder: { src: elderStill, alt: "An elder in a red safa talking with students seated at blue desks in a bright classroom.", caption: "A guest from the community", consent: "confirmed" },
    prize: { src: prizeStill, alt: "A student receiving a prize from a guest in front of a wall of school photographs.", caption: "Prize distribution", consent: "confirmed" },
  },
} satisfies Record<string, Record<string, Img>>;

export const clips = {
  surveyGirls: {
    video: "/media/aryavart/survey-girls.mp4",
    poster: "/media/aryavart/survey-girls-poster.jpg",
    width: 478,
    height: 850,
    alt: "Video: girls at Aryavart Public School take readings on a plane table during a geography practical.",
    caption: "Plane-table surveying · Aryavart, Palana",
    consent: "confirmed",
  },
  surveyBoys: {
    video: "/media/aryavart/survey-boys.mp4",
    poster: "/media/aryavart/survey-boys-poster.jpg",
    width: 478,
    height: 850,
    alt: "Video: a teacher shows boys how to sight and plot points on a plane table.",
    caption: "Field practical · Aryavart, Palana",
    consent: "confirmed",
  },
  exam: {
    video: "/media/aryavart/open-air-exam.mp4",
    poster: "/media/aryavart/open-air-exam-poster.jpg",
    width: 540,
    height: 960,
    alt: "Video: the camera pans across students writing an examination outdoors on the sandy school ground.",
    caption: "Exams under an open sky · Aryavart, Palana",
    consent: "confirmed",
  },
  elder: {
    video: "/media/aesri/classroom-elder.mp4",
    poster: "/media/aesri/classroom-elder-poster.jpg",
    width: 540,
    height: 960,
    alt: "Video: an elder in a red safa speaks with students in a classroom.",
    caption: "A guest from the community",
    consent: "confirmed",
  },
  prize: {
    video: "/media/aesri/prize-distribution.mp4",
    poster: "/media/aesri/prize-distribution-poster.jpg",
    width: 478,
    height: 850,
    alt: "Video: students come forward one by one to receive prizes.",
    caption: "Prize distribution",
    consent: "confirmed",
  },
} satisfies Record<string, Clip>;

export function isClip(m: Clip | Img): m is Clip {
  return (m as Clip).video !== undefined;
}
