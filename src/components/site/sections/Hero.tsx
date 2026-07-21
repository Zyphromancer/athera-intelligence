import { CircuitBackdrop } from "@/components/site/CircuitBackdrop";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-40 pb-32">
      <CircuitBackdrop />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[oklch(0.6_0.13_70)] opacity-20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="animate-fade-up text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Athera Intelligence</p>
        <h1 className="animate-fade-up mt-6 font-display text-6xl leading-[0.95] tracking-tight text-gold-metallic sm:text-7xl md:text-8xl lg:text-[8rem]" style={{ animationDelay: "0.1s" }}>
          Engineering<br />intelligent software.
        </h1>
        <p className="animate-fade-up mx-auto mt-8 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.25s" }}>
          We build custom software, mobile apps, and AI systems for companies that treat their product as their reputation. Corporate craftsmanship, with a modern edge.
        </p>
        <div className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.4s" }}>
          <a href="#contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.02]">
            <span className="relative z-10">Start a project</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-8 py-3.5 text-sm uppercase tracking-[0.25em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]">
            See our work
          </a>
        </div>
        <div className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Coding</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>Product Dev</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>Web &amp; Apps</span><span className="text-[oklch(0.82_0.14_86)]">·</span>
          <span>AI Development</span>
        </div>
      </div>
    </section>
  );
}