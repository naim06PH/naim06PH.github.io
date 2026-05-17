"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/lib/state/AppState";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";
import { LoadingScreen } from "./LoadingScreen";
import { LanguageSelect } from "./LanguageSelect";

/**
 * BootSequence — strict three-state machine:
 *   boot → language → world
 * Each phase is independently rendered. Only the world phase persists.
 */
export function BootSequence({ children }: { children: React.ReactNode }) {
  const { phase, goTo } = useAppState();
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    // small delay lets the exit animation breathe before the world appears
    setTimeout(() => goTo("world"), 150);
  };

  return (
    <>
      {/* World always rendered (mounted) so scroll & GSAP can settle.
          Hidden until phase is 'world' to keep onboarding clean. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "world" ? 1 : 0,
          pointerEvents: phase === "world" ? "auto" : "none",
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Onboarding overlays */}
      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <LoadingScreen key="boot" onComplete={() => goTo("language")} />
        )}
        {phase === "language" && (
          <LanguageSelect key="language" onSelect={handleLanguageSelect} />
        )}
      </AnimatePresence>

      {/* Transition wipe when going to world */}
      <AnimatePresence>
        {phase === "world" && (
          <motion.div
            key="wipe"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
            style={{ transformOrigin: "top" }}
            className="fixed inset-0 z-[90] bg-background pointer-events-none"
            onAnimationComplete={() => {
              // nothing further; world fade-in handled above
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
