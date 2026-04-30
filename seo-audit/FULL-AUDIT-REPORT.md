# Full SEO Audit Report — Orderlay

**Site:** https://www.orderlay.app
**Apex:** https://orderlay.app (307 → www)
**Date:** 2026-04-29
**Business Type:** SaaS / Mobile App — Restaurant Management & QR Ordering
**Pages Crawled:** 8 (full inventory: `/`, `/blog`, `/blog/qr-ordering-restaurants-2026`, `/restaurant-goer`, `/contact-us`, `/privacy-policy`, `/terms-condition`, `/cookie-policy`)

---

## SEO Health Score: 45 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 25 | 5.5 |
| Content Quality | 23% | 55 | 12.65 |
| On-Page SEO | 20% | 35 | 7.0 |
| Schema / Structured Data | 10% | 50 | 5.0 |
| Performance (CWV — lab estimate) | 10% | 55 | 5.5 |
| AI Search Readiness | 10% | 55 | 5.5 |
| Images | 5% | 75 | 3.75 |
| **Total** | **100%** | — | **~45** |

The score is dragged down almost entirely by a single, repeated bug: the entire site declares the **wrong canonical domain (`orderlay.com`)**. Fix that one issue and the score jumps roughly 25–30 points overnight. Everything else is recoverable in a week.

---

## Top 5 Critical Issues

1. **Canonical, og:url, sitemap, robots, schema, llms.txt all point to `orderlay.com` — a domain you do not own.** It resolves to AWS CloudFront (`13.248.169.48`, `76.223.54.146`) for an unrelated host that returns 405 Method Not Allowed. Google will follow the canonical signal, fail to verify it, and treat your real site (`www.orderlay.app`) as a duplicate of nothing — effectively keeping you out of the index.
2. **Sitemap is hand-coded with 6 stale URLs and excludes `/blog` and every blog post.** Search engines won't discover Sanity-driven content through the sitemap path.
3. **Open Graph image returns 404** on both `orderlay.app` and `orderlay.com`. Every social/Slack/iMessage share will render a broken preview.
4. **Vercel preview alias `website-v2-gules-nu.vercel.app` is publicly served and indexable.** Duplicate-content risk; should `noindex` or be removed from production aliases.
5. **Blog posts have no canonical, no BlogPosting/Article schema, no breadcrumbs.** This is your highest-value SEO surface and it has the weakest signals.

## Top 5 Quick Wins

1. Centralize a single `SITE_URL` constant and replace `orderlay.com` everywhere (≈ 11 files, single PR).
2. Make `app/sitemap.ts` dynamic — pull blog slugs from Sanity instead of a hardcoded list.
3. Add `/og-image.png` (1200x630) to `public/` and verify it returns 200.
4. Set `alternates: { canonical: ... }` on `/blog` and `/blog/[slug]/page.tsx`.
5. Fix the H1 on the homepage: `"Restaurant ManagementMade Effortless"` is missing a space (rendered concatenation of two lines).

---

## 1. Technical SEO

