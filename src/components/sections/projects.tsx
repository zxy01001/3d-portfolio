"use client";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import projects, { Project, ProjectFilterGroup } from "@/data/projects";
import { SectionHeader } from "./section-header";

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
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterGroup>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filterGroup === activeFilter);

  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:min-h-[130vh] px-4 py-16 md:py-24">
      <SectionHeader
        id="projects"
        title="精选设计案例"
        desc="聚焦 5 个企业级复杂系统与 AI 产品落地项目 · 点击卡片审阅完整交互架构"
        className="static mb-8 md:mb-10"
      />

      {/* Compact Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 z-20 relative">
        {FILTERS.map((f) => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs md:text-sm font-medium transition-all border backdrop-blur-md",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/75 text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Crisp 2 + 3 Visual Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {filtered.map((project) => {
          const spanClass =
            activeFilter === "all"
              ? project.featuredSpan
                ? "md:col-span-3"
                : "md:col-span-2"
              : filtered.length === 2
              ? "md:col-span-3"
              : "md:col-span-2";
          return (
            <div key={project.id} className={cn("w-full", spanClass)}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center w-full">
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full text-left">
          <div
            className={cn(
              "group relative w-full rounded-2xl overflow-hidden",
              "ring-1 ring-border/80 dark:ring-white/10",
              "shadow-md hover:shadow-2xl hover:ring-cyan-500/45",
              "transition-all duration-300 hover:-translate-y-1"
            )}
            style={{ aspectRatio: "16/10" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              bgGradient={CARD_BACKDROPS[project.id]}
              isHovered={isHovered}
            />

            {/* Minimal Top Badge */}
            <div className="absolute top-3.5 right-3.5 z-20 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-cyan-200">
              {project.badge}
            </div>

            {/* Clean Visual-First Bottom Scrim */}
            <div className="absolute inset-x-0 bottom-0 pt-14 pb-4 px-5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent pointer-events-none z-10">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-cyan-300/90">
                    {project.indexLabel} · {project.category}
                  </div>
                  <div className="mt-0.5 text-lg md:text-xl font-bold text-white truncate">
                    {project.title}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-300/85">
                    {project.oneLiner}
                  </p>
                </div>
                <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:bg-cyan-500 group-hover:scale-105">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        {/* Visual-First Compact Modal: Screen Stage Immediately Visible! */}
        <ResponsiveDialogContent className="md:max-w-5xl md:h-[88vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
          {/* Compact Sticky Header with Metrics + Prototype Link */}
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

          {/* Scrollable Interactive Stage (Zero bloat above images!) */}
          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-5 md:px-7 py-5">{project.content}</div>
          </ScrollArea>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
