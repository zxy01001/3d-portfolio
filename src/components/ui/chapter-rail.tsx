"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { usePreloader } from "../preloader";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "hero", index: "00", label: "首屏总览", code: "OVERVIEW" },
  { id: "skills", index: "01", label: "能力矩阵", code: "CAPABILITY" },
  { id: "experience", index: "02", label: "履历壁垒", code: "CHRONICLE" },
  { id: "projects", index: "03", label: "精选案例", code: "WORKS [07]" },
  { id: "contact", index: "04", label: "联系合作", code: "CONTACT" },
] as const;

/**
 * Swiss Vernier Optical Chapter Rail — replaces ugly browser scrollbars on the right
 * with a precision Leica/Braun depth-gauge navigation instrument.
 */
export default function ChapterRail() {
  const pathname = usePathname();
  const { isLoading } = usePreloader();
  const isHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    let raf = 0;

    const updateActive = () => {
      raf = 0;
      const probeY = window.innerHeight * 0.42;
      let current = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = i;
        }
      }
      setActiveIdx((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  if (!isHome || isLoading) return null;

  const jumpTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      aria-label="页面章节游标导航"
      className="group/rail fixed right-3.5 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center"
    >
      {/* Expandable Swiss Chapter Index Card on Hover */}
      <div
        className={cn(
          "mr-2.5 flex flex-col gap-0.5 rounded-2xl border border-border/80 bg-card/90 px-2.5 py-2 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.16)] backdrop-blur-xl",
          "pointer-events-none translate-x-2 opacity-0 transition-all duration-200 ease-out",
          "group-hover/rail:pointer-events-auto group-hover/rail:translate-x-0 group-hover/rail:opacity-100"
        )}
      >
        {CHAPTERS.map((ch, idx) => {
          const active = idx === activeIdx;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => jumpTo(ch.id)}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl px-2.5 py-1.5 text-left transition-colors",
                active
                  ? "bg-sky-500/12 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-mono text-[10px] font-bold",
                    active ? "text-sky-600 dark:text-cyan-400" : "opacity-60"
                  )}
                >
                  {ch.index}
                </span>
                <span className="text-xs font-medium whitespace-nowrap">
                  {ch.label}
                </span>
              </span>
              <span className="font-mono text-[9px] tracking-widest opacity-55">
                {ch.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* Minimalist Vernier Optical Scale (Always Visible, Zero Clutter) */}
      <div className="relative flex flex-col items-center rounded-full border border-border/75 bg-card/75 px-1.5 py-3 shadow-sm backdrop-blur-md">
        <span className="mb-2 font-mono text-[9px] font-bold tracking-tighter text-sky-600 dark:text-cyan-400 tabular-nums">
          {CHAPTERS[activeIdx].index}
        </span>

        {/* Continuous Depth Spine + Vernier Ticks */}
        <div className="relative h-32 w-3 flex justify-center">
          <div className="h-full w-px bg-border/90" />
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute top-0 h-full w-[1.5px] origin-top rounded-full bg-gradient-to-b from-indigo-500 via-sky-500 to-cyan-400"
          />

          {/* 5 Chapter Vernier Notches */}
          <div className="absolute inset-0 flex flex-col justify-between items-center py-0.5">
            {CHAPTERS.map((ch, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpTo(ch.id)}
                  aria-label={`跳转至 ${ch.label}`}
                  className="group/dot relative flex h-3 w-4 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-200",
                      active
                        ? "h-1.5 w-1.5 bg-sky-500 dark:bg-cyan-300 ring-4 ring-sky-500/20 dark:ring-cyan-400/20"
                        : "h-[1px] w-2 bg-muted-foreground/45 group-hover/dot:w-3 group-hover/dot:bg-foreground"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <span className="mt-2 font-mono text-[8px] text-muted-foreground/75 tabular-nums">
          04
        </span>
      </div>
    </aside>
  );
}
