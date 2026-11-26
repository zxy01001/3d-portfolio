import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import {
  FileText,
  Mail,
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Cpu,
  Layers,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HERO_SPOTLIGHTS = [
  {
    code: "CASE 01 · AGENTIC UX",
    title: "企业智能体编排工作台",
    meta: "0→1 投产 · 零代码规则与对话沙盒同屏闭环",
    href: "/projects/agent-platform",
  },
  {
    code: "CASE 02 · MULTIMODAL HITL",
    title: "多模态智能语音抄单助手",
    meta: "识别准确率 80%+ · 四层结构化人机核验卡片",
    href: "/projects/voice-order",
  },
];

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

type HeroEntranceProps = {
  ready: boolean;
  delay: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Pre-mounted behind the opaque preloader so DOM layout, fonts, and avatar decode
 * happen BEFORE the shutter split. Uses GPU-only opacity + translateY (zero blur filter).
 */
const HeroEntrance = ({
  ready,
  delay,
  className,
  children,
}: HeroEntranceProps) => (
  <motion.div
    initial={false}
    animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
    transition={{
      duration: 0.62,
      delay: ready ? delay : 0,
      ease: HERO_EASE,
    }}
    style={{ willChange: "transform, opacity" }}
    className={className}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const ready = !isLoading;

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen")}>
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto">
        {/* Left Column: Core Identity & Value Proposition */}
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "md:col-span-7 lg:col-span-6",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-24 pb-64 sm:pb-72 md:py-16 px-5 sm:px-8 md:px-10 lg:px-14"
          )}
        >
          <div
            aria-hidden={!ready}
            className={cn(
              "flex flex-col items-center md:items-start w-full max-w-xl",
              !ready && "pointer-events-none select-none"
            )}
          >
            {/* Compact Avatar + Status Pill */}
            <HeroEntrance ready={ready} delay={0.14}>
              <div className="mb-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/80 bg-background/95 px-3 py-1.5 shadow-sm">
                <div className="relative h-6 w-6 overflow-hidden rounded-full ring-2 ring-cyan-500/40 shrink-0">
                  <Image
                    src="/assets/zxy/avatar.jpg"
                    alt="朱星宇"
                    width={48}
                    height={48}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-foreground/90">
                  {config.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border-l border-border pl-2">
                  <MapPin className="h-3 w-3 text-cyan-500" />
                  {config.location}
                </span>
              </div>
            </HeroEntrance>

            <div className="text-center md:text-left w-full">
              <HeroEntrance ready={ready} delay={0.22}>
                <p className="font-mono text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-[0.18em] sm:tracking-[0.22em] uppercase">
                  {config.authorEn} · {config.role}
                </p>
              </HeroEntrance>

              <HeroEntrance ready={ready} delay={0.29}>
                <h1
                  className={cn(
                    "mt-2 leading-none text-slate-900 dark:text-white",
                    "font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight",
                    "cursor-default font-display"
                  )}
                >
                  {config.author}
                </h1>
              </HeroEntrance>

              <HeroEntrance ready={ready} delay={0.36}>
                <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                  {config.headline}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {config.tagline}
                </p>
              </HeroEntrance>

              {/* Tight Inline Metrics Bar (Mobile-Safe 3 Columns) */}
              <HeroEntrance ready={ready} delay={0.43}>
                <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border/90 bg-card/95 shadow-[0_8px_28px_-10px_rgba(15,23,42,0.08)] dark:shadow-sm w-full">
                  {config.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-2 sm:px-3.5 py-2.5 sm:py-3 text-center md:text-left"
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
              </HeroEntrance>
            </div>

            {/* Clean CTA Row */}
            <HeroEntrance ready={ready} delay={0.5}>
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <Link href="#projects">
                  <Button className="gap-2 px-5 sm:px-6 shadow-md text-xs sm:text-sm">
                    <span>浏览精选案例</span>
                    <ArrowDownRight size={16} />
                  </Button>
                </Link>

                <Link href="/resume">
                  <Button
                    variant="outline"
                    className="gap-2 px-4 bg-background/95 text-xs sm:text-sm"
                  >
                    <FileText size={15} />
                    <span>在线简历 / PDF</span>
                  </Button>
                </Link>

                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Link href="#contact">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="在线联系"
                        className="bg-background/95"
                      >
                        <Mail size={16} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>前往在线联系模块（防爬虫保护）</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/95"
                      >
                        <SiGithub size={16} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </HeroEntrance>
          </div>
        </div>

        {/* Right Column: Architectural Framing HUD around the 3D Keyboard Stage */}
        <div
          aria-hidden={!ready}
          className="hidden md:flex md:col-span-5 lg:col-span-6 flex-col justify-between py-24 pr-8 lg:pr-12 pointer-events-none z-[2]"
        >
          {/* Top-Right Spec Tag */}
          <HeroEntrance ready={ready} delay={0.38}>
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-border/75 bg-background/90 px-4 py-2.5 shadow-sm">
                <Cpu className="h-4 w-4 text-indigo-500 shrink-0" />
                <div className="text-left">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                    AI-NATIVE CAPABILITY MATRIX
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Agentic UX · OOUX 领域建模 · Vibe Coding 原型工程
                  </div>
                </div>
              </div>
            </div>
          </HeroEntrance>

          {/* Center stays open so the 3D spinning keyboard has full visual spotlight */}
          <div className="flex-1" />

          {/* Bottom-Right Quick Case Spotlights */}
          <HeroEntrance ready={ready} delay={0.52}>
            <div
              className={cn(
                "ml-auto w-full max-w-md space-y-2",
                ready ? "pointer-events-auto" : "pointer-events-none"
              )}
            >
              <div className="flex items-center justify-between px-1 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-cyan-500" />
                  FEATURED WORKS · 代表作直达
                </span>
                <span>向下滚动交互 ↓</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HERO_SPOTLIGHTS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-border/80 bg-card/90 p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-500/45 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[9px] font-bold text-cyan-600 dark:text-cyan-400 truncate">
                        {item.code}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-500 shrink-0" />
                    </div>
                    <div className="mt-1 text-xs font-bold text-foreground truncate">
                      {item.title}
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
                      {item.meta}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </HeroEntrance>
        </div>
      </div>

      <div className="absolute bottom-5 sm:bottom-7 left-[50%] translate-x-[-50%] z-[3]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
