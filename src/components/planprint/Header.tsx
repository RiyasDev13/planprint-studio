import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-6 py-4 backdrop-blur sm:px-10">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-accent">
          <span className="size-1.5 rounded-full bg-accent-foreground" />
        </span>
        <span className="font-display text-lg font-black tracking-tight">PlanPrint</span>
        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          / A4
        </span>
      </Link>

      <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
        <Link to="/editor" className="transition-colors hover:text-foreground">
          Editor
        </Link>
        <Link to="/templates" className="transition-colors hover:text-foreground">
          Templates
        </Link>
        <Link to="/print-specs" className="transition-colors hover:text-foreground">
          Print specs
        </Link>
      </nav>

      <Link
        to="/editor"
        className="rounded border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
      >
        Open editor
      </Link>
    </header>
  );
}
