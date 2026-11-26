"use client";

import { useEffect, type CSSProperties } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/constants";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { cn } from "@/lib/utils";
import { useSceneStatus } from "@/lib/scene-health";

const SkillsSection = () => {
  const { disable3D, ready } = usePerfProfile();
  const sceneStatus = useSceneStatus();
  const showGrid = !ready || disable3D || sceneStatus !== "ready";

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [showGrid]);

  return (
    <SectionWrapper
      id="skills"
      className={
        showGrid
          ? "flex w-full min-h-screen flex-col justify-center py-24"
          : "w-full h-screen md:h-[150dvh] pointer-events-none"
      }
    >
      <SectionHeader
        id="skills"
        title={
          <span className="inline-flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              01 / CAPABILITY MATRIX
            </span>
            <span>设计能力体系</span>
          </span>
        }
        desc={
          showGrid
            ? "支撑复杂业务系统与 AI 产品落地的专业方法论及工具链"
            : "悬停、点击 3D 键帽或按下物理键盘快捷键检视能力详情"
        }
        className={showGrid ? "static mb-14" : undefined}
      />
      <ul
        className={
          showGrid
            ? "mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 lg:grid-cols-8"
            : "sr-only"
        }
      >
        {Object.values(SKILLS).map((skill) => {
          const isHero = skill.colSpan === 2 && skill.rowSpan === 2;
          const isWide = skill.colSpan === 2 && skill.rowSpan === 1;
          return (
            <li
              key={skill.name}
              style={{ "--skill": skill.color } as CSSProperties}
              className={cn(
                "pointer-events-auto",
                isHero
                  ? "col-span-2 row-span-2"
                  : isWide
                  ? "col-span-2"
                  : "col-span-1",
                "group relative flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl p-5",
                "border border-border/60 bg-secondary/20",
                "transition-[transform,border-color,background-color,box-shadow] duration-300",
                "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-secondary/40",
                "hover:shadow-[0_10px_40px_-12px_var(--skill)]"
              )}
            >
              <span
                aria-hidden
                style={{ background: "var(--skill)" }}
                className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.icon}
                alt={skill.labelZh}
                width={isHero ? 64 : 44}
                height={isHero ? 64 : 44}
                loading="lazy"
                className={cn(
                  "relative object-contain invert dark:invert-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-110",
                  isHero ? "size-14 md:size-16" : "size-9 md:size-10"
                )}
              />
              <span
                className={cn(
                  "relative text-center font-semibold text-foreground/90 transition-colors group-hover:text-foreground",
                  isHero
                    ? "text-base md:text-lg font-extrabold"
                    : isWide
                    ? "text-xs md:text-sm font-bold"
                    : "text-xs"
                )}
              >
                {skill.labelZh ?? skill.label}
              </span>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
};

export default SkillsSection;
