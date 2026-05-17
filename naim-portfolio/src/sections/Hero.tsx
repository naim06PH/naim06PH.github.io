"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const t = useT();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the headline group
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="spotlight" />

        {/* Two drifting blobs */}
        <div
          className="absolute blob -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(120,160,255,0.35), transparent 60%)",
          }}
        />
        <div
          className="absolute blob bottom-0 right-0 h-[440px] w-[440px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, rgba(180,120,255,0.25), transparent 60%)",
            animationDelay: "-8s",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <motion.div
        className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 pt-32 pb-24"
        style={{ y: headlineY, opacity: headlineOpacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md px-3 py-1.5 mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
            {t(translations.hero.badge)}
          </span>
        </motion.div>

        {/* Headline (staggered mask reveal) */}
        <h1 className="font-semibold tracking-[-0.035em] leading-[0.92] text-[clamp(2.75rem,8vw,7.5rem)] max-w-5xl">
          <HeroLine delay={1.55}>{t(translations.hero.line1)}</HeroLine>
          <HeroLine delay={1.7} accent>
            {t(translations.hero.line2)}
          </HeroLine>
          <HeroLine delay={1.85} muted>
            {t(translations.hero.line3)}
          </HeroLine>
        </h1>

        {/* Description */}
        <motion.p
          className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {t(translations.hero.description)}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor="hover"
            className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t(translations.hero.ctaPrimary)}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface/40 backdrop-blur-md px-5 py-3 text-sm font-medium text-foreground hover:bg-surface/70 transition-colors"
          >
            {t(translations.hero.ctaSecondary)}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          {t(translations.hero.scroll)}
        </span>
        <span className="relative h-8 w-px overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-foreground/70"
            animate={{ y: [-12, 32] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function HeroLine({
  children,
  delay,
  accent = false,
  muted = false,
}: {
  children: React.ReactNode;
  delay: number;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={
          "block " +
          (accent
            ? "text-gradient-accent"
            : muted
              ? "text-muted-foreground/80"
              : "text-gradient")
        }
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.05,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
