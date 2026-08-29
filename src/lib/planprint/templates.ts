import type { PlannerKind } from "./types";

export interface TemplateDef {
  id: string;
  name: string;
  kind: PlannerKind;
  tagline: string;
  /** Height of a day cell in the printed grid. */
  cellHeight: number;
  /** Grid presentation. */
  gridStyle: "outline" | "ruled" | "filled";
  /** Uppercase mono weekday header vs. serif */
  headerStyle: "stamp" | "serif" | "banner";
  /** Extra printable blocks rendered under the grid. */
  blocks: SheetBlock[];
  /** Renders weekday initials only (compact) */
  compactWeekdays?: boolean;
  available: boolean;
}

export type SheetBlock = "notes" | "goals" | "habits" | "todo" | "priorities" | "budget";

export const TEMPLATES: TemplateDef[] = [
  {
    id: "minimal",
    name: "Minimal Calendar",
    kind: "monthly-calendar",
    tagline: "Hairline rules, nothing else. Pure grid.",
    cellHeight: 84,
    gridStyle: "ruled",
    headerStyle: "stamp",
    blocks: [],
    compactWeekdays: true,
    available: true,
  },
  {
    id: "professional",
    name: "Professional Calendar",
    kind: "monthly-calendar",
    tagline: "Boxed cells with a notes column for meetings.",
    cellHeight: 92,
    gridStyle: "outline",
    headerStyle: "banner",
    blocks: ["notes", "priorities"],
    available: true,
  },
  {
    id: "colorful",
    name: "Colorful Calendar",
    kind: "monthly-calendar",
    tagline: "Tinted cells and bold accent headers.",
    cellHeight: 92,
    gridStyle: "filled",
    headerStyle: "serif",
    blocks: ["notes"],
    available: true,
  },
  {
    id: "student",
    name: "Student Planner",
    kind: "study-planner",
    tagline: "Assignments, exams and a weekly study block.",
    cellHeight: 88,
    gridStyle: "outline",
    headerStyle: "stamp",
    blocks: ["todo", "goals", "notes"],
    available: true,
  },
  {
    id: "monthly-planner",
    name: "Monthly Planner",
    kind: "monthly-calendar",
    tagline: "Grid plus goals, priorities and a notes panel.",
    cellHeight: 90,
    gridStyle: "outline",
    headerStyle: "serif",
    blocks: ["goals", "priorities", "notes"],
    available: true,
  },
  {
    id: "habit",
    name: "Habit Tracker",
    kind: "habit-tracker",
    tagline: "Month grid over a day-by-day habit matrix.",
    cellHeight: 62,
    gridStyle: "ruled",
    headerStyle: "stamp",
    blocks: ["habits", "notes"],
    compactWeekdays: true,
    available: true,
  },
];

/** Planner surfaces the architecture already supports, shipping next. */
export const UPCOMING_PLANNERS: { name: string; kind: PlannerKind; note: string }[] = [
  { name: "Daily Planner", kind: "daily-planner", note: "Hour-by-hour single sheet" },
  { name: "Weekly Planner", kind: "weekly-planner", note: "Seven columns, one week" },
  { name: "Exam Schedule", kind: "exam-schedule", note: "Subject and revision grid" },
  { name: "Workout Planner", kind: "workout-planner", note: "Split, sets and reps" },
  { name: "Budget Planner", kind: "budget-planner", note: "Income, outgoings, balance" },
  { name: "To-Do List", kind: "todo-list", note: "Checkbox sheet with priorities" },
];

export function getTemplate(id: string): TemplateDef {
  return TEMPLATES.find((t) => t.id === id) ?? (TEMPLATES[0] as TemplateDef);
}
