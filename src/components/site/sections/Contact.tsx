import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { TiltCard } from "@/components/site/TiltCard";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Message received. We'll be in touch within one business day.");
    }, 700);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[280px] w-[280px] md:h-[500px] md:w-[500px] -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.1] blur-[140px]" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Let's talk</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Start a project</h2>
          <p className="mt-4 text-muted-foreground">Tell us what you're building. We'll reply within one business day.</p>
        </div>
        <div className="mt-12 sm:mt-16">
          <TiltCard intensity={4}>
            <form onSubmit={onSubmit} className="grid gap-6 p-6 sm:p-10 md:p-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Company" name="company" />
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Project brief</label>
                <textarea name="message" required rows={5}
                  className="w-full rounded-lg border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.14_0.012_80_/_0.6)] px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition focus:border-[oklch(0.82_0.14_86_/_0.7)] focus:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.25)]"
                  placeholder="What are you building, and where do you need help?" />
              </div>
              <button type="submit" disabled={submitting}
                className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.01] disabled:opacity-70">
                <span className="relative z-10">{submitting ? "Sending…" : "Send message"}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{label}</label>
      <input type={type} name={name} required={required}
        className="w-full rounded-lg border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.14_0.012_80_/_0.6)] px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition focus:border-[oklch(0.82_0.14_86_/_0.7)] focus:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.25)]" />
    </div>
  );
}