import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export function PageChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-[oklch(0.82_0.14_86)] selection:text-black">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}