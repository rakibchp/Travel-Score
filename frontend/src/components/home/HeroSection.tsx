import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router'
import { HeroIllustration } from '@/components/home/HeroIllustration'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useOverviewStats } from '@/hooks/useReferenceData'
import { formatNumber } from '@/utils/format'

function HeroStat({ value, label, loading }: { value?: number; label: string; loading: boolean }) {
  return (
    <div>
      {loading ? (
        <Skeleton className="h-8 w-14" />
      ) : (
        <p className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{value !== undefined ? formatNumber(value) : '—'}</p>
      )}
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  )
}

export function HeroSection() {
  const { data, isLoading } = useOverviewStats()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-800">
            <span className="size-2 rounded-full bg-flag-red" aria-hidden />
            Your Bangladesh Travel Score
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
            How much of <span className="text-primary">Bangladesh</span> have you explored?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From the hills of Bandarban to the mangroves of the Sundarbans — mark the places you've been, earn{' '}
            <strong className="font-semibold text-foreground">1 point for every unique destination</strong>, and share
            your journey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/explore" className={buttonVariants({ size: 'lg' })}>
              <Compass aria-hidden /> Start exploring
            </Link>
            <Link to="/scorecard" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              See my scorecard <ArrowRight aria-hidden />
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t pt-6">
            <HeroStat value={data?.totalDivisions} label="Divisions" loading={isLoading} />
            <HeroStat value={data?.totalDistricts} label="Districts" loading={isLoading} />
            <HeroStat value={data?.totalDestinations} label="Destinations" loading={isLoading} />
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroIllustration className="w-full drop-shadow-[0_20px_40px_rgba(0,106,78,0.18)]" />
        </div>
      </Container>
    </section>
  )
}
