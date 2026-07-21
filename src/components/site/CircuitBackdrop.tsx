export function CircuitBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={"pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] " + className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M10 10 H60 V50 H100 M60 50 V100 H110 M20 60 H50 V90" fill="none" stroke="oklch(0.82 0.14 86)" strokeWidth="0.6" />
          <circle cx="60" cy="50" r="1.8" fill="oklch(0.82 0.14 86)" />
          <circle cx="100" cy="50" r="1.4" fill="oklch(0.82 0.14 86)" />
          <circle cx="50" cy="90" r="1.4" fill="oklch(0.82 0.14 86)" />
        </pattern>
        <radialGradient id="fadeMask" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fm"><rect width="100%" height="100%" fill="url(#fadeMask)" /></mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" mask="url(#fm)" />
    </svg>
  );
}