"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FunnyThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";

  const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isLight ? "dark" : "light";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!doc.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 460,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      // Fallback gracefully if view transition is interrupted
    }
  };

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleToggle}
          aria-label={isLight ? "切换为深色主题" : "切换为浅色主题"}
          className={cn(
            "relative h-7 gap-1.5 rounded-full border border-border/80 bg-background/85 px-2.5 text-[11px] font-medium text-foreground/85 shadow-sm backdrop-blur-md transition-colors hover:border-sky-500/45 hover:text-foreground",
            className
          )}
        >
          <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
            <Sun className="h-3.5 w-3.5 rotate-0 scale-100 text-sky-600 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute inset-0 h-3.5 w-3.5 rotate-90 scale-0 text-sky-300 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </span>
          <span className="hidden sm:inline font-mono tracking-wider">
            {isLight ? "浅色" : "深色"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{isLight ? "点击切换深邃暗色主题" : "点击预览瑞士瓷白亮色主题"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
