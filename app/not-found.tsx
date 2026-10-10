import Link from "next/link";
import { AesriEmblem } from "@/components/brand/emblems";
import { T } from "@/components/i18n";

export default function NotFound() {
  return (
    <main id="main" className="jaali relative grid min-h-[100svh] place-items-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <AesriEmblem className="mx-auto h-16 w-16 text-forest-700" title="AESRI" />
        <p className="mt-8 font-display text-[7rem] leading-none tracking-[-0.05em] text-forest-900/15">404</p>
        <h1 className="text-h2 -mt-6 text-forest-900">
          <T en="This page wandered off." hi="यह पृष्ठ नहीं मिला।" />
        </h1>
        <p className="text-lead mt-5 text-muted">
          <T
            en="It may have moved, or the notice may have expired. Try one of these instead."
            hi="हो सकता है पृष्ठ हट गया हो या सूचना की अवधि समाप्त हो गई हो। इनमें से कोई प्रयास करें।"
          />
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-forest-800 px-6 py-3 font-semibold text-cream-50 hover:bg-forest-700">
            <T en="AESRI home" hi="मुख्य पृष्ठ" />
          </Link>
          <Link href="/schools/aryavart-public-school" className="rounded-full px-6 py-3 font-semibold text-forest-900 ring-1 ring-forest-900/20 hover:ring-forest-900/50">
            Aryavart
          </Link>
          <Link href="/schools/aadharshila-public-school" className="rounded-full px-6 py-3 font-semibold text-forest-900 ring-1 ring-forest-900/20 hover:ring-forest-900/50">
            Aadharshila
          </Link>
        </div>
      </div>
    </main>
  );
}
