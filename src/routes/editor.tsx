import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/planprint/Header";
import { Footer } from "@/components/planprint/Footer";
import { CalendarPreview } from "@/components/planprint/CalendarPreview";
import { CustomizationPanel } from "@/components/planprint/CustomizationPanel";
import { EventModal } from "@/components/planprint/EventModal";
import { NotesSection } from "@/components/planprint/NotesSection";
import { usePlanPrint } from "@/lib/planprint/store";
import { downloadPDF, downloadPNG, printSheet, slugify } from "@/lib/planprint/export";
import { todayISO } from "@/lib/planprint/calendar";

export const Route = createFileRoute("/editor")({
  validateSearch: (search: Record<string, unknown>): { template?: string } => {
    const t = search["template"];
    return typeof t === "string" ? { template: t } : {};
  },
  head: () => ({
    meta: [
      { title: "Calendar Editor — PlanPrint" },
      {
        name: "description",
        content:
          "Build your printable calendar: pick a month, theme and font, add events and notes, then print or download as PDF or PNG.",
      },
      { property: "og:title", content: "Calendar Editor — PlanPrint" },
      {
        property: "og:description",
        content:
          "Customize a print-ready A4 calendar with live preview, events and instant PDF or PNG export.",
      },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  const store = usePlanPrint();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(todayISO());
  const [busy, setBusy] = useState<string | null>(null);

  const filename = slugify(
    `${store.state.title || "calendar"}-${store.state.year}-${store.state.month + 1}`,
  );

  const runExport = async (kind: "pdf" | "png") => {
    const node = sheetRef.current;
    if (!node) return;
    setBusy(kind);
    try {
      if (kind === "pdf") await downloadPDF(node, filename);
      else await downloadPNG(node, filename);
    } catch (err) {
      console.error(err);
      window.alert("Export failed. Try again, or use Print to save as PDF.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <Header />

      <section className="border-t border-ink/10 bg-paper-deep px-4 py-10 sm:px-6">
        <div className="mx-auto mb-6 max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            (d) The editor
          </p>
          <h1 className="mt-1 font-display text-3xl font-black tracking-tight">
            Docked rail, floating sheet
          </h1>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[280px_1fr]">
          <CustomizationPanel
            store={store}
            onAddEvent={() => {
              setModalDate(todayISO());
              setModalOpen(true);
            }}
          />

          <div>
            <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Live preview · click a date to add an event
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={printSheet}
                  className="rounded bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-foreground shadow-[2px_2px_0_0_var(--ink)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Print
                </button>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => runExport("pdf")}
                  className="rounded border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
                >
                  {busy === "pdf" ? "Rendering…" : "Download PDF"}
                </button>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => runExport("png")}
                  className="rounded border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
                >
                  {busy === "png" ? "Rendering…" : "Download PNG"}
                </button>
              </div>
            </div>

            <CalendarPreview
              ref={sheetRef}
              state={store.state}
              onSelectDate={(iso) => {
                setModalDate(iso);
                setModalOpen(true);
              }}
            />

            <NotesSection store={store} />
          </div>
        </div>
      </section>

      <EventModal
        open={modalOpen}
        date={modalDate}
        onClose={() => setModalOpen(false)}
        onSave={store.upsertEvent}
      />

      <Footer />
    </div>
  );
}
