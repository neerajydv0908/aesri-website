import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Intro } from "@/components/home/intro";
import { headerSchools } from "@/lib/header-data";

export default function AesriLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Plays only when the home page is the first page of a session (see boot script) */}
      <Intro />
      <SiteHeader schools={headerSchools()} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
