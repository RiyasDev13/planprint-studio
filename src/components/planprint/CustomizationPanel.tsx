import { MONTH_NAMES, yearRange } from "@/lib/planprint/calendar";
import { FONTS, THEMES } from "@/lib/planprint/themes";
import { TEMPLATES } from "@/lib/planprint/templates";
import type { PlanPrintStore } from "@/lib/planprint/store";

const fieldClass =
  "mt-1.5 w-full rounded border border-ink/15 bg-transparent px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

interface Props {
  store: PlanPrintStore;
  onAddEvent: () => void;
}

export function CustomizationPanel({ store, onAddEvent }: Props) {
  const { state, update, removeEvent, reset } = store;

  return (
    <aside className="no-print rounded-md bg-sheet p-5 shadow-card outline outline-1 -outline-offset-1 outline-ink/10 lg:sticky lg:top-20">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Controls
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          Live
        </span>
      </div>

      <div className="space-y-4 text-sm">
        <label className="block">
          <Label>Month</Label>
          <select
            className={fieldClass}
            value={state.month}
            onChange={(e) => update("month", Number(e.target.value))}
          >
            {MONTH_NAMES.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <Label>Year</Label>
          <select
            className={fieldClass}
            value={state.year}
            onChange={(e) => update("year", Number(e.target.value))}
          >
            {yearRange().map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <Label>Calendar title</Label>
          <input
            className={fieldClass}
            value={state.title}
            placeholder="My Calendar"
            onChange={(e) => update("title", e.target.value)}
          />
        </label>

        <label className="block">
          <Label>Subtitle</Label>
          <input
            className={fieldClass}
            value={state.subtitle}
            placeholder="Optional line under the title"
            onChange={(e) => update("subtitle", e.target.value)}
          />
        </label>

        <label className="block">
          <Label>Template</Label>
          <select
            className={fieldClass}
            value={state.templateId}
            onChange={(e) => update("templateId", e.target.value)}
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <Label>Theme</Label>
          <div className="mt-1.5 grid grid-cols-6 gap-1.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.name}
                aria-label={`Theme ${t.name}`}
                aria-pressed={state.themeId === t.id}
                onClick={() => update("themeId", t.id)}
                className={`h-7 rounded border border-ink/15 transition-transform hover:-translate-y-0.5 ${
                  state.themeId === t.id ? "outline outline-2 outline-accent" : ""
                }`}
                style={{ background: t.swatch }}
              />
            ))}
          </div>
        </div>

        <label className="block">
          <Label>Font</Label>
          <select
            className={fieldClass}
            value={state.fontId}
            onChange={(e) => update("fontId", e.target.value)}
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <Label>Week starts</Label>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {([0, 1] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => update("weekStart", w)}
                aria-pressed={state.weekStart === w}
                className={`rounded px-3 py-1.5 text-center font-medium transition-colors ${
                  state.weekStart === w
                    ? "bg-ink text-paper"
                    : "border border-ink/15 hover:border-ink"
                }`}
              >
                {w === 0 ? "Sun" : "Mon"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-ink/10 pt-3">
          <Toggle
            label="Show weekends"
            checked={state.showWeekends}
            onChange={(v) => update("showWeekends", v)}
          />
          <Toggle
            label="Notes block"
            checked={state.showNotes}
            onChange={(v) => update("showNotes", v)}
          />
          <Toggle
            label="Black & white print"
            checked={state.monochrome}
            onChange={(v) => update("monochrome", v)}
          />
        </div>

        <div className="border-t border-ink/10 pt-3">
          <Label>Events ({state.events.length})</Label>
          <ul className="mt-2 max-h-48 space-y-1.5 overflow-y-auto pr-1">
            {state.events
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-2 rounded border border-ink/10 px-2 py-1.5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">
                      {e.title}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {e.date}
                      {e.time ? ` · ${e.time}` : ""}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEvent(e.id)}
                    aria-label={`Delete ${e.title}`}
                    className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-destructive"
                  >
                    ✕
                  </button>
                </li>
              ))}
            {state.events.length === 0 ? (
              <li className="text-[13px] text-muted-foreground">
                Click any date on the sheet to add one.
              </li>
            ) : null}
          </ul>
          <button
            type="button"
            onClick={onAddEvent}
            className="mt-3 w-full rounded border border-dashed border-ink/30 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-ink hover:text-foreground"
          >
            + Add event
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset all customization and events?")) reset();
          }}
          className="w-full font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-destructive"
        >
          Reset sheet
        </button>
      </div>
    </aside>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-[13px]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full border transition-colors ${
          checked ? "border-accent bg-accent" : "border-ink/20 bg-transparent"
        }`}
      >
        <span
          className={`absolute top-0.5 size-3.5 rounded-full transition-all ${
            checked ? "left-4.5 bg-accent-foreground" : "left-0.5 bg-ink/40"
          }`}
        />
      </button>
    </label>
  );
}
