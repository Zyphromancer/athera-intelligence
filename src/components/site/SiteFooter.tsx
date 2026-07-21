export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-[oklch(0.82_0.14_86_/_0.15)]">
      <div className="absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-[0.35em] text-gold-metallic">ATHERA</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Engineering intelligent software for companies that treat their product as their reputation.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Studio</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#projects" className="hover:text-foreground">Projects</a></li>
              <li><a href="#before-after" className="hover:text-foreground">Before / After</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>hello@athera.io</li>
              <li>Remote · Worldwide</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-[oklch(0.82_0.14_86_/_0.12)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Athera Intelligence. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Crafted with restraint.</p>
        </div>
      </div>
    </footer>
  );
}