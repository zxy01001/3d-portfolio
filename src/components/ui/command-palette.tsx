"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Layers,
  Moon,
  Search,
  Send,
  Sun,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CASE_STUDIES } from "@/data/case-studies";
import { decodeProtectedEmail, getMaskedEmail } from "@/lib/contact-shield";
import { runCircularThemeTransition } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";

export const OPEN_COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";

export function triggerCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
  }
}

type CommandItem = {
  id: string;
  group: "works" | "actions";
  code: string;
  title: string;
  subtitle: string;
  badge?: string;
  keywords: string;
  icon: React.ReactNode;
  run: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const closeAndNavigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const items = useMemo<CommandItem[]>(() => {
    const caseItems: CommandItem[] = CASE_STUDIES.map((cs) => ({
      id: `case-${cs.slug}`,
      group: "works",
      code: `CASE ${cs.indexLabel}`,
      title: cs.title,
      subtitle: `${cs.category} · ${cs.oneLiner}`,
      badge: cs.metrics[0]
        ? `${cs.metrics[0].value} ${cs.metrics[0].label}`
        : cs.badge,
      keywords: `${cs.indexLabel} ${cs.slug} ${cs.title} ${cs.category} ${cs.badge} ${cs.oneLiner}`,
      icon: <Layers className="h-4 w-4 text-sky-500 shrink-0" />,
      run: () => closeAndNavigate(`/projects/${cs.slug}`),
    }));

    const actionItems: CommandItem[] = [
      {
        id: "act-resume",
        group: "actions",
        code: "RESUME",
        title: "查看在线简历 / 导出标准 A4 PDF",
        subtitle: "完整教育背景、履历沉淀与一键打印排版",
        badge: "PDF Ready",
        keywords: "resume pdf 简历 履历 下载 打印",
        icon: <FileText className="h-4 w-4 text-indigo-500 shrink-0" />,
        run: () => closeAndNavigate("/resume"),
      },
      {
        id: "act-theme",
        group: "actions",
        code: "THEME",
        title: isLight ? "切换为「深邃黑曜石」暗色主题" : "切换为「瑞士白瓷」浅色主题",
        subtitle: "同步切换全站界面、加载时计与 3D 机械键盘材质",
        badge: isLight ? "Dark" : "Light",
        keywords: "theme dark light 主题 深色 浅色 亮色 暗色 模式",
        icon: isLight ? (
          <Moon className="h-4 w-4 text-indigo-500 shrink-0" />
        ) : (
          <Sun className="h-4 w-4 text-sky-400 shrink-0" />
        ),
        run: () => {
          setOpen(false);
          requestAnimationFrame(() => {
            void runCircularThemeTransition(
              isLight ? "dark" : "light",
              setTheme
            );
          });
        },
      },
      {
        id: "act-email",
        group: "actions",
        code: "EMAIL",
        title: copiedEmail
          ? "已复制完整邮箱至剪贴板"
          : `一键复制联系邮箱（${getMaskedEmail()}）`,
        subtitle: "内置 XOR 防爬虫保护，点击自动解码并写入剪贴板",
        badge: copiedEmail ? "Copied" : "Protected",
        keywords: "email copy contact 邮箱 联系 复制 邮件",
        icon: copiedEmail ? (
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
        ) : (
          <Copy className="h-4 w-4 text-cyan-500 shrink-0" />
        ),
        run: async () => {
          const email = decodeProtectedEmail();
          try {
            await navigator.clipboard.writeText(email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2600);
          } catch {
            // Ignore clipboard errors
          }
          setTimeout(() => setOpen(false), 320);
        },
      },
      {
        id: "act-contact",
        group: "actions",
        code: "DIRECT",
        title: "前往在线直发留言模块",
        subtitle: "支持 AI-Native UX / 产品经理 / FDE 岗位沟通直达",
        keywords: "contact message hire 留言 合作 岗位 沟通",
        icon: <Send className="h-4 w-4 text-sky-500 shrink-0" />,
        run: () => closeAndNavigate("/#contact"),
      },
    ];

    return [...caseItems, ...actionItems];
  }, [closeAndNavigate, copiedEmail, isLight, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.keywords.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIdx]?.run();
    }
  };

  const worksList = filtered.filter((i) => i.group === "works");
  const actionsList = filtered.filter((i) => i.group === "actions");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-no-custom-cursor="true"
        className="max-w-xl gap-0 overflow-hidden rounded-3xl border border-border/90 bg-card/95 p-0 shadow-[0_28px_90px_-16px_rgba(15,23,42,0.35)] backdrop-blur-2xl [&>button]:hidden"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>作品集全局快速索引面板</DialogTitle>
          <DialogDescription>
            搜索并快速跳转至七大代表案例、在线简历与快捷联系操作
          </DialogDescription>
        </DialogHeader>

        {/* Top Precision Search Bar */}
        <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="搜索案例（如：智能体、语音、店铺容器、WMS、简历、浅色）..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 outline-none"
          />
          <kbd className="rounded-md border border-border bg-secondary/70 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Scrollable Result Groups (Zero Scrollbar Chrome) */}
        <div
          data-lenis-prevent
          className="max-h-[62vh] overflow-y-auto p-2 space-y-3"
        >
          {filtered.length === 0 && (
            <div className="py-10 text-center text-xs text-muted-foreground">
              未匹配到相关条目，可尝试输入「Agent」「WMS」「组件」或「简历」
            </div>
          )}

          {worksList.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                SELECTED WORKS · 七大核心案例直达
              </div>
              <div className="space-y-0.5">
                {worksList.map((item) => {
                  const globalIndex = filtered.indexOf(item);
                  const active = globalIndex === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIdx(globalIndex)}
                      onClick={item.run}
                      className={cn(
                        "group flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                        active
                          ? "bg-sky-500/12 text-foreground"
                          : "hover:bg-secondary/60 text-foreground/90"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.icon}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-sky-600 dark:text-cyan-400">
                              {item.code}
                            </span>
                            <span className="text-xs sm:text-sm font-bold truncate">
                              {item.title}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="hidden sm:inline-flex rounded-full border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {item.badge}
                          </span>
                        )}
                        <ArrowUpRight
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            active
                              ? "translate-x-0.5 -translate-y-0.5 text-sky-500"
                              : "text-muted-foreground/60"
                          )}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {actionsList.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                QUICK STUDIO ACTIONS · 快捷指令
              </div>
              <div className="space-y-0.5">
                {actionsList.map((item) => {
                  const globalIndex = filtered.indexOf(item);
                  const active = globalIndex === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIdx(globalIndex)}
                      onClick={item.run}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                        active
                          ? "bg-sky-500/12 text-foreground"
                          : "hover:bg-secondary/60 text-foreground/90"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.icon}
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold truncate">
                            {item.title}
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      {item.badge && (
                        <span className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Swiss Keyboard Legend Footer */}
        <div className="flex items-center justify-between border-t border-border/75 bg-secondary/35 px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>↑↓ 移动选择</span>
            <span>↵ 立即执行</span>
          </div>
          <span>ZHU XINGYU · COMMAND STUDIO</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
