"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import SmoothScroll from "@/components/smooth-scroll";
import ScrollProgress from "@/components/ui/scroll-progress";
import CaseStudio from "@/components/projects/case-studio";
import type { CaseStudyData } from "@/data/case-studies";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProjectDetailClient({
  study,
  nextStudy,
  allStudies,
}: {
  study: CaseStudyData;
  nextStudy: CaseStudyData;
  allStudies: { slug: string; indexLabel: string; title: string }[];
}) {
  const [zoomHighlight, setZoomHighlight] = useState<string | null>(null);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <div className="relative min-h-screen font-sans pt-24 pb-20">
        {/* Ambient Brand Glow matching Template Style */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div
            className="absolute -top-32 left-1/4 h-[460px] w-[460px] rounded-full opacity-15 blur-[130px]"
            style={{ background: study.accentFrom }}
          />
          <div
            className="absolute bottom-0 right-1/5 h-[420px] w-[420px] rounded-full opacity-12 blur-[130px]"
            style={{ background: study.accentTo }}
          />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* Top Sub-Nav: Back + Quick Case Switcher */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Link
              href="/#projects"
              className="self-start inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              返回作品集总览
            </Link>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {allStudies.map((item) => {
                const active = item.slug === study.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all border",
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background/80 text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    <span className="font-mono mr-1 opacity-75">
                      {item.indexLabel}
                    </span>
                    <span className="inline">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 01: Compact Editorial Hero */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 rounded-3xl border border-border/80 bg-card/75 p-6 sm:p-8 backdrop-blur-xl shadow-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-lg bg-primary text-primary-foreground px-2.5 py-0.5 font-mono text-xs font-bold">
                    CASE {study.indexLabel}
                  </span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                    {study.category} · {study.badge}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {study.period}
                  </span>
                </div>

                <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                  {study.title}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {study.oneLiner}
                </p>
                <p className="mt-2 text-xs font-medium text-foreground/75">
                  项目角色：{study.role}
                </p>
              </div>

              {/* 3 Crisp Quantified Impact Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 shrink-0 lg:min-w-[330px]">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border/80 bg-background/80 px-2 sm:px-3.5 py-2.5 sm:py-3 text-center"
                  >
                    <div className="font-display text-base sm:text-xl font-extrabold text-foreground">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.header>

          {/* Section 02: Interactive Prototype Workbench (Main Visual Centerpiece) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            aria-label="交互式设计工作台"
            className="mb-12"
          >
            <CaseStudio study={study} />
          </motion.section>

          {/* Section 03: Selected Visual Highlights Bento */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12"
          >
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  VISUAL CRAFT · 关键界面细节
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-foreground">
                  核心状态与组件拆解
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                点击任意设计稿可放大审阅像素细节
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {study.highlights.map((hl) => (
                <div
                  key={hl.title}
                  className={cn(
                    "group rounded-2xl border border-border/80 bg-card/80 p-4 sm:p-5 backdrop-blur-md transition-all hover:border-cyan-500/35 hover:shadow-lg",
                    hl.wide ? "md:col-span-2" : "md:col-span-1"
                  )}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {hl.tag}
                      </span>
                      <h3 className="mt-0.5 text-base font-bold text-foreground">
                        {hl.title}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                        {hl.caption}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZoomHighlight(hl.image)}
                    className="relative block w-full overflow-hidden rounded-xl border border-border bg-slate-100/85 dark:bg-slate-950/85 p-2.5 cursor-zoom-in"
                  >
                    <Image
                      src={hl.image}
                      alt={hl.title}
                      width={1600}
                      height={1000}
                      className="mx-auto block max-h-[380px] w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                    <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/70 border border-white/15 px-2.5 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-md">
                      <Maximize2 className="h-3 w-3" />
                      放大
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 04: 3-Column Design Value Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12"
          >
            <div className="mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                DESIGN IMPACT · 架构决策与专业价值
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-foreground">
                核心设计判断与方法沉淀
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {study.takeaways.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl border border-border/80 bg-card/80 p-5 backdrop-blur-md"
                >
                  <div className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                    {t.code}
                  </div>
                  <h3 className="mt-1.5 text-base font-bold text-foreground">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 05: Seamless Next Case Banner */}
          <Link
            href={`/projects/${nextStudy.slug}`}
            className="group block rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-8 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-500/45 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  NEXT CASE STUDY · 下一个代表作（{nextStudy.indexLabel}）
                </span>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-cyan-500 transition-colors">
                  {nextStudy.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {nextStudy.oneLiner}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </div>

        {/* Highlight Lightbox */}
        <Dialog
          open={Boolean(zoomHighlight)}
          onOpenChange={(o) => !o && setZoomHighlight(null)}
        >
          <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[92vw]">
            <DialogHeader className="sr-only">
              <DialogTitle>{study.title}</DialogTitle>
              <DialogDescription>高清界面大图</DialogDescription>
            </DialogHeader>
            {zoomHighlight && (
              <div
                className="flex items-center justify-center"
                onClick={() => setZoomHighlight(null)}
              >
                <Image
                  src={zoomHighlight}
                  alt={study.title}
                  width={2400}
                  height={1500}
                  onClick={(e) => e.stopPropagation()}
                  className="h-auto max-h-[90vh] w-auto max-w-full rounded-xl ring-1 ring-white/15 shadow-2xl"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SmoothScroll>
  );
}
