import { useCallback, useEffect, useState } from "react";
import type { CalendarEvent, PlanState } from "./types";

const STORAGE_KEY = "planprint:v1";

const now = new Date();

export const DEFAULT_STATE: PlanState = {
  month: now.getMonth(),
  year: now.getFullYear(),
  weekStart: 1,
  title: "My Calendar",
  subtitle: "",
  themeId: "paper",
  fontId: "fraunces",
  templateId: "minimal",
  showWeekends: true,
  monochrome: false,
  showNotes: true,
  notes: "",
  events: [],
};

function load(): PlanState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PlanState>;
    return { ...DEFAULT_STATE, ...parsed, events: parsed.events ?? [] };
  } catch {
    return null;
  }
}

export function createEventId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function usePlanPrint() {
  const [state, setState] = useState<PlanState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount so SSR markup stays stable.
  useEffect(() => {
    const stored = load();
    if (stored) setState(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — customization simply won't persist */
    }
  }, [state, hydrated]);

  const update = useCallback(<K extends keyof PlanState>(key: K, value: PlanState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const upsertEvent = useCallback((event: CalendarEvent) => {
    setState((prev) => {
      const exists = prev.events.some((e) => e.id === event.id);
      return {
        ...prev,
        events: exists
          ? prev.events.map((e) => (e.id === event.id ? event : e))
          : [...prev.events, event],
      };
    });
  }, []);

  const removeEvent = useCallback((id: string) => {
    setState((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  }, []);

  const reset = useCallback(() => setState(DEFAULT_STATE), []);

  return { state, hydrated, setState, update, upsertEvent, removeEvent, reset };
}

export type PlanPrintStore = ReturnType<typeof usePlanPrint>;
