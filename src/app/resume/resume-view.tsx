"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { config } from "@/data/config";
import { EDUCATION, EXPERIENCE, SKILLS, VALUE_PILLARS } from "@/data/constants";
import { CASE_STUDIES } from "@/data/case-studies";

export default function ResumeView() {
  return (
    <div className="min-h-screen font-sans pt-24 pb-20 print:pt-0 print:pb-0">
      {/* Print-clean overrides so window.print() exports a crisp A4 PDF */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              header, footer, .no-print { display: none !important; }
              body { background: #ffffff !important; color: #0f172a !important; }
              .resume-sheet { border: none !important; box-shadow: none !important; background: #ffffff !important; padding: 0 !important; }
            }
          `,
        }}
      />

      {/* Top Action Bar */}
      <div className="no-print mx-auto w-full max-w-5xl px-4 sm:px-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/75 px-4 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回 3D 作品集首页
          </Link>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={() => window.print()}
              size="sm"
              className="gap-2 rounded-full px-5 shadow-sm"
            >
              <Printer className="h-4 w-4" />
              打印 / 导出 A4 PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Unified Glassmorphic Resume Sheet */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="resume-sheet mx-auto w-full max-w-5xl px-4 sm:px-6"
      >
        <div className="rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-7 border-b border-border/70">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  CURRICULUM VITAE · {config.authorEn}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {config.status}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                {config.author}
                <span className="ml-3 text-lg sm:text-xl font-semibold text-muted-foreground">
                  {config.role}
                </span>
              </h1>

              <p className="text-sm sm:text-base font-medium text-foreground/90">
                {config.headline}
              </p>
              <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                意向岗位：AI-Native UX 设计师 · AI / B 端产品经理（PM）· FDE（前线部署工程师）
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <a
                  href={`mailto:${config.email}`}
                  className="inline-flex items-center gap-1.5 font-mono hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-cyan-500" />
                  {config.email}
                </a>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                  {config.location}
                </span>
                <span>·</span>
                <span>24 岁 · {config.experienceYears}</span>
              </div>
            </div>

            <div className="shrink-0">
              <div className="h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl ring-2 ring-border shadow-lg">
                <Image
                  src="/assets/zxy/avatar.jpg"
                  alt="朱星宇"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3 Core Value Pillars */}
          <section>
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              01 · CORE VALUE · 核心交付价值
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {VALUE_PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border/75 bg-background/60 p-4"
                >
                  <div className="font-display text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                    {p.metric}
                  </div>
                  <div className="mt-1 text-sm font-bold text-foreground">
                    {p.title}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Two-Column Body: Left Sidebar (Education + Skills) & Right Main (Experience) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <aside className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  02 · EDUCATION · 教育与资质
                </h2>
                <div className="rounded-2xl border border-border/75 bg-background/60 p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-bold text-sm text-foreground">
                      <GraduationCap className="h-4 w-4 text-indigo-500" />
                      {EDUCATION.school}
                    </span>
                    <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      {EDUCATION.highlight}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-foreground/85">
                    {EDUCATION.degree}（{EDUCATION.period}）
                  </div>
                  <div className="text-xs text-muted-foreground">
                    资质：{EDUCATION.certs}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  03 · CAPABILITIES · 技能矩阵
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(SKILLS).map((s) => (
                    <Badge
                      key={s.name}
                      variant="outline"
                      className="bg-background/60 border-border/75 text-xs font-normal text-foreground/85"
                    >
                      {s.labelZh}
                    </Badge>
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  04 · EXPERIENCE · 工作经历
                </h2>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-2xl border border-border/75 bg-background/60 p-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <span className="text-base font-bold text-foreground">
                            {exp.title}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            · {exp.company}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                          {exp.periods[0].start} — {exp.periods[0].end}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {exp.description.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Case Studies Index */}
          <section className="pt-2">
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              05 · SELECTED WORKS · 代表项目（点击查看交互详情页）
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/projects/${cs.slug}`}
                  className="group rounded-2xl border border-border/75 bg-background/60 p-4 transition-all hover:border-cyan-500/45 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                      {cs.indexLabel} · {cs.category}
                    </span>
                    <ArrowUpRight className="no-print h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-500" />
                  </div>
                  <div className="mt-1 text-sm sm:text-base font-bold text-foreground">
                    {cs.title}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {cs.oneLiner}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </motion.article>
    </div>
  );
}
