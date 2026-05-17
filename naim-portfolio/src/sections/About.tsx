"use client";

import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

export function About() {
  const t = useT();

  const stats = [
    { value: t(translations.about.stat1Value), label: t(translations.about.stat1Label) },
    { value: t(translations.about.stat2Value), label: t(translations.about.stat2Label) },
    { value: t(translations.about.stat3Value), label: t(translations.about.stat3Label) },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-32 sm:py-40 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            {t(translations.about.eyebrow)}
          </div>
        </Reveal>

        {/* Title */}
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] mb-16 max-w-3xl">
          <RevealTitle
            text={t(translations.about.title)}
            className="text-gradient"
          />
        </h2>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: portrait card */}
          <Reveal className="md:col-span-5">
            <div className="glow-border relative rounded-2xl overflow-hidden border border-white/10 bg-surface/40 backdrop-blur-md aspect-[4/5] flex flex-col justify-between p-8">
              {/* Visual motif (no photo asset, so design a graphic mark) */}
              <div className="relative h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-44 w-44 rounded-full border border-white/15 flex items-center justify-center">
                    <div className="absolute inset-3 rounded-full border border-white/10" />
                    <div className="absolute inset-6 rounded-full border border-white/5" />
                    <span className="font-semibold text-7xl tracking-tight text-gradient">
                      N
                    </span>
                    <div
                      className="absolute inset-0 rounded-full opacity-60"
                      style={{
                        background:
                          "conic-gradient(from 140deg, rgba(120,160,255,0.0), rgba(120,160,255,0.35), rgba(120,160,255,0.0) 60%)",
                      }}
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 top-0 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  <span>Profile</span>
                  <span>NPH-26</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  <span>A Coruña → Remoto</span>
                  <span>Data · AI · Web</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: text + stats */}
          <div className="md:col-span-7 flex flex-col justify-between gap-12">
            <div className="space-y-6">
              <Reveal delay={0.05}>
                <p className="text-lg sm:text-xl leading-relaxed text-foreground/90">
                  {t(translations.about.p1)}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {t(translations.about.p2)}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="font-semibold text-3xl sm:text-4xl tracking-tight text-gradient">
                      {s.value}
                    </span>
                    <span className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
