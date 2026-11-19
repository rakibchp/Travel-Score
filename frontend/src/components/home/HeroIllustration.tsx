/**
 * Decorative hero artwork: a red sun over green hills, a river and a boat —
 * a nod to the flag and the delta landscape. Pure SVG, no external images.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 400" className={className} aria-hidden role="presentation">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecfdf5" />
          <stop offset="1" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
        <clipPath id="frame">
          <rect x="0" y="0" width="480" height="400" rx="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#frame)">
        <rect width="480" height="400" fill="url(#sky)" />
        <circle cx="300" cy="150" r="78" fill="#f42a41" />
        <circle cx="300" cy="150" r="104" fill="#f42a41" opacity=".08" />
        {/* far hills */}
        <path d="M0 250 C70 200 130 205 190 235 S320 200 380 220 S450 230 480 210 V400 H0Z" fill="#2fbf8f" opacity=".55" />
        {/* tea-garden hill with rows */}
        <path d="M-10 285 C80 230 170 240 250 275 S400 300 490 260 V400 H-10Z" fill="#0f9b6e" />
        <g stroke="#007f5c" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6">
          <path d="M30 300 C90 270 150 272 210 292" />
          <path d="M20 318 C90 290 170 292 240 312" />
          <path d="M260 300 C320 312 380 305 450 285" />
        </g>
        {/* river */}
        <path d="M-10 330 C120 300 230 345 330 325 S460 310 490 320 V360 C420 350 360 372 260 368 S80 350 -10 372Z" fill="url(#river)" />
        <path d="M-10 372 C80 350 180 372 260 368 S420 350 490 360 V400 H-10Z" fill="#006a4e" />
        {/* boat */}
        <g transform="translate(150 318)">
          <path d="M0 14 C20 26 70 26 92 12 L84 22 C60 34 26 34 8 22Z" fill="#063f30" />
          <path d="M44 14 V-30" stroke="#063f30" strokeWidth="3" />
          <path d="M46 -28 C70 -16 74 0 70 10 L46 10Z" fill="#fff" />
        </g>
        {/* palms */}
        <g transform="translate(400 240)" fill="#05543f">
          <rect x="-3" y="0" width="6" height="58" rx="3" />
          <path d="M0 2 C-24 -12 -40 -6 -48 4 C-30 -2 -14 0 0 2Z" />
          <path d="M0 2 C22 -14 40 -8 48 2 C30 -4 14 -2 0 2Z" />
          <path d="M0 0 C-6 -22 4 -34 14 -38 C6 -26 4 -12 0 0Z" />
        </g>
        {/* birds */}
        <g stroke="#063f30" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M90 90 q8 -8 16 0 q8 -8 16 0" />
          <path d="M130 120 q6 -6 12 0 q6 -6 12 0" />
        </g>
      </g>
    </svg>
  )
}
