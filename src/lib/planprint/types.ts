export type WeekStart = 0 | 1;

export type PlannerKind =
  | "monthly-calendar"
  | "daily-planner"
  | "weekly-planner"
  | "study-planner"
  | "exam-schedule"
  | "habit-tracker"
  | "workout-planner"
  | "budget-planner"
  | "todo-list";

export interface CalendarEvent {
  id: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: string;
  description?: string | undefined;
  time?: string | undefined;
  category: EventCategory;
}

export type EventCategory = "work" | "personal" | "study" | "health" | "other";

export interface PlanState {
  /** 0-indexed month */
  month: number;
  year: number;
  weekStart: WeekStart;
  title: string;
  subtitle: string;
  themeId: string;
  fontId: string;
  templateId: string;
  showWeekends: boolean;
  monochrome: boolean;
  showNotes: boolean;
  notes: string;
  events: CalendarEvent[];
}
