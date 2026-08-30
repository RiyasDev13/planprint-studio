import { Link } from "@tanstack/react-router";
import { MONTH_NAMES, buildMonthGrid, todayISO } from "@/lib/planprint/calendar";

export function Hero() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const cells = buildMonthGrid(year, month, 0);
  const today = todayISO();

  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-14 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            (a) Printable calendar studio
          </p>
          <h1 className="text-balance font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-black leading-[0.92] tracking-tight">
            Create Your <span className="italic text-accent">Perfect</span> Printable
            Calendar
          </h1>
          <p className="mt-6 max-w-[46ch] text-pretty text-lg text-muted-foreground">
            Customize your calendar, add important events, and print it instantly — every
            sheet true to A4, ink on handmade paper.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/editor"
              className="group inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-mono text-sm uppercase tracking-[0.14em] text-accent-foreground shadow-stamp transition-all duration-200 hover:-translate-y-0.5 hover:shadow-stamp-lift"
            >
              <span>Create Calendar</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded border border-ink px-6 py-3 font-mono text-sm uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
            >
              Explore Templates
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-wide text-muted-foreground">
            No sign-up · 6 templates · B&amp;W safe
          </p>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <div className="absolute -left-4 -top-3 size-24 rotate-6 rounded-sm bg-accent/25" />
          <div className="relative rounded-sm bg-sheet p-4 shadow-sheet outline outline-1 -outline-offset-1 outline-ink/10 sm:p-5">
            <div className="mb-3 flex items-center justify-between border-b border-ink/15 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(month + 1).padStart(2, "0")} / {year}
                </p>
                <h2 className="font-display text-2xl font-semibold italic leading-none">
                  {MONTH_NAMES[month]}
                </h2>
              </div>
              <span className="rounded-full border border-accent/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                A4 · 210×297
              </span>
            </div>
            <div className="mb-1 grid grid-cols-7 gap-y-1 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px] leading-none">
              {cells.map((cell) =>
                cell.iso === today ? (
                  <span
                    key={cell.iso}
                    className="grid h-9 place-items-center rounded-full bg-accent font-medium text-accent-foreground ring-1 ring-ink/10"
                  >
                    {cell.day}
                  </span>
                ) : (
                  <span
                    key={cell.iso}
                    className={`grid h-7 place-items-center ${
                      cell.inMonth ? "" : "text-muted-foreground/50"
                    }`}
                  >
                    {cell.day}
                  </span>
                ),
              )}
            </div>
            <div className="mt-3 border-t border-dashed border-ink/20 pt-2 font-mono text-[10px] text-muted-foreground">
              <span className="text-foreground">15:00</span> · Studio review — bring the
              proofs
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 animate-floaty rounded-sm bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-foreground shadow-[2px_3px_0_0_var(--ink)]">
            Print-ready ✓
          </div>
        </div>
      </div>
    </section>
  );
}
