# AESRI Website

Hi there, and thanks for stopping by! 👋

I'm **Neeraj Yadav**, a master's student in Computer Science at the University of Kansas. From January 2022 to December 2024 I worked at **AESRI (Aryavart Educational and Social Research Institute)**, which runs two schools in Bikaner, Rajasthan. I built these applications for the schools and maintained them.

The project has three parts, each in its own repository:

| Part | What it does |
| --- | --- |
| **[Website](https://github.com/neerajydv0908/aesri-website)** (you are here) | The public website for AESRI and its two schools |
| **[Campus Portal](https://github.com/neerajydv0908/aesri-portal)** | The private portal where families, teachers, the school offices and AESRI sign in |
| **[Stud-AI](https://github.com/neerajydv0908/stud-ai)** | My machine-learning model that helps class teachers see which students may need support |

Let me walk you through the website.

---

## What it is

One website for the institute and both of its schools:

- **Aryavart Public School**, Palana, Bikaner (LKG to Class XII, Arts in XI–XII): `/schools/aryavart-public-school`
- **Aadharshila Public School**, Udairamsar, Bikaner (Nursery to Class X): `/schools/aadharshila-public-school`

I built it as one umbrella site, but each school has a complete mini-site of its own: Overview, About, Academics, Admissions, Fees, Information & disclosures, Notices & calendar, Facilities & activities, and Contact. That way a parent who searches for a school's admissions or fees lands straight on the right page.

AESRI has its own pages too: home, about, governance, the schools, initiatives, research, news, careers, contact, policies, and a guide to the Campus Portal.

## What I cared about while building it

- **Hindi and English.** Everything critical (navigation, admissions, fees, notices, contact and help) is in both languages. Both are already in the page and CSS shows the one you choose, so switching is instant.
- **Information people can trust.** A fact that hasn't been confirmed from an official document shows a small *To be confirmed* chip instead of a guess. Notices appear on their publish date and move to the archive by themselves when they expire, so an old fee sheet can never stay "current" by accident. The Fees pages show the fees approved by each school's School Level Fee Committee (SLFC), in Hindi and English side by side, as Rajasthan's fee Act requires.
- **Accessible to everyone.** I aimed for WCAG 2.2 AA: a skip link, visible focus, labelled forms with errors in words, and a pause button on every video. I scanned all 41 pages with axe-core, in English and in Hindi, and nothing real is left open.
- **Motion that knows when to stop.** Smooth scrolling and animations make the site feel alive, and the big headings rise in with pure CSS, so they appear before JavaScript loads. If a visitor's device asks for reduced motion, the smooth scrolling, parallax, intro and autoplaying videos all switch off. The intro curtain on the home page plays only when it's the first page opened in a browser session.
- **Privacy.** Enquiries are kept separately for each school and deleted automatically after 12 months. The public site never holds database credentials for student or staff records.

## Built with

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis**

Smooth scrolling comes from Lenis (`components/providers.tsx`) and the animations from Motion (`components/motion/*`).

---

## Run it on your computer

You'll need **Node.js 20.9 or newer** (check with `node -v`).

```bash
cd Website
npm install        # first time only
npm run dev        # start the development server
```

Then open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build on port 3000 |
| `npm run typecheck` | TypeScript check only |
| `npm run checklist` | List every fact still marked **To be confirmed** |

## How it's organised

```
app/
  (aesri)/            AESRI pages: home, about, governance, schools, initiatives,
                      research, news, careers, contact, policies, portal
  (school)/schools/[school]/
                      One set of templates, rendered for both schools
  api/enquiry/        Receives enquiry forms (server-side validation)
  globals.css         Design tokens (green + beige), typography, motion CSS
components/
  layout/             AESRI header and footer
  school/             School header, footer, notice board, calendar, polaroids
  motion/             Reveal, parallax, word reveals, marquee, pinned gallery…
  ui/                 Buttons, page hero, video card, accordion, small parts
  forms/              Enquiry form
  i18n.tsx            <T> and <Bi> bilingual helpers
  portal-link.tsx     Links into the Campus Portal, in the reader's language
content/              ALL the words, facts and data. Edit these files.
public/media/         Optimised photos, video loops and posters
scripts/checklist.mjs Pre-launch checklist
```

## Changing the content

I kept all the words, facts and data in `content/` as typed TypeScript files, so the site can be updated without touching the page code.

| File | What's in it |
| --- | --- |
| `site.ts` | AESRI's name, mission, identity, contacts, founders, milestones, values |
| `schools.ts` | Everything about each school: facts, story, teachers, sections, timings, facilities, admissions steps, disclosures |
| `notices.ts` | Notices (with publish date, expiry, owner, version) and the session calendar |
| `fees.ts` | Fee schedules: fee heads, instalments, approval status |
| `stories.ts` | News & Events stories |
| `org.ts` | Social commitments, research areas and ethics, vacancies, hiring steps |
| `policies.ts` | Policy pages |
| `media.ts` | Photo and video library, with consent flags |
| `portal.ts` | The Campus Portal's address (`NEXT_PUBLIC_PORTAL_URL` overrides it, see [the portal section](#how-it-connects-to-the-campus-portal)) |

A few things worth knowing:

- **Unconfirmed facts.** Anything written as `tbc("…")` shows on the site as a small *To be confirmed* chip. On the schools' Information & disclosures pages and in the Governance identity list, a row still marked `tbc("…")` is left off the page until it's filled in. Once the official document is in hand, swap in the real value:

  ```ts
  principal: tbc("Name of the Principal / Head of School, Aryavart"),   // before
  principal: "Mrs. …",                                                  // after
  ```

  `npm run checklist` lists everything still pending.
- **Where each fact comes from.** Each disclosures row in `content/schools.ts` records its source in `provenance`: `verified` (checked against an official document), `confirmed` (stated by the management), `prospectus` (the school's printed material) or `pending`. The site doesn't show this. Reminders like "check the spelling against the recognition order" go in a `// To check:` comment above the row, and `npm run checklist` lists those too. A row's `note` *is* shown to the public, so don't use it for reminders.
- **Notices** appear only after `publishedAt` and move to the archive automatically after `expiresAt`. Every notice names an `owner` and a `version`. The notice pages regenerate every hour in production.
- **Fees.** `content/fees.ts` holds each school's annual fee by class and the one-time admission fee. Approved schedules have `status: "approved"`, so the pages say "approved fee structure"; use `status: "published"` for amounts that aren't approved yet. `feePeriod` (each schedule's `period`) is the session the fees apply to, now 2026–27; widen it if the SLFC approval covers more sessions. The fee notices in `content/notices.ts` repeat the amounts, so publish a new version of them whenever fees change. Keep this file in step with the portal's fee plans, and never add an automatic yearly increase.
- **Photos.** Put new photos in `public/media/<school>/`, add them to `content/media.ts`, and use them anywhere. Set `consent: "confirmed"` only once guardian consent for website use is on file.
- **Hindi.** Use `<T en="…" hi="…" />` for inline text and `<Bi … />` for blocks.

## Enquiry forms

The forms post to `/api/enquiry`. The server checks them with the same rules as the browser, drops spam with a honeypot, and turns away abuse (`lib/enquiry-guard.ts`): only JSON sent from the site's own pages, at most 16 KB, and at most 5 enquiries per connection and 120 for the whole site in 10 minutes.

Each enquiry is stored **per school and per month** (`data/enquiries/aryavart-2026-10.ndjson`, `aadharshila-…`, `aesri-…`), so one school never sees another's enquiries. A month's file is deleted automatically once its enquiries could be 12 months old, as the privacy policy promises, and the files can be read only by the account that runs the site. (Files from before October 2026 were named `data/enquiries/<school>.ndjson`. Those aren't deleted automatically, so check them and delete them by hand.)

- **On a single server** (a VPS or Docker) behind nginx, the limits count the visitor's address that nginx adds to `X-Forwarded-For` (`TRUSTED_PROXY_HOPS`, default 1: nginx on the same machine). So nginx must pass it along, and the site's own port must not be reachable from the internet (firewall it, or start the site with `npx next start -H 127.0.0.1`):

  ```nginx
  location / {
      proxy_pass http://127.0.0.1:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
  ```
- **`ENQUIRY_DATA_DIR`** should be an absolute folder outside the app (kept across updates, and backed up). Without it, enquiries go to `data/enquiries` inside the app folder.
- **On serverless hosts** like Vercel the disk isn't writable, so set `ENQUIRY_FORWARD_URL` and `ENQUIRY_FORWARD_TOKEN` (see `.env.example`) to forward enquiries elsewhere. It's https only, and a redirect or no answer within 10 seconds counts as a failure, in which case the family is asked to call the office. Once the portal takes admissions, point `ENQUIRY_FORWARD_URL` at its admissions module.
- `data/` is git-ignored. Treat it as personal data.

## Putting it online

It's a Node app (`npm run build && npm start`), because the enquiry API needs a server. Before launch:

- Hold the domain, hosting, repository and backups in **AESRI's own accounts**.
- Serve HTTPS only.
- If the portal isn't at https://portal.aesrischools.org, set `NEXT_PUBLIC_PORTAL_URL` before building.
- The built site sends a Content-Security-Policy and HSTS (`next.config.ts`). Everything it loads comes from the site itself, so add any new outside resource (an embedded map or video, say) to the policy.
- Run `npm run checklist` and fill in anything still marked *To be confirmed*.
- Have a Rajasthan education-law professional review the final compliance checklist.

## How it connects to the Campus Portal

The portal is a separate app where families, teachers, the school offices and AESRI sign in. It lives at **https://portal.aesrischools.org** unless `NEXT_PUBLIC_PORTAL_URL` says otherwise.

- **Portal login** (in the header, the phone menu and on the home page) and the **Portal** link at the top of each school's site open **`/portal`**. That page is the guide: how the sign-in slips, activation and sign-in work, and what each person can do in the portal. Keep it in step with the portal when its features change.
- The **Sign in** and **Activate** buttons on `/portal` open the portal in the reader's language: `…/login?lang=hi` when the site is in Hindi, `…/login?lang=en` otherwise. The portal remembers the language and drops the parameter. On `/portal` itself, **Portal login** in the header goes straight to the portal's sign-in page.
- **`NEXT_PUBLIC_PORTAL_URL`** (see `.env.example`) is built into the pages, so set it **before** `npm run build`. Empty means https://portal.aesrischools.org, or http://localhost:3001 with `npm run dev`.
- **Running both on one computer:** the portal's `npm run dev` uses port 3001 and this site uses 3000, and the portal's "← aesrischools.org" link on its sign-in pages comes back here (its `WEBSITE_URL` setting). On other ports, set `NEXT_PUBLIC_PORTAL_URL` here and `WEBSITE_URL` in the portal.

---

## Thanks for reading!

If you have questions or ideas about the project, you can find me on GitHub at [@neerajydv0908](https://github.com/neerajydv0908).

— Neeraj
