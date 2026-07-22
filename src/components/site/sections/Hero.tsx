import { CircuitBackdrop } from "@/components/site/CircuitBackdrop";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-32">
      <CircuitBackdrop />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[95vw] max-w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-20 blur-[120px] md:h-[600px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[240px] w-[240px] md:h-[400px] md:w-[400px] rounded-full bg-[oklch(0.6_0.13_70)] opacity-20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="animate-fade-up text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Athera Intelligence</p>
        <h1 className="animate-fade-up mt-6 font-display text-[2.75rem] leading-[0.98] tracking-tight text-gold-metallic sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem]" style={{ animationDelay: "0.1s" }}>
          Engineering<br />intelligent software.
        </h1>
        <p className="animate-fade-up mx-auto mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground" style={{ animationDelay: "0.25s" }}>
          We build custom software, mobile apps, and AI systems for companies that treat their product as their reputation. Corporate craftsmanship, with a modern edge.
        </p>
        <div className="animate-fade-up mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4" style={{ animationDelay: "0.4s" }}>
          <Link to="/contact" className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.02]">
            <span className="relative z-10">Start a project</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link to="/example" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-8 py-3.5 text-sm uppercase tracking-[0.25em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]">
            See an example engagement
          </Link>
        </div>
        <div className="mt-16 sm:mt-24 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground">
          <span>Coding</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>Product Dev</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>Web &amp; Apps</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>AI Development</span>
        </div>
      </div>
    </section>
  );
}