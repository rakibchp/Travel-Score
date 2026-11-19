import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Logo } from '@/components/layout/Logo'

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-brand-950 text-brand-100">
      <div aria-hidden className="h-1 bg-gradient-to-r from-brand-700 via-flag-red to-brand-700" />
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            Every unique destination you visit is one point. Discover Bangladesh district by district and see how much
            of the country you have explored.
          </p>
        </div>
        <nav aria-label="Explore" className="text-sm">
          <h2 className="mb-3 font-semibold text-white">Explore</h2>
          <ul className="space-y-2">
            <li><Link className="hover:text-white" to="/explore">All destinations</Link></li>
            <li><Link className="hover:text-white" to="/divisions">Divisions &amp; districts</Link></li>
            <li><Link className="hover:text-white" to="/scorecard">My scorecard</Link></li>
          </ul>
        </nav>
        <nav aria-label="Account" className="text-sm">
          <h2 className="mb-3 font-semibold text-white">Account</h2>
          <ul className="space-y-2">
            <li><Link className="hover:text-white" to="/login">Sign in</Link></li>
            <li><Link className="hover:text-white" to="/register">Create an account</Link></li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} Explore Bangladesh. Free for everyone.</p>
          <p lang="bn">৮টি বিভাগ · ৬৪টি জেলা · অসংখ্য গল্প</p>
        </Container>
      </div>
    </footer>
  )
}
