import { useEffect, useState } from "react";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/planprint/themes";
import { createEventId } from "@/lib/planprint/store";
import type { CalendarEvent, EventCategory } from "@/lib/planprint/types";

const fieldClass =
  "mt-1.5 w-full rounded border border-ink/15 bg-transparent px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none";

interface Props {
  open: boolean;
  date: string;
  existing?: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

export function EventModal({ open, date, existing, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [eventDate, setEventDate] = useState(date);
  const [category, setCategory] = useState<EventCategory>("personal");

  useEffect(() => {
    if (!open) return;
    setTitle(existing?.title ?? "");
    setDescription(existing?.description ?? "");
    setTime(existing?.time ?? "");
    setCategory(existing?.category ?? "personal");
    setEventDate(existing?.date ?? date);
  }, [open, date, existing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: existing?.id ?? createEventId(),
      date: eventDate,
      title: title.trim(),
      description: description.trim() || undefined,
      time: time || undefined,
      category,
    });
    onClose();
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 grid place-items-center bg-ink/40 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Add event"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-md animate-rise rounded-md bg-sheet p-6 shadow-sheet outline outline-1 -outline-offset-1 outline-ink/10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {existing ? "Edit event" : "New event"}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold italic">{eventDate}</h2>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Title
            </span>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              autoFocus
              required
              className={fieldClass}
              value={title}
              placeholder="Studio review"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Date
              </span>
              <input
                type="date"
                className={fieldClass}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Time
              </span>
              <input
                type="time"
                className={fieldClass}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Description
            </span>
            <textarea
              rows={2}
              className={fieldClass}
              value={description}
              placeholder="Bring the proofs"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Category
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_LABELS) as EventCategory[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  aria-pressed={category === key}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    category === key ? "border-ink" : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: CATEGORY_COLORS[key] }}
                  />
                  {CATEGORY_LABELS[key]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-foreground shadow-[2px_2px_0_0_var(--ink)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Save event
          </button>
        </div>
      </form>
    </div>
  );
}
