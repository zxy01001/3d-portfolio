import { ADVANTAGES, EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  return (
    <SectionWrapper className="flex flex-col items-center justify-center min-h-[120vh] py-20">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="工作与教育经历"
          desc="从业务拆解、系统建模到高保真落地闭环的实践路径"
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-10 relative">
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>

        {/* Core UX Strengths */}
        <div className="mt-14">
          <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            CORE UX STRENGTHS · 核心设计优势
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADVANTAGES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-xl border border-border bg-card/85 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
              >
                <div className="text-base font-bold text-foreground">
                  {item.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "group bg-card/90 backdrop-blur-sm text-card-foreground border-border",
          "hover:border-primary/25 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-sm md:text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <ol className="relative flex flex-col gap-2.5 md:items-end">
              {experience.periods.length > 1 && (
                <span className="absolute left-[3.5px] md:left-auto md:right-[3.5px] top-2 bottom-2 w-px bg-border" />
              )}
              {experience.periods.map((p, i) => {
                const active = p.end === "Present" || p.end === "至今";
                return (
                  <li
                    key={i}
                    className={cn(
                      "relative flex items-center gap-2.5 md:flex-row-reverse font-mono text-xs",
                      active ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                  >
                    <span className="relative flex size-2 shrink-0">
                      {active && (
                        <span className="absolute inset-0 rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
                      )}
                      <span
                        className={cn(
                          "relative size-2 rounded-full",
                          active
                            ? "bg-emerald-500"
                            : "border border-muted-foreground/50 bg-card"
                        )}
                      />
                    </span>
                    {p.start} — {p.end}
                  </li>
                );
              })}
            </ol>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
            {experience.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName as SkillNames];
              if (!skill) return null;
              return (
                <Badge
                  key={skillName}
                  variant="outline"
                  className="gap-1.5 text-xs font-normal text-muted-foreground bg-secondary/40 border-border/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt=""
                    className="w-3.5 h-3.5 object-contain opacity-75 invert dark:invert-0 transition duration-300 group-hover:opacity-100"
                  />
                  {skill.labelZh ?? skill.label}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
