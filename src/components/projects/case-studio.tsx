"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MoveHorizontal,
  Sparkles,
  Monitor,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudyData } from "@/data/case-studies";
import InteractiveBiStudio from "./interactive-bi-studio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function CaseStudio({ study }: { study: CaseStudyData }) {
  const [biTab, setBiTab] = useState<"proto" | "screens">("proto");

  if (study.studioMode === "compare" && study.compareModules) {
    return <CompareStudio study={study} />;
  }

  if (study.studioMode === "bi") {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-xl border border-border bg-secondary/60 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setBiTab("proto")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                biTab === "proto"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
              实时交互看板原型
            </button>
            <button
              type="button"
              onClick={() => setBiTab("screens")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                biTab === "screens"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Monitor className="h-3.5 w-3.5" />
              高保真设计稿（4 态）
            </button>
          </div>
        </div>

        {biTab === "proto" ? (
          <InteractiveBiStudio />
        ) : (
          <FlowStudio study={study} />
        )}
      </div>
    );
  }

  return <FlowStudio study={study} />;
}

function FlowStudio({ study }: { study: CaseStudyData }) {
  const tracks = study.tracks ?? [];
  const [trackIdx, setTrackIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  // Default null: keep UI screenshots 100% pure and unobstructed!
  // Only show a subtle translucent focus ring while hovering a specific design note.
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const track = tracks[trackIdx] ?? tracks[0];
  const steps = track?.steps ?? [];
  const step = steps[stepIdx] ?? steps[0];
  const isMobile = (step?.device ?? track?.device) === "mobile";

  const selectTrack = (idx: number) => {
    setTrackIdx(idx);
    setStepIdx(0);
    setHoveredPin(null);
  };

  const selectStep = (idx: number) => {
    setStepIdx(idx);
    setHoveredPin(null);
  };

  const stepDelta = (d: number) => {
    selectStep((stepIdx + d + steps.length) % steps.length);
  };

  if (!step) return null;

  return (
    <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Studio Top Bar — Clean controls off the image */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5 bg-secondary/25">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            UX WORKBENCH · {study.indexLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tracks.length > 1 && (
            <div className="inline-flex rounded-xl border border-border bg-background/80 p-1">
              {tracks.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTrack(idx)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                    idx === trackIdx
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.device === "mobile" ? (
                    <Smartphone className="h-3.5 w-3.5" />
                  ) : (
                    <Monitor className="h-3.5 w-3.5" />
                  )}
                  {t.tab}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setZoomImg(step.image)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            高清大图
          </button>
        </div>
      </div>

      {/* Main Split Workbench: Left Stepper Rail (4 cols) + Right Pure Visual Stage (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Interactive Step Selector */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border/70 p-4 sm:p-5 flex flex-col justify-between bg-background/40">
          <div className="space-y-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1 mb-2">
              KEY FLOW STEPS · 点击切换界面
            </div>
            {steps.map((s, idx) => {
              const active = idx === stepIdx;
              return (
                <div
                  key={s.label}
                  className={cn(
                    "w-full rounded-xl transition-all border",
                    active
                      ? "bg-primary/8 dark:bg-white/[0.06] border-border shadow-sm"
                      : "bg-transparent border-transparent hover:bg-secondary/40"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => selectStep(idx)}
                    className="w-full text-left p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                        <span
                          className={cn(
                            "inline-flex h-5 w-5 items-center justify-center rounded-md font-mono text-[11px]",
                            active
                              ? "bg-primary text-primary-foreground font-bold"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {idx + 1}
                        </span>
                        {s.label}
                      </span>
                    </div>

                    {active && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 pl-7 space-y-1"
                      >
                        <div className="text-xs font-semibold text-foreground/90">
                          {s.title}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {s.decision}
                        </p>
                      </motion.div>
                    )}
                  </button>

                  {/* Subtle hover-to-locate design details (zero permanent markers on image!) */}
                  {active && s.hotspots && s.hotspots.length > 0 && (
                    <div className="px-3.5 pb-3.5 pl-10 space-y-1.5">
                      {s.hotspots.map((pin, pIdx) => {
                        const isHovered = hoveredPin === pIdx;
                        return (
                          <div
                            key={pin.title}
                            onMouseEnter={() => setHoveredPin(pIdx)}
                            onMouseLeave={() => setHoveredPin(null)}
                            className={cn(
                              "rounded-lg border px-2.5 py-2 text-xs transition-colors cursor-default",
                              isHovered
                                ? "border-cyan-500/40 bg-cyan-500/10"
                                : "border-border/60 bg-background/50"
                            )}
                          >
                            <div className="font-semibold text-foreground/90 flex items-center justify-between gap-2">
                              <span>{pin.title}</span>
                              <span className="text-[10px] font-mono text-muted-foreground">
                                悬停定位
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                              {pin.detail}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right High-Resolution Pure Visual Stage — Zero permanent overlays on screenshot */}
        <div className="group/stage lg:col-span-8 relative bg-slate-100/85 dark:bg-slate-950/90 p-5 sm:p-8 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.image}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "relative",
                isMobile ? "max-w-[290px] w-full" : "w-full"
              )}
            >
              <div
                onClick={() => setZoomImg(step.image)}
                className={cn(
                  "relative overflow-hidden shadow-[0_22px_50px_-14px_rgba(15,23,42,0.18)] dark:shadow-2xl cursor-zoom-in",
                  isMobile
                    ? "rounded-[28px] ring-4 ring-slate-800 border border-slate-900/15 dark:border-white/15"
                    : "rounded-xl ring-1 ring-slate-900/10 dark:ring-white/15"
                )}
              >
                <Image
                  src={step.image}
                  alt={step.label}
                  width={1800}
                  height={1150}
                  className="block w-full h-auto object-contain max-h-[60vh]"
                />

                {/* Ephemeral Focus Halo — ONLY appears while hovering a detail card on the left */}
                {hoveredPin !== null && step.hotspots?.[hoveredPin] && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    style={{
                      left: `${step.hotspots[hoveredPin].x}%`,
                      top: `${step.hotspots[hoveredPin].y}%`,
                    }}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-300/90 bg-cyan-400/15 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  </motion.span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle Edge Prev / Next Controls (fade in gently on stage hover on desktop) */}
          {steps.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => stepDelta(-1)}
                aria-label="上一步"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-md transition md:opacity-0 md:group-hover/stage:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => stepDelta(1)}
                aria-label="下一步"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-md transition md:opacity-0 md:group-hover/stage:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* HD Lightbox */}
      <Dialog open={Boolean(zoomImg)} onOpenChange={(o) => !o && setZoomImg(null)}>
        <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[92vw]">
          <DialogHeader className="sr-only">
            <DialogTitle>{step.title}</DialogTitle>
            <DialogDescription>{step.decision}</DialogDescription>
          </DialogHeader>
          {zoomImg && (
            <div
              className="flex items-center justify-center"
              onClick={() => setZoomImg(null)}
            >
              <Image
                src={zoomImg}
                alt={step.title}
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
  );
}

function CompareStudio({ study }: { study: CaseStudyData }) {
  const modules = study.compareModules ?? [];
  const [modIdx, setModIdx] = useState(0);
  const [mode, setMode] = useState<"side" | "slider">("side");
  const [split, setSplit] = useState(50);
  const [afterState, setAfterState] = useState<"view" | "edit">("view");

  const mod = modules[modIdx] ?? modules[0];
  const rightImg =
    afterState === "edit" && mod?.editImg ? mod.editImg : mod?.afterImg;

  const selectMod = (idx: number) => {
    setModIdx(idx);
    setAfterState("view");
  };

  if (!mod) return null;

  return (
    <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Top Bar: Module Selector + Compare Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5 bg-secondary/25">
        <div className="flex flex-wrap gap-1.5">
          {modules.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => selectMod(idx)}
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-semibold transition-all border",
                idx === modIdx
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/70 text-muted-foreground border-border hover:text-foreground"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mod.editImg && (
            <div className="inline-flex rounded-xl border border-border bg-background/80 p-0.5">
              <button
                type="button"
                onClick={() => setAfterState("view")}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  afterState === "view"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                查看态
              </button>
              <button
                type="button"
                onClick={() => setAfterState("edit")}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  afterState === "edit"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                编辑态
              </button>
            </div>
          )}

          <div className="inline-flex rounded-xl border border-border bg-background/80 p-0.5">
            <button
              type="button"
              onClick={() => setMode("side")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                mode === "side"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              双屏对照
            </button>
            <button
              type="button"
              onClick={() => setMode("slider")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                mode === "slider"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              滑块叠层
            </button>
          </div>
        </div>
      </div>

      {/* Visual Comparison Stage */}
      <div className="bg-slate-100/85 dark:bg-slate-950/90 p-5 sm:p-7">
        <div className="mb-5 text-center max-w-2xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {mod.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {mod.decision}
          </p>
        </div>

        {mode === "side" ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-muted-foreground">
                BEFORE · 改版前
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-[18px] sm:rounded-[26px] ring-1 ring-slate-900/12 dark:ring-white/15 opacity-85 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mod.beforeImg}
                  alt="旧版页面"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground px-1">
                {mod.beforePain}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-sky-700 dark:text-cyan-300">
                AFTER · 重构后{mod.editImg ? (afterState === "edit" ? "（编辑）" : "（查看）") : ""}
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-[18px] sm:rounded-[26px] ring-1 ring-sky-500/45 dark:ring-cyan-400/45 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rightImg}
                  alt="新版方案"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs text-foreground/80 dark:text-slate-300 px-1">
                {mod.afterGain}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 max-w-[310px] mx-auto">
            <div className="flex items-center justify-between px-1 text-[10px] font-mono tracking-wider text-muted-foreground">
              <span>← BEFORE · 旧版</span>
              <span className="text-sky-700 dark:text-cyan-300">AFTER · 新版 →</span>
            </div>
            <div className="relative w-full aspect-[9/17] overflow-hidden rounded-[28px] ring-1 ring-slate-900/15 dark:ring-white/20 shadow-2xl select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mod.beforeImg}
                alt="旧版"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rightImg}
                  alt="新版"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/85 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
                style={{ left: `${split}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg">
                  <MoveHorizontal className="h-3.5 w-3.5" />
                </div>
              </div>
              <input
                type="range"
                min={8}
                max={92}
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
                aria-label="拖动对比新旧版本"
                className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
