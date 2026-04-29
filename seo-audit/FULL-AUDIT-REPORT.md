# Full SEO Audit Report — Orderlay
**URL:** http://localhost:3000/  
**Date:** 2026-04-29  
**Auditor:** Claude Code SEO Audit  
**Business Type:** SaaS / Mobile App — Restaurant Management & QR Ordering  

---

## SEO Health Score: 28 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|---------|
| Technical SEO | 25/100 | 22% | 5.5 |
| Content Quality | 40/100 | 23% | 9.2 |
| On-Page SEO | 10/100 | 20% | 2.0 |
| Schema / Structured Data | 0/100 | 10% | 0.0 |
| Performance (CWV) | 45/100 | 10% | 4.5 |
| AI Search Readiness | 30/100 | 10% | 3.0 |
| Images | 40/100 | 5% | 2.0 |
| **TOTAL** | | | **26.2 → 28/100** |

---

## Executive Summary

Orderlay is a restaurant management SaaS with a QR ordering feature targeting both restaurant owners and diners. The website is a **Next.js App Router** project with 6 discoverable pages. The current SEO posture is **critically deficient** — every page is missing meta descriptions, Open Graph tags, canonical URLs, and structured data. Title tags are generic and under-optimized. Four SVG assets exceed 20 MB each, representing a severe performance liability. No sitemap or robots.txt exists.

### Top 5 Critical Issues
1. **No meta descriptions on any page** — zero chance of compelling SERP snippets
2. **Title tags are brand-only** — "Orderlay" with no keyword context (8 chars)
3. **No robots.txt or XML sitemap** — Googlebot gets no crawl guidance
4. **Massive SVG files** (owner.svg = 31 MB, manager.svg = 24 MB) — destroys LCP
5. **Zero structured data / schema** — no SoftwareApplication, Organization, FAQ, or BreadcrumbList markup

### Top 5 Quick Wins
1. Add meta descriptions to all 6 pages (~30 min)
2. Rewrite title tags with keywords (~20 min)
3. Add Open Graph tags to `layout.tsx` (~30 min)
4. Create `app/robots.ts` and `app/sitemap.ts` (~45 min)
5. Add FAQ schema to homepage and `/restaurant-goer` (~1 hour)

---

## 1. Technical SEO

### Crawlability & Indexability

| Check | Status | Detail |
|-------|--------|--------|
| robots.txt | ❌ MISSING | Returns 404 — Googlebot has no crawl rules |
| XML sitemap | ❌ MISSING | No `/sitemap.xml` — pages may not be discovered |
| Canonical tags | ❌ MISSING | All 6 pages lack `<link rel="canonical">` |
| Meta robots | ✅ Present (implicit) | No blocking directives found on live pages |
| 404 page | ✅ Present | Custom 404 renders |
| HTTPS redirect | N/A | Dev environment (localhost) |
| HTTP/2 | N/A | Dev environment |

**No robots.txt** means crawlers have zero guidance. For a production site this also means no Sitemap declaration.

**No canonical tags** on any page creates duplicate content risk if the site is accessible on multiple domains (www vs non-www, HTTP vs HTTPS).

### Security Headers

| Header | Status |
|--------|--------|
| X-Content-Type-Options | ❌ Missing |
| X-Frame-Options | ❌ Missing |
| Content-Security-Policy | ❌ Missing |
| Strict-Transport-Security | ❌ Missing (N/A dev) |
| Referrer-Policy | ❌ Missing |

Next.js does not add security headers by default. These should be added via `next.config.ts` headers array.

### Cache Control
- Homepage returns `Cache-Control: no-store, must-revalidate` — acceptable for SSR but static assets should have long-term caching.

### Page Count
- Discovered pages: 6 (`/`, `/restaurant-goer`, `/privacy-policy`, `/cookie-policy`, `/contact-us`, `/terms-condition`)
- No orphan pages detected.

---

## 2. Content Quality

### E-E-A-T Assessment

| Signal | Status | Notes |
|--------|--------|-------|
| Author/company attribution | ❌ Weak | No "About" page, no team section |
| Trust signals | ⚠️ Partial | Privacy Policy, Cookie Policy, Contact page exist |
| Reviews/testimonials | ⚠️ Referenced | Review component present but no schema |
| Physical address/NAP | ❌ Missing | Contact page has no address |
| Social proof | ⚠️ Partial | Social links present but no follower counts |

### Content Depth

| Page | Word Count | Assessment |
|------|-----------|------------|
| `/` (homepage) | ~810 words | Borderline — content is reasonable but mostly UI labels |
| `/restaurant-goer` | ~600 words | Thin for competitive keyword targeting |
| `/privacy-policy` | Legal copy | OK — legal pages don't need SEO depth |
| `/cookie-policy` | Legal copy | OK |
| `/contact-us` | ~100 words | Thin but acceptable for contact page |

- Homepage content is feature-list driven, not benefit/problem-solution driven
- FAQ section exists (`RestaurantFaqsList`, `CustomerFaqsList`) — good content signal, but needs FAQ schema
- Missing: Blog, case studies, comparison pages, industry pages

### Readability
- Copy is clear and accessible
- Some grammatical inconsistencies ("Improve your operations and delight your customers with the perfect tool for managing your restaurant efficiently" — passive construction)
- Heading hierarchy is inconsistent: H1 → H2 → H3/H6 mix with `h6` used for section labels

---

## 3. On-Page SEO

### Title Tags

