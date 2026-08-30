import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/planprint/Header";
import { Footer } from "@/components/planprint/Footer";

export const Route = createFileRoute("/print-specs")({
  head: () => ({
    meta: [
      { title: "Print Specs & A4 Setup — PlanPrint" },
      {
        name: "description",
        content:
          "How PlanPrint sheets are built for A4: 210×297mm portrait, 10mm margins, black-and-white safe themes, PDF and PNG export settings.",
      },
      { property: "og:title", content: "Print Specs & A4 Setup — PlanPrint" },
      {
        property: "og:description",
        content:
          "A4 geometry, margins, ink modes and export settings behind every PlanPrint sheet.",
      },
    ],
  }),
  component: PrintSpecsPage,
});

const SPECS = [
  { k: "Page size", v: "A4 portrait · 210 × 297 mm" },
  { k: "Print margin", v: "10 mm on all four edges" },
  { k: "PDF export margin", v: "8 mm, sheet centred and scaled to fit" },
  { k: "Raster scale", v: "2–3× device pixel ratio for PNG and PDF" },
  { k: "Ink modes", v: "Full colour, or pure black on white" },
  { k: "Grid", v: "Whole weeks only — leading and trailing days are dimmed" },
  { k: "Week start", v: "Sunday or Monday, applied to headers and alignment" },
  { k: "Leap years", v: "Handled by the proleptic Gregorian rule (4/100/400)" },
];

function PrintSpecsPage() {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <Header />
      <section className="px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            (f) Print specs
          </p>
          <h1 className="mb-8 text-balance font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[0.95] tracking-tight">
            Every sheet, true to the tray
          </h1>
          <dl className="divide-y divide-ink/10 border-y border-ink/10">
            {SPECS.map((s) => (
              <div key={s.k} className="flex flex-wrap justify-between gap-4 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.k}
                </dt>
                <dd className="text-sm font-medium">{s.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-pretty text-sm text-muted-foreground">
            When printing from the browser, choose A4, portrait, and enable background
            graphics so tinted cells and today&apos;s highlight come through.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
