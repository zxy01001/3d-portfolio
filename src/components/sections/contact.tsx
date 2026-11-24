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
import { Check, Copy, FileText, Mail, MapPin } from "lucide-react";
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
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto py-16 md:py-24">
      <SectionHeader
        id="contact"
        className="static mb-8 md:mb-10"
        title="联系与合作"
        desc="欢迎探讨 UX / AI 产品体验设计岗位机会与项目合作"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-[9999] mx-4">
        <Card className="bg-white/95 dark:bg-zinc-950/95 rounded-2xl border-border shadow-xl">
          <CardHeader className="space-y-3 pb-4">
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
                <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Mail className="h-3.5 w-3.5" />
                  发送邮件
                </Button>
              </Link>
              <Link href="/resume">
                <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs">
                  <FileText className="h-3.5 w-3.5" />
                  在线简历 / PDF
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
