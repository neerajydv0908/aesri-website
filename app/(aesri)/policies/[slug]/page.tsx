import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { T } from "@/components/i18n";
import { PageHero } from "@/components/ui/page-hero";
import { formatDate } from "@/content/notices";
import { getPolicy, policies } from "@/content/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPolicy((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/policies", label: { en: "Policies", hi: "नीतियाँ" } },
          { href: `/policies/${policy.slug}`, label: { en: policy.title, hi: policy.titleHi } },
        ]}
        eyebrow={
          <>
            <span className={policy.status === "Approved" ? "" : "tbc"}>{policy.status}</span>
          </>
        }
        title={{ en: policy.title, hi: policy.titleHi }}
        lead={policy.summary}
      />
      <section>
        <div className="container-x grid gap-12 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="space-y-4 rounded-[1.5rem] bg-cream-50 p-6 text-sm ring-1 ring-forest-900/[0.07]">
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">Version</dt>
                <dd className="mt-1 font-semibold text-forest-900">{policy.version}</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">Last updated</dt>
                <dd className="mt-1 font-semibold text-forest-900">{formatDate(policy.updated)}</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-muted">Owner</dt>
                <dd className="mt-1 font-semibold text-forest-900">{policy.owner}</dd>
              </div>
            </dl>
            <nav aria-label="On this page" className="mt-6 hidden lg:block">
              <ul className="space-y-2 text-sm">
                {policy.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#s-${i}`} className="text-muted hover:text-forest-900">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="prose-aesri max-w-3xl">
            {policy.sections.map((s, i) => (
              <section key={s.heading} id={`s-${i}`} className="scroll-mt-28">
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <p className="!mt-16 border-t border-forest-900/10 pt-8">
              <Link href="/policies" className="inline-flex items-center gap-2 font-semibold !no-underline">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <T en="All policies" hi="सभी नीतियाँ" />
              </Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
