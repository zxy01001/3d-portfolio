"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const COLLAB_SPECS = [
  {
    label: "意向岗位方向",
    value: "AI-Native UX 设计师 / 高级交互设计师 / B 端体验架构师",
  },
  {
    label: "核心业务专长",
    value: "多智能体（Multi-Agent）编排 · 多模态 HITL 核验 · 复杂系统 OOUX 建模",
  },
  {
    label: "工程化交付标准",
    value: "双端 Figma Variables 组件规范 + Vibe Coding 可运行数据联动原型",
  },
];

const QUICK_LINKS = [
  { title: "01 · 企业智能体工作台", href: "/projects/agent-platform" },
  { title: "02 · 智能语音抄单助手", href: "/projects/voice-order" },
  { title: "04 · 经营概览实时原型", href: "/projects/business-overview" },
  { title: "在线简历 / 导出 PDF", href: "/resume" },
];

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <SectionWrapper
      id="contact"
      className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <SectionHeader
        id="contact"
        className="static mb-8 md:mb-12"
        title="联系与合作"
        desc="欢迎探讨 UX / AI 产品体验设计岗位机会与项目合作"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 z-[20] relative items-end">
        {/* Left Column: Direct Contact & Message Form */}
        <Card className="lg:col-span-7 bg-white/95 dark:bg-zinc-950/95 rounded-2xl border-border shadow-xl">
          <CardHeader className="space-y-3 pb-4 px-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">
                联系方式与在线沟通
              </CardTitle>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                {config.location} · {config.experienceYears}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopyEmail}
                className="gap-2 font-mono text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    已复制：{config.email}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {config.email}
                  </>
                )}
              </Button>
              <Link href={`mailto:${config.email}`}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  发送邮件
                </Button>
              </Link>
              <Link href="/resume">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  <FileText className="h-3.5 w-3.5" />
                  在线简历 / PDF
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-5 sm:px-6">
            <ContactForm />
          </CardContent>
        </Card>

        {/* Right Column: Collaboration Scope & Quick Case Index (Anchored lower on desktop so floating 3D keys shine above) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-white/95 dark:bg-zinc-950/92 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                ROLE FIT &amp; DELIVERABLES
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                随时可沟通
              </span>
            </div>

            <div className="space-y-3">
              {COLLAB_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-border/70 bg-secondary/30 p-3.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                    {spec.label}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed pl-5">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border/60">
              <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                QUICK ACCESS · 核心页面快速审阅
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border/75 bg-background/80 px-3 py-2 text-xs font-medium text-foreground/85 transition-colors hover:border-cyan-500/45 hover:text-foreground"
                  >
                    <span className="truncate">{item.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
