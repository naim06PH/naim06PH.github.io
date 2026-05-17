"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { Reveal, RevealTitle } from "@/components/ui/Reveal";
import { translations } from "@/lib/i18n/translations";
import { useT } from "@/lib/i18n/LanguageContext";

type Project = {
  key: keyof typeof translations.projects.items;
  index: string;
  href: string;
  graphic: ReactNode;
};

const PROJECTS: Project[] = [
  {
    key: "autoaudit",
    index: "01",
    href: "https://github.com/naim06PH/Autoaudit-AI",
    graphic: <AutoauditGraphic />,
  },
  {
    key: "blessing",
    index: "02",
    href: "https://blessing-indigo.es/",
    graphic: <BlessingGraphic />,
  },
  {
    key: "portfolio",
    index: "03",
    href: "#top",
    graphic: <PortfolioGraphic />,
  },
];

export function Projects() {
  const t = useT();

  return (
    <section
      id="projects"
      className="relative w-full py-32 sm:py-40 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            {t(translations.projects.eyebrow)}
          </div>
        </Reveal>

        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] mb-6 max-w-3xl">
          <RevealTitle
            text={t(translations.projects.title)}
            className="text-gradient"
          />
        </h2>
        <Reveal delay={0.15}>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-16">
            {t(translations.projects.sub)}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.key} delay={0.06 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useT();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHover, setIsHover] = useState(false);

  // Tilt motion (subtle 3D)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18 });
  const lift = useSpring(0, { stiffness: 180, damping: 22 });
  const liftPx = useTransform(lift, (v) => `${v}px`);

  const data = translations.projects.items[project.key];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(x * 8);
    rx.set(-y * 8);
  };

  const handleEnter = () => {
    setIsHover(true);
    lift.set(-6);
  };
  const handleLeave = () => {
    setIsHover(false);
    rx.set(0);
    ry.set(0);
    lift.set(0);
  };

  const isExternal = project.href.startsWith("http");

  return (
    <motion.a
      ref={cardRef}
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={(e) => {
        if (project.href === "#top") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-surface/40 backdrop-blur-md"
      style={{
        rotateX,
        rotateY,
        y: liftPx,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top graphic */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-background">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHover ? 1.04 : 1,
            filter: isHover ? "blur(0px)" : "blur(0.5px)",
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.graphic}
        </motion.div>
        {/* Hover glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(120,160,255,0.18), transparent 60%)",
          }}
        />
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          /{project.index}
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          {t(data.tag)}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          {t(data.title)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[3.5em]">
          {t(data.description)}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/70 uppercase">
            {t(translations.projects.viewProject)}
          </span>
          <motion.span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-foreground/90"
            animate={{ x: isHover ? 4 : 0, rotate: isHover ? -20 : -45 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

/* --- Project graphics (pure SVG / CSS, no assets) --- */

function AutoauditGraphic() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="spotlight" />
      <svg
        viewBox="0 0 300 200"
        className="w-3/4 h-3/4 text-foreground/90"
        fill="none"
      >
        {/* Audit lines */}
        {[40, 60, 80, 100, 120, 140].map((y, i) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2={i === 2 ? 200 : i === 4 ? 240 : 260}
            y2={y}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.25 + i * 0.06}
          />
        ))}
        {/* Highlight rectangle */}
        <rect
          x="34"
          y="74"
          width="180"
          height="12"
          fill="none"
          stroke="rgba(120,160,255,0.9)"
          strokeWidth="1"
        />
        {/* Sparkle (AI) */}
        <g transform="translate(220, 70)">
          <circle cx="0" cy="0" r="18" fill="rgba(120,160,255,0.10)" />
          <path
            d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2 Z"
            fill="rgba(180,210,255,0.9)"
          />
        </g>
      </svg>
    </div>
  );
}

function BlessingGraphic() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.18), transparent 70%)",
        }}
      />
      <div className="relative font-serif italic text-6xl tracking-tight text-gradient-accent">
        Blessing
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
        Indigo · 2025
      </div>
    </div>
  );
}

function PortfolioGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(120,160,255,0.45), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          You are here
        </div>
        <div className="font-semibold text-3xl tracking-tight text-gradient">
          /portfolio
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1 w-6 rounded-full bg-white/15"
              style={{
                background:
                  i < 3 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
