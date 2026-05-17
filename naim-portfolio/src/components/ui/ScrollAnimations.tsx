"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  AnimatedEyebrow                                                           */
/*  Replaces a plain section eyebrow with a line that draws + text that lifts.*/
/*  Used at the top of each section, keeps the visual language of the Hero    */
/*  scroll indicator (a small horizontal element that "extends").             */
/* -------------------------------------------------------------------------- */

export function AnimatedEyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      className={`flex items-center gap-4 ${className}`}
    >
      <motion.span
        aria-hidden
        className="block h-px bg-foreground/45 origin-left"
        style={{ width: 40 }}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
      <motion.span
        className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase"
        variants={{
          hidden: { opacity: 0, x: -6 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.25,
            },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CountUp                                                                   */
/*  Animates a number from 0 to a target when the element enters viewport.    */
/*  Supports an optional suffix (e.g. "+") and falls back to plain text       */
/*  when no numeric target is provided.                                       */
/* -------------------------------------------------------------------------- */

type CountUpProps = {
  to: number | string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  to,
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  // Non-numeric targets (e.g. "∞") render directly — no animation needed.
  if (typeof to !== "number") {
    return (
      <span className={className}>
        {to}
        {suffix}
      </span>
    );
  }
  return (
    <AnimatedNumber
      to={to}
      suffix={suffix}
      duration={duration}
      className={className}
    />
  );
}

function AnimatedNumber({
  to,
  suffix,
  duration,
  className,
}: {
  to: number;
  suffix: string;
  duration: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(eased * to)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  ScrollProgress                                                            */
/*  A thin horizontal bar fixed at the very top of the viewport that fills    */
/*  with the page scroll progress. Subtle, no chrome — feels like a heartbeat */
/*  of the experience.                                                        */
/* -------------------------------------------------------------------------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(180,210,255,0.85) 30%, rgba(255,255,255,0.95) 60%, rgba(180,210,255,0.85) 90%, rgba(255,255,255,0.0))",
        boxShadow: "0 0 16px rgba(180,210,255,0.45)",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Parallax                                                                  */
/*  Drop-in wrapper that translates its children on scroll by `strength` px.  */
/*  Used to give project graphics & accent elements a subtle vertical drift.  */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  strength = 40,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* helper exports for other components */
export type { MotionValue };
export { useMotionValue };
