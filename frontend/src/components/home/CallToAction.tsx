import { Compass, UserPlus } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CallToAction() {
  return (
    <section className="pt-6">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -left-16 -top-16 size-56 rounded-full bg-brand-600/50" />
          <div aria-hidden className="absolute -bottom-20 -right-10 size-64 rounded-full bg-flag-red/90" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your next point is waiting.</h2>
            <p className="mt-4 text-base text-brand-100 sm:text-lg">
              Start as a guest — no sign-up needed. Create a free account when you want to save your journey and share
              it with friends.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/explore" className={buttonVariants({ size: 'lg', variant: 'light' })}>
                <Compass aria-hidden /> Explore as a guest
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'border-white/40 bg-transparent text-white hover:bg-white/10',
                )}
              >
                <UserPlus aria-hidden /> Create free account
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
