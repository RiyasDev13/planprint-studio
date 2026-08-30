import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/planprint/Header";
import { Footer } from "@/components/planprint/Footer";
import { TemplateSelector } from "@/components/planprint/TemplateSelector";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Printable Calendar Templates — PlanPrint" },
      {
        name: "description",
        content:
          "Six print-ready templates: Minimal, Professional, Colorful, Student Planner, Monthly Planner and Habit Tracker — all sized for A4.",
      },
      { property: "og:title", content: "Printable Calendar Templates — PlanPrint" },
      {
        property: "og:description",
        content:
          "Pick a printable template — minimal grids, planners and habit trackers, all A4 and black-and-white safe.",
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <Header />
      <section className="px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            (e) The template drawer
          </p>
          <h1 className="mb-3 max-w-[18ch] text-balance font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[0.95] tracking-tight">
            Six sheets, one printer tray
          </h1>
          <p className="mb-10 max-w-[52ch] text-pretty text-muted-foreground">
            Every template shares the same A4 geometry, so switching one never breaks your
            events, notes or margins.
          </p>
          <TemplateSelector />
        </div>
      </section>
      <Footer />
    </div>
  );
}
