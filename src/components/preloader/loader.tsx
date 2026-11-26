"use client";

import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { motion } from "motion/react";
import {
  hudContentExit,
  rootExit,
  shutterBottomExit,
  shutterLipExit,
  shutterTopExit,
} from "./anim";
import { usePreloader } from ".";

const TOTAL_TICKS = 72;
const RADIUS = 114;
const CIRCUMFERENCE = Number((2 * Math.PI * RADIUS).toFixed(2));

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
  const { subscribeProgress, forceDismiss } = usePreloader();

  const arcRef = useRef<SVGCircleElement | null>(null);
  const jewelRef = useRef<SVGCircleElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const stepRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const tickRefs = useRef<(SVGLineElement | null)[]>([]);
  const lastIntRef = useRef<number>(-1);
  const lastTickRef = useRef<number>(-1);

  // Zero-React-Rerender Direct GPU/SVG Mutation Loop (120fps butter-smooth)
  useEffect(() => {
    return subscribeProgress((rawPct) => {
      const pct = Math.max(0, Math.min(100, rawPct));
      const rounded = Math.round(pct);

      if (arcRef.current) {
        const offset = CIRCUMFERENCE * (1 - pct / 100);
        arcRef.current.setAttribute("stroke-dashoffset", offset.toFixed(2));
      }
      if (jewelRef.current) {
        const rad = ((pct / 100) * 360 - 90) * (Math.PI / 180);
        jewelRef.current.setAttribute(
          "cx",
          (160 + RADIUS * Math.cos(rad)).toFixed(2)
        );
        jewelRef.current.setAttribute(
          "cy",
          (160 + RADIUS * Math.sin(rad)).toFixed(2)
        );
      }

      // Only touch text DOM when integer percentage changes
      if (rounded !== lastIntRef.current) {
        lastIntRef.current = rounded;
        if (numRef.current) {
          numRef.current.textContent = String(rounded);
        }
        const phase = getPhaseCaption(rounded);
        if (stepRef.current && stepRef.current.textContent !== phase.step) {
          stepRef.current.textContent = phase.step;
        }
        if (labelRef.current && labelRef.current.textContent !== phase.label) {
          labelRef.current.textContent = phase.label;
        }
      }

      // Incremental tick highlight (only update ticks whose state changed)
      const activeTick = Math.round((pct / 100) * (TOTAL_TICKS - 1));
      if (activeTick !== lastTickRef.current) {
        const prev = lastTickRef.current;
        lastTickRef.current = activeTick;
        const start = Math.max(0, Math.min(prev, activeTick) - 1);
        const end = Math.min(TOTAL_TICKS - 1, Math.max(prev, activeTick) + 1);
        for (let i = start; i <= end; i++) {
          const el = tickRefs.current[i];
          if (!el) continue;
          if (i === activeTick) {
            el.setAttribute("stroke", "#bae6fd");
          } else if (i < activeTick) {
            el.setAttribute("stroke", "rgba(226, 232, 240, 0.78)");
          } else {
            el.setAttribute("stroke", "rgba(255, 255, 255, 0.09)");
          }
        }
      }
    });
  }, [subscribeProgress]);

  const initOffset = Number((CIRCUMFERENCE * 0.94).toFixed(2));
  const initRad = (0.06 * 360 - 90) * (Math.PI / 180);
  const initTipX = (160 + RADIUS * Math.cos(initRad)).toFixed(2);
  const initTipY = (160 + RADIUS * Math.sin(initRad)).toFixed(2);

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
      {/* Seamless Monolithic Dual Shutters — zero seam while loading, crisp anodized lip on split */}
      <motion.div
        variants={shutterTopExit}
        initial="initial"
        exit="exit"
        className={styles.shutterTop}
      >
        <div className={styles.dotMatrixTop} />
        <motion.div
          variants={shutterLipExit}
          initial="initial"
          exit="exit"
          className={styles.shutterLipBottom}
        />
      </motion.div>

      <motion.div
        variants={shutterBottomExit}
        initial="initial"
        exit="exit"
        className={styles.shutterBottom}
      >
        <div className={styles.dotMatrixBottom} />
        <motion.div
          variants={shutterLipExit}
          initial="initial"
          exit="exit"
          className={styles.shutterLipTop}
        />
      </motion.div>

      {/* Pure Single-Focus Optical Chronometer Stage */}
      <motion.div
        variants={hudContentExit}
        initial="initial"
        exit="exit"
        className={styles.hudStage}
      >
        {/* Top Editorial Masthead */}
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

        {/* True Geometric (50%, 50%) Centerpiece: Self-Contained Machined Chronometer */}
        <div className={styles.dialAnchor}>
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
                <radialGradient id="bezelPlate" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#0b1020" />
                  <stop offset="100%" stopColor="#05070e" />
                </radialGradient>
              </defs>

              {/* Solid Anodized Bezel Backing Plate — isolates the gauge cleanly from the stage */}
              <circle cx="160" cy="160" r="150" fill="url(#bezelPlate)" />

              <circle
                cx="160"
                cy="160"
                r="150"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="0.85"
              />
              <g className={styles.subtleOrbit}>
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  stroke="rgba(186, 230, 253, 0.24)"
                  strokeWidth="0.9"
                  strokeDasharray="36 200"
                />
              </g>

              {/* 72 Machined Chronometer Ticks */}
              <g>
                {TICKS.map((t, idx) => (
                  <line
                    key={t.i}
                    ref={(el) => {
                      tickRefs.current[idx] = el;
                    }}
                    x1={t.x1}
                    y1={t.y1}
                    x2={t.x2}
                    y2={t.y2}
                    stroke={
                      idx <= 4
                        ? "rgba(226, 232, 240, 0.78)"
                        : "rgba(255, 255, 255, 0.09)"
                    }
                    strokeWidth={t.isMajor ? "1.15" : "0.75"}
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Inner Precision Arc Track + Specular Progress Arc */}
              <circle
                cx="160"
                cy="160"
                r={RADIUS}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
              />
              <circle
                ref={arcRef}
                cx="160"
                cy="160"
                r={RADIUS}
                stroke="url(#specularArc)"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={initOffset}
                transform="rotate(-90 160 160)"
              />

              {/* Leading-Edge Specular Jewel Point */}
              <circle
                ref={jewelRef}
                cx={initTipX}
                cy={initTipY}
                r="2.6"
                fill="#ffffff"
              />
            </svg>

            {/* Dark-Glass Anodized Inner Lens */}
            <div className={styles.opticalLens}>
              <span
                ref={stepRef}
                className="font-mono text-[8.5px] sm:text-[9px] font-medium uppercase tracking-[0.34em] text-slate-400/85"
              >
                01 / 03
              </span>

              <div className="mt-1.5 flex items-start font-display tabular-nums leading-none">
                <span
                  ref={numRef}
                  className="text-[48px] sm:text-[58px] font-light tracking-[-0.04em] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
                >
                  6
                </span>
                <span className="mt-2 ml-1 font-mono text-xs font-medium text-sky-300/85">
                  %
                </span>
              </div>

              <span className="mt-2.5 h-px w-7 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />

              <span
                ref={labelRef}
                className="mt-2 text-[10px] sm:text-[11px] font-normal tracking-[0.12em] text-slate-400"
              >
                载入三维几何模型
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
