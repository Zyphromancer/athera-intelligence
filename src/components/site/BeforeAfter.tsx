import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  caption?: string;
  aspect?: string;
};

export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt, title, caption, aspect = "16 / 10" }: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [mode, setMode] = useState<"slide" | "before" | "after">("slide");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    const prevUserSelect = document.body.style.userSelect;
    const prevCursor = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.userSelect = prevUserSelect;
      document.body.style.cursor = prevCursor;
    };
  }, [dragging, updateFromClientX]);

  // Before layer sits on top of After; clip percentage = width of Before visible from left.
  // mode "before" => show full Before (clip = 100); mode "after" => hide Before (clip = 0).
  const clip = mode === "before" ? 100 : mode === "after" ? 0 : pos;
  const handleKey = (e: React.KeyboardEvent) => {
    if (mode !== "slide") return;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPos((p) => Math.max(0, p - 4)); setInteracted(true); }
    if (e.key === "ArrowRight") { e.preventDefault(); setPos((p) => Math.min(100, p + 4)); setInteracted(true); }
    if (e.key === "Home") { e.preventDefault(); setPos(0); }
    if (e.key === "End") { e.preventDefault(); setPos(100); }
  };

  const selectMode = (m: "before" | "slide" | "after") => {
    if (m === "slide") setPos(50);
    setMode(m);
    setInteracted(true);
  };

  return (
    <figure className="group relative">
      <div
        ref={containerRef}
        className="surface-card relative w-full overflow-hidden rounded-2xl shadow-[var(--shadow-gold)] touch-none"
        style={{ aspectRatio: aspect }}
        onPointerDown={(e) => {
          if (mode !== "slide") return;
          e.preventDefault();
          setDragging(true);
          setInteracted(true);
          updateFromClientX(e.clientX);
        }}
      >
        <img src={afterSrc} alt={afterAlt} loading="lazy" draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - clip}% 0 0)`, transition: dragging ? "none" : "clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <img src={beforeSrc} alt={beforeAlt} loading="lazy" draggable={false}
            className="absolute inset-0 h-full w-full object-cover select-none" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[oklch(0.82_0.14_86_/_0.45)] bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[oklch(0.9_0.14_88)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.14_86)] shadow-[0_0_8px_oklch(0.82_0.14_86)]" />Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-full border border-[oklch(0.82_0.14_86_/_0.45)] bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[oklch(0.9_0.14_88)] backdrop-blur-md">
          After<span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.14_86)] shadow-[0_0_8px_oklch(0.82_0.14_86)]" />
        </span>
        <div
          className={`absolute inset-y-0 w-px bg-[oklch(0.82_0.14_86)] shadow-[0_0_20px_oklch(0.82_0.14_86)] ${mode === "slide" ? "opacity-100" : "opacity-0"}`}
          style={{ left: `${clip}%`, transition: dragging ? "none" : "left 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease" }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={mode === "slide" ? 0 : -1}
            onKeyDown={handleKey}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 cursor-ew-resize items-center justify-center rounded-full border border-[oklch(0.82_0.14_86)] bg-black/75 text-[oklch(0.82_0.14_86)] shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.6)] backdrop-blur transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.82_0.14_86)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); setDragging(true); setInteracted(true); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
            </svg>
          </button>
        </div>
        {!interacted && mode === "slide" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[oklch(0.82_0.14_86)] backdrop-blur animate-gold-pulse">
              Drag or use arrow keys
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          {caption && <p className="mt-1 text-sm text-muted-foreground">{caption}</p>}
        </div>
        <div role="tablist" aria-label="Compare mode" className="inline-flex shrink-0 rounded-full border border-[oklch(0.82_0.14_86_/_0.35)] bg-black/40 p-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur">
          {(["before", "slide", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => selectMode(m)}
              className={`rounded-full px-3 py-1.5 transition-colors ${mode === m ? "bg-[oklch(0.82_0.14_86)] text-black shadow-[0_0_18px_oklch(0.82_0.14_86_/_0.55)]" : "text-[oklch(0.82_0.14_86)] hover:text-[oklch(0.92_0.14_88)]"}`}
            >
              {m === "slide" ? "Compare" : m}
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}