"use client";

import { motion } from "framer-motion";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

type SkillGroup = {
  key: keyof typeof translations.skills.groups;
  items: string[];
};

const GROUPS: SkillGroup[] = [
  {
    key: "languages",
    items: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "PHP"],
  },
  {
    key: "frameworks",
    items: ["React", "Next.js", "Laravel", "Bootstrap", "Tailwind"],
  },
  { key: "data", items: ["Snowflake", "dbt", "dbschema", "Pandas"] },
  { key: "web", items: ["HTML", "CSS", "Framer Motion", "GSAP"] },
  { key: "tools", items: ["Git", "Docker", "Control-M"] },
  { key: "cloud", items: ["AWS", "IICS"] },
  { key: "ai", items: ["Claude", "Copilot", "LLMs", "Prompting"] },
];

export function Skills() {
  const t = useT();

  return (
    <section
      id="skills"
      className="relative w-full py-32 sm:py-40 px-6 sm:px-10"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div
        className="absolute inset-x-0 top-0 h-32 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(120,160,255,0.06), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            {t(translations.skills.eyebrow)}
          </div>
        </Reveal>

        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] mb-6 max-w-3xl">
          <RevealTitle
            text={t(translations.skills.title)}
            className="text-gradient"
          />
        </h2>

        <Reveal delay={0.15}>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-16">
            {t(translations.skills.sub)}
          </p>
        </Reveal>

        {/* Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.key} delay={0.05 * gi}>
              <div className="glow-border relative rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md p-6 sm:p-7 h-full">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="text-sm font-medium text-foreground tracking-tight">
                    {t(translations.skills.groups[group.key])}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <SkillChip key={item} label={item} index={i} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChip({ label, index }: { label: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2 }}
      data-cursor="hover"
      className="relative cursor-none px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[12.5px] text-foreground/90 hover:border-white/25 hover:bg-white/[0.06] transition-colors"
    >
      {label}
    </motion.li>
  );
}
