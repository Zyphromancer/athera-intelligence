import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#before-after", label: "Before / After" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"fixed inset-x-0 top-0 z-50 transition-all duration-500 " + (scrolled ? "backdrop-blur-xl bg-background/70 border-b border-[oklch(0.82_0.14_86_/_0.15)]" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-[0.35em] text-gold-metallic">ATHERA</a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[oklch(0.82_0.14_86)] shadow-[0_0_8px_oklch(0.82_0.14_86)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden lg:inline-flex items-center rounded-full border border-[oklch(0.82_0.14_86_/_0.5)] bg-[oklch(0.82_0.14_86_/_0.08)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[oklch(0.9_0.15_90)] transition-all hover:bg-[oklch(0.82_0.14_86_/_0.18)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.4)]">
          Start a project
        </a>
        <button className="lg:hidden text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[oklch(0.82_0.14_86_/_0.15)] bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}