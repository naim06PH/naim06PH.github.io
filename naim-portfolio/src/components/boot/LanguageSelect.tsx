"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Language } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";

type Props = {
  onSelect: (lang: Language) => void;
};

const OPTIONS: { code: Language; label: string; native: string; tag: string }[] =
  [
    { code: "es", label: "Español", native: "ES", tag: "Castellano" },
    { code: "en", label: "English", native: "EN", tag: "Global" },
  ];

export function LanguageSelect({ onSelect }: Props) {
  const [hover, setHover] = useState<Language | null>(null);
  const [focused, setFocused] = useState<number>(0);

  const handleSelect = useCallback(
    (lang: Language) => {
      onSelect(lang);
    },
    [onSelect]
  );

  // Keyboard navigation — videogame menu feel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocused((f) => (f + 1) % OPTIONS.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocused((f) => (f - 1 + OPTIONS.length) % OPTIONS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(OPTIONS[focused].code);
      } else if (e.key === "1") {
        handleSelect("es");
      } else if (e.key === "2") {
        handleSelect("en");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focused, handleSelect]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="spotlight" />

      {/* Top bar */}
      <motion.div
        className="absolute top-8 left-8 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle animate-pulse" />
        SYSTEM READY · STEP 02
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        SELECT LANGUAGE
      </motion.div>

      <div className="relative flex flex-col items-center max-w-4xl px-8 w-full">
        {/* Eyebrow */}
        <motion.div
          className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {translations.boot.lang.sub.en} · {translations.boot.lang.sub.es}
        </motion.div>

        {/* Title (bilingual) */}
        <motion.h1
          className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient leading-[1.05] mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {translations.boot.lang.title.en}
        </motion.h1>
        <motion.div
          className="text-center text-base text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          {translations.boot.lang.title.es}
        </motion.div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl">
          {OPTIONS.map((opt, i) => {
            const isFocused = focused === i;
            const isHover = hover === opt.code;
            const active = isHover || isFocused;

            return (
              <motion.button
                key={opt.code}
                type="button"
                onMouseEnter={() => {
                  setHover(opt.code);
                  setFocused(i);
                }}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleSelect(opt.code)}
                className="group relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md text-left transition-colors"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileTap={{ scale: 0.985 }}
              >
                {/* Glow on active */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0"
                  animate={{
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(120,160,255,0.18), transparent 70%)",
                  }}
                />
                {/* Border highlight */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: active
                      ? "inset 0 0 0 1px rgba(255,255,255,0.22)"
                      : "inset 0 0 0 1px rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative p-7 sm:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                      {opt.tag}
                    </span>
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="font-semibold text-5xl sm:text-6xl tracking-tight text-gradient leading-none">
                      {opt.native}
                    </div>
                    <div className="pb-1 font-mono text-xs text-muted-foreground">
                      .lang
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium text-foreground">
                      {opt.label}
                    </div>
                    <motion.div
                      className="font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2"
                      animate={{
                        color: active
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {translations.boot.lang.enter.en}
                      <motion.span
                        animate={{ x: active ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Hint */}
        <motion.div
          className="mt-12 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <kbd className="px-2 py-1 border border-white/10 rounded text-[9px]">
            ←
          </kbd>
          <kbd className="px-2 py-1 border border-white/10 rounded text-[9px]">
            →
          </kbd>
          <span>{translations.boot.lang.hint.en}</span>
          <span className="opacity-40">·</span>
          <kbd className="px-2 py-1 border border-white/10 rounded text-[9px]">
            Enter
          </kbd>
        </motion.div>
      </div>

      {/* Bottom corner ids */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        N.P.H · BOOT_SEQ_02
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        AWAITING INPUT
      </div>
    </motion.div>
  );
}
