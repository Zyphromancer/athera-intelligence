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
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <figure className="group relative">
      <div
        ref={containerRef}
        className="surface-card relative w-full overflow-hidden rounded-2xl shadow-[var(--shadow-gold)]"
        style={{ aspectRatio: aspect }}
        onPointerDown={(e) => {
          setDragging(true);
          setInteracted(true);
          updateFromClientX(e.clientX);
        }}
      >
        <img src={afterSrc} alt={afterAlt} loading="lazy" draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={beforeSrc} alt={beforeAlt} loading="lazy" draggable={false}
            className="absolute inset-0 h-full w-full object-cover select-none" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[oklch(0.82_0.14_86)] backdrop-blur">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[oklch(0.82_0.14_86)] backdrop-blur">After</span>
        <div className="absolute inset-y-0 w-px bg-[oklch(0.82_0.14_86)] shadow-[0_0_20px_oklch(0.82_0.14_86)]" style={{ left: `${pos}%` }}>
          <button
            aria-label="Drag to compare"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[oklch(0.82_0.14_86)] bg-black/70 text-[oklch(0.82_0.14_86)] shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.6)] backdrop-blur transition-transform hover:scale-110"
            onPointerDown={(e) => { e.stopPropagation(); setDragging(true); setInteracted(true); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
            </svg>
          </button>
        </div>
        {!interacted && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[oklch(0.82_0.14_86)] backdrop-blur animate-gold-pulse">
              Drag to compare
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <h3 className="font-display text-2xl text-foreground">{title}</h3>
        {caption && <p className="mt-1 text-sm text-muted-foreground">{caption}</p>}
      </figcaption>
    </figure>
  );
}