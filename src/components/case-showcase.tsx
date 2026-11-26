"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export type ShowcaseStep = {
  label: string;
  image: string;
  note: string;
  isMobile?: boolean;
};

export type ShowcaseGroup = {
  id: string;
  tab: string;
  steps: ShowcaseStep[];
};

export type DecisionCard = {
  tag: string;
  title: string;
  desc: string;
};

export function DecisionStrip({ items }: { items: DecisionCard[] }) {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((d) => (
        <div
          key={d.title}
          className="rounded-xl border border-border/80 bg-secondary/30 p-4"
        >
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            {d.tag}
          </div>
          <div className="mt-1 text-sm font-bold text-foreground">
            {d.title}
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {d.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export function InteractiveFlowShowcase({
  groups,
  decisions,
}: {
  groups: ShowcaseGroup[];
  decisions: DecisionCard[];
}) {
  const [groupIdx, setGroupIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const activeGroup = groups[groupIdx] ?? groups[0];
  const steps = activeGroup.steps;
  const activeStep = steps[stepIdx] ?? steps[0];

  const handleGroupChange = (idx: number) => {
    setGroupIdx(idx);
    setStepIdx(0);
  };

  const goStep = (delta: number) => {
    setStepIdx((prev) => (prev + delta + steps.length) % steps.length);
  };

  return (
    <div>
      {/* Top Control Bar: Module Switcher + Step Pills */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        {groups.length > 1 && (
          <div className="inline-flex rounded-xl border border-border bg-secondary/50 p-1">
            {groups.map((g, idx) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleGroupChange(idx)}
                className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                  idx === groupIdx
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {g.tab}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5">
          {steps.map((s, idx) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setStepIdx(idx)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all border",
                idx === stepIdx
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/60 text-muted-foreground border-border hover:text-foreground"
              )}
            >
              {idx + 1}. {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Stage */}
      <div className="group/stage relative overflow-hidden rounded-2xl border border-border bg-slate-100/85 dark:bg-slate-950/90 p-3 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.image}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-center min-h-[280px] sm:min-h-[380px]"
          >
            <button
              type="button"
              onClick={() => setZoomed(true)}
              className="group relative block cursor-zoom-in outline-none"
              aria-label="放大查看设计稿"
            >
              <Image
                src={activeStep.image}
                alt={activeStep.label}
                width={1800}
                height={1100}
                className={cn(
                  "mx-auto block w-auto object-contain rounded-xl ring-1 ring-slate-900/10 dark:ring-white/15 shadow-xl dark:shadow-2xl",
                  activeStep.isMobile
                    ? "max-h-[52vh]"
                    : "max-h-[54vh] max-w-full"
                )}
              />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Arrows — fade in gently on hover on desktop */}
        {steps.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goStep(-1)}
              aria-label="上一张"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white md:opacity-0 md:group-hover/stage:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goStep(1)}
              aria-label="下一张"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/80 backdrop-blur-md transition hover:bg-black/80 hover:text-white md:opacity-0 md:group-hover/stage:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Concise 1-Line Design Decision Caption + Clean Zoom Trigger */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/90 dark:bg-white/5 border border-border/80 dark:border-white/10 px-4 py-2.5 text-xs sm:text-sm text-foreground dark:text-slate-200 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 rounded bg-slate-200/80 dark:bg-white/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {String(stepIdx + 1).padStart(2, "0")} /{" "}
              {String(steps.length).padStart(2, "0")}
            </span>
            <span className="truncate font-medium">{activeStep.note}</span>
          </div>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="shrink-0 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">放大</span>
          </button>
        </div>
      </div>

      {/* Compact 3-Card Design Value Strip */}
      <DecisionStrip items={decisions} />

      {/* Zoom Dialog */}
      <Dialog open={zoomed} onOpenChange={setZoomed}>
        <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[92vw]">
          <DialogHeader className="sr-only">
            <DialogTitle>{activeStep.label}</DialogTitle>
            <DialogDescription>{activeStep.note}</DialogDescription>
          </DialogHeader>
          <div
            className="flex items-center justify-center"
            onClick={() => setZoomed(false)}
          >
            <Image
              src={activeStep.image}
              alt={activeStep.label}
              width={2200}
              height={1400}
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[90vh] w-auto max-w-full rounded-xl ring-1 ring-white/15 shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export type ComparePair = {
  label: string;
  beforeImg: string;
  afterImg: string;
  note: string;
};

export function InteractiveCompareShowcase({
  pairs,
  decisions,
}: {
  pairs: ComparePair[];
  decisions: DecisionCard[];
}) {
  const [pairIdx, setPairIdx] = useState(0);
  const [split, setSplit] = useState(52);
  const [mode, setMode] = useState<"side" | "slider">("side");

  const current = pairs[pairIdx] ?? pairs[0];

  return (
    <div>
      {/* Module Switcher + View Mode Toggle */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {pairs.map((p, idx) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setPairIdx(idx)}
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-medium transition-all border",
                idx === pairIdx
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/60 text-muted-foreground border-border hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="inline-flex rounded-xl border border-border bg-secondary/50 p-1">
          <button
            type="button"
            onClick={() => setMode("side")}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
              mode === "side"
                ? "bg-background text-foreground shadow-sm"
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
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            滑块叠层
          </button>
        </div>
      </div>

      {/* Interactive Stage */}
      <div className="rounded-2xl border border-border bg-slate-100/85 dark:bg-slate-950/90 p-4 sm:p-5">
        {mode === "side" ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-muted-foreground">
                BEFORE · 改版前
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-2xl ring-1 ring-slate-900/12 dark:ring-white/15 opacity-85">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.beforeImg}
                  alt="旧版界面"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-sky-700 dark:text-cyan-300">
                AFTER · 重构后
              </span>
              <div className="w-full max-w-[260px] aspect-[9/17] overflow-hidden rounded-2xl ring-1 ring-sky-500/45 dark:ring-cyan-400/45 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.afterImg}
                  alt="新版方案"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-w-[300px] mx-auto">
            <div className="flex items-center justify-between px-1 text-[10px] font-mono tracking-wider text-muted-foreground">
              <span>← BEFORE · 旧版</span>
              <span className="text-sky-700 dark:text-cyan-300">AFTER · 新版 →</span>
            </div>
            <div className="relative w-full aspect-[9/17] overflow-hidden rounded-2xl ring-1 ring-slate-900/15 dark:ring-white/15 shadow-2xl select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.beforeImg}
                alt="改版前"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.afterImg}
                  alt="改版后"
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
                aria-label="左右拖动对比新旧界面"
                className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-center text-xs sm:text-sm text-slate-200">
          {current.note}
        </div>
      </div>

      <DecisionStrip items={decisions} />
    </div>
  );
}
