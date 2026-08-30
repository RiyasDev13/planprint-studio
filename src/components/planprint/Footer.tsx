export function Footer() {
  return (
    <footer className="no-print flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 px-6 py-8 sm:px-10">
      <div className="flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-full bg-accent">
          <span className="size-1 rounded-full bg-accent-foreground" />
        </span>
        <span className="font-display font-black tracking-tight">PlanPrint</span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        © {new Date().getFullYear()} PlanPrint · Set on A4
      </p>
    </footer>
  );
}
