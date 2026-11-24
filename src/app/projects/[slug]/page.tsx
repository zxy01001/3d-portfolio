import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/case-studies";
import ProjectDetailClient from "./project-detail-client";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return {
    title: `${study.title} | 朱星宇 UX 作品集`,
    description: study.oneLiner,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (idx === -1) notFound();

  const study = CASE_STUDIES[idx];
  const nextStudy = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <ProjectDetailClient
      study={study}
      nextStudy={nextStudy}
      allStudies={CASE_STUDIES.map((c) => ({
        slug: c.slug,
        indexLabel: c.indexLabel,
        title: c.title,
      }))}
    />
  );
}
