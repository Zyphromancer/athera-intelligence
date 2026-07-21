import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
};

export function IntroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip if already shown in this session
    if (window.sessionStorage?.getItem("athera_intro_shown") === "1") {
      setVisible(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    // Sample "ATHERA" letters
    const off = document.createElement("canvas");
    off.width = width;
    off.height = height;
    const octx = off.getContext("2d");
    if (!octx) return;
    const fontSize = Math.min(width * 0.18, 220);
    octx.fillStyle = "#fff";
    octx.font = `700 ${fontSize}px "Cormorant Garamond", serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText("ATHERA", width / 2, height / 2);
    const data = octx.getImageData(0, 0, width, height).data;

    const targets: Array<[number, number]> = [];
    const step = Math.max(4, Math.floor(fontSize / 40));
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4 + 3;
        if (data[idx] > 128) targets.push([x, y]);
      }
    }

    const particleCount = Math.min(targets.length, 900);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const [tx, ty] = targets[Math.floor((i / particleCount) * targets.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        tx,
        ty,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
        hue: 40 + Math.random() * 15,
      });
    }

    const start = performance.now();
    const driftDuration = 1400;
    const converge = 3200;
    const holdEnd = 4200;
    const totalDuration = reduce ? 900 : 4700;

    let raf = 0;
    let cancelled = false;

    function frame(now: number) {
      if (cancelled) return;
      const t = now - start;
      ctx!.clearRect(0, 0, width, height);
      // background subtle warm vignette
      const grad = ctx!.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.6,
      );
      grad.addColorStop(0, "rgba(30, 22, 8, 0.9)");
      grad.addColorStop(1, "rgba(6, 5, 3, 1)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (t < driftDuration) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else if (t < converge) {
          const k = Math.min(1, (t - driftDuration) / (converge - driftDuration));
          const ease = 1 - Math.pow(1 - k, 3);
          p.x = p.x + (p.tx - p.x) * (0.06 + ease * 0.15);
          p.y = p.y + (p.ty - p.y) * (0.06 + ease * 0.15);
        } else {
          p.x += (p.tx - p.x) * 0.2;
          p.y += (p.ty - p.y) * 0.2;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
        ctx!.shadowColor = `hsla(${p.hue}, 95%, 60%, 0.9)`;
        ctx!.shadowBlur = 8;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      if (!showWordmark && t > converge - 400) setShowWordmark(true);
      if (t > holdEnd && !fadingOut) setFadingOut(true);

      if (t < totalDuration) {
        raf = requestAnimationFrame(frame);
      } else {
        setVisible(false);
        try { window.sessionStorage.setItem("athera_intro_shown", "1"); } catch { /* ignore */ }
      }
    }
    raf = requestAnimationFrame(frame);

    function skip() {
      cancelled = true;
      cancelAnimationFrame(raf);
      setFadingOut(true);
      window.setTimeout(() => {
        setVisible(false);
        try { window.sessionStorage.setItem("athera_intro_shown", "1"); } catch { /* ignore */ }
      }, 400);
    }
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 " +
        (fadingOut ? "opacity-0 pointer-events-none" : "opacity-100")
      }
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className={
          "absolute bottom-[30%] text-center transition-opacity duration-1000 " +
          (showWordmark ? "opacity-100" : "opacity-0")
        }
      >
        <p className="mt-4 tracking-[0.5em] text-xs uppercase text-[oklch(0.82_0.14_86)]">
          Intelligence
        </p>
      </div>
      <button
        onClick={() => setFadingOut(true)}
        className="absolute bottom-6 right-6 text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/80 transition"
      >
        Skip
      </button>
    </div>
  );
}
