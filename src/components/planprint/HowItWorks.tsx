const STEPS = [
  {
    title: "Choose month & year",
    body: "Pick the month, set the week start, and the correct grid builds itself.",
  },
  {
    title: "Customize the calendar",
    body: "Theme, ink, font, title and events — every change lands on the preview.",
  },
  {
    title: "Print or download",
    body: "Send to the printer or save a PDF / PNG that matches the sheet exactly.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-ink/10 px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          (c) Three steps to a sheet
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <span className="font-display text-5xl font-black text-accent/25">
                {i + 1}
              </span>
              <h3 className="mb-1 mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-pretty text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
