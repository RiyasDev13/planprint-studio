const FEATURES = [
  {
    title: "Easy Customization",
    body: "Swap month, year, theme, font and ink color — the sheet updates as you type.",
  },
  {
    title: "Multiple Templates",
    body: "Minimal, Professional, Colorful, Student Planner, Monthly & Habit Tracker.",
  },
  {
    title: "Print Ready",
    body: "A4-true margins and bleed, plus a one-tap black & white ink mode.",
  },
  {
    title: "Download PDF",
    body: "Export a crisp, letter-perfect PDF or a high-res PNG in one click.",
  },
  {
    title: "Add Events",
    body: "Click any date to drop a titled, timed, color-coded event into the cell.",
  },
  {
    title: "Beautiful Designs",
    body: "Swiss-quiet type and paper tones that stay handsome in pure black & white.",
  },
];

export function Features() {
  return (
    <section className="border-t border-ink/10 px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          (b) What the studio does
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-sm bg-sheet p-5 outline outline-1 -outline-offset-1 outline-ink/10 transition-shadow duration-300 hover:shadow-card"
            >
              <p className="mb-3 font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-1.5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="text-pretty text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
