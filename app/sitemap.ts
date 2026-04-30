import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { allPostsForSitemapQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/constants/site";

type SitemapPost = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/restaurant-goer`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-condition`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let posts: SitemapPost[] = [];
  try {
    posts = await sanityFetch<SitemapPost[]>({
      query: allPostsForSitemapQuery,
      tags: ["post"],
    });
  } catch {
    posts = [];
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map(({ slug, _updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(_updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
