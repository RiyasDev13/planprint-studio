import type { EventCategory } from "./types";

export interface SheetTheme {
  id: string;
  name: string;
  /** Hex values — these are *printed artwork* colors, not app chrome. */
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  grid: string;
  swatch: string;
}

export const THEMES: SheetTheme[] = [
  {
    id: "paper",
    name: "Paper",
    bg: "#fbfaf7",
    ink: "#221f1a",
    muted: "#756e61",
    accent: "#d1502e",
    accentInk: "#fbfaf7",
    grid: "#e4ded1",
    swatch: "#fbfaf7",
  },
  {
    id: "midnight",
    name: "Midnight",
    bg: "#1c1a17",
    ink: "#f4f1ea",
    muted: "#a49b8c",
    accent: "#e0764f",
    accentInk: "#1c1a17",
    grid: "#3b3730",
    swatch: "#1c1a17",
  },
  {
    id: "sage",
    name: "Sage",
    bg: "#f2f5f0",
    ink: "#26332a",
    muted: "#657a68",
    accent: "#5c7a63",
    accentInk: "#f2f5f0",
    grid: "#d5e0d6",
    swatch: "#5c7a63",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    bg: "#fdf3ee",
    ink: "#4a2118",
    muted: "#95685b",
    accent: "#d1502e",
    accentInk: "#fdf3ee",
    grid: "#f0d9cd",
    swatch: "#d1502e",
  },
  {
    id: "indigo",
    name: "Indigo",
    bg: "#f3f4fa",
    ink: "#1e2340",
    muted: "#64699p".replace("p", "0"),
    accent: "#3f4a9b",
    accentInk: "#f3f4fa",
    grid: "#dadced",
    swatch: "#3f4a9b",
  },
  {
    id: "mono",
    name: "Mono",
    bg: "#ffffff",
    ink: "#111111",
    muted: "#6b6b6b",
    accent: "#111111",
    accentInk: "#ffffff",
    grid: "#d9d9d9",
    swatch: "#111111",
  },
];

export const BW_THEME: SheetTheme = {
  id: "bw",
  name: "Black & white",
  bg: "#ffffff",
  ink: "#000000",
  muted: "#5a5a5a",
  accent: "#000000",
  accentInk: "#ffffff",
  grid: "#c8c8c8",
  swatch: "#ffffff",
};

export const ACCENT_SWATCHES = [
  "#d1502e",
  "#5c7a63",
  "#3f4a9b",
  "#a4762c",
  "#8d3b5e",
  "#221f1a",
];

export interface SheetFont {
  id: string;
  name: string;
  stack: string;
}

export const FONTS: SheetFont[] = [
  { id: "fraunces", name: "Fraunces", stack: '"Fraunces", Georgia, serif' },
  {
    id: "grotesk",
    name: "Space Grotesk",
    stack: '"Space Grotesk", system-ui, sans-serif',
  },
  {
    id: "mono",
    name: "JetBrains Mono",
    stack: '"JetBrains Mono", ui-monospace, monospace',
  },
  { id: "georgia", name: "Georgia", stack: "Georgia, 'Times New Roman', serif" },
  { id: "system", name: "System Sans", stack: "system-ui, -apple-system, sans-serif" },
];

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  work: "#3f4a9b",
  personal: "#d1502e",
  study: "#a4762c",
  health: "#5c7a63",
  other: "#6b6b6b",
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  work: "Work",
  personal: "Personal",
  study: "Study",
  health: "Health",
  other: "Other",
};

export function getTheme(id: string): SheetTheme {
  return THEMES.find((t) => t.id === id) ?? (THEMES[0] as SheetTheme);
}

export function getFont(id: string): SheetFont {
  return FONTS.find((f) => f.id === id) ?? (FONTS[0] as SheetFont);
}
