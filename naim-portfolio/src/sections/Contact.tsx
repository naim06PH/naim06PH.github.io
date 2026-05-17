"use client";

import { motion } from "framer-motion";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/naim06PH" },
  { label: "Email", href: "mailto:naimhermida@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naimpenabad/" },
];

export function Contact() {
  const t = useT();

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-32 sm:py-44 px-6 sm:px-10"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(120,160,255,0.18), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            {t(translations.contact.eyebrow)}
          </div>
        </Reveal>

        <h2 className="text-[clamp(2.25rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] mb-8 max-w-4xl">
          <RevealTitle
            text={t(translations.contact.title)}
            className="text-gradient"
          />
        </h2>
        <Reveal delay={0.15}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-14">
            {t(translations.contact.sub)}
          </p>
        </Reveal>

        {/* Email CTA — large */}
        <Reveal delay={0.25}>
          <motion.a
            href="mailto:naimhermida@gmail.com"
            data-cursor="hover"
            className="group inline-flex items-center gap-4 sm:gap-6 rounded-full border border-white/15 bg-surface/40 backdrop-blur-md pl-5 sm:pl-7 pr-2 sm:pr-3 py-2 sm:py-3 hover:bg-surface/70 transition-colors"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase hidden sm:inline">
              {t(translations.contact.emailCta)} →
            </span>
            <span className="text-xl sm:text-3xl font-medium tracking-tight text-foreground">
              naimhermida@gmail.com
            </span>
            <span
              aria-hidden
              className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-foreground text-background text-xl transition-transform group-hover:scale-105 group-hover:rotate-12"
            >
              →
            </span>
          </motion.a>
        </Reveal>

        {/* Socials */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {t(translations.contact.socials)}
              </span>
              <ul className="flex flex-wrap gap-4 sm:gap-6">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2 text-lg text-foreground hover:text-foreground/90"
                    >
                      {s.label}
                      <span
                        aria-hidden
                        className="opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase sm:text-right max-w-xs">
              {t(translations.contact.footer)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
