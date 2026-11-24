"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Check, Copy, FileText, Mail, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

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
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto pb-20">
      <SectionHeader
        id="contact"
        className="relative mb-12"
        title="期待与你交流"
        desc="欢迎沟通 UX / UI / AI 产品体验岗位机会或项目交流"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-[9999] mx-4">
        <Card className="bg-white/80 dark:bg-black/75 backdrop-blur-md rounded-2xl border-border shadow-lg mt-4 md:mt-12">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 font-medium">
                <Briefcase className="h-3.5 w-3.5" />
                {config.experienceYears} · {config.status}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                <MapPin className="h-3.5 w-3.5" />
                {config.location}
              </span>
            </div>

            <CardTitle className="text-2xl md:text-3xl font-bold">
              联系方式与留言
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              可直接发送邮件至{" "}
              <a
                href={`mailto:${config.email}`}
                className="font-mono font-semibold text-foreground underline underline-offset-4"
              >
                {config.email}
              </a>
              ，或在下方填写留言。
            </CardDescription>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopyEmail}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    已复制邮箱地址
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    复制邮箱：{config.email}
                  </>
                )}
              </Button>
              <Link href={`mailto:${config.email}`}>
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  一键写信
                </Button>
              </Link>
              <Link href="/cases/resume.html" target="_blank">
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  打印 / 导出 PDF 简历
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
