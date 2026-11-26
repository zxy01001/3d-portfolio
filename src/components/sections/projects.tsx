"use client";
import React, { useRef, useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

import projects, { Project, ProjectFilterGroup } from "@/data/projects";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const FILTERS: { id: ProjectFilterGroup; label: string }[] = [
  { id: "all", label: "全部精选" },
  { id: "ai", label: "AI 原生体验" },
  { id: "b2b", label: "复杂 B 端与重构" },
];

const CARD_BACKDROPS: Record<string, string> = {
  "agent-platform":
    "radial-gradient(circle at 20% 20%, rgba(66,99,235,0.45), transparent 60%), radial-gradient(circle at 85% 80%, rgba(47,197,201,0.35), transparent 55%), linear-gradient(135deg, #0b132b, #111d3b)",
  "voice-order":
    "radial-gradient(circle at 80% 20%, rgba(45,212,191,0.38), transparent 55%), linear-gradient(135deg, #0b132b, #15254a)",
  "sales-coaching":
    "radial-gradient(circle at 25% 25%, rgba(99,102,241,0.42), transparent 58%), radial-gradient(circle at 80% 75%, rgba(20,184,166,0.3), transparent 55%), linear-gradient(135deg, #0f172a, #1e1b4b)",
  "business-overview":
    "radial-gradient(circle at 20% 25%, rgba(56,189,248,0.4), transparent 58%), radial-gradient(circle at 85% 80%, rgba(59,130,246,0.32), transparent 55%), linear-gradient(135deg, #09152b, #12294d)",
  "profile-settings":
    "radial-gradient(circle at 75% 25%, rgba(129,140,248,0.4), transparent 58%), linear-gradient(135deg, #0f172a, #1e1b4b)",
  "storefront-system":
    "radial-gradient(circle at 22% 24%, rgba(79,70,229,0.44), transparent 58%), radial-gradient(circle at 82% 78%, rgba(14,165,233,0.34), transparent 55%), linear-gradient(135deg, #091228, #132046)",
  "wms-fulfillment":
    "radial-gradient(circle at 25% 25%, rgba(37,99,235,0.42), transparent 58%), radial-gradient(circle at 80% 78%, rgba(20,184,166,0.34), transparent 55%), linear-gradient(135deg, #071024, #0e2244)",
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterGroup>("all");
  const [viewMode, setViewMode] = useState<"gallery" | "ledger">("gallery");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filterGroup === activeFilter);

  return (
    <SectionWrapper
      id="projects"
      className="max-w-7xl mx-auto md:min-h-[130vh] px-4 sm:px-6 py-16 md:py-24"
    >
      {/* Cohesive Swiss Architectural Masthead + Dual View Switcher */}
      <div className="relative z-20 mb-8 md:mb-10 rounded-3xl border border-border/85 bg-card/90 px-5 sm:px-8 py-6 sm:py-7 shadow-[0_12px_36px_-14px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              03 / SELECTED WORKS
              <span className="rounded-md border border-border/80 bg-secondary/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                0{filtered.length}
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              精选设计案例
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-2xl">
              聚焦 AI 原生智能体、双端容器组件体系与高复杂度供应链重构项目 · 支持弹窗速览或进入完整复盘工作台
            </p>
          </div>

          {/* Filter Pills + Gallery / Architectural Ledger Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-border/80 bg-secondary/45 p-1">
              {FILTERS.map((f) => {
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    className={cn(
                      "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="切换案例视图形态"
              className="inline-flex items-center rounded-2xl border border-border/80 bg-secondary/45 p-1"
            >
              <button
                type="button"
                onClick={() => setViewMode("gallery")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all",
                  viewMode === "gallery"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>画廊</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("ledger")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all",
                  viewMode === "ledger"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-3.5 w-3.5" />
                <span>目录</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "gallery" ? (
        /* Mode A: Crisp 2 + 3 + 2 Symmetric Visual Gallery Grid with Specular Spotlight Borders */
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 relative z-10">
          {filtered.map((project) => {
            const spanClass =
              activeFilter === "all"
                ? project.featuredSpan
                  ? "md:col-span-3"
                  : "md:col-span-2"
                : filtered.length === 2 || filtered.length === 4
                ? "md:col-span-3"
                : "md:col-span-2";
            return (
              <div key={project.id} className={cn("w-full", spanClass)}>
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      ) : (
        /* Mode B: Swiss Architectural Specification Ledger (PM / Design Director Fast-Scan View) */
        <ProjectLedgerView items={filtered} />
      )}
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Zero-React-Rerender GPU Spotlight Rim Tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(e.clientX - rect.left).toFixed(1)}px`);
    el.style.setProperty("--my", `${(e.clientY - rect.top).toFixed(1)}px`);
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full text-left">
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            className={cn(
              "group relative w-full rounded-2xl p-[1.5px] overflow-hidden",
              "bg-border/70 dark:bg-white/10",
              "shadow-[0_14px_34px_-14px_rgba(15,23,42,0.2)] dark:shadow-lg",
              "transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
            )}
            style={{ aspectRatio: "16/10" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {/* Cursor-Tracking Optical Specular Border Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(56, 189, 248, 0.85), rgba(99, 102, 241, 0.35) 45%, transparent 75%)",
              }}
            />

            <div className="relative h-full w-full overflow-hidden rounded-[14.5px] bg-slate-950">
              <ScrollingPreview
                src={project.src}
                alt={project.title}
                bgGradient={CARD_BACKDROPS[project.id]}
                isHovered={isHovered}
              />

              {/* Clean Bottom Scrim */}
              <div className="absolute inset-x-0 bottom-0 pt-12 pb-3.5 px-5 bg-gradient-to-t from-slate-950/95 via-slate-950/72 to-transparent pointer-events-none z-10">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-cyan-300/95 truncate">
                      <span className="font-mono font-bold">
                        {project.indexLabel}
                      </span>{" "}
                      · {project.category}
                      <span className="mx-1.5 text-slate-400/70">·</span>
                      <span className="text-slate-200/90">{project.badge}</span>
                    </div>
                    <div className="mt-0.5 text-lg md:text-xl font-bold text-white truncate">
                      {project.title}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-300/90">
                      {project.oneLiner}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-sky-500 group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ProjectQuickDialog project={project} />
      </ResponsiveDialog>
    </div>
  );
};

function ProjectLedgerView({ items }: { items: Project[] }) {
  return (
    <div className="relative z-10 overflow-hidden rounded-3xl border border-border/85 bg-card/95 shadow-[0_14px_40px_-16px_rgba(15,23,42,0.1)] backdrop-blur-xl divide-y divide-border/75">
      {/* Column Legend Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground bg-secondary/35">
        <div className="col-span-1">INDEX</div>
        <div className="col-span-5">PROJECT &amp; ARCHITECTURE THESIS</div>
        <div className="col-span-2">DOMAIN</div>
        <div className="col-span-3">KEY IMPACT METRICS</div>
        <div className="col-span-1 text-right">OPEN</div>
      </div>

      {items.map((project) => (
        <Link
          key={project.id}
          href={project.live || `/projects/${project.id}`}
          className="group grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-4 px-5 sm:px-6 py-4 sm:py-5 transition-colors hover:bg-sky-500/[0.06]"
        >
          <div className="md:col-span-1 flex items-center justify-between md:block">
            <span className="font-mono text-xs sm:text-sm font-bold text-sky-600 dark:text-cyan-400">
              {project.indexLabel}
            </span>
            <span className="md:hidden font-mono text-[11px] text-muted-foreground">
              {project.category} · {project.badge}
            </span>
          </div>

          <div className="md:col-span-5 flex items-center gap-3.5 min-w-0">
            <div className="relative hidden sm:block h-11 w-16 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-slate-900">
              <Image
                src={project.src}
                alt={project.title}
                width={160}
                height={100}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-bold text-foreground group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                {project.title}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                {project.oneLiner}
              </p>
            </div>
          </div>

          <div className="hidden md:block md:col-span-2">
            <div className="text-xs font-semibold text-foreground/85">
              {project.category}
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              {project.badge}
            </div>
          </div>

          <div className="md:col-span-3 flex flex-wrap gap-1.5">
            {project.metrics.slice(0, 2).map((m) => (
              <span
                key={m}
                className="rounded-full border border-border/80 bg-secondary/55 px-2.5 py-0.5 text-[11px] font-medium text-foreground/85"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="hidden md:flex md:col-span-1 justify-end">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground transition-all group-hover:border-sky-500/50 group-hover:bg-sky-500 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProjectQuickDialog({ project }: { project: Project }) {
  return (
    <ResponsiveDialogContent className="md:max-w-5xl md:h-[88vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur-md px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h4 className="font-display text-lg md:text-xl font-bold text-foreground tracking-tight">
                {project.title}
              </h4>
              <div className="hidden sm:flex items-center gap-1.5">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/85"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">
              {project.oneLiner}
            </p>
          </div>

          {project.live && project.live !== "#" && (
            <Link href={project.live} className="shrink-0">
              <button className="group inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary/85 transition-colors shadow-sm">
                {project.liveLabel}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1" data-lenis-prevent>
        <div className="px-5 md:px-7 py-5">{project.content}</div>
      </ScrollArea>
    </ResponsiveDialogContent>
  );
}

export default ProjectsSection;