### Crawlability
- ✅ `robots.txt` present, `Allow: /`, `Disallow: /api/`
- ❌ `Sitemap:` directive in robots points to `https://orderlay.com/sitemap.xml` (wrong host) — fix in [app/robots.ts:10](app/robots.ts#L10)
- ✅ HTTPS enforced (`Strict-Transport-Security: max-age=63072000`)
- ⚠️ HSTS lacks `includeSubDomains` and `preload` — not eligible for HSTS preload list
- ✅ HTTP → HTTPS works; apex `orderlay.app` → 307 → `www.orderlay.app` (clean single hop)

### Indexability
- ❌ **Canonical points to non-existent domain on every page.** Confirmed at:
  - `/` → `https://orderlay.com`
  - `/restaurant-goer` → `https://orderlay.com/restaurant-goer`
  - `/contact-us`, `/privacy-policy`, `/terms-condition`, `/cookie-policy` → all on `orderlay.com`
  - `/blog` and `/blog/qr-ordering-restaurants-2026` → no canonical at all
- ❌ Vercel preview alias [`website-v2-gules-nu.vercel.app`](https://website-v2-gules-nu.vercel.app) serves Production without canonicalizing — duplicate content
- ✅ No `noindex` accidentally set
- ✅ No `<meta name="robots">` blocking

### Security Headers (response on `/`)
| Header | Status |
|---|---|
| `strict-transport-security` | ✅ `max-age=63072000` (no `includeSubDomains; preload`) |
| `x-content-type-options` | ✅ `nosniff` |
| `x-frame-options` | ✅ `DENY` |
| `referrer-policy` | ✅ `strict-origin-when-cross-origin` |
| `x-xss-protection` | ⚠️ Set, deprecated by modern browsers (harmless) |
| `content-security-policy` | ❌ Missing |
| `permissions-policy` | ❌ Missing |

### Core Web Vitals (lab estimate — no field data)
- HTML response weight: **1.36 MB on `/`** (uncompressed) — heavy for a marketing homepage
- 169 inline `<script>` blocks totaling **~689 KB** (Next.js RSC payload)
- 9 external script tags
- `x-vercel-cache: HIT` confirms ISR/static cache is working ✓
- Real CWV cannot be measured without CrUX field data — request the user wire up Google Search Console to get accurate LCP/INP/CLS

---

## 2. Content Quality

### Page Inventory & Meta
| Path | Status | Title | H1 |
|---|---|---|---|
| `/` | 200 | Restaurant Management Software | "Restaurant ManagementMade Effortless" ⚠️ |
| `/blog` | 200 | Blog \| Orderlay — Restaurant Management Insights — Orderlay ⚠️ | Restaurant Insights |
| `/blog/qr-ordering-restaurants-2026` | 200 | How QR Ordering is Changing Restaurants in 2026 \| Orderlay Blog — Orderlay ⚠️ | How QR Ordering is Changing Restaurants in 2026 |
| `/restaurant-goer` | 200 | QR Code Menu & Ordering App for Diners — Orderlay | "Orderlay: Where Every BiteStarts with a Scan" ⚠️ |
| `/contact-us` | 200 | Contact Orderlay — Restaurant Management Support — Orderlay | Contact Us |
| `/privacy-policy` | 200 | Privacy Policy — Orderlay Restaurant Software — Orderlay | Privacy Policy |
| `/terms-condition` | 200 | Terms and Conditions — Orderlay Restaurant Software — Orderlay | Terms & Conditions |
| `/cookie-policy` | 200 | Cookie Policy — Orderlay Restaurant Software — Orderlay | Cookie Policy |

### Issues
- **Title duplication** — `app/layout.tsx:23` defines `template: "%s — Orderlay"`. Several titles already include "Orderlay" in the page-level title, so the rendered output reads `"Blog | Orderlay — Restaurant Management Insights — Orderlay"` (Orderlay twice).
- **H1 concatenation bugs** — On `/`, H1 reads `"Restaurant ManagementMade Effortless"` (missing space between two `<span>`/`<br>` lines). Same on `/restaurant-goer`: `"Orderlay: Where Every BiteStarts with a Scan"`.
- **Thin blog footprint** — only 1 published post. E-E-A-T (Experience-Expertise-Authoritativeness-Trust) signals are weak: no author schema, no author bios indexed, no topic depth.
- **Excerpts/descriptions** are well-written and unique per page ✓.

### E-E-A-T Assessment
- ❌ No public team / about / authors page
- ❌ No customer logos, case studies, or quantified social proof in HTML (may be rendered client-side; check)
- ⚠️ Sanity-driven blog posts include `author.name` but no `Person` JSON-LD
- ✅ Real contact info present (`hello@orderlay.app`, `+977-9801753818`)
- ✅ App store listings linked (Apple `id6504802718`, Google Play)

---

## 3. On-Page SEO

### Title Tags
- Homepage title `"Restaurant Management Software"` is generic — missing brand. Better: `"Orderlay — Restaurant Management Software with QR Ordering"`.
- Template "%s — Orderlay" causes double-brand on subpages with manually-suffixed titles.

### Meta Descriptions
- Present on all 8 pages ✓
- All within 120–160 char sweet spot ✓
- Unique per page ✓

### Heading Structure
- ✅ Exactly one `<h1>` per page on every URL audited
- ⚠️ Most pages have only 1–3 `<h2>` sections; thin structure for crawl/AI parsing
- ❌ H1 text concatenation bugs on `/` and `/restaurant-goer`

### Internal Linking
- Footer + nav present on all pages ✓
- `/restaurant-goer` does **not** link back to `/blog` — orphaned blog from this surface
- Blog post does **not** link to `/` or `/restaurant-goer` — no upward navigation
- Sanity blog post body is portable text — internal cross-linking between posts is unverified (only 1 post exists)

### URL Structure
- ✅ Clean, semantic, hyphenated, lowercase
- ⚠️ `terms-condition` should be `terms-and-conditions` or `terms` (minor)

---

## 4. Schema / Structured Data

### Currently Implemented
| Page | Organization | SoftwareApplication | FAQPage | BlogPosting | Breadcrumb |
|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | — | ❌ |
| `/blog` | ✅ | ✅ | — | — | ❌ |
| `/blog/qr-ordering-restaurants-2026` | ✅ | ✅ | — | ❌ | ❌ |
| `/restaurant-goer` | ✅ | ✅ | ✅ | — | ❌ |
| All others | ✅ | ✅ | — | — | ❌ |

### Issues
- ❌ **`url` field in Organization and SoftwareApplication points to `https://orderlay.com`** (`components/JsonLd.tsx:19`, `:35`, `:36`, `:47`) — same canonical bug
- ❌ **No BlogPosting / Article schema** on blog post — biggest missed opportunity
- ❌ **No BreadcrumbList** anywhere
- ❌ **Organization schema is global on every page**, but it should only be on `/`. SoftwareApplication can stay site-wide.
- ✅ FAQPage schema is present on `/` and `/restaurant-goer` and is well-formed
- ✅ JSON-LD parses cleanly (validated via `python json.loads`)

### Validation
Run live validation once URLs are fixed:
- https://search.google.com/test/rich-results
- https://validator.schema.org/

---

## 5. Performance (Lab Estimate)

| Metric | Estimate | Notes |
|---|---|---|
| LCP | ⚠️ likely 2.5–4s | 1.36 MB HTML + 689 KB inline RSC payload |
| INP | likely OK | Next.js 15 + RSC hydration |
| CLS | unknown | needs visual capture |
| TTFB | ✅ good | Vercel cache HIT |
| Total page weight | 🔴 1.36 MB HTML alone | Investigate hero image, fonts, Sanity-image proxying |

Real CWV requires CrUX field data — verify the property is added in Search Console and PageSpeed Insights. The skill's `seo-google` agent can pull this if Google API credentials are configured.

---

## 6. Images

- ✅ 23 `<img>` tags on `/`, all have `alt` attribute (4 with empty alt — acceptable for decorative)
- ✅ Local app screenshots in `/public/` are SVG (well-compressed)
- ✅ Blog post uses `next/image` with proper `sizes` and `priority` on hero
- ⚠️ Sanity image URL pattern uses `?w=1200&h=630` — confirm Vercel image optimizer or Sanity CDN is serving WebP/AVIF
- ❌ **`/og-image.png` returns 404** — the most-shared image on the site is broken
- ⚠️ `/blog` has no `og:image` declared in metadata (`app/blog/page.tsx:13`)

---

## 7. AI Search Readiness (GEO)

- ✅ `llms.txt` exists at [public/llms.txt](public/llms.txt), well-structured, declares features and contact info
- ❌ All URLs in `llms.txt` reference `orderlay.com` — same bug
- ✅ Content is parseable as plain HTML (not JS-only rendered for primary copy)
- ⚠️ No FAQ-style passage formatting on blog post
- ⚠️ No author bylines surfaced in JSON-LD — AI engines can't attribute authorship
- ⚠️ Homepage hero copy is short; AI engines prefer dense factual passages

---

## 8. SXO (Search Experience)

- Page-type alignment is correct: SaaS marketing pages match commercial-investigation intent
- Blog post is informational and matches that intent
- `/restaurant-goer` is split from `/` — be careful: searchers querying "restaurant ordering app for customers" may hit this page expecting consumer download CTAs (which are present ✓) but the canonical mess will demote it

---

## 9. Local SEO

- Address not surfaced in HTML; phone is present (Nepal, +977)
- No `LocalBusiness` schema (correct — this is SaaS, not a brick-and-mortar)
- `seo-local` is not applicable to this business type

---

## 10. Backlinks

- Not measured (no Moz/Bing API credentials configured in this run)
- Suggest: configure `python scripts/backlinks_auth.py --check` to enrich next audit

---

## What's Working Well

- Clean Next.js 15 App Router setup with ISR (`x-vercel-cache: HIT`)
- HTTPS, HSTS, security headers all present
- All pages return 200; no 404/500 errors
- robots.txt correctly blocks `/api/`
- llms.txt structure is excellent (just needs URL fix)
- Image alt text discipline is consistent
- FAQ schema is well-formed
- Blog system already set up with Sanity (ready to scale content)

