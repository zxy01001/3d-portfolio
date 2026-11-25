"use client";
import styles from "./style.module.scss";
import { motion } from "motion/react";
import { contentExit, slideUp } from "./anim";
import { usePreloader } from ".";
import { cn } from "@/lib/utils";

/**
 * Mirrors the exact 23-key (32-cell, 8×4) Swiss-Grid 3D Mechanical Keyboard layout
 * so the preloader visually foreshadows the 3D hero stage before the curtain lifts!
 */
const MATRIX_KEYS: {
  id: string;
  label?: string;
  variant?: "hero" | "violet" | "blue" | "teal" | "cyan" | "emerald";
  delayMs: number;
}[] = [
  // Row 0: [2x2 Figma] + [2x1 Agentic] + 4 × [1x1]
  { id: "figma", label: "FIGMA", variant: "hero", delayMs: 0 },
  { id: "aiux", label: "AGENTIC", variant: "violet", delayMs: 90 },
  { id: "cursor", variant: "cyan", delayMs: 180 },
  { id: "codex", variant: "cyan", delayMs: 240 },
  { id: "mcp", variant: "cyan", delayMs: 300 },
  { id: "eval", variant: "emerald", delayMs: 360 },
  // Row 1: (col 0..1 spanned by Figma) + [2x1 Design System] + 4 × [1x1]
  { id: "ds", label: "TOKENS", variant: "blue", delayMs: 140 },
  { id: "rag", variant: "emerald", delayMs: 220 },
  { id: "axure", delayMs: 280 },
  { id: "protopie", delayMs: 340 },
  { id: "jishi", delayMs: 400 },
  // Row 2: [2x1 OOUX] + [2x1 IA] + 4 × [1x1]
  { id: "ooux", label: "OOUX", variant: "teal", delayMs: 120 },
  { id: "ia", label: "ARCH", variant: "blue", delayMs: 200 },
  { id: "code", variant: "cyan", delayMs: 260 },
  { id: "resp", delayMs: 320 },
  { id: "ae", delayMs: 380 },
  { id: "3d", variant: "violet", delayMs: 440 },
  // Row 3: [2x1 State] + [2x1 DataViz] + 4 × [1x1]
  { id: "state", label: "HITL", variant: "violet", delayMs: 160 },
  { id: "viz", label: "BI VIZ", variant: "teal", delayMs: 240 },
  { id: "comfy", delayMs: 300 },
  { id: "mj", delayMs: 360 },
  { id: "sd", delayMs: 420 },
  { id: "qa", variant: "emerald", delayMs: 480 },
];

function getStageStatus(pct: number): { code: string; text: string } {
  if (pct < 28) {
    return {
      code: "STAGE 01 / 04",
      text: "初始化 8×4 瑞士栅格三维键帽几何体 (GLB)",
    };
  }
  if (pct < 62) {
    return {
      code: "STAGE 02 / 04",
      text: "注入 23 枚 AI-Native 高清各向异性语义贴图",
    };
  }
  if (pct < 92) {
    return {
      code: "STAGE 03 / 04",
      text: "编译正交光影着色器与物理按压反馈状态机",
    };
  }
  return {
    code: "STAGE 04 / 04",
    text: "三维交互空间就绪 · 正在揭幕",
  };
}

export default function Loader() {
  const { loadingPercent, forceDismiss } = usePreloader();
  const clamped = Math.max(0, Math.min(100, Math.round(loadingPercent)));
  const padded = String(clamped).padStart(2, "0");
  const stage = getStageStatus(clamped);

  const curveVariants = {
    initial: {
      d: "M0 0 L1440 0 L1440 20 Q720 160 0 20 Z",
    },
    exit: {
      d: "M0 0 L1440 0 L1440 0 Q720 0 0 0 Z",
      transition: {
        duration: 0.78,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.06,
      },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label="正在加载朱星宇三维交互作品集"
      className={styles.introduction}
    >
      {/* Pure-CSS Blueprint Grid & Breathing Indigo/Cyan Aurora — painted at 0ms SSR! */}
      <div className={styles.blueprintGrid} />
      <div className={styles.auroraOrb} />

      {/* Top Architectural HUD Bar */}
      <motion.div
        variants={contentExit}
        initial="initial"
        exit="exit"
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-9 text-[11px] font-mono tracking-[0.18em] text-slate-400"
      >
        <div className="inline-flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-semibold text-slate-200">ZHU XINGYU</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-cyan-300/90">
            INTERACTIVE 3D PORTFOLIO
          </span>
        </div>

        <div className="inline-flex items-center gap-3">
          <span className="hidden md:inline text-slate-400">
            WEBGL 2.0 · RETINA DPR
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
            2026 EDITION
          </span>
        </div>
      </motion.div>

      {/* Centerpiece: Brand Identity + Live 8×4 Keycap Blueprint Matrix */}
      <motion.div
        variants={contentExit}
        initial="initial"
        exit="exit"
        className="relative z-10 mx-auto flex flex-col items-center px-6 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-indigo-200">
          AI-NATIVE UX · PRODUCT MANAGER · FDE
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          朱星宇
          <span className="mx-2.5 font-light text-slate-500">/</span>
          <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            智能体验与系统架构
          </span>
        </h2>

        {/* 8x4 Luminous Mechanical Keyboard Blueprint Preview */}
        <div className={cn(styles.keyMatrix, "mt-6 sm:mt-7")} aria-hidden>
          {MATRIX_KEYS.map((k) => (
            <div
              key={k.id}
              style={{ animationDelay: `${k.delayMs}ms` }}
              className={cn(
                styles.keyCell,
                "flex items-center justify-center",
                k.variant === "hero" && styles.keyHero,
                k.variant === "violet" && styles.keyWideViolet,
                k.variant === "blue" && styles.keyWideBlue,
                k.variant === "teal" && styles.keyWideTeal,
                k.variant === "cyan" && styles.keyAccentCyan,
                k.variant === "emerald" && styles.keyAccentEmerald
              )}
            >
              {k.label && (
                <span className="relative z-10 font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-white/90">
                  {k.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Live Telemetry Step Ticker */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-xs text-slate-300/90">
          <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-400">
            {stage.code}
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="font-medium text-slate-300">{stage.text}</span>
        </div>
      </motion.div>

      {/* Bottom Precision Progress Rail + Tabular Counter + Skip Escape Hatch */}
      <motion.div
        variants={contentExit}
        initial="initial"
        exit="exit"
        className="relative z-10 px-6 sm:px-12 pb-7 sm:pb-10"
      >
        <div className="mb-3 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400">
              LOADING SCENE ASSETS
            </span>
            <button
              type="button"
              onClick={forceDismiss}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
            >
              直接进入 ↗
            </button>
          </div>

          <div className="flex items-baseline gap-1 font-mono tabular-nums">
            <span className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              {padded}
            </span>
            <span className="text-sm sm:text-lg font-bold text-cyan-400">%</span>
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressIndeterminate} />
          <div
            className={styles.progressFill}
            style={{ width: `${Math.max(6, clamped)}%` }}
          />
        </div>
      </motion.div>

      {/* Responsive SVG Bezier Curtain Tail for Awwwards Curved Reveal */}
      <svg
        className={styles.curtainSvg}
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          variants={curveVariants}
          initial="initial"
          exit="exit"
          fill="#060d1f"
        />
      </svg>
    </motion.div>
  );
}
