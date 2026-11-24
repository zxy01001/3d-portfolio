"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResumeView() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <div className="mx-auto w-full max-w-5xl shrink-0 px-4 pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回 3D 作品集首页
          </Link>
          <Link href="/cases/resume.html" target="_blank">
            <Button className="flex items-center gap-2 text-sm">
              全屏打开 / 导出 PDF
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 px-2 pb-12 md:px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-[84vh] w-full overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
        >
          <iframe
            src="/cases/resume.html"
            title="朱星宇 — UX 交互设计师简历"
            className="h-full w-full border-0"
          />
        </motion.div>
      </div>
    </div>
  );
}
