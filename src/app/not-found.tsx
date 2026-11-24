import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NotFoundMeme from "@/components/not-found-meme";

export const metadata: Metadata = {
  title: "404 - 页面未找到 | 朱星宇作品集",
  description: "所访问的页面不存在或路径已变更。",
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
      <p
        className="font-display text-7xl font-bold tracking-tight sm:text-8xl"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold sm:text-2xl">页面未找到</h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
        所访问的页面不存在或路径已变更，请返回作品集首页浏览精选案例。
      </p>
      <div className="mt-8 w-full max-w-[426px]">
        <NotFoundMeme />
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        返回作品集首页
      </Link>
    </main>
  );
}
