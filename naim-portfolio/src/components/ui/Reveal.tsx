"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "section" | "li";
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Reveal — scroll-triggered fade + lift + blur, premium feel.
 * Lightweight wrapper around Framer Motion's `whileInView`.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-15% 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal a word-by-word title with a subtle stagger. */
export function RevealTitle({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    // `key={text}` forces a remount when the language (and therefore the text)
    // changes mid-scroll. Without this, words added by the new translation
    // would mount in the `hidden` state and stay hidden because the parent has
    // already finished animating to `visible` (whileInView once: true).
    <motion.span
      key={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
