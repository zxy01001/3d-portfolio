"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { motion } from "motion/react";
import {
  hudContentExit,
  rootExit,
  shutterBottomExit,
  shutterTopExit,
} from "./anim";
import { usePreloader } from ".";
import { cn } from "@/lib/utils";

/**
 * Exact 23-key (32-cell, 8×4) Swiss-Grid Mechanical Keyboard topology
 * rendered in 3D isometric perspective inside the holographic orbital core.
 */
const ISO_KEYS: {
  id: string;
  label?: string;
  variant?: "hero" | "violet" | "blue" | "teal" | "cyan" | "emerald";
}[] = [
  // Row 0
  { id: "figma", label: "FIGMA", variant: "hero" },
  { id: "aiux", label: "AGENTIC", variant: "violet" },
  { id: "cursor", label: "VIBE", variant: "cyan" },
  { id: "codex", variant: "cyan" },
  { id: "mcp", label: "MCP", variant: "cyan" },
  { id: "eval", variant: "emerald" },
  // Row 1
  { id: "ds", label: "TOKENS", variant: "blue" },
  { id: "rag", variant: "emerald" },
  { id: "axure" },
  { id: "protopie" },
  { id: "jishi" },
  // Row 2
  { id: "ooux", label: "OOUX", variant: "teal" },
  { id: "ia", label: "ARCH", variant: "blue" },
  { id: "code", variant: "cyan" },
  { id: "resp" },
  { id: "ae" },
  { id: "3d", variant: "violet" },
  // Row 3
  { id: "state", label: "HITL", variant: "violet" },
  { id: "viz", label: "DATA", variant: "teal" },
  { id: "comfy" },
  { id: "mj" },
  { id: "sd" },
  { id: "qa", variant: "emerald" },
];

const BOOT_MODULES = [
  { id: "GLB_MESH", threshold: 22 },
  { id: "ANISO_TEX", threshold: 52 },
  { id: "WEBGL_SHD", threshold: 80 },
  { id: "HITL_SYNC", threshold: 96 },
];

const TARGET_TAGLINE = "AI-NATIVE UX // PRODUCT // FDE";
const GLYPHS = "01X#/_<>+=*ΔΣΛΩ79";

