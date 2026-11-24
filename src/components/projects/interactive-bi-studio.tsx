"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, Filter, EyeOff, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type RangeKey = "7d" | "30d" | "quarter";

type MetricConfig = {
  id: string;
  label: string;
  unit: string;
  color: string;
  values: Record<RangeKey, { total: string; delta: string; up: boolean; series: number[] }>;
  ranking: { name: string; dept: string; amount: number; share: number; isOutlier?: boolean }[];
};

const METRICS: MetricConfig[] = [
  {
    id: "sales",
    label: "销售总额",
    unit: "¥ 万",
    color: "#38bdf8",
    values: {
      "7d": { total: "¥ 32.8 万", delta: "+14.2%", up: true, series: [38, 52, 46, 68, 74, 63, 88] },
      "30d": { total: "¥ 128.6 万", delta: "+18.5%", up: true, series: [42, 58, 51, 76, 69, 84, 92] },
      quarter: { total: "¥ 386.0 万", delta: "+22.1%", up: true, series: [45, 54, 66, 72, 81, 86, 95] },
    },
    ranking: [
      { name: "华东直营大客户团购单", dept: "KA 大客户部", amount: 46.2, share: 36, isOutlier: true },
      { name: "经典醇香礼盒装 500ml×6", dept: "渠道一部", amount: 28.4, share: 22 },
      { name: "餐饮专供浓缩原浆 2L", dept: "餐饮拓展部", amount: 22.1, share: 17 },
      { name: "便利店冷链日配组合", dept: "渠道二部", amount: 18.5, share: 14 },
      { name: "节庆联名定制伴手礼", dept: "电商运营部", amount: 13.4, share: 11 },
    ],
  },
  {
    id: "cash",
    label: "回款净额",
    unit: "¥ 万",
    color: "#2dd4bf",
    values: {
      "7d": { total: "¥ 24.5 万", delta: "+8.7%", up: true, series: [34, 41, 49, 53, 62, 58, 75] },
      "30d": { total: "¥ 96.4 万", delta: "+11.3%", up: true, series: [36, 48, 55, 60, 67, 73, 82] },
      quarter: { total: "¥ 294.2 万", delta: "+15.0%", up: true, series: [40, 49, 57, 65, 71, 78, 89] },
    },
    ranking: [
      { name: "年度战略经销商预付款", dept: "KA 大客户部", amount: 34.0, share: 35, isOutlier: true },
      { name: "长三角连锁商超月结", dept: "渠道一部", amount: 24.8, share: 26 },
      { name: "现款现货门店直送", dept: "渠道二部", amount: 19.6, share: 20 },
      { name: "线上旗舰店账期结算", dept: "电商运营部", amount: 18.0, share: 19 },
    ],
  },
  {
    id: "cost",
    label: "采购支出",
    unit: "¥ 万",
    color: "#818cf8",
    values: {
      "7d": { total: "¥ 11.2 万", delta: "-3.4%", up: false, series: [68, 62, 59, 64, 52, 49, 45] },
      "30d": { total: "¥ 42.1 万", delta: "-5.1%", up: false, series: [72, 66, 61, 58, 54, 48, 44] },
      quarter: { total: "¥ 129.8 万", delta: "-2.8%", up: false, series: [74, 70, 65, 63, 58, 53, 50] },
    },
    ranking: [
      { name: "包材季度集中锁价批次", dept: "供应链中心", amount: 16.8, share: 40, isOutlier: true },
      { name: "核心原料冷链干线入库", dept: "采购一部", amount: 11.4, share: 27 },
      { name: "华东分仓周转辅料补货", dept: "仓储物流部", amount: 8.2, share: 19 },
      { name: "终端陈列物料印制", dept: "市场支持部", amount: 5.7, share: 14 },
    ],
  },
  {
    id: "margin",
    label: "综合毛利率",
    unit: "%",
    color: "#6366f1",
    values: {
      "7d": { total: "34.8%", delta: "+2.1%", up: true, series: [54, 57, 61, 59, 66, 70, 74] },
      "30d": { total: "35.6%", delta: "+2.9%", up: true, series: [52, 56, 60, 65, 68, 72, 78] },
      quarter: { total: "36.2%", delta: "+3.4%", up: true, series: [50, 55, 61, 66, 71, 75, 81] },
    },
    ranking: [
      { name: "高定礼盒专项（大宗团购）", dept: "KA 大客户部", amount: 44.5, share: 32, isOutlier: true },
      { name: "浓缩原浆餐饮直供线", dept: "餐饮拓展部", amount: 39.2, share: 28 },
      { name: "线上联名限定装", dept: "电商运营部", amount: 36.8, share: 22 },
      { name: "标准流通箱装", dept: "渠道一部", amount: 29.4, share: 18 },
    ],
  },
];

