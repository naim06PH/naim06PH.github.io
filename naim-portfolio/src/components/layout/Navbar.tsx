"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { translations } from "@/lib/i18n/translations";
import { useLanguage, useT } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: translations.nav.about },
  { id: "skills", label: translations.nav.skills },
  { id: "projects", label: translations.nav.projects },
  { id: "experience", label: translations.nav.experience },
  { id: "contact", label: translations.nav.contact },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useT();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const handleAnchor = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
    >
      <motion.nav
        className={cn(
          "pointer-events-auto mt-4 flex items-center gap-1 rounded-full border border-white/10 backdrop-blur-xl transition-all",
          scrolled ? "bg-background/70" : "bg-background/30"
        )}
        animate={{
          paddingLeft: scrolled ? 8 : 12,
          paddingRight: scrolled ? 8 : 12,
          paddingTop: scrolled ? 6 : 10,
          paddingBottom: scrolled ? 6 : 10,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative flex items-center gap-2 pl-3 pr-4 group"
          data-cursor="hover"
          aria-label="Naim Penabad"
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/20 overflow-hidden">
            <span className="font-semibold text-[11px] text-foreground tracking-tight">
              N
            </span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </span>
          <span className="hidden sm:inline font-medium text-[13px] tracking-tight text-foreground">
            Penabad
          </span>
        </a>

        {/* Divider */}
        <span className="h-5 w-px bg-white/10 mx-1 hidden md:block" />

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleAnchor(s.id)}
                data-cursor="hover"
                className="relative px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-full"
              >
                {t(s.label)}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <span className="h-5 w-px bg-white/10 mx-1 hidden md:block" />

        {/* Language switch */}
        <div className="flex items-center gap-0.5 rounded-full bg-white/[0.04] p-0.5 ml-1">
          {(["es", "en"] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              data-cursor="hover"
              className={cn(
                "relative px-2.5 py-1 text-[11px] font-medium font-mono tracking-wider uppercase rounded-full transition-colors",
                language === lang
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {language === lang && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{lang}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
