"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  EDUCATION,
  EXPERIENCE,
  SkillNames,
  SKILLS,
  VALUE_PILLARS,
} from "@/data/constants";
import SectionWrapper from "../ui/section-wrapper";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, FileText, GraduationCap } from "lucide-react";

const PROOF_LINKS: Record<number, { label: string; href: string }[]> = {
  0: [
    { label: "01 · 智能体工作台", href: "/projects/agent-platform" },
    { label: "02 · 语音抄单助手", href: "/projects/voice-order" },
    { label: "03 · AI 销售陪练", href: "/projects/sales-coaching" },
  ],
  1: [
    { label: "06 · 双端装修与容器契约", href: "/projects/storefront-system" },
    { label: "04 · 经营概览实时原型", href: "/projects/business-overview" },
  ],
  2: [
    { label: "07 · WMS 履约全链路", href: "/projects/wms-fulfillment" },
    { label: "05 · 系统设置架构治理", href: "/projects/profile-settings" },
  ],
};

const ExperienceSection = () => {
  const mainJob = EXPERIENCE[0];
  const internJob = EXPERIENCE[1];
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <SectionWrapper
      id="experience"
      className="relative z-10 my-12 md:my-20 border-y border-border/90 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-[0_12px_40px_-15px_rgba(15,23,42,0.06)] dark:shadow-none"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 py-16 md:py-24">
        {/* Top Swiss Editorial Masthead (Left-aligned journalistic rhythm, contrasting centered Projects header) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 md:pb-12 border-b border-border/80">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              02 / VALUE &amp; CHRONICLE
            </div>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              专业壁垒与实战履历
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed md:text-right">
            摒弃碎片化功能堆砌，围绕「AI 确定性交互、双端组件工程契约、高复杂度业务建模」建立可量化的交付闭环。
          </p>
        </div>

        {/* Band 01: Open Swiss Hairline Ledger (Zero rounded card boxes — pure architectural grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/75 border-b border-border/80">
          {VALUE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: idx * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              className="group relative py-7 md:py-9 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              {/* Subtle top accent sweep on hover */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="font-bold text-foreground/60">
                  0{idx + 1}
                </span>
                <span className="tracking-wider uppercase">{pillar.tag}</span>
              </div>

              <div className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-300 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent tabular-nums">
                {pillar.metric}
              </div>

              <h3 className="mt-2.5 text-base sm:text-lg font-bold text-foreground">
                {pillar.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Band 02: Asymmetric Sticky Rail (Left 4 cols) + Scroll-Linked Luminous Timeline Spine (Right 8 cols) */}
        <div
          ref={timelineRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 md:pt-16"
        >
          {/* Left Sticky Editorial Rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  CAREER TRAJECTORY · 职业轨迹
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                  从复杂 SaaS 架构治理到 AI 原生产品 0→1 商业化投产
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  兼具产品经理的领域规则拆解力、体验设计师的系统秩序感，以及前线部署工程师（FDE）的代码级原型验证能力。
                </p>
              </div>

              {/* Clean Typographic Role-Fit Index (Left border accent, not a card!) */}
              <div className="border-l-2 border-indigo-500/50 pl-4 space-y-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  TARGET ROLES · 意向方向
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground space-y-1">
                  <div>· AI-Native UX / 高级交互设计师</div>
                  <div>· AI / B 端产品经理（PM）</div>
                  <div>· 前线部署工程师（FDE）</div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/resume"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <FileText className="h-4 w-4 text-cyan-500" />
                  <span className="underline underline-offset-4 decoration-border group-hover:decoration-cyan-500">
                    审阅完整在线简历 / 导出 A4 PDF
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Chronological Spine */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-9">
            {/* Static Hairline Track + Scroll-Driven Luminous Progress Spine */}
            <div
              aria-hidden
              className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-border"
            />
            <motion.div
              aria-hidden
              style={{ scaleY }}
              className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-indigo-500 via-sky-400 to-cyan-400"
            />

            <div className="space-y-12 md:space-y-14">
              {/* Milestone 01: Primary Role */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                {/* Active Pulsing Spine Node */}
                <span
                  aria-hidden
                  className="absolute -left-[23px] sm:-left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-background ring-2 ring-cyan-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {mainJob.periods[0].start} — {mainJob.periods[0].end}
                  </span>
                  <span className="text-border">/</span>
                  <span className="font-semibold text-foreground/85">
                    {mainJob.company}
                  </span>
                  {mainJob.badge && (
                    <>
                      <span className="text-border">/</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                        {mainJob.badge}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  {mainJob.title}
                </h3>

                {/* Numbered Editorial Impact Ledger Rows (with inline proof case links!) */}
                <div className="mt-5 divide-y divide-border/60 border-t border-b border-border/60">
                  {mainJob.description.map((point, idx) => {
                    const [head, rest] = point.split("：");
                    const proofs = PROOF_LINKS[idx] ?? [];
                    return (
                      <div
                        key={idx}
                        className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
                      >
                        <div className="sm:col-span-4 flex items-baseline gap-2">
                          <span className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                            0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {head}
                          </span>
                        </div>

                        <div className="sm:col-span-8 space-y-2">
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {rest}
                          </p>
                          {proofs.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/75">
                                实证案例:
                              </span>
                              {proofs.map((pl) => (
                                <Link
                                  key={pl.href}
                                  href={pl.href}
                                  className="inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold text-indigo-600 dark:text-sky-400 hover:text-cyan-500 transition-colors"
                                >
                                  <span>{pl.label}</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Inline Minimalist Toolchain Strip */}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                    CORE STACK
                  </span>
                  {mainJob.skills.map((skillName) => {
                    const skill = SKILLS[skillName as SkillNames];
                    if (!skill) return null;
                    return (
                      <span
                        key={skillName}
                        className="inline-flex items-center gap-1.5 font-medium text-foreground/80 after:ml-1.5 after:text-border last:after:content-none after:content-['·']"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={skill.icon}
                          alt=""
                          className="w-3.5 h-3.5 object-contain opacity-75 invert dark:invert-0"
                        />
                        {skill.labelZh}
                      </span>
                    );
                  })}
                </div>
              </motion.article>

              {/* Milestone 02: Internship */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[21px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-background ring-2 ring-indigo-500/75"
                />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="font-semibold text-muted-foreground tabular-nums">
                    {internJob.periods[0].start} — {internJob.periods[0].end}
                  </span>
                  <span className="text-border">/</span>
                  <span className="font-semibold text-foreground/85">
                    {internJob.company}
                  </span>
                </div>

                <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {internJob.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {internJob.description[0]}
                </p>
              </motion.article>

              {/* Milestone 03: Education & Academic Honors */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[21px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-background ring-2 ring-slate-400 dark:ring-slate-500"
                />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="font-semibold text-muted-foreground tabular-nums">
                    {EDUCATION.period}
                  </span>
                  <span className="text-border">/</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {EDUCATION.highlight}
                  </span>
                </div>

                <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {EDUCATION.school}
                  <span className="ml-2.5 text-sm sm:text-base font-medium text-muted-foreground">
                    · {EDUCATION.degree}
                  </span>
                </h3>

                <p className="mt-1.5 text-xs text-muted-foreground">
                  资质认证：{EDUCATION.certs}
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
