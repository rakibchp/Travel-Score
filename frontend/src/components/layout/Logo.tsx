import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn('size-9 shrink-0', className)}>
      <rect width="64" height="64" rx="16" fill="#006a4e" />
      <circle cx="28" cy="32" r="13" fill="#f42a41" />
      <path
        d="M46 14l3.2 6.6 7.3 1-5.3 5.1 1.3 7.2L46 30.5l-6.5 3.4 1.3-7.2-5.3-5.1 7.3-1z"
        fill="#fff"
        opacity=".92"
      />
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label="Explore Bangladesh home">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn('text-[15px] font-extrabold tracking-tight', light ? 'text-white' : 'text-brand-900')}>
          Explore Bangladesh
        </span>
        <span lang="bn" className={cn('mt-0.5 text-[11px] font-medium', light ? 'text-brand-100' : 'text-muted-foreground')}>
          বাংলাদেশ ঘুরে দেখো
        </span>
      </span>
    </Link>
  )
}
