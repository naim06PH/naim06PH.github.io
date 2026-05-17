"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppState } from "@/lib/state/AppState";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll — Lenis instance, integrated with GSAP ScrollTrigger.
 * Scroll is paused while the boot/language phases are active so that the
 * onboarding feels isolated from the world experience.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { phase } = useAppState();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync Lenis state with the app phase so scrolling is locked during boot.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (phase === "world") {
      lenis.start();
    } else {
      // Reset to top so the hero is fresh when the world appears.
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
  }, [phase]);

  return <>{children}</>;
}
