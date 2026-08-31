import { forwardRef } from "react";
import {
  MONTH_NAMES,
  WEEKDAY_INITIAL,
  WEEKDAY_SHORT,
  buildMonthGrid,
  chunkWeeks,
  todayISO,
  weekdayOrder,
} from "@/lib/planprint/calendar";
import { BW_THEME, CATEGORY_COLORS, getFont, getTheme } from "@/lib/planprint/themes";
import { getTemplate } from "@/lib/planprint/templates";
import type { CalendarEvent, PlanState } from "@/lib/planprint/types";

interface Props {
  state: PlanState;
  onSelectDate?: (iso: string) => void;
  interactive?: boolean;
}

const HABITS = ["Read", "Water", "Walk", "Sleep 8h", "No sugar"];

export const CalendarPreview = forwardRef<HTMLDivElement, Props>(function CalendarPreview(
  { state, onSelectDate, interactive = true },
  ref,
) {
  const theme = state.monochrome ? BW_THEME : getTheme(state.themeId);
  const font = getFont(state.fontId);
  const template = getTemplate(state.templateId);
  const today = todayISO();

  const order = weekdayOrder(state.weekStart);
  const visibleCols = state.showWeekends
    ? order
    : order.filter((d) => d !== 0 && d !== 6);
  const weeks = chunkWeeks(buildMonthGrid(state.year, state.month, state.weekStart));

  const eventsByDate = state.events.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});

  const colCount = visibleCols.length;
  const monthLabel = MONTH_NAMES[state.month] ?? "";

  const eventColor = (e: CalendarEvent) =>
    state.monochrome ? theme.ink : CATEGORY_COLORS[e.category];

  return (
    <div
      ref={ref}
      className="print-sheet rounded-md p-5 shadow-sheet outline outline-1 -outline-offset-1 outline-ink/10 sm:p-7"
      style={
        {
          "--sheet-bg": theme.bg,
          "--sheet-ink": theme.ink,
          "--sheet-font": font.stack,
        } as React.CSSProperties
      }
    >
      {/* Sheet header */}
      <div
        className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b pb-4"
        style={{ borderColor: theme.grid }}
      >
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: theme.muted }}
          >
            {String(state.month + 1).padStart(2, "0")} / {state.year} · A4
          </p>
          {template.headerStyle === "banner" ? (
            <h2
              className="mt-1 inline-block px-3 py-1 text-2xl font-semibold leading-none"
              style={{ background: theme.accent, color: theme.accentInk }}
            >
              {state.title || monthLabel}
            </h2>
          ) : (
            <h2
              className={`mt-1 text-3xl leading-none ${
                template.headerStyle === "serif" ? "italic" : ""
              } font-semibold`}
              style={{
                color: template.headerStyle === "serif" ? theme.accent : theme.ink,
              }}
            >
              {state.title || monthLabel}
            </h2>
          )}
          {state.subtitle ? (
            <p className="mt-1 text-sm" style={{ color: theme.muted }}>
              {state.subtitle}
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold leading-none" style={{ color: theme.ink }}>
            {monthLabel}
          </p>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: theme.muted }}
          >
            {state.year} · week starts {state.weekStart === 0 ? "Sun" : "Mon"}
          </p>
        </div>
      </div>

      {/* Weekday header */}
      <div
        className="mb-1.5 grid gap-1.5 text-center font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`, color: theme.muted }}
      >
        {visibleCols.map((d, i) => (
          <span key={`${d}-${i}`}>
            {template.compactWeekdays ? WEEKDAY_INITIAL[d] : WEEKDAY_SHORT[d]}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {weeks.flatMap((week) =>
          week
            .filter((cell) => state.showWeekends || !cell.isWeekend)
            .map((cell) => {
              const dayEvents = cell.inMonth ? (eventsByDate[cell.iso] ?? []) : [];
              const isToday = cell.iso === today;
              const cellStyle: React.CSSProperties = {
                minHeight: template.cellHeight,
                borderColor: theme.grid,
                color: cell.inMonth ? theme.ink : theme.muted,
              };
              if (template.gridStyle === "filled" && cell.inMonth) {
                cellStyle.background = `${theme.accent}0f`;
              }
              if (isToday) {
                // Light tint + a defined rule: readable on screen, cheap on ink.
                cellStyle.background = `${theme.accent}14`;
                cellStyle.borderColor = theme.accent;
                cellStyle.boxShadow = `inset 0 0 0 1px ${theme.accent}`;
              }

              return (
                <div
                  key={cell.iso}
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-label={
                    interactive ? `Add an event on ${cell.iso}` : undefined
                  }
                  onClick={interactive ? () => onSelectDate?.(cell.iso) : undefined}
                  onKeyDown={
                    interactive
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectDate?.(cell.iso);
                          }
                        }
                      : undefined
                  }
                  className={`rounded p-1.5 text-xs ${
                    template.gridStyle === "ruled" ? "border-t" : "border"
                  } ${interactive ? "cursor-pointer transition-shadow hover:shadow-card" : ""} ${
                    cell.inMonth ? "" : "opacity-45"
                  }`}
                  style={cellStyle}
                >
                  <span className="font-medium">{cell.day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <div
                        key={e.id}
                        className="truncate rounded px-1.5 py-0.5 text-[10px] leading-tight"
                        style={{
                          background: `${eventColor(e)}1f`,
                          color: eventColor(e),
                        }}
                        title={e.title}
                      >
                        {e.time ? `${e.time} ` : ""}
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 ? (
                      <div className="text-[9px]" style={{ color: theme.muted }}>
                        +{dayEvents.length - 3} more
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            }),
        )}
      </div>

      {/* Printable blocks */}
      {template.blocks.length > 0 || state.showNotes ? (
        <div
          className="mt-4 grid gap-4 border-t border-dashed pt-3 sm:grid-cols-2"
          style={{ borderColor: theme.grid }}
        >
          {template.blocks.includes("habits") ? (
            <div className="sm:col-span-2">
              <BlockLabel color={theme.muted}>Habit tracker</BlockLabel>
              <div className="overflow-hidden">
                <table className="w-full table-fixed border-collapse text-[9px]">
                  <tbody>
                    {HABITS.map((habit) => (
                      <tr key={habit}>
                        <td
                          className="w-24 border px-1 py-1 text-[10px]"
                          style={{ borderColor: theme.grid }}
                        >
                          {habit}
                        </td>
                        {Array.from({ length: 31 }, (_, i) => (
                          <td
                            key={i}
                            className="border p-0"
                            style={{ borderColor: theme.grid, height: 14 }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {template.blocks.includes("goals") ? (
            <RuledBlock label="Goals this month" theme={theme} lines={4} />
          ) : null}
          {template.blocks.includes("priorities") ? (
            <RuledBlock label="Top priorities" theme={theme} lines={4} />
          ) : null}
          {template.blocks.includes("todo") ? (
            <div>
              <BlockLabel color={theme.muted}>Assignments</BlockLabel>
              <ul className="space-y-1.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="inline-block size-3 shrink-0 border"
                      style={{ borderColor: theme.grid }}
                    />
                    <span
                      className="h-3 flex-1 border-b border-dotted"
                      style={{ borderColor: theme.grid }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {state.showNotes ? (
            <div className={template.blocks.length === 0 ? "sm:col-span-2" : ""}>
              <BlockLabel color={theme.muted}>Notes</BlockLabel>
              {state.notes ? (
                <p
                  className="whitespace-pre-wrap text-sm leading-snug"
                  style={{ color: theme.ink }}
                >
                  {state.notes}
                </p>
              ) : (
                <div className="space-y-3 pt-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className="border-b border-dotted"
                      style={{ borderColor: theme.grid }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

function BlockLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function RuledBlock({
  label,
  theme,
  lines,
}: {
  label: string;
  theme: { muted: string; grid: string };
  lines: number;
}) {
  return (
    <div>
      <BlockLabel color={theme.muted}>{label}</BlockLabel>
      <div className="space-y-3 pt-1">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="border-b border-dotted" style={{ borderColor: theme.grid }} />
        ))}
      </div>
    </div>
  );
}
