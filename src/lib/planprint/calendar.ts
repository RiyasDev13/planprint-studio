import type { WeekStart } from "./types";

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAY_INITIAL = ["S", "M", "T", "W", "T", "F", "S"];

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  if (month === 1) return isLeapYear(year) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/** Column order of weekdays (0=Sun..6=Sat) for the given week start. */
export function weekdayOrder(weekStart: WeekStart): number[] {
  return Array.from({ length: 7 }, (_, i) => (i + weekStart) % 7);
}

export interface DayCell {
  /** ISO date, YYYY-MM-DD */
  iso: string;
  day: number;
  month: number;
  year: number;
  /** 0=Sun .. 6=Sat */
  weekday: number;
  inMonth: boolean;
  isWeekend: boolean;
}

export function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function todayISO(): string {
  const d = new Date();
  return toISO(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Builds a full month grid (always whole weeks), padded with the
 * neighbouring months' days so day alignment is always correct.
 */
export function buildMonthGrid(
  year: number,
  month: number,
  weekStart: WeekStart,
): DayCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const lead = (firstWeekday - weekStart + 7) % 7;
  const total = daysInMonth(year, month);
  const cellCount = Math.ceil((lead + total) / 7) * 7;

  const cells: DayCell[] = [];
  for (let i = 0; i < cellCount; i++) {
    const offset = i - lead;
    const d = new Date(year, month, 1 + offset);
    const weekday = d.getDay();
    cells.push({
      iso: toISO(d.getFullYear(), d.getMonth(), d.getDate()),
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      weekday,
      inMonth: offset >= 0 && offset < total,
      isWeekend: weekday === 0 || weekday === 6,
    });
  }
  return cells;
}

/** Splits a flat grid into weeks. */
export function chunkWeeks(cells: DayCell[]): DayCell[][] {
  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function formatMonthLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function yearRange(): number[] {
  const current = new Date().getFullYear();
  return Array.from({ length: 21 }, (_, i) => current - 5 + i);
}
