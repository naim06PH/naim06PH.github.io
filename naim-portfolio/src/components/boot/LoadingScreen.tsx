"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { translations } from "@/lib/i18n/translations";

type Props = {
  onComplete: () => void;
};

/**
 * BOOT phase — cinematic loading screen.
 * Renders a minimal "system boot" sequence and calls onComplete when finished.
 * Strict timing: ~2.6s total so the user never feels stuck.
 */
export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalMs = 2200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / totalMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
    >
      {/* Background grid + spotlight */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="spotlight" />

      {/* Top-left system signature */}
      <motion.div
        className="absolute top-6 sm:top-8 left-6 sm:left-8 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />
        N.P.H · SYSTEM
      </motion.div>

      {/* Top-right version */}
      <motion.div
        className="absolute top-6 sm:top-8 right-6 sm:right-8 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {translations.boot.loading.version.en}
      </motion.div>

      {/* Center monogram */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative h-24 w-24 rounded-full border border-white/15 flex items-center justify-center overflow-hidden">
            {/* Conic rotating fill */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,255,255,0.5), rgba(255,255,255,0) 80%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[1.5px] rounded-full bg-background" />
            <span className="relative font-semibold text-2xl tracking-tight text-gradient">
              N
            </span>
          </div>
        </motion.div>

        {/* Bottom label */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            {translations.boot.loading.label.en}
          </div>

          {/* Progress bar */}
          <div className="relative h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground tabular-nums">
            {String(Math.round(progress * 100)).padStart(3, "0")}%
          </div>
        </motion.div>
      </div>

      {/* Bottom-left scanning dots */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span>{translations.boot.loading.sub.en}</span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ●
        </motion.span>
      </motion.div>

      {/* Bottom-right coordinates */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase hidden sm:block">
        43.3614° N · 8.4115° W
      </div>
    </motion.div>
  );
}
