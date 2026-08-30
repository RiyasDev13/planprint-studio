import type { PlanPrintStore } from "@/lib/planprint/store";

export function NotesSection({ store }: { store: PlanPrintStore }) {
  const { state, update } = store;

  return (
    <div className="no-print mt-5 rounded-md bg-sheet p-5 shadow-card outline outline-1 -outline-offset-1 outline-ink/10">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Notes on the sheet
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {state.notes.length} chars
        </span>
      </div>
      <textarea
        rows={3}
        value={state.notes}
        onChange={(e) => update("notes", e.target.value)}
        placeholder="Leave blank to print ruled lines you can fill in by hand."
        className="w-full resize-y rounded border border-ink/15 bg-transparent px-3 py-2 text-sm leading-snug focus:border-accent focus:outline-none"
      />
      {!state.showNotes ? (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          Notes block is hidden — enable it in the controls to print this.
        </p>
      ) : null}
    </div>
  );
}
