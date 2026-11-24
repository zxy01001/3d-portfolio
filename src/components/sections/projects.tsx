"use client";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import projects, { Project, ProjectFilterGroup } from "@/data/projects";
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const FILTERS: { id: ProjectFilterGroup; label: string }[] = [
  { id: "all", label: "全部案例" },
  { id: "ai", label: "AI 产品体验" },
  { id: "business", label: "复杂业务与数据" },
  { id: "system", label: "架构重构与设计系统" },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterGroup>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filterGroup === activeFilter);

  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:min-h-[130vh] px-4 py-16">
      <SectionHeader
        id="projects"
        title="精选 UX 案例"
        desc="从问题证据、系统建模到交互决策与上线验证（悬停卡片预览 · 点击展开完整方案）"
        className="mb-12 md:mb-16"
      />

      {/* Category Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 z-20 relative">
        {FILTERS.map((f) => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs md:text-sm font-medium transition-all border backdrop-blur-sm",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/70 text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Symmetrical Bento Grid: 2 + 3 + 2 when showing all 7 projects */}
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
            className="group relative w-full rounded-2xl overflow-hidden ring-1 ring-border/70 dark:ring-white/10 shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{ aspectRatio: "16/10" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              bg={`/assets/backgrounds/${project.id}.jpg`}
              isHovered={isHovered}
            />

            {project.badge && (
              <div className="absolute top-3.5 right-3.5 z-20 rounded-full bg-black/65 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-white">
                {project.badge}
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-5 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent pointer-events-none z-10">
              <div className="flex flex-col items-start justify-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium bg-blue-600/90 text-white rounded-md px-2 py-0.5">
                    {project.category}
                  </span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white leading-snug">
                  {project.title}
                </div>
                <p className="line-clamp-1 text-xs text-slate-300/90">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ResponsiveDialogContent className="md:max-w-4xl md:h-[86vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
          {/* Sticky header */}
          <div className="shrink-0 border-b border-border bg-background/90 backdrop-blur-md px-6 md:px-8 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pr-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                <h4 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                  {project.title}
                </h4>
                <span className="w-fit shrink-0 text-[11px] font-medium text-muted-foreground border border-border rounded-full px-3 py-0.5">
                  {project.category}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {project.live && project.live !== "#" && (
                  <Link href={project.live} target="_blank">
                    <button className="group flex items-center gap-1.5 bg-primary text-primary-foreground text-xs md:text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/85 transition-colors">
                      {project.liveLabel ?? "进入完整案例页"}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-6 md:px-8 py-7">
              {/* UX Capabilities & Design Tools */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8"
              >
                {project.skills.frontend?.length > 0 && (
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                      核心设计方法 · UX Focus
                    </span>
                    <FloatingDock items={project.skills.frontend} />
                  </div>
                )}
                {project.skills.backend?.length > 0 && (
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                      设计工具与协作 · Tools &amp; QA
                    </span>
                    <FloatingDock items={project.skills.backend} />
                  </div>
                )}
              </motion.div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                {project.content}
              </motion.div>
            </div>
          </ScrollArea>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