const RANGE_LABELS: { id: RangeKey; label: string }[] = [
  { id: "7d", label: "近 7 日" },
  { id: "30d", label: "近 30 日" },
  { id: "quarter", label: "本季度" },
];

const X_LABELS: Record<RangeKey, string[]> = {
  "7d": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "30d": ["第1周", "第5天", "第10天", "第15天", "第20天", "第25天", "第30天"],
  quarter: ["M1上", "M1下", "M2上", "M2下", "M3上", "M3中", "M3末"],
};

export default function InteractiveBiStudio() {
  const [activeMetricId, setActiveMetricId] = useState("sales");
  const [range, setRange] = useState<RangeKey>("30d");
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [excludeOutlier, setExcludeOutlier] = useState(false);

  const metric = METRICS.find((m) => m.id === activeMetricId) ?? METRICS[0];
  const currentData = metric.values[range];
  const series = excludeOutlier
    ? currentData.series.map((v, i) => (i === 6 ? Math.round(v * 0.78) : Math.round(v * 0.88)))
    : currentData.series;

  const visibleRows = excludeOutlier
    ? metric.ranking.filter((r) => !r.isOutlier)
    : metric.ranking;

  const maxRowAmount = Math.max(...visibleRows.map((r) => r.amount), 1);

  // Build smooth SVG polyline coordinates (viewBox 560 x 210)
  const W = 560;
  const H = 190;
  const padX = 28;
  const padY = 22;
  const pts = series.map((val, idx) => {
    const x = padX + (idx / (series.length - 1)) * (W - padX * 2);
    const y = H - padY - (val / 100) * (H - padY * 2);
    return { x, y, val };
  });
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H - padY} L${pts[0].x},${H - padY} Z`;

  return (
    <div className="rounded-2xl border border-border bg-slate-950/90 text-slate-100 p-4 sm:p-6 shadow-2xl">
      {/* Top Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/25 px-2.5 py-1 text-xs font-semibold text-cyan-300">
            <Filter className="h-3.5 w-3.5" />
            可操作看板原型
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">
            点击指标卡、时间周期或右侧“剔除极值”，体验「感知→趋势→对比→下钻」联动
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-0.5">
            {RANGE_LABELS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRange(r.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
                  range === r.id
                    ? "bg-white text-slate-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-0.5">
            <button
              type="button"
              onClick={() => setChartType("area")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
                chartType === "area"
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              趋势折线
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
                chartType === "bar"
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              柱状分布
            </button>
          </div>
        </div>
      </div>

      {/* Step 01: 4 Clickable KPI Switcher Cards */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {METRICS.map((m) => {
          const d = m.values[range];
          const active = m.id === activeMetricId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMetricId(m.id)}
              className={cn(
                "text-left rounded-xl p-3.5 transition-all border",
                active
                  ? "bg-white/10 border-cyan-400/60 shadow-[0_0_24px_-8px_rgba(56,189,248,0.45)]"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
              )}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{m.label}</span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>
              <div className="mt-1.5 font-display text-lg sm:text-xl font-extrabold text-white">
                {d.total}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-mono">
                {d.up ? (
                  <span className="inline-flex items-center text-emerald-400">
                    <ArrowUpRight className="h-3 w-3" />
                    {d.delta}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-sky-400">
                    <ArrowDownRight className="h-3 w-3" />
                    {d.delta}
                  </span>
                )}
                <span className="text-slate-500">环比</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step 02 & 03: Dual-Column Visual Trend (Left) + Exact Ranking Table (Right) */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Visual Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                LINKED TREND · 指标联动视图
              </span>
              <h4 className="text-sm font-bold text-white">
                {metric.label}走势（{RANGE_LABELS.find((r) => r.id === range)?.label}）
              </h4>
            </div>
            {excludeOutlier && (
              <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 text-[11px] text-indigo-300">
                已剔除大宗极值单据
              </span>
            )}
          </div>

          <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="biAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metric.color} stopOpacity="0.42" />
                <stop offset="100%" stopColor={metric.color} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0.25, 0.5, 0.75].map((ratio) => {
              const gy = padY + ratio * (H - padY * 2);
              return (
                <line
                  key={ratio}
                  x1={padX}
                  x2={W - padX}
                  y1={gy}
                  y2={gy}
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="4 4"
                />
              );
            })}

            {chartType === "area" ? (
              <>
                <motion.path
                  key={`area-${metric.id}-${range}-${excludeOutlier}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  d={areaPath}
                  fill="url(#biAreaGrad)"
                />
                <motion.path
                  key={`line-${metric.id}-${range}-${excludeOutlier}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  d={linePath}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {pts.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4.5"
                      fill="#0f172a"
                      stroke={metric.color}
                      strokeWidth="2.5"
                    />
                  </g>
                ))}
              </>
            ) : (
              pts.map((p, idx) => {
                const barH = H - padY - p.y;
                return (
                  <motion.rect
                    key={`bar-${idx}-${metric.id}-${range}-${excludeOutlier}`}
                    initial={{ height: 0, y: H - padY }}
                    animate={{ height: barH, y: p.y }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    x={p.x - 16}
                    width={32}
                    rx={6}
                    fill={metric.color}
                    fillOpacity={0.85}
                  />
                );
              })
            )}

            {/* X-axis labels */}
            {pts.map((p, idx) => (
              <text
                key={idx}
                x={p.x}
                y={H + 8}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
              >
                {X_LABELS[range][idx]}
              </text>
            ))}
          </svg>
        </div>

        {/* Right Exact Ranking & Outlier Filter (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                  DRILL-DOWN · 明细排行与排除
                </span>
                <h4 className="text-sm font-bold text-white">贡献度 Top 明细</h4>
              </div>
              <button
                type="button"
                onClick={() => setExcludeOutlier((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all border",
                  excludeOutlier
                    ? "bg-indigo-500/20 border-indigo-400/40 text-indigo-300"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                )}
              >
                {excludeOutlier ? (
                  <>
                    <RotateCcw className="h-3 w-3" />
                    恢复极值单
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3" />
                    剔除大单极值
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {visibleRows.map((row, idx) => (
                <div
                  key={row.name}
                  className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate font-medium text-slate-200">
                      <span className="mr-1.5 font-mono text-slate-500">
                        0{idx + 1}
                      </span>
                      {row.name}
                    </span>
                    <span className="shrink-0 font-mono font-bold text-white">
                      {row.amount}
                      {metric.unit === "%" ? "%" : "w"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(row.amount / maxRowAmount) * 100}%` }}
                        transition={{ duration: 0.35 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.color }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {row.dept}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 border-t border-white/10 pt-2.5">
            设计细节：支持一键剔除偶发大宗团购极值，防止常规门店经营波动被大单掩盖。
          </p>
        </div>
      </div>
    </div>
  );
}
