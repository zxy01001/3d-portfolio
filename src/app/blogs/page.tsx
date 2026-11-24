import React from "react";
import { getBlogPosts } from "@/lib/mdx";
import BlogListClient from "./blog-list-client";

export const metadata = {
  title: "设计思考 | 朱星宇 UX 作品集",
  description: "复杂 B 端业务建模、信息架构治理与 AI 原生体验设计复盘。",
};

export default function BlogPage() {
  const posts = getBlogPosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata,
      wordCount: post.content.trim().split(/\s+/).length,
    }));

  return <BlogListClient posts={posts} />;
}
