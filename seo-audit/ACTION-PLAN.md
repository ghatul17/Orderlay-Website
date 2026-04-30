# SEO Action Plan — Orderlay

**Date:** 2026-04-29
**Site:** https://www.orderlay.app
**Health Score:** 45 / 100 → projected 75–80 after Critical + High items shipped

---

## Critical (fix today)

### 1. Replace every `orderlay.com` reference with `orderlay.app`

The site declares `orderlay.com` as canonical, og:url, sitemap host, robots sitemap location, and `url` field in Organization/SoftwareApplication JSON-LD. That domain is **not yours** (it resolves to AWS CloudFront for an unrelated host). Google will treat your real site as a duplicate of an unreachable canonical and refuse to index it.

**Files to change** (12 total, all `orderlay.com` → `https://www.orderlay.app`):

- [app/layout.tsx](app/layout.tsx#L20) — `metadataBase`, `openGraph.url`
- [app/sitemap.ts](app/sitemap.ts) — all 6 URL entries
- [app/robots.ts](app/robots.ts#L10) — `sitemap` directive
- [components/JsonLd.tsx](components/JsonLd.tsx#L19) — Organization `url`, `logo`, `contactPoint.url`; SoftwareApplication `url`
- [public/llms.txt](public/llms.txt) — 3 occurrences
- [app/contact-us/page.tsx](app/contact-us/page.tsx)
- [app/privacy-policy/page.tsx](app/privacy-policy/page.tsx)
- [app/terms-condition/page.tsx](app/terms-condition/page.tsx)
- [app/cookie-policy/page.tsx](app/cookie-policy/page.tsx)

**Recommended pattern:** introduce a constant rather than repeat the literal:

```ts
// constants/site.ts
export const SITE_URL = 'https://www.orderlay.app';
export const SITE_NAME = 'Orderlay';
```

Then import `SITE_URL` everywhere. Set it from `NEXT_PUBLIC_SITE_URL` env var so previews can override.

**Verify after deploy:**
```bash
curl -sL https://www.orderlay.app/ | grep -oE 'canonical[^>]*'
curl -sL https://www.orderlay.app/sitemap.xml | grep -c 'orderlay.app'
curl -sL https://www.orderlay.app/robots.txt
```

**Effort:** 30 min · **Impact:** unlocks indexing

---

### 2. Make sitemap.ts dynamic — include blog posts

`app/sitemap.ts` is a hardcoded list of 6 URLs and excludes `/blog`, `/blog/[slug]`. Sanity-published posts will never be discovered through the sitemap.

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';
import { allPostSlugsQuery } from '@/sanity/lib/queries';
import { SITE_URL } from '@/constants/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string; _updatedAt: string }[]>({
    query: allPostSlugsQuery,
    tags: ['post'],
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/restaurant-goer`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-condition`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = slugs.map(({ slug, _updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(_updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
```

You may need to extend `allPostSlugsQuery` to also return `_updatedAt`.

**Effort:** 20 min · **Impact:** every new blog post auto-indexes

---

### 3. Fix `/og-image.png` — currently 404

Both `https://www.orderlay.app/og-image.png` and `https://orderlay.com/og-image.png` return 404. Add a 1200×630 PNG to `public/og-image.png`.

If you don't have one yet:
- Use the `/seo-image-gen` skill to generate, or
- Quick fix: design in Figma → export as 1200×630 PNG → drop in `public/`

**Verify:**
```bash
curl -sI https://www.orderlay.app/og-image.png | head -3
# expect: HTTP/2 200, content-type: image/png
```

**Effort:** 15 min · **Impact:** all social shares get a preview image

---

### 4. Block the Vercel preview alias from indexing

`https://website-v2-gules-nu.vercel.app` serves production content with no canonical override → duplicate content, may steal rankings from `www.orderlay.app`.

Two options:
- **Recommended:** remove that alias from the production deployment in Vercel project settings (Domains tab).
- **Or:** in `next.config.ts`, set custom headers that emit `X-Robots-Tag: noindex` when the host is `*.vercel.app`:

```ts
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: '(.*)\\.vercel\\.app' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
  ];
}
```

**Effort:** 5 min · **Impact:** removes duplicate-content risk

---

## High (fix this week)

### 5. Add canonical to blog routes

Both `/blog` and `/blog/[slug]` currently render no `<link rel="canonical">`.

```ts
// app/blog/page.tsx
export const metadata: Metadata = {
  title: 'Restaurant Management Insights',  // template adds "— Orderlay"
  description: '...',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Orderlay Blog',
    description: '...',
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};
```

```ts
// app/blog/[slug]/page.tsx — inside generateMetadata()
return {
  title: `${metaTitle} | Orderlay Blog`,
  description: metaDescription,
  alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  openGraph: { ..., url: `${SITE_URL}/blog/${slug}` },
  ...
};
```

**Effort:** 10 min · **Impact:** correct canonical signals on highest-value SEO pages

---

### 6. Add BlogPosting / Article schema to blog posts

Single biggest schema gap. Add to `app/blog/[slug]/page.tsx`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name,
        ...(post.author?.bio && { description: post.author.bio }),
      },
      publisher: {
        '@type': 'Organization',
        name: 'Orderlay',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/asset/logo.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug.current}` },
    }),
  }}
/>
```

**Effort:** 20 min · **Impact:** eligible for Article rich results, Discover surface

---

### 7. Fix title template duplication

`app/layout.tsx:23` declares `template: "%s — Orderlay"`. Several pages already include "Orderlay" in their page-level title, producing strings like:

- `"Blog | Orderlay — Restaurant Management Insights — Orderlay"`
- `"How QR Ordering is Changing Restaurants in 2026 | Orderlay Blog — Orderlay"`

**Two ways to fix — pick one and apply consistently:**

**Option A** — keep the template, strip "Orderlay" from page titles:
- `app/blog/page.tsx` → `title: 'Restaurant Insights'`
- `app/blog/[slug]/page.tsx` → `title: post.seo?.metaTitle ?? post.title`
- `app/contact-us/page.tsx` → `title: 'Contact'`

**Option B** — set `title: { absolute: '...' }` per-page when you want full control. Cleaner for blog posts.

**Effort:** 15 min · **Impact:** cleaner SERP titles, no double-brand

---

### 8. Fix concatenated H1s on `/` and `/restaurant-goer`

- `/` H1 renders as `"Restaurant ManagementMade Effortless"` (missing space)
- `/restaurant-goer` H1 renders as `"Orderlay: Where Every BiteStarts with a Scan"`

This happens when two `<span>` lines aren't separated by whitespace. Find the H1 components in your hero sections and either add a space at the end of the first span or use `display: block` on each line so Google still extracts the right text.

**Verify:**
```bash
curl -sL https://www.orderlay.app/ | grep -oE '<h1[^>]*>.*?</h1>' | head -1
```

**Effort:** 10 min · **Impact:** keyword phrases parse correctly

---

### 9. Reduce homepage HTML weight

The `/` document is **1.36 MB uncompressed** with 689 KB of inline RSC payload. Investigate:

- The Footer or large client components dragging the RSC tree
- Sanity blog post hydration on the homepage (only needed if showing recent posts)
- Inline SVGs that should be `<Image src="/file.svg" />` instead

Run `npx @next/bundle-analyzer` on the build, or open DevTools Network tab and check what dominates the document weight.

**Effort:** 1–2 hours investigation · **Impact:** LCP improvement

---

## Medium (fix this month)

### 10. Move Organization schema to homepage only

`components/JsonLd.tsx` exports `OrganizationSchema`, and [app/layout.tsx:63](app/layout.tsx#L63) renders it on every page. Per Schema.org guidance, `Organization` should appear once at the site level — typically on the homepage. Move to `app/page.tsx`. Keep `SoftwareApplicationSchema` site-wide if desired.

### 11. Add BreadcrumbList schema

For `/blog`, `/blog/[slug]`, `/restaurant-goer`, and policy pages. Helps with breadcrumb display in SERPs.

### 12. Strengthen HSTS

In `next.config.ts` headers, upgrade to:
```
strict-transport-security: max-age=63072000; includeSubDomains; preload
```
Then submit to https://hstspreload.org once verified.

### 13. Add Content-Security-Policy and Permissions-Policy headers

Not strictly an SEO factor, but a security hardening that PageSpeed Insights flags.

### 14. Build out blog content cadence

You have 1 post. Goal: 12–20 posts over 90 days targeting:
- "QR menu ordering" (commercial intent)
- "Restaurant POS alternatives" (vs/comparison)
- "Restaurant inventory software" (informational)
- "How to set up QR menus" (how-to)

Use the `/seo-cluster` skill for keyword/topic clustering and `/blog-post` skill for drafts.

### 15. Add author schema and bios

Sanity already stores `author.name`, `author.role`, `author.bio`, `author.image`. Surface this:
- Add `Person` schema for the author on blog posts
- Create `/about/<author-slug>` author pages once you have 3+ authors
- Cross-link articles by the same author

### 16. Internal linking gaps

- Add a "Latest posts" or "Resources" link from `/restaurant-goer` to `/blog`
- Blog post template: prominent links back to `/` and `/restaurant-goer`
- Confirm Sanity related-posts section shows once 2+ posts exist

---

## Low (backlog)

### 17. Rename `/terms-condition` → `/terms` or `/terms-and-conditions`
Add a 301 redirect for the old URL. Minor brand-polish issue.

### 18. Sitemap index when blog grows
Once you have 50+ posts, split into `/sitemap-blog.xml` and add a sitemap index.

### 19. Configure Google Search Console + GA4 + CrUX
This unlocks the `seo-google` agent for future audits and gives you real CWV field data, indexation status, and search query reports.

---

## Suggested PR Sequence

| PR | Title | Items | Effort |
|---|---|---|---|
| 1 | Fix wrong canonical domain everywhere | #1, #4 | ~1 hr |
| 2 | Dynamic sitemap with blog posts | #2 | ~30 min |
| 3 | OG image + blog metadata + canonicals | #3, #5, #6 | ~45 min |
| 4 | Title template + H1 fixes | #7, #8 | ~30 min |
| 5 | Schema cleanup | #10, #11, #15 | ~1 hr |
| 6 | Performance pass | #9, #12, #13 | ~3 hr |

After PRs 1–4 ship, re-run `/seo-audit` to see the score climb.

---

## Verification Commands

After deploying the fixes:

```bash
curl -sL https://www.orderlay.app/ | grep -oE '(canonical|og:url)[^>]*'
curl -sL https://www.orderlay.app/sitemap.xml | grep -oE '<loc>[^<]+</loc>'
curl -sI https://www.orderlay.app/og-image.png
curl -sL https://www.orderlay.app/blog/qr-ordering-restaurants-2026 | grep -oE '"@type":"[^"]+"'
curl -sI https://website-v2-gules-nu.vercel.app/ | grep -i x-robots-tag
```

Then submit the new sitemap to Google Search Console and request indexing for the homepage and blog hub.
