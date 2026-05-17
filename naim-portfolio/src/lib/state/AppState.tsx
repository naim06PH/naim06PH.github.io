"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type AppPhase = "boot" | "language" | "world";

type AppStateValue = {
  phase: AppPhase;
  next: () => void;
  goTo: (phase: AppPhase) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>("boot");

  const next = useCallback(() => {
    setPhase((p) =>
      p === "boot" ? "language" : p === "language" ? "world" : "world"
    );
  }, []);

  const goTo = useCallback((p: AppPhase) => setPhase(p), []);

  return (
    <AppStateContext.Provider value={{ phase, next, goTo }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx)
    throw new Error("useAppState must be used within an AppStateProvider");
  return ctx;
}
