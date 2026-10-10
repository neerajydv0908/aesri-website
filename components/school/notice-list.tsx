import clsx from "clsx";
import { CalendarDays, Pin, UserRound } from "lucide-react";
import { T } from "@/components/i18n";
import { categoryLabels, formatDate } from "@/content/notices";
import type { Notice } from "@/content/types";

export function NoticeCard({ notice, archived = false, compact = false }: { notice: Notice; archived?: boolean; compact?: boolean }) {
  return (
    <article
      className={clsx(
        "relative flex h-full flex-col rounded-[1.5rem] p-6 ring-1 transition-shadow duration-500 sm:p-7",
        archived ? "bg-cream-200/50 ring-forest-900/[0.06]" : "bg-cream-50 ring-forest-900/[0.07] hover:shadow-[0_24px_50px_-34px_rgba(19,39,28,0.5)]",
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em]">
        <span className={clsx("rounded-full px-2.5 py-1", archived ? "bg-forest-900/[0.06] text-muted" : "bg-school-soft text-school")}>
          <T t={categoryLabels[notice.category]} />
        </span>
        {notice.pinned && !archived ? (
          <span className="inline-flex items-center gap-1 text-ochre-600">
            <Pin className="h-3.5 w-3.5" aria-hidden />
            <T en="Pinned" hi="महत्वपूर्ण" />
          </span>
        ) : null}
        {archived ? (
          <span className="text-muted">
            <T en="Archived" hi="पुरानी सूचना" />
          </span>
        ) : null}
      </div>
      <h3 className={clsx("mt-4 font-display leading-snug text-forest-900", compact ? "text-[1.2rem]" : "text-[1.35rem]")}>
        <T t={notice.title} />
      </h3>
      <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">
        <T t={notice.summary} />
      </p>
      <dl className="mt-auto grid gap-1.5 pt-6 text-[0.8rem] text-muted">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <dt className="sr-only">Published</dt>
          <dd>
            <T en={`Published ${formatDate(notice.publishedAt)}`} hi={`प्रकाशित ${formatDate(notice.publishedAt, "hi")}`} />
            {notice.expiresAt ? (
              <>
                {" · "}
                <T
                  en={`${archived ? "Expired" : "Valid until"} ${formatDate(notice.expiresAt)}`}
                  hi={`${archived ? "समाप्त" : "मान्य"} ${formatDate(notice.expiresAt, "hi")}${archived ? "" : " तक"}`}
                />
              </>
            ) : null}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <UserRound className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <dt className="sr-only">Content owner</dt>
          <dd>
            {notice.owner} · v{notice.version}
          </dd>
        </div>
      </dl>
    </article>
  );
}
