"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { AnimatedEyebrow } from "@/components/ui/ScrollAnimations";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

const ITEMS = [
  { key: "deloitte" as const, marker: "2026 — Now" },
  { key: "education" as const, marker: "2024 — 2026" },
];

export function Experience() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  // Animated vertical line that draws as user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative w-full py-32 sm:py-40 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedEyebrow className="mb-6">
          {t(translations.experience.eyebrow)}
        </AnimatedEyebrow>

        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] mb-20 max-w-3xl">
          <RevealTitle
            text={t(translations.experience.title)}
            className="text-gradient"
          />
        </h2>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Vertical track */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-white/8" />
          <motion.div
            className="absolute left-3 top-2 w-px bg-foreground origin-top"
            style={{ height: lineHeight }}
          />

          <ul className="space-y-16">
            {ITEMS.map((it, i) => {
              const data = translations.experience.items[it.key];
              return (
                <li key={it.key} className="relative pl-12">
                  <motion.span
                    className="absolute left-[7px] top-2 h-2 w-2 rounded-full bg-foreground"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.1,
                    }}
                  />
                  <Reveal delay={0.05}>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                        {it.marker} · {t(data.period)}
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                      {t(data.role)}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="mt-1.5 text-sm text-foreground/70">
                      {t(data.company)}
                    </div>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                      {t(data.description)}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
