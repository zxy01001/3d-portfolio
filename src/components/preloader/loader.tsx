"use client";

import React from "react";
import styles from "./style.module.scss";
import { motion } from "motion/react";
import {
  hudContentExit,
  rootExit,
  shutterBottomExit,
  shutterTopExit,
} from "./anim";
import { usePreloader } from ".";

const TOTAL_TICKS = 72;
const TICKS = Array.from({ length: TOTAL_TICKS }, (_, i) => {
  const deg = (i * 360) / TOTAL_TICKS - 90;
  const rad = (deg * Math.PI) / 180;
  const isMajor = i % 6 === 0;
  const rInner = isMajor ? 127 : 131;
  const rOuter = isMajor ? 139 : 137;
  return {
    i,
    isMajor,
    x1: (160 + rInner * Math.cos(rad)).toFixed(2),
    y1: (160 + rInner * Math.sin(rad)).toFixed(2),
    x2: (160 + rOuter * Math.cos(rad)).toFixed(2),
    y2: (160 + rOuter * Math.sin(rad)).toFixed(2),
  };
});

function getPhaseCaption(pct: number): { step: string; label: string } {
  if (pct < 32) return { step: "01 / 03", label: "载入三维几何模型" };
  if (pct < 76) return { step: "02 / 03", label: "校准正交光影与材质" };
  if (pct < 99) return { step: "03 / 03", label: "就绪 · 即将展开空间" };
  return { step: "READY", label: "交互空间已锁定" };
}

export default function Loader() {
  const { loadingPercent, forceDismiss } = usePreloader();
  const clamped = Math.max(0, Math.min(100, Math.round(loadingPercent)));
  const phase = getPhaseCaption(clamped);

  // Precision SVG arc math (r = 114) — rounded to 2 decimals for deterministic SSR hydration
  const radius = 114;
  const circumference = Number((2 * Math.PI * radius).toFixed(2));
  const dashOffset = Number((circumference * (1 - clamped / 100)).toFixed(2));

  // Exact polar tip coordinates for the specular jewel point on the arc
  const tipAngleRad = ((clamped / 100) * 360 - 90) * (Math.PI / 180);
  const tipX = (160 + radius * Math.cos(tipAngleRad)).toFixed(2);
  const tipY = (160 + radius * Math.sin(tipAngleRad)).toFixed(2);

  const activeTickIndex = Math.round((clamped / 100) * TOTAL_TICKS);

  return (
    <motion.div
      variants={rootExit}
      initial="initial"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label="正在载入朱星宇作品集"
      className={styles.preloaderRoot}
    >
      {/* Anodized Obsidian Dual Shutters (part cleanly along the equator at 100%) */}
      <motion.div
        variants={shutterTopExit}
        initial="initial"
        exit="exit"
        className={styles.shutterTop}
      >
        <div className={styles.dotMatrixTop} />
      </motion.div>

      <motion.div
        variants={shutterBottomExit}
        initial="initial"
        exit="exit"
        className={styles.shutterBottom}
      >
        <div className={styles.dotMatrixBottom} />
      </motion.div>

      {/* Minimalist Optical Instrument & Equator Light Horizon */}
      <motion.div
        variants={hudContentExit}
        initial="initial"
        exit="exit"
        className={styles.hudStage}
      >
        {/* Center-Outward Optical Horizon Filament (slices the screen at 100%!) */}
        <div className={styles.equatorGuide} aria-hidden />
        <div
          className={styles.equatorLaser}
          style={{ transform: `translateY(-50%) scaleX(${Math.max(0.08, clamped / 100)})` }}
          aria-hidden
        />

        {/* Top Editorial Masthead — Restrained Swiss Typography */}
        <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-7 sm:pt-10">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] text-slate-100">
              朱星宇
            </span>
            <span className="text-slate-700">/</span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-slate-400">
              ZHU XINGYU
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-slate-500">
            <span>AI-NATIVE UX</span>
            <span className="text-slate-700">·</span>
            <span>PRODUCT</span>
            <span className="text-slate-700">·</span>
            <span>FDE</span>
          </div>
        </header>

        {/* Centerpiece: Precision Machined Optical Chronometer Dial */}
        <div className="relative z-10 mx-auto flex flex-col items-center">
          <div className={styles.dialWrapper}>
            <div className={styles.dialAmbient} />

            <svg
              className={styles.dialSvg}
              viewBox="0 0 320 320"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="specularArc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="55%" stopColor="#7dd3fc" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
                </linearGradient>
                <filter id="jewelGlow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Ultra-Fine Reference Ring + Slow Orbital Hairline */}
              <circle
                cx="160"
                cy="160"
                r="150"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.75"
              />
              <g className={styles.subtleOrbit}>
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  stroke="rgba(186, 230, 253, 0.22)"
                  strokeWidth="0.85"
                  strokeDasharray="36 200"
                />
              </g>

              {/* 72 Machined Chronometer Ticks */}
              <g>
                {TICKS.map((t) => {
                  const lit = t.i <= activeTickIndex;
                  const isHead = t.i === activeTickIndex && clamped > 0;
                  return (
                    <line
                      key={t.i}
                      x1={t.x1}
                      y1={t.y1}
                      x2={t.x2}
                      y2={t.y2}
                      stroke={
                        isHead
                          ? "#bae6fd"
                          : lit
                          ? "rgba(226, 232, 240, 0.78)"
                          : "rgba(255, 255, 255, 0.09)"
                      }
                      strokeWidth={t.isMajor ? "1.15" : "0.75"}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Inner Precision Arc Track + Specular Progress Arc */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="url(#specularArc)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 160 160)"
                style={{ transition: "stroke-dashoffset 90ms linear" }}
              />

              {/* Leading-Edge Specular Jewel Point */}
              {clamped > 0 && (
                <circle
                  cx={tipX}
                  cy={tipY}
                  r="2.4"
                  fill="#ffffff"
                  filter="url(#jewelGlow)"
                  style={{ transition: "cx 90ms linear, cy 90ms linear" }}
                />
              )}
            </svg>

            {/* Dark-Glass Anodized Inner Lens */}
            <div className={styles.opticalLens}>
              <span className="font-mono text-[8.5px] sm:text-[9px] font-medium uppercase tracking-[0.34em] text-slate-400/85">
                {phase.step}
              </span>

              <div className="mt-1.5 flex items-start font-display tabular-nums leading-none">
                <span className="text-[48px] sm:text-[58px] font-light tracking-[-0.04em] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {clamped}
                </span>
                <span className="mt-2 ml-1 font-mono text-xs font-medium text-sky-300/85">
                  %
                </span>
              </div>

              <span className="mt-2.5 h-px w-7 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />

              <span className="mt-2 text-[10px] sm:text-[11px] font-normal tracking-[0.12em] text-slate-400">
                {phase.label}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Quiet Architectural Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 sm:px-12 pb-7 sm:pb-10 text-xs">
          <span className="font-mono text-[10px] tracking-[0.22em] text-slate-500 uppercase">
            3D INTERACTIVE PORTFOLIO · EDITION 2026
          </span>

          <button
            type="button"
            onClick={forceDismiss}
            className="pointer-events-auto font-mono text-[11px] tracking-[0.14em] text-slate-400 transition-colors hover:text-white"
          >
            跳过开场 ↗
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}
