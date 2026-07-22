import { Link } from "@tanstack/react-router";
import { CircuitBackdrop } from "@/components/site/CircuitBackdrop";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-18 md:pt-40 md:pb-20">
      <CircuitBackdrop />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[280px] w-[95vw] max-w-[720px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.15] blur-[120px] md:h-[420px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {crumb && (
          <p className="text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Athera</Link>
            <span className="mx-2 text-[oklch(0.82_0.14_86)]">/</span>
            {crumb}
          </p>
        )}
        <p className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-gold-metallic sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}