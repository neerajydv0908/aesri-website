import type { NextConfig } from "next";

const production = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy for the built site. Everything (fonts, images, videos)
 * is served from this site and nothing is embedded from elsewhere, so other
 * origins are refused. Inline scripts and styles stay allowed: Next.js puts
 * page data in inline scripts, the theme boot script is inline, and the
 * animations set inline styles (nonces would make every page dynamic).
 * `next dev` needs eval for fast refresh, so it gets no CSP.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(production
    ? [
        // Browsers only honour this over HTTPS; it stops a later visit being downgraded to http.
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
        { key: "Content-Security-Policy", value: csp },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Don't keep Turbopack's compile cache on disk between `next dev` runs. When the project
    // folder is synced (for example by iCloud's Desktop & Documents), the sync service can put
    // copies such as "CURRENT 2" into that cache and `next dev` then fails to start with
    // "Failed to open database". Builds (`next build`) are not affected by this setting.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1600, 1920],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
