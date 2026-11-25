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
  const [activePin, setActivePin] = useState<number | null>(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const track = tracks[trackIdx] ?? tracks[0];
  const steps = track?.steps ?? [];
  const step = steps[stepIdx] ?? steps[0];
  const isMobile = (step?.device ?? track?.device) === "mobile";

  const selectTrack = (idx: number) => {
    setTrackIdx(idx);
    setStepIdx(0);
    setActivePin(0);
  };

  const selectStep = (idx: number) => {
    setStepIdx(idx);
    setActivePin(0);
  };

  const stepDelta = (d: number) => {
    selectStep((stepIdx + d + steps.length) % steps.length);
  };

  if (!step) return null;

  return (
    <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Studio Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5 bg-secondary/25">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            INTERACTIVE UX WORKBENCH · {study.indexLabel}
          </span>
        </div>

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
      </div>

      {/* Main Split Workbench: Left Stepper Rail (4 cols) + Right Device Stage (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Interactive Step Selector */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border/70 p-4 sm:p-5 flex flex-col justify-between bg-background/40">
          <div className="space-y-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1 mb-2">
              KEY FLOW STEPS · 点击切换节点
            </div>
            {steps.map((s, idx) => {
              const active = idx === stepIdx;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => selectStep(idx)}
                  className={cn(
                    "w-full text-left rounded-xl p-3.5 transition-all border",
                    active
                      ? "bg-primary/10 dark:bg-white/10 border-cyan-500/50 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                      <span
                        className={cn(
                          "inline-flex h-5 w-5 items-center justify-center rounded-md font-mono text-[11px]",
                          active
                            ? "bg-cyan-500 text-slate-950 font-extrabold"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {idx + 1}
                      </span>
                      {s.label}
                    </span>
                    {s.hotspots && s.hotspots.length > 0 && (
                      <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-600 dark:text-cyan-300">
                        {s.hotspots.length} 处标注
                      </span>
                    )}
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
              );
            })}
          </div>

          {/* Hotspot Legend if active step has hotspots */}
          {step.hotspots && step.hotspots.length > 0 && (
            <div className="mt-4 rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-3.5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                UI HOTSPOT · 界面细节批注
              </div>
              <div className="mt-1 text-xs font-bold text-foreground">
                ① {step.hotspots[activePin ?? 0]?.title}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {step.hotspots[activePin ?? 0]?.detail}
              </p>
            </div>
          )}
        </div>

        {/* Right High-Resolution Visual Stage */}
        <div className="lg:col-span-8 relative bg-slate-950/90 p-5 sm:p-7 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[480px]">
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
                className={cn(
                  "relative overflow-hidden shadow-2xl",
                  isMobile
                    ? "rounded-[28px] ring-4 ring-slate-800 border border-white/15"
                    : "rounded-xl ring-1 ring-white/15"
                )}
              >
                <Image
                  src={step.image}
                  alt={step.label}
                  width={1800}
                  height={1150}
                  className={cn(
                    "block w-full h-auto object-contain",
                    isMobile ? "max-h-[58vh]" : "max-h-[58vh]"
                  )}
                />

                {/* Interactive Hotspot Pins */}
                {step.hotspots?.map((pin, pIdx) => {
                  const selected = (activePin ?? 0) === pIdx;
                  return (
                    <button
                      key={pin.title}
                      type="button"
                      onClick={() => setActivePin(pIdx)}
                      onMouseEnter={() => setActivePin(pIdx)}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      aria-label={pin.title}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-extrabold transition-transform",
                        selected
                          ? "scale-115 bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/35 shadow-lg"
                          : "bg-slate-900/90 text-white ring-2 ring-white/60 hover:scale-110"
                      )}
                    >
                      {pIdx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setZoomImg(step.image)}
                className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/70 border border-white/15 px-3 py-1.5 text-xs text-white/90 hover:bg-black/90 backdrop-blur-md transition"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                高清原图
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Controls */}
          {steps.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => stepDelta(-1)}
                aria-label="上一步"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 hover:bg-black/85 backdrop-blur-md transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => stepDelta(1)}
                aria-label="下一步"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 hover:bg-black/85 backdrop-blur-md transition"
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
            <div className="inline-flex rounded-xl border border-cyan-500/35 bg-cyan-500/10 p-0.5">
              <button
                type="button"
                onClick={() => setAfterState("view")}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  afterState === "view"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-cyan-600 dark:text-cyan-300"
                )}
              >
                新版：查看态
              </button>
              <button
                type="button"
                onClick={() => setAfterState("edit")}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  afterState === "edit"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-cyan-600 dark:text-cyan-300"
                )}
              >
                新版：编辑态
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
      <div className="bg-slate-950/90 p-5 sm:p-7">
        <div className="mb-5 text-center max-w-2xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {mod.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {mod.decision}
          </p>
        </div>

        {mode === "side" ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-white/10 border border-white/10 px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-300 text-center">
                BEFORE · 旧版
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-[18px] sm:rounded-[26px] ring-1 sm:ring-2 ring-white/15 opacity-85 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mod.beforeImg}
                  alt="旧版页面"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs text-slate-400 px-1">
                {mod.beforePain}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-cyan-500 px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-[11px] font-bold text-slate-950 text-center">
                AFTER · 新版{mod.editImg ? (afterState === "edit" ? "（编辑）" : "（查看）") : ""}
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-[18px] sm:rounded-[26px] ring-1 sm:ring-2 ring-cyan-400/60 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rightImg}
                  alt="新版方案"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs text-cyan-200/90 px-1">
                {mod.afterGain}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto w-full max-w-[310px] aspect-[9/17] overflow-hidden rounded-[28px] ring-2 ring-cyan-400/50 shadow-2xl select-none">
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
            <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 backdrop-blur-sm">
              BEFORE
            </span>
            <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-cyan-500 px-2.5 py-0.5 text-[10px] font-bold text-slate-950 backdrop-blur-sm">
              AFTER
            </span>
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)]"
              style={{ left: `${split}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg">
                <MoveHorizontal className="h-4 w-4" />
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
        )}
      </div>
    </div>
  );
}
