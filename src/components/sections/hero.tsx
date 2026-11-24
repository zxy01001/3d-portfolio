import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { FileText, Mail, ArrowDownRight, MapPin } from "lucide-react";
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
            "pt-24 pb-14 px-6 sm:px-10 md:p-14 lg:p-20 xl:p-24"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col items-center md:items-start max-w-lg">
              {/* Compact Avatar + Status Pill */}
              <BlurIn delay={0.45}>
                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-background/95 px-3 py-1.5 shadow-sm">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full ring-2 ring-emerald-500/40">
                    <Image
                      src="/assets/zxy/avatar.jpg"
                      alt="朱星宇"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] font-bold text-foreground/90">
                    {config.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border-l border-border pl-2.5">
                    <MapPin className="h-3 w-3 text-cyan-500" />
                    {config.location}
                  </span>
                </div>
              </BlurIn>

              <div className="text-center md:text-left">
                <BlurIn delay={0.65}>
                  <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.22em] uppercase">
                    {config.authorEn} · {config.role}
                  </p>
                </BlurIn>

                <BlurIn delay={0.85}>
                  <h1
                    className={cn(
                      "mt-2 leading-none text-slate-900 dark:text-white",
                      "font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight",
                      "cursor-default font-display"
                    )}
                  >
                    {config.author}
                  </h1>
                </BlurIn>

                <BlurIn delay={1.05}>
                  <p className="mt-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    {config.headline}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {config.tagline}
                  </p>
                </BlurIn>

                {/* Tight Inline Metrics Bar */}
                <BlurIn delay={1.2}>
                  <div className="mt-6 inline-grid grid-cols-3 divide-x divide-border rounded-2xl border border-border/80 bg-background/95 shadow-sm w-full">
                    {config.metrics.map((m) => (
                      <div key={m.label} className="px-3.5 py-3 text-center md:text-left">
                        <div className="font-display text-lg sm:text-xl font-extrabold text-foreground">
                          {m.value}
                        </div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground whitespace-nowrap">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </BlurIn>
              </div>

              {/* Clean CTA Row */}
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <Link href="#projects">
                  <BoxReveal delay={1.35} width="100%">
                    <Button className="gap-2 px-6 shadow-md">
                      <span>浏览精选案例</span>
                      <ArrowDownRight size={17} />
                    </Button>
                  </BoxReveal>
                </Link>

                <Link href="/resume">
                  <BoxReveal delay={1.45} width="100%">
                    <Button
                      variant="outline"
                      className="gap-2 px-4 bg-background/90"
                    >
                      <FileText size={16} />
                      <span>在线简历 / PDF</span>
                    </Button>
                  </BoxReveal>
                </Link>

                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Link href={`mailto:${config.email}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="发送邮件"
                        className="bg-background/90"
                      >
                        <Mail size={16} />
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
                      aria-label="GitHub"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/90"
                      >
                        <SiGithub size={16} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1" />
      </div>
      <div className="absolute bottom-7 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
