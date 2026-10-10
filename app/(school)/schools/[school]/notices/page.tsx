import type { Metadata } from "next";
import { DualLabel, T } from "@/components/i18n";
import { Reveal } from "@/components/motion/reveal";
import { NoticeBoard } from "@/components/school/notice-board";
import { YearAtAGlance } from "@/components/school/year-at-a-glance";
import { SectionIntro, Tbc } from "@/components/ui/bits";
import { PageHero } from "@/components/ui/page-hero";
import { activeNotices, archivedNotices, calendars } from "@/content/notices";
import { getSchool } from "@/content/schools";
import { loadSchool, type SchoolPageProps } from "@/lib/school-page";

export const revalidate = 3600;

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const s = getSchool((await params).school);
  return { title: "Notices and calendar", description: s ? `Current notices and the session calendar for ${s.name.en}.` : undefined };
}

export default async function NoticesPage({ params }: SchoolPageProps) {
  const school = await loadSchool(params);
  const base = `/schools/${school.slug}`;
  const cal = calendars[school.key];

  return (
    <>
      <PageHero
        offsetHeader={false}
        tone="school"
        crumbs={[
          { href: base, label: school.name },
          { href: `${base}/notices`, label: { en: "Notices & calendar", hi: "सूचनाएँ एवं कैलेंडर" } },
        ]}
        eyebrow={<DualLabel en="Notices" hi="सूचनाएँ" />}
        title={{ en: "Notices and calendar", hi: "सूचनाएँ एवं कैलेंडर" }}
        lead={
          <T
            en="Every notice shows when it was published, who is responsible for it and until when it is valid. Expired notices move to the archive automatically."
            hi="हर सूचना पर प्रकाशन तिथि, ज़िम्मेदार व्यक्ति/विभाग और मान्यता तिथि दी गई है। समाप्त सूचनाएँ अपने-आप पुरानी सूचनाओं में चली जाती हैं।"
          />
        }
      />

      <section className="pb-24">
        <div className="container-x">
          <NoticeBoard active={activeNotices(school.key)} archived={archivedNotices(school.key)} />
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x">
          <SectionIntro
            eyebrow={<T en={`Session ${cal.session}`} hi={`सत्र ${cal.session}`} />}
            title={<T en="The year at a glance." hi="एक नज़र में पूरा वर्ष।" />}
            lead={
              <T
                en="Dashed items follow the usual pattern; exact dates are confirmed by notice."
                hi="डैश वाली प्रविष्टियाँ सामान्य क्रम दर्शाती हैं; सटीक तिथियाँ सूचना द्वारा पुष्ट की जाती हैं।"
              />
            }
          />
          <Reveal className="mt-12">
            {cal.items.length ? (
              <YearAtAGlance session={cal.session} items={cal.items} />
            ) : (
              <div className="rounded-[1.75rem] bg-cream-50 p-8 ring-1 ring-forest-900/[0.07]">
                <Tbc what="Session calendar" />
                <p className="mt-4 text-muted">
                  <T en="The school office will publish this session's calendar here." hi="विद्यालय कार्यालय इस सत्र का कैलेंडर यहाँ प्रकाशित करेगा।" />
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
