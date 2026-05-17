"use client";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";

/**
 * WorldExperience — the portfolio proper.
 * One continuous scroll narrative. Mounted at all times once boot completes.
 */
export function WorldExperience() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
