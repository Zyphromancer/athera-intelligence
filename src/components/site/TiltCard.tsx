import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  intensity?: number;
};

export function TiltCard({ children, className = "", glow = true, intensity = 10 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -intensity * 2;
    const ry = (px - 0.5) * intensity * 2;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div style={{ perspective: "1200px" }} className={"group relative " + className}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative h-full rounded-2xl transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        }}
      >
        <div className="surface-card relative h-full overflow-hidden rounded-2xl" style={{ transform: "translateZ(0)" }}>
          {glow && (
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), oklch(0.9 0.15 90 / 0.18), transparent 40%)" }}
            />
          )}
          <div className="relative h-full" style={{ transform: "translateZ(30px)" }}>{children}</div>
        </div>
        {glow && (
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), oklch(0.82 0.14 86 / 0.35), transparent 60%)" }}
          />
        )}
      </div>
    </div>
  );
}