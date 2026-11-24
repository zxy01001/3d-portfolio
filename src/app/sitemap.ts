import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import { getBlogPosts } from "@/lib/mdx";
import { CASE_STUDIES } from "@/data/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().map((post) => ({
    url: `${config.site}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projects = CASE_STUDIES.map((cs) => ({
    url: `${config.site}/projects/${cs.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: config.site,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects,
    {
      url: `${config.site}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${config.site}/blogs`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts,
  ];
}
