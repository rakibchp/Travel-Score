import { CheckCircle2, Flag, MapPin, Trophy } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ErrorState } from '@/components/common/StateViews'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useOverviewStats } from '@/hooks/useReferenceData'
import { formatNumber, percentage } from '@/utils/format'

function StatCard({ icon, label, value, hint }: { icon: ReactNode; label: string; value: ReactNode; hint?: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground [&_svg]:size-4">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-brand-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  )
}

/**
 * Personal progress summary.
 * `visited` is supplied by the score engine (guest list or saved records) from Phase 3;
 * until then everyone starts at zero. Totals always come from the database.
 */
export function ScoreSummary({ visited = 0 }: { visited?: number }) {
  const { data, isLoading, isError, error, refetch } = useOverviewStats()

  const total = data?.totalDestinations ?? 0
  const pct = percentage(visited, total)

  return (
    <section aria-labelledby="score-heading" className="py-14">
      <Container>
        <SectionHeading
          id="score-heading"
          eyebrow="Your progress"
          title="Your Bangladesh Travel Score"
          description="Scores are calculated from the destinations you mark as visited. One destination, one point — no matter how many times you go back."
        />

        {isError ? (
          <ErrorState error={error} onRetry={() => void refetch()} title="Couldn't load destination totals" />
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-[120px]" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatCard icon={<Trophy className="text-accent-strong" />} label="Travel score" value={`${visited} pts`} />
              <StatCard icon={<CheckCircle2 className="text-primary" />} label="Visited" value={formatNumber(visited)} />
              <StatCard
                icon={<MapPin className="text-primary" />}
                label="Remaining"
                value={formatNumber(Math.max(total - visited, 0))}
                hint={`of ${formatNumber(total)} destinations`}
              />
              <StatCard icon={<Flag className="text-primary" />} label="Explored" value={`${pct}%`} hint="of Bangladesh" />
            </div>

            <Card className="mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">Exploration progress</span>
                  <span className="font-semibold text-brand-800">
                    {formatNumber(visited)} / {formatNumber(total)}
                  </span>
                </div>
                <div
                  className="mt-2 h-3 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label="Exploration progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pct}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-[width] duration-700"
                    style={{ width: `${Math.max(pct, visited > 0 ? 2 : 0)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {total === 0
                    ? 'The destination directory is being prepared. Check back soon!'
                    : visited === 0
                      ? 'You haven’t marked any destinations yet — your journey starts with the first one.'
                      : 'Keep going!'}
                </p>
              </div>
              <Link to="/explore" className={buttonVariants({ variant: 'secondary' })}>
                Mark places I’ve visited
              </Link>
            </Card>
          </>
        )}
      </Container>
    </section>
  )
}
