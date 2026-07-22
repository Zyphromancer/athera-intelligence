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
    <section className="relative isolate overflow-hidden pt-40 pb-20">
      <CircuitBackdrop />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.15] blur-[160px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {crumb && (
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Athera</Link>
            <span className="mx-2 text-[oklch(0.82_0.14_86)]">/</span>
            {crumb}
          </p>
        )}
        <p className="mt-6 text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-gold-metallic sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {intro && <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}