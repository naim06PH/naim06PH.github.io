"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

/**
 * Custom cursor — dual circle system.
 *  - Main dot: tight, follows ratón with minimal lerp.
 *  - Trail: large blurred circle that lags via lerp for fluid motion.
 *  - On interactive elements: expands and intensifies glow.
 *  - mix-blend-mode: difference handles adaptive color over any background.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Internal state stored in refs (avoid re-renders per frame)
  const target = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    // Skip entirely on touch devices — keep the native pointer behaviour.
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) {
      if (dotRef.current) dotRef.current.style.display = "none";
      if (trailRef.current) trailRef.current.style.display = "none";
      return;
    }

    const handleMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    const updateHoverFromTarget = (el: EventTarget | null) => {
      if (!(el instanceof Element)) {
        setIsHover(false);
        return;
      }
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );
      setIsHover(!!interactive);
    };

    const handleOver = (e: PointerEvent) => updateHoverFromTarget(e.target);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointerover", handleOver, { passive: true });

    // Animation loop
    const tick = () => {
      dot.current.x = lerp(dot.current.x, target.current.x, 0.32);
      dot.current.y = lerp(dot.current.y, target.current.y, 0.32);
      trail.current.x = lerp(trail.current.x, target.current.x, 0.12);
      trail.current.y = lerp(trail.current.y, target.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointerover", handleOver);
    };
  }, []);

  // Sizes
  const dotSize = isPressed ? 6 : isHover ? 10 : 6;
  const trailSize = isHover ? 64 : isPressed ? 28 : 36;

  return (
    <>
      {/* Trail (blurred halo, blend mode for adaptive color) */}
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          width: trailSize,
          height: trailSize,
          marginLeft: -trailSize / 2,
          marginTop: -trailSize / 2,
          background: isHover
            ? "radial-gradient(circle, rgba(180,210,255,0.55) 0%, rgba(120,160,255,0.25) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)",
          filter: isHover ? "blur(8px)" : "blur(6px)",
          mixBlendMode: "screen",
          transition:
            "width 0.28s cubic-bezier(0.22, 1, 0.36, 1), height 0.28s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease",
        }}
      />
      {/* Main dot (high contrast via difference) */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: "#ffffff",
          mixBlendMode: "difference",
          transition:
            "width 0.22s cubic-bezier(0.22, 1, 0.36, 1), height 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </>
  );
}