export default function Loader() {
  const { loadingPercent, forceDismiss } = usePreloader();
  const clamped = Math.max(0, Math.min(100, Math.round(loadingPercent)));
  const padded = String(clamped).padStart(3, "0");

  // Cryptographic scramble-decode effect on mount (SSR renders crisp final string!)
  const [decodedText, setDecodedText] = useState(TARGET_TAGLINE);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(clamped);
  progressRef.current = clamped;

  useEffect(() => {
    let frame = 0;
    const totalFrames = 24;
    const timer = window.setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDecodedText(TARGET_TAGLINE);
        window.clearInterval(timer);
        return;
      }
      const revealCount = Math.floor((frame / totalFrames) * TARGET_TAGLINE.length);
      const next = TARGET_TAGLINE.split("")
        .map((ch, idx) => {
          if (ch === " " || idx < revealCount) return ch;
          return GLYPHS[(idx * 7 + frame * 3) % GLYPHS.length];
        })
        .join("");
      setDecodedText(next);
    }, 34);

    return () => window.clearInterval(timer);
  }, []);

  // Lightweight 60fps 2D Neural Constellation & Warp-Convergence Particle Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = width < 640 ? 32 : 56;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: ((i * 137.5) % 100) * 0.01 * width,
      y: ((i * 73.3) % 100) * 0.01 * height,
      vx: (Math.cos(i * 2.1) * 0.38),
      vy: (Math.sin(i * 1.7) * 0.38),
      r: (i % 3 === 0 ? 1.9 : 1.2),
      cyan: i % 2 === 0,
    }));

    const pointer = { x: width / 2, y: height / 2 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.47;
      const pull = 0.0005 + (progressRef.current / 100) * 0.0024;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Gentle orbital + inward gravity pull as progress nears 100%
        const dxCenter = cx - p.x;
        const dyCenter = cy - p.y;
        p.x += p.vx + dxCenter * pull;
        p.y += p.vy + dyCenter * pull;

        // Respawn at outer perimeter if pulled into core
        if (Math.hypot(dxCenter, dyCenter) < 28) {
          const angle = (i * 1.618 + performance.now() * 0.001) % (Math.PI * 2);
          const dist = Math.max(width, height) * 0.52;
          p.x = cx + Math.cos(angle) * dist;
          p.y = cy + Math.sin(angle) * dist;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Constellation links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.16;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Subtle pointer tether
        const dPtr = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (dPtr < 140) {
          const alpha = (1 - dPtr / 140) * 0.24;
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        ctx.fillStyle = p.cyan
          ? "rgba(103, 232, 249, 0.78)"
          : "rgba(165, 180, 252, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // SVG progress arc math (r = 160 => circumference = 1005.3)
  const circumference = 2 * Math.PI * 160;
  const dashOffset = circumference * (1 - clamped / 100);
  const hexAddr = `0x${(0x7f40 + clamped * 37).toString(16).toUpperCase()}`;

  return (
    <motion.div
      variants={rootExit}
      initial="initial"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label="正在启动朱星宇三维交互空间"
      className={styles.preloaderRoot}
    >
      {/* Dual Quantum Blast Shutters with 3D Perspective Cyber Grids (0ms SSR!) */}
      <motion.div
        variants={shutterTopExit}
        initial="initial"
        exit="exit"
        className={styles.shutterTop}
      >
        <div className={styles.cyberCeiling} />
      </motion.div>

      <motion.div
        variants={shutterBottomExit}
        initial="initial"
        exit="exit"
        className={styles.shutterBottom}
      >
        <div className={styles.cyberFloor} />
      </motion.div>

      {/* Foreground Tactical Visor & Holographic Core */}
      <motion.div
        variants={hudContentExit}
        initial="initial"
        exit="exit"
        className={styles.hudStage}
      >
        <div className={styles.scanlineOverlay} />
        <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden />

        {/* 4 Precision Spatial Visor Corner Brackets */}
        <span className={cn(styles.cornerBracket, styles.cornerTL)} />
        <span className={cn(styles.cornerBracket, styles.cornerTR)} />
        <span className={cn(styles.cornerBracket, styles.cornerBL)} />
        <span className={cn(styles.cornerBracket, styles.cornerBR)} />

        {/* Top Tactical Telemetry Bar */}
        <div className="relative z-10 flex items-center justify-between px-7 sm:px-12 pt-7 sm:pt-9 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-slate-400">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
            <span className="font-bold text-cyan-300">SYS.BOOT</span>
            <span className="text-slate-600">//</span>
            <span className="font-semibold text-slate-200">ZHU_XINGYU.OS</span>
            <span className="hidden md:inline text-indigo-400/80">
              [{hexAddr}]
            </span>
          </div>

          <div className="inline-flex items-center gap-3">
            <span className="hidden sm:inline text-slate-400">
              PIPE: <strong className="text-sky-300">WEBGL2_ORTHO</strong>
            </span>
            <span className="rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-bold text-cyan-200">
              8×4 MATRIX
            </span>
          </div>
        </div>

        {/* Centerpiece: Holographic Orbital Reactor + 3D Isometric Extruded Keycap Deck */}
        <div className="relative z-10 mx-auto flex flex-col items-center px-4">
          <div className={styles.holoCore}>
            <div className={styles.coreGlow} />

            {/* Concentric Counter-Rotating SVG Telemetry & Real-Time Progress Rings */}
            <svg
              className={styles.orbitalSvg}
              viewBox="0 0 400 400"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="holoArc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>

              {/* Outer Rotating Azimuth Ring */}
              <g className={styles.spinSlow}>
                <circle
                  cx="200"
                  cy="200"
                  r="184"
                  stroke="rgba(148, 163, 184, 0.16)"
                  strokeWidth="1"
                  strokeDasharray="6 10"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="176"
                  stroke="rgba(56, 189, 248, 0.28)"
                  strokeWidth="1.2"
                  strokeDasharray="48 140"
                />
                <circle cx="200" cy="16" r="3" fill="#38bdf8" />
                <circle cx="200" cy="384" r="3" fill="#6366f1" />
              </g>

              {/* Middle Real-Time Progress Track + Glowing Progress Arc */}
              <circle
                cx="200"
                cy="200"
                r="160"
                stroke="rgba(51, 65, 85, 0.42)"
                strokeWidth="2"
              />
              <circle
                cx="200"
                cy="200"
                r="160"
                stroke="url(#holoArc)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 200 200)"
                style={{ transition: "stroke-dashoffset 110ms linear" }}
              />

              {/* Inner Counter-Rotating Reticle Lock Ring */}
              <g className={styles.spinReverse}>
                <circle
                  cx="200"
                  cy="200"
                  r="138"
                  stroke="rgba(129, 140, 248, 0.25)"
                  strokeWidth="1.2"
                  strokeDasharray="24 56"
                />
              </g>
            </svg>

            {/* True 3D Isometric Extruded 8×4 Mechanical Keyboard Deck */}
            <div className={styles.isoPerspective} aria-hidden>
              <div className={styles.isoDeck}>
                {ISO_KEYS.map((k, idx) => {
                  const active = (idx / ISO_KEYS.length) * 90 <= clamped;
                  return (
                    <div
                      key={k.id}
                      className={cn(
                        styles.isoKey,
                        "flex items-center justify-center",
                        k.variant === "hero" && styles.isoKeyHero,
                        k.variant === "violet" && styles.isoKeyWideViolet,
                        k.variant === "blue" && styles.isoKeyWideBlue,
                        k.variant === "teal" && styles.isoKeyWideTeal,
                        k.variant === "cyan" && styles.isoKeyCyan,
                        k.variant === "emerald" && styles.isoKeyEmerald,
                        active && styles.isoKeyActive
                      )}
                    >
                      {k.label && (
                        <span className="font-mono text-[7px] sm:text-[8px] font-extrabold tracking-wider text-white/95 drop-shadow">
                          {k.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cryptographic Decoded Identity & Live 4-Module Subsystem Checkpoints */}
          <div className="mt-2 text-center">
            <div className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.26em] text-cyan-300">
              {decodedText}
            </div>

            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              朱星宇
              <span className="mx-2.5 font-light text-indigo-400/70">/</span>
              <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300 bg-clip-text text-transparent">
                空间级交互与智能架构
              </span>
            </h2>

            {/* 4-Node Subsystem Boot Strip */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[10px]">
              {BOOT_MODULES.map((mod) => {
                const ok = clamped >= mod.threshold;
                return (
                  <span
                    key={mod.id}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition-colors",
                      ok
                        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700/80 bg-slate-900/60 text-slate-500"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        ok ? "bg-emerald-400" : "bg-cyan-500/50 animate-pulse"
                      )}
                    />
                    <span>{mod.id}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Laser Rail + Giant Holographic Counter + Instant Skip Capsule */}
        <div className="relative z-10 px-7 sm:px-12 pb-7 sm:pb-10">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-400">
                {clamped >= 98
                  ? "PORTAL LOCKED // OPENING STAGE"
                  : "SYNCHRONIZING 3D SCENE"}
              </span>
              <button
                type="button"
                onClick={forceDismiss}
                className="pointer-events-auto rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-white"
              >
                SKIP // 直接进入 ↗
              </button>
            </div>

            <div className="flex items-baseline gap-1 font-mono tabular-nums">
              <span
                className="text-4xl sm:text-6xl font-black tracking-tighter bg-gradient-to-b from-white via-sky-100 to-cyan-300 bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 18px rgba(34, 211, 238, 0.38))",
                }}
              >
                {padded}
              </span>
              <span className="text-sm sm:text-lg font-bold text-cyan-400">
                %
              </span>
            </div>
          </div>

          <div className={styles.laserTrack}>
            <div
              className={styles.laserFill}
              style={{ width: `${Math.max(4, clamped)}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
