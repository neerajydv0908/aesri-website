import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { AesriEmblem, SchoolCrest } from "@/components/brand/emblems";
import { T } from "@/components/i18n";
import { FactBi, FactText } from "@/components/ui/bits";
import { schoolPages } from "@/lib/school-pages";
import type { School } from "@/content/schools";
import { isPending } from "@/content/types";

export function SchoolFooter({ school, sister }: { school: School; sister: School }) {
  const base = `/schools/${school.slug}`;
  return (
    <footer className="dark-surface relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-school text-cream-100 sm:mt-32 sm:rounded-t-[3.5rem]">
      <div aria-hidden className="jaali-light absolute inset-0" />
      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-cream-50/10">
              <SchoolCrest school={school.key} className="h-9 w-9 text-cream-50" />
            </span>
            <div>
              <p className="font-display text-2xl leading-tight text-cream-50">
                <T t={school.name} />
              </p>
              <p className="text-sm text-cream-100/75">
                <T t={school.place} />
              </p>
            </div>
          </div>
          <ul className="mt-8 space-y-3.5 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-cream-100/70" aria-hidden />
              <FactBi value={school.address} />
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-cream-100/70" aria-hidden />
              {isPending(school.phone) ? <FactText value={school.phone} /> : <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="link-underline">{school.phone}</a>}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-cream-100/70" aria-hidden />
              {isPending(school.email) ? <FactText value={school.email} /> : <a href={`mailto:${school.email}`} className="link-underline">{school.email}</a>}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-cream-100/70" aria-hidden />
              <T t={school.officeHours} />
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.18em] text-cream-100/70">
            <T en="This school" hi="यह विद्यालय" />
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-2.5 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-1">
            {schoolPages.map((p) => (
              <li key={p.page || "overview"}>
                <Link href={p.page ? `${base}/${p.page}` : base} className="link-underline text-cream-100/90 hover:text-cream-50">
                  <T t={p.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/" className="group rounded-2xl border border-cream-50/15 p-5 transition-colors hover:border-cream-50/45">
            <span className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <AesriEmblem className="h-8 w-8 text-cream-50" title="" />
                <span className="font-display text-xl text-cream-50">AESRI</span>
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="mt-3 block text-sm text-cream-100/75">
              <T en="Part of Aryavart Educational and Social Research Institute" hi="आर्यवर्त शैक्षिक एवं सामाजिक अनुसंधान संस्थान का अंग" />
            </span>
          </Link>
          <Link href={`/schools/${sister.slug}`} className="group rounded-2xl border border-cream-50/15 p-5 transition-colors hover:border-cream-50/45">
            <span className="flex items-center justify-between gap-3">
              <span className="font-display text-xl text-cream-50">
                <T t={sister.name} />
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="mt-1 block text-sm text-cream-100/75">
              <T en="Our sister school in" hi="हमारा सहयोगी विद्यालय," /> <T t={sister.place} />
            </span>
          </Link>
        </div>
      </div>
      <div className="relative border-t border-cream-50/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.82rem] text-cream-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <T t={school.name} /> · AESRI
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/policies/fee-and-refund-policy" className="link-underline">
              <T en="Fee policy" hi="फ़ीस नीति" />
            </Link>
            <Link href="/policies/grievance-redressal" className="link-underline">
              <T en="Raise a concern" hi="शिकायत" />
            </Link>
            <Link href="/policies/privacy-policy" className="link-underline">
              <T en="Privacy" hi="गोपनीयता" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