| Page | Current Title | Length | Issue |
|------|--------------|--------|-------|
| `/` | "Orderlay " | 8 chars | Brand-only, trailing space, no keywords |
| `/restaurant-goer` | "Orderlay" | 8 chars | Brand-only, no keywords |
| `/privacy-policy` | "Privacy Policy \| Orderlay" | 25 chars | Too short — Google rewrites at <30 chars |
| `/cookie-policy` | "Cookie Policy \| Orderlay" | 24 chars | Too short |
| `/contact-us` | "Contact Us \| Orderlay" | 21 chars | Too short |
| `/terms-condition` | Unknown | — | Not checked |

**Recommended titles (50–60 chars):**
- `/` → "Restaurant Management Software — Orderlay"
- `/restaurant-goer` → "QR Code Ordering for Restaurants — Orderlay"
- `/privacy-policy` → "Privacy Policy — Orderlay Restaurant Software"
- `/contact-us` → "Contact Orderlay — Restaurant Management Support"

### Meta Descriptions
**All pages: MISSING.** Google will auto-generate snippets from page content, which are often poorly optimized and reduce click-through rate.

### Heading Structure

**Homepage:**
- H1: "Restaurant Management Made Effortless" ✅ (1 H1, keyword-relevant)
- H2: "Why Orderlay Works Best for You", "FAQ"
- H3: Feature sub-headings ✅
- H6: Used as section labels — semantic misuse

**`/restaurant-goer`:**
- H1: "Orderlay: Where Every Bite Starts with a Scan" ✅
- H2/H3: Present

**`/contact-us`:**
- ❌ No H1 found — major on-page issue

### Internal Linking
- 7 internal links found from homepage
- No breadcrumb navigation
- `#community` and `#join` are anchor links — fine for UX but add no crawl value
- `/terms-condition` is not linked from any discovered page (orphaned)

### Open Graph / Social
**All pages: MISSING.** No `og:title`, `og:description`, `og:image`, `og:type`, or Twitter Card tags. Social shares will render without preview cards.

---

## 4. Schema / Structured Data

**Zero schema markup found on any page.**

### Missing Opportunities

| Schema Type | Page | Priority |
|------------|------|---------|
| `SoftwareApplication` | `/` | Critical |
| `Organization` | `/` (layout) | High |
| `FAQPage` | `/`, `/restaurant-goer` | High |
| `WebSite` (with SearchAction) | layout | Medium |
| `BreadcrumbList` | All pages | Medium |
| `ContactPage` | `/contact-us` | Medium |

---

## 5. Performance

### Page Load (Local Dev)
- Homepage response time: ~82ms (dev server — not representative of production)
- HTML payload: **2.1 MB** — extremely large for an HTML document (should be <100 KB)

### Critical Image Issues

| File | Size | Issue |
|------|------|-------|
| `/asset/owner.svg` | **31 MB** | Uncompressed complex SVG — devastating LCP |
| `/asset/manager.svg` | **24 MB** | Same issue |
| `/asset/kitchen.svg` | **21 MB** | Same issue |
| `/asset/member.svg` | **18 MB** | Same issue |
| `/asset/waitstaff.svg` | 3 MB | Still very large |
| `/asset/review.svg` | 2 MB | Large |
| `/asset/owner.png` | 1.7 MB | Unoptimized PNG |
| `/asset/manager.png` | 1.5 MB | Unoptimized PNG |

**These SVGs are the single biggest performance issue on the site.** A 31 MB SVG will cause LCP to fail catastrophically (Google's "Poor" threshold is >4s). These should be:
1. Replaced with WebP/AVIF for raster images
2. Simplified/compressed for SVGs (use SVGO)
3. Served via Next.js `<Image>` with proper `sizes` attribute

### Next.js Image Usage
- Most images use Next.js `<Image>` component ✅
- `DashboardDemoItem.tsx` uses raw `<img>` tag — loses optimization benefits
- Preloaded images: `sales.svg`, `member-dash.png`, `ordersummary.svg` ✅

---

## 6. Images

| Check | Status |
|-------|--------|
| Next.js Image component | ✅ Used on most images |
| Raw `<img>` tags | ⚠️ 1 component (DashboardDemoItem) |
| Alt text missing | ✅ None missing outright |
| Empty alt text | ⚠️ 4 images with `alt=""` on homepage/restaurant-goer |
| Image format (WebP/AVIF) | ❌ Most served as PNG/SVG |
| Oversized files | ❌ Critical — 4 SVGs over 18 MB each |

---

## 7. AI Search Readiness

| Signal | Status |
|--------|--------|
| `llms.txt` | ❌ Missing |
| Structured data for citations | ❌ Missing |
| Clear entity definition (product/org) | ⚠️ Weak — brand name only |
| Passage-level citability | ⚠️ Partial — FAQ content exists |
| AI crawler access | ✅ No blocking rules (robots.txt absent) |

Without structured data and clear entity signals, Orderlay is unlikely to be cited by AI overviews or AI assistants when users ask about restaurant management software.

---

## Pages Audit Summary

| Page | Title | Meta Desc | H1 | Canonical | Schema | OG Tags |
|------|-------|-----------|-----|-----------|--------|---------|
| `/` | ⚠️ Short | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/restaurant-goer` | ⚠️ Short | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/privacy-policy` | ⚠️ Short | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/cookie-policy` | ⚠️ Short | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/contact-us` | ⚠️ Short | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/terms-condition` | Unknown | ❌ | ? | ❌ | ❌ | ❌ |
