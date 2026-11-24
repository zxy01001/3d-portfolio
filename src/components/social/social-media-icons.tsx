"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { Mail, FileText } from "lucide-react";
import { config } from "@/data/config";
import Link from "next/link";

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });

  const buttons = [
    {
      name: "邮箱联系",
      href: `mailto:${config.email}`,
      icon: <Mail className="h-5 w-5 text-foreground/80" />,
      external: false,
    },
    {
      name: "GitHub",
      href: config.social.github,
      icon: <SiGithub size={20} className="text-foreground/80" />,
      external: true,
    },
    {
      name: "在线简历",
      href: "/cases/resume.html",
      icon: <FileText className="h-5 w-5 text-foreground/80" />,
      external: true,
    },
  ];

  return (
    <div ref={ref} className="z-10 flex items-center gap-1">
      {show &&
        buttons.map((button) => (
          <Link
            href={button.href}
            key={button.name}
            target={button.external ? "_blank" : undefined}
            aria-label={button.name}
          >
            <Button variant={"ghost"} size={"icon"}>
              {button.icon}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
