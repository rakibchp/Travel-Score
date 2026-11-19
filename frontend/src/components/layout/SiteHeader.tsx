import { Menu, Trophy, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/layout/Container'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
  { to: '/divisions', label: 'Divisions' },
  { to: '/scorecard', label: 'Scorecard' },
]

export function SiteHeader() {
  const { pathname } = useLocation()
  // The menu remembers which page it was opened on, so navigating closes it automatically.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null)
  const open = openOnPath === pathname

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-brand-50 text-brand-800' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/scorecard"
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
            title="Your Bangladesh Travel Score"
          >
            <Trophy className="size-4 text-accent-strong" aria-hidden />
            <span>0 pts</span>
          </Link>
          <Link to="/login" className={buttonVariants({ size: 'sm' })}>
            Sign in
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </Container>

      {open && (
        <div id="mobile-nav" className="animate-fade-up border-t bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-base font-medium',
                    isActive ? 'bg-brand-50 text-brand-800' : 'text-foreground hover:bg-muted',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" className={cn(buttonVariants({ size: 'lg' }), 'mt-2 w-full')}>
              Sign in
            </Link>
          </Container>
        </div>
      )}
    </header>
  )
}
