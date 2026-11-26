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
import { decodeProtectedEmail, getMaskedEmail } from "@/lib/contact-shield";
import SectionWrapper from "../ui/section-wrapper";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  MapPin,
  CheckCircle2,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const COLLAB_SPECS = [
  {
    label: "意向岗位方向",
    value: "AI-Native UX 设计师 · AI / B 端产品经理（PM）· FDE（前线部署工程师）",
  },
  {
    label: "复合型核心优势",
    value:
      "兼具复杂业务拆解与 PRD 定义、Agentic UX 多智能体交互架构，以及 Vibe Coding 现场快速原型交付能力",
  },
  {
    label: "工程化落地标准",
    value:
      "双端 Figma Variables 组件体系（92% 覆盖）+ 可运行真实数据联动原型，无缝贯通客户需求与研发投产",
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
  const [revealedEmail, setRevealedEmail] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    const full = decodeProtectedEmail();
    setRevealedEmail(full);
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setRevealedEmail(null);
      }, 4000);
    } catch {
      setTimeout(() => setRevealedEmail(null), 5000);
    }
  };

  const handleFocusForm = () => {
    const input = document.getElementById("fullname") as HTMLInputElement | null;
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  };

  return (
    <SectionWrapper
      id="contact"
      className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="relative z-[20] mb-8 md:mb-10 rounded-3xl border border-border/85 bg-card/90 px-5 sm:px-8 py-6 shadow-[0_12px_36px_-14px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          04 / INITIATE DIALOGUE
        </div>
        <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            联系与合作
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl md:text-right">
            欢迎探讨 AI-Native UX 设计、产品经理（PM）及 FDE（前线部署工程师）岗位机会
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-[20] relative">
        {/* Left Column: Direct Contact & Real Web-to-Inbox Form */}
        <Card className="lg:col-span-7 h-full flex flex-col justify-between bg-white/95 dark:bg-zinc-950/95 rounded-2xl border border-border shadow-xl">
          <CardHeader className="space-y-3 pb-4 px-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                联系方式与在线直发
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
                title="已开启防爬虫脱敏，点击即可显示并复制完整邮箱"
                className="gap-2 font-mono text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    已复制：{revealedEmail}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {revealedEmail ?? `${getMaskedEmail()}（点击复制）`}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFocusForm}
                className="gap-1.5 text-xs"
              >
                <Send className="h-3.5 w-3.5 text-cyan-500" />
                在线直发邮件
              </Button>
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

          <CardContent className="px-5 sm:px-6 pb-6 flex-1 flex flex-col justify-end">
            <ContactForm />
          </CardContent>
        </Card>

        {/* Right Column: Identical Card Shell & Equal Height */}
        <Card className="lg:col-span-5 h-full flex flex-col justify-between bg-white/95 dark:bg-zinc-950/95 rounded-2xl border border-border shadow-xl">
          <CardHeader className="space-y-3 pb-3 px-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                岗位契合与交付标准
              </CardTitle>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                随时可沟通
              </span>
            </div>
          </CardHeader>

          <CardContent className="px-5 sm:px-6 pb-6 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              {COLLAB_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-border/80 bg-zinc-50/90 dark:bg-zinc-900/75 p-3.5"
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

            <div className="pt-3 border-t border-border/70">
              <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                QUICK ACCESS · 核心案例与简历直达
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-zinc-50/90 dark:bg-zinc-900/75 px-3 py-2 text-xs font-medium text-foreground/90 transition-colors hover:border-cyan-500/50 hover:text-foreground"
                  >
                    <span className="truncate">{item.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
