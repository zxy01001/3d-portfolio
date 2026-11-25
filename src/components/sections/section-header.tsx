import { cn } from "@/lib/utils";
import Link from "next/link";
import { BoxReveal } from "../reveal-animations";
import { ReactNode } from "react";

export const SectionHeader = ({
  id,
  title,
  desc,
  className,
}: {
  id: string;
  title: string | ReactNode;
  desc?: string;
  className?: string;
}) => {
  return (
    <div className={cn("top-[64px] md:top-[70px] sticky mb-52 md:mb-96 px-4", className)}>
      <Link href={`#${id}`}>
        <BoxReveal width="100%">
          <h2
            className={cn(
              "text-3xl sm:text-4xl md:text-6xl font-bold text-center tracking-tight",
              "text-foreground"
            )}
          >
            {title}
          </h2>
        </BoxReveal>
      </Link>
      {desc && (
        <p className="mt-2 mx-auto line-clamp-3 max-w-2xl font-normal text-xs sm:text-sm md:text-base text-center text-muted-foreground leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
};
