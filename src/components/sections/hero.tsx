import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { FileText, Mail, Sparkles, ArrowDownRight, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HERO_TAGS = [
  "复杂业务建模",
  "信息架构重构",
  "交互与状态设计",
  "AI 产品体验",
];

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-24 pb-16 px-6 sm:px-10 md:p-16 lg:p-20 xl:p-24"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col items-center md:items-start max-w-xl">
              {/* Avatar + Open to work badge */}
              <BlurIn delay={0.5}>
                <div className="mb-5 flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur-md shadow-sm">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-emerald-500/40">
                    <Image
                      src="/assets/zxy/avatar.jpg"
                      alt="朱星宇头像"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-foreground/90">
                    {config.status}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground border-l border-border pl-2.5">
                    <MapPin className="h-3 w-3" />
                    {config.location}
                  </span>
                </div>
              </BlurIn>

              <div className="text-center md:text-left">
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "font-medium text-sm sm:text-base text-slate-500 dark:text-zinc-400 tracking-wider uppercase"
                    )}
                  >
                    你好，我是 · {config.authorEn}
                  </p>
                </BlurIn>

                <BlurIn delay={0.95}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "mt-2 leading-tight text-slate-900 dark:text-white",
                          "font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight",
                          "cursor-default font-display"
                        )}
                      >
                        {config.author}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      向下滚动或点击右侧 3D 键盘探索我的能力栈 🎹
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>

                <BlurIn delay={1.15}>
                  <p className="mt-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                    {config.role} · 复杂 B 端与 AI 产品体验
                  </p>
                </BlurIn>

                <BlurIn delay={1.3}>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {config.tagline}
                  </p>
                </BlurIn>

                <BlurIn delay={1.45}>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    {HERO_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground/85 backdrop-blur-sm"
                      >
                        <Sparkles className="h-3 w-3 text-cyan-500" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </BlurIn>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link href="#projects" className="w-full sm:w-auto">
                  <BoxReveal delay={1.6} width="100%">
                    <Button className="flex items-center justify-center gap-2 w-full px-6">
                      <span>浏览精选案例</span>
                      <ArrowDownRight size={18} />
                    </Button>
                  </BoxReveal>
                </Link>

                <Link
                  href="/cases/resume.html"
                  target="_blank"
                  className="w-full sm:w-auto"
                >
                  <BoxReveal delay={1.75} width="100%">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2 w-full px-5 bg-background/60 backdrop-blur-sm"
                    >
                      <FileText size={18} />
                      <span>在线简历 / 导出 PDF</span>
                    </Button>
                  </BoxReveal>
                </Link>

                <div className="flex items-center gap-2">
                  <Tooltip delayDuration={250}>
                    <TooltipTrigger asChild>
                      <Link href={`mailto:${config.email}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="发送邮件"
                          className="bg-background/60 backdrop-blur-sm"
                        >
                          <Mail size={18} />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{config.email}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={250}>
                    <TooltipTrigger asChild>
                      <Link
                        href={config.social.github}
                        target="_blank"
                        aria-label="GitHub 主页"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-background/60 backdrop-blur-sm"
                        >
                          <SiGithub size={18} />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>GitHub 作品仓库</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1" />
      </div>
      <div className="absolute bottom-8 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
