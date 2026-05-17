"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AppStateProvider } from "@/lib/state/AppState";
import { BootSequence } from "@/components/boot/BootSequence";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { WorldExperience } from "@/components/world/WorldExperience";

/**
 * App — wires providers + the strict state machine:
 *   boot → language → world
 *
 * Everything lives client-side to keep transitions seamless.
 */
export function App() {
  return (
    <LanguageProvider defaultLanguage="en">
      <AppStateProvider>
        <CustomCursor />
        <BootSequence>
          <WorldExperience />
        </BootSequence>
      </AppStateProvider>
    </LanguageProvider>
  );
}
