/**
 * Campus stories for News & Events. Stories describe what the photos and
 * videos actually show; add dates and class details once the school confirms
 * them (fields marked below).
 */
import { clips, img } from "./media";
import type { Story } from "./types";

export const stories: Story[] = [
  {
    slug: "mapping-our-school-ground",
    title: "Mapping the ground beneath our feet",
    kicker: "Field learning",
    school: "aryavart",
    summary:
      "In a geography practical at Aryavart, girls and boys set up a plane table on the school ground, sight their landmarks and plot the campus to scale.",
    body: [
      "A plane table is one of the oldest tools in surveying: a flat drawing board on a tripod, a sighting ruler called an alidade, and a compass to set north. With it, a survey is drawn in the field rather than back in the classroom.",
      "At Aryavart Public School in Palana, students take turns levelling the table, orienting it and sighting points across the school ground, while their teacher checks each line they draw.",
      "Girls and boys work in the same way and on the same instruments. It's a small, practical lesson in something we care about: that every child in our schools gets to do the real thing.",
    ],
    media: clips.surveyGirls,
    gallery: [clips.surveyBoys, img.aryavart.surveyGirls, img.aryavart.surveyBoys],
  },
  {
    slug: "exams-under-an-open-sky",
    title: "Exams under an open sky",
    kicker: "Campus life",
    school: "aryavart",
    summary:
      "On a bright winter morning at Aryavart, examinations moved outdoors — stools spaced out across the sand in front of the striped school building.",
    body: [
      "Winter mornings in Bikaner are clear and gentle, and on this one the examination hall was the school ground itself.",
      "Students sat on stools spaced well apart across the sand, papers on their knees, with invigilators walking the rows. Behind them, the white school building with its blue, yellow and red stripes caught the low sun.",
      "It's one of those scenes that says a lot about a village school: resourceful, orderly and unafraid to do things a little differently.",
    ],
    media: clips.exam,
    gallery: [img.aryavart.exam, img.aryavart.exam2],
  },
  {
    slug: "a-guest-from-the-community",
    title: "A guest from the community",
    kicker: "Community",
    school: "aesri",
    summary: "An elder in a red safa spends a morning in conversation with students — the kind of lesson no textbook holds.",
    body: [
      "Some of the best lessons arrive in a safa. Here, a guest from the community sits with a class, hands moving as he talks, while students lean in from their desks.",
      "Inviting guests from the community into our classrooms keeps our schools connected to the villages they serve, and to the wisdom of lived experience.",
    ],
    media: clips.elder,
    gallery: [img.aesri.elder],
  },
  {
    slug: "prize-distribution",
    title: "Recognising every effort",
    kicker: "Celebrations",
    school: "aesri",
    summary: "One by one, students step up to receive their prizes — from stationery sets to a brand-new carrom board.",
    body: [
      "Prize days are about more than the prizes. Each student who steps forward is being told, in front of their classmates, that their effort was noticed.",
      "Here, the prizes ranged from stationery sets to a brand-new carrom board.",
    ],
    media: clips.prize,
    gallery: [img.aesri.prize],
  },
  {
    slug: "celebrations-at-aadharshila",
    title: "Janmashtami and other celebrations at Aadharshila",
    kicker: "Celebrations",
    school: "aadharshila",
    summary: "Little Krishnas and Radhas, cultural programmes and shared lunches — moments from the Aadharshila year.",
    body: [
      "Festivals are part of how our youngest learners experience school. At Janmashtami, the nursery fills with small Krishnas and Radhas; on other days, the hall hosts cultural programmes that families come to watch.",
      "Everyday rituals matter too: morning prayer in neat rows, and lunch shared at one long table.",
    ],
    media: img.aadharshila.janmashtami,
    gallery: [img.aadharshila.cultural, img.aadharshila.festival, img.aadharshila.lunch, img.aadharshila.prayer, img.aadharshila.parents],
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
