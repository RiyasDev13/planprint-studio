import { Link } from "@tanstack/react-router";
import { TEMPLATES, UPCOMING_PLANNERS } from "@/lib/planprint/templates";

export function TemplateSelector() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t, i) => (
          <Link
            key={t.id}
            to="/editor"
            search={{ template: t.id }}
            className="group rounded-sm bg-sheet p-5 outline outline-1 -outline-offset-1 outline-ink/10 transition-shadow duration-300 hover:shadow-card"
          >
            <p className="mb-3 font-mono text-[10px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mb-1.5 font-display text-xl font-semibold">{t.name}</h3>
            <p className="text-pretty text-sm text-muted-foreground">{t.tagline}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Use this template →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Coming to the planner platform
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_PLANNERS.map((p) => (
            <li
              key={p.kind}
              className="flex items-baseline justify-between gap-3 border-t border-dashed border-ink/20 pt-3"
            >
              <span className="font-display text-lg font-semibold">{p.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {p.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
