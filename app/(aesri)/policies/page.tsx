import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n";
import { Stagger } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { formatDate } from "@/content/notices";
import { policies } from "@/content/policies";

export const metadata: Metadata = {
  title: "Policies",
  description: "AESRI's privacy, fee and refund, grievance, accessibility, media consent and website policies.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: { en: "Home", hi: "मुख्य पृष्ठ" } },
          { href: "/policies", label: { en: "Policies", hi: "नीतियाँ" } },
        ]}
        eyebrow={<T en="Policies" hi="नीतियाँ" />}
        title={{ en: "Our policies, in plain language.", hi: "हमारी नीतियाँ, सरल भाषा में।" }}
        lead={
          <T
            en="Each policy describes what we actually do, and shows when AESRI last approved it."
            hi="हर नीति वही बताती है जो हम वास्तव में करते हैं, और यह भी कि एईएसआरआई ने उसे पिछली बार कब स्वीकृत किया।"
          />
        }
      />
      <section>
        <div className="container-x">
          <Stagger className="grid gap-4 md:grid-cols-2">
            {policies.map((p) => (
              <Link
                key={p.slug}
                href={`/policies/${p.slug}`}
                className="group flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-34px_rgba(19,39,28,0.5)]"
              >
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-display text-[1.6rem] leading-tight text-forest-900">{p.title}</span>
                    <span lang="hi" className="mt-1 block text-forest-600">
                      {p.titleHi}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-forest-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="mt-4 text-[0.98rem] text-muted">{p.summary}</span>
                <span className="mt-auto flex flex-wrap items-center gap-2 pt-6 text-[0.8rem] text-muted">
                  <span className={p.status === "Approved" ? "rounded-full bg-forest-700 px-2.5 py-1 font-semibold text-cream-50" : "tbc"}>{p.status}</span>v{p.version} · {formatDate(p.updated)}
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
