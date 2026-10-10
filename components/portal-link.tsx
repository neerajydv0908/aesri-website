"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useLang } from "@/components/lang-toggle";
import { portalHref } from "@/lib/portal";

/**
 * A link into the Campus Portal that carries the reader's language
 * (…/login?lang=hi when the site is in Hindi). The language lives in the
 * browser, so the address is built here, on the client; before the page is
 * interactive it points to the English version.
 */
export function PortalLink({
  to = "/login",
  className,
  children,
  onClick,
}: {
  to?: "/login" | "/activate";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const lang = useLang();
  return (
    <a href={portalHref(to, lang)} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * The "Portal login" buttons (header, phone menu, home page). They open the
 * Campus Portal page, /portal, as the school sites' "Portal" link does, so
 * readers see how slips, activation and sign-in work before signing in. On
 * /portal itself the button goes straight to the portal's sign-in page.
 */
export function PortalLoginLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  if (pathname === "/portal") {
    return (
      <PortalLink className={className} onClick={onClick}>
        {children}
      </PortalLink>
    );
  }
  return (
    <Link href="/portal" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
