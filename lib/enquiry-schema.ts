import { z } from "zod";

// The site's Content-Security-Policy forbids eval; without this, zod probes
// for it with `new Function` and the browser reports a CSP violation.
z.config({ jitless: true });

/**
 * Linear-time email check: dot-separated domain parts can't overlap, so a long
 * crafted address can't make the regex backtrack. The length is checked
 * first, because zod still runs .refine() after a failed .max().
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/** The places an enquiry can be for (also the names of their enquiry files). */
export const ENQUIRY_SCHOOLS = ["aryavart", "aadharshila", "aesri"] as const;

/** Shared by the enquiry form (client) and the /api/enquiry route (server). */
export const enquirySchema = z.object({
  school: z.enum(ENQUIRY_SCHOOLS),
  kind: z.enum(["admission", "general"]),
  parentName: z.string().trim().min(2, "Please enter your name.").max(80, "Please keep your name under 80 characters."),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, ""))
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Please enter a 10-digit Indian mobile number."),
  email: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || (v.length <= 120 && EMAIL.test(v)), "Please check the email address."),
  childName: z.string().trim().max(80).optional().or(z.literal("")),
  classSought: z.string().trim().max(40).optional().or(z.literal("")),
  replyLanguage: z.enum(["en", "hi"]).default("en"),
  message: z.string().trim().max(1200, "Please keep your message under 1,200 characters.").optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please agree so that we can contact you about this enquiry." }),
  /** Honeypot — real people never fill this in. */
  website: z.string().max(200).optional().or(z.literal("")),
}).superRefine((v, ctx) => {
  if (v.kind !== "admission") return;
  if (!v.childName || v.childName.trim().length < 2) ctx.addIssue({ code: "custom", path: ["childName"], message: "Please enter the child's name." });
  if (!v.classSought) ctx.addIssue({ code: "custom", path: ["classSought"], message: "Please choose a class." });
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export const enquiryMessagesHi: Record<string, string> = {
  "Please enter your name.": "कृपया अपना नाम लिखें।",
  "Please keep your name under 80 characters.": "कृपया नाम 80 अक्षरों से कम रखें।",
  "Please enter a 10-digit Indian mobile number.": "कृपया 10 अंकों का मोबाइल नंबर लिखें।",
  "Please check the email address.": "कृपया ईमेल पता जाँचें।",
  "Please keep your message under 1,200 characters.": "कृपया संदेश 1,200 अक्षरों से कम रखें।",
  "Please agree so that we can contact you about this enquiry.": "कृपया सहमति दें ताकि हम इस पूछताछ के बारे में आपसे संपर्क कर सकें।",
  "Please enter the child's name.": "कृपया बच्चे का नाम लिखें।",
  "Please choose a class.": "कृपया कक्षा चुनें।",
};
