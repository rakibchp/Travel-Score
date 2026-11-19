import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EmptyState, ErrorState } from '@/components/common/StateViews'
import { Container } from '@/components/layout/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { useDivisions } from '@/hooks/useReferenceData'
import type { Division } from '@/types/api'
import { formatNumber } from '@/utils/format'

// Visual variety only — a palette cycled by position, not tied to any division's data.
const TINTS = [
  'from-brand-700 to-brand-500',
  'from-brand-800 to-brand-600',
  'from-[#0b5d6b] to-[#14918a]',
  'from-brand-900 to-brand-700',
]

function DivisionCard({ division, index }: { division: Division; index: number }) {
  return (
    <Link
      to={`/divisions/${division.slug}`}
      className="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${TINTS[index % TINTS.length]}`} />
      {division.image && (
        <img
          src={division.image.url}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-40 mix-blend-overlay"
        />
      )}
      <div aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-white/10" />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold leading-tight">{division.name}</h3>
          <p lang="bn" className="text-sm text-brand-100">
            {division.nameBn}
          </p>
        </div>
        <ArrowUpRight
          className="size-5 shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <p className="relative mt-6 text-sm font-medium text-brand-50">
        {formatNumber(division.districtCount)} districts · {formatNumber(division.destinationCount)} destinations
      </p>
    </Link>
  )
}

export function DivisionGrid() {
  const { data, isLoading, isError, error, refetch } = useDivisions()

  return (
    <section aria-labelledby="divisions-heading" className="bg-muted/50 py-14">
      <Container>
        <SectionHeading
          id="divisions-heading"
          eyebrow="Explore by division"
          title="Eight divisions, sixty-four districts"
          description="Pick a division to see its districts and the places worth visiting in each."
        />

        {isError ? (
          <ErrorState error={error} onRetry={() => void refetch()} title="Couldn't load divisions" />
        ) : isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="h-36" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState title="No divisions yet" description="Run the database seed to load Bangladesh's divisions and districts." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((division, i) => (
              <DivisionCard key={division.id} division={division} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
