import type { MetadataRoute } from "next";
import { blogPosts } from "../lib/blog";
import { absoluteUrl } from "../lib/seo";
import { taxToolLinks } from "../lib/tax-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/business-services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/our-team"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/tax-tools"), changeFrequency: "monthly", priority: 0.8 },
    ...taxToolLinks.map((item) => ({ url: absoluteUrl(item.href), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
