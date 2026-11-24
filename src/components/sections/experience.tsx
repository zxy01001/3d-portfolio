import {
  EDUCATION,
  EXPERIENCE,
  SkillNames,
  SKILLS,
  VALUE_PILLARS,
} from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

const ExperienceSection = () => {
  const mainJob = EXPERIENCE[0];
  const internJob = EXPERIENCE[1];

  return (
    <SectionWrapper className="flex flex-col items-center justify-center min-h-[110vh] py-20 md:py-28">
      <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
        <SectionHeader
          id="experience"
          title="专业价值与履历"
          desc="核心设计交付能力矩阵与企业级产品落地履历"
          className="static mb-10 md:mb-12"
        />

        {/* Row 1: 3 Compact Personal Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {VALUE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl border border-border bg-card/95 p-5 shadow-sm transition-colors hover:border-cyan-500/35"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {pillar.metric}
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Integrated Career + Education Bento (Fits on 1 screen!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Role (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-40px" }}
            className="md:col-span-2 rounded-2xl border border-border bg-card/95 p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {mainJob.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    · {mainJob.company}
                  </span>
                  {mainJob.badge && (
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                      {mainJob.badge}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {mainJob.periods[0].start} — {mainJob.periods[0].end}
                </span>
              </div>

              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                {mainJob.description.map((point, i) => {
                  const [head, rest] = point.split("：");
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      <span>
                        <strong className="font-semibold text-foreground">
                          {head}：
                        </strong>
                        {rest}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
              {mainJob.skills.map((skillName) => {
                const skill = SKILLS[skillName as SkillNames];
                if (!skill) return null;
                return (
                  <Badge
                    key={skillName}
                    variant="outline"
                    className="gap-1.5 text-xs font-normal text-muted-foreground bg-secondary/40 border-border/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.icon}
                      alt=""
                      className="w-3.5 h-3.5 object-contain opacity-75 invert dark:invert-0"
                    />
                    {skill.labelZh}
                  </Badge>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Internship + Education Stacked */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-4"
          >
            <div className="flex-1 rounded-2xl border border-border bg-card/95 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">
                  {internJob.title}
                </h3>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {internJob.periods[0].start} — {internJob.periods[0].end}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                {internJob.company}
              </div>
              <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {internJob.description[0]}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/95 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-500" />
                  <h3 className="text-base font-bold text-foreground">
                    {EDUCATION.school}
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-500/12 border border-indigo-500/25 px-2.5 py-0.5 font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  {EDUCATION.highlight}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-foreground/85">
                {EDUCATION.degree} ·{" "}
                <span className="font-mono text-muted-foreground">
                  {EDUCATION.period}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {EDUCATION.certs}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
