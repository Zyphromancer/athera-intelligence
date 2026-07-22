import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  caption: string;
  spark: number[];
};

const metrics: Metric[] = [
  { label: "Projects shipped", value: 87, suffix: "+", caption: "Across AI, web and native platforms", spark: [4, 6, 5, 8, 9, 11, 10, 13, 15, 14, 17, 20] },
  { label: "Average time-to-launch", value: 9.4, suffix: " wks", decimals: 1, caption: "From kickoff to production release", spark: [18, 16, 15, 13, 14, 12, 11, 10, 9, 10, 9, 8] },
  { label: "Detection precision", value: 96.3, suffix: "%", decimals: 1, caption: "Sentinel AI benchmark, Q4 2025", spark: [70, 74, 78, 80, 82, 85, 87, 90, 92, 93, 95, 96] },
  { label: "Uptime, past 12 months", value: 99.99, suffix: "%", decimals: 2, caption: "Across all managed production systems", spark: [99.8, 99.9, 99.85, 99.95, 99.98, 99.99, 99.99, 99.97, 99.99, 99.99, 100, 99.99] },
];

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ value, prefix = "", suffix = "", decimals = 0, run }: { value: number; prefix?: string; suffix?: string; decimals?: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <span>{prefix}{n.toFixed(decimals)}{suffix}</span>;
}

function Sparkline({ points, run }: { points: number[]; run: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 220;
  const h = 60;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.14 86)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.82 0.14 86)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" style={{ opacity: run ? 1 : 0, transition: "opacity 800ms ease 400ms" }} />
      <path
        d={d}
        fill="none"
        stroke="oklch(0.86 0.15 88)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: run ? 0 : 1,
          transition: "stroke-dashoffset 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
          filter: "drop-shadow(0 0 4px oklch(0.82 0.14 86 / 0.6))",
        }}
      />
    </svg>
  );
}

const capabilities = [
  "Python", "TypeScript", "React", "Next.js", "React Native", "Swift", "Kotlin",
  "PyTorch", "TensorFlow", "LLM Fine-tuning", "RAG", "Vector DB", "Edge Compute",
  "PostgreSQL", "Kubernetes", "AWS", "GCP", "Cloudflare", "Rust", "Go",
];

export function Signal() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="signal" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[240px] w-[240px] md:h-[420px] md:w-[420px] rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.07] blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Signal</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">The record, in numbers</h2>
          <p className="mt-4 text-muted-foreground">A live look at what our engagements ship — and what they hold up to in production.</p>
        </div>

        <div ref={ref} className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <article
              key={m.label}
              className="surface-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-500"
              style={{
                transform: inView ? "translateY(0)" : "translateY(24px)",
                opacity: inView ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms, opacity 700ms ease ${i * 120}ms`,
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.14_86_/_0.6)] to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[oklch(0.82_0.14_86)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.82_0.14_86)] opacity-60" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.14_86)] shadow-[0_0_8px_oklch(0.82_0.14_86)]" />
                  </span>
                  Live
                </span>
              </div>
              <div className="mt-6 font-display text-4xl sm:text-5xl leading-none text-gold-metallic tabular-nums">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} run={inView} />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{m.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.caption}</p>
              <div className="mt-5">
                <Sparkline points={m.spark} run={inView} />
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex gap-10 whitespace-nowrap animate-marquee" aria-hidden>
            {[...capabilities, ...capabilities].map((c, i) => (
              <span key={i} className="flex items-center gap-10 text-sm uppercase tracking-[0.32em] text-muted-foreground">
                {c}
                <span className="inline-block h-1 w-1 rotate-45 bg-[oklch(0.82_0.14_86)] shadow-[0_0_8px_oklch(0.82_0.14_86)]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}