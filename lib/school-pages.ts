import type { Bi } from "@/content/types";

/** The sections every school microsite has, in navigation order. */
export const schoolPages: { page: string; label: Bi }[] = [
  { page: "", label: { en: "Overview", hi: "अवलोकन" } },
  { page: "about", label: { en: "About", hi: "परिचय" } },
  { page: "academics", label: { en: "Academics", hi: "शिक्षण" } },
  { page: "admissions", label: { en: "Admissions", hi: "प्रवेश" } },
  { page: "fees", label: { en: "Fees", hi: "फ़ीस" } },
  { page: "disclosures", label: { en: "Information & disclosures", hi: "विद्यालय जानकारी" } },
  { page: "notices", label: { en: "Notices & calendar", hi: "सूचनाएँ एवं कैलेंडर" } },
  { page: "facilities", label: { en: "Facilities & activities", hi: "सुविधाएँ एवं गतिविधियाँ" } },
  { page: "contact", label: { en: "Contact", hi: "संपर्क" } },
];
