import { Link } from 'react-router'
import { CategoryIcon } from '@/components/common/CategoryIcon'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EmptyState, ErrorState } from '@/components/common/StateViews'
import { Container } from '@/components/layout/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '@/hooks/useReferenceData'

export function CategoryGrid() {
  const { data, isLoading, isError, error, refetch } = useCategories()

  return (
    <section aria-labelledby="categories-heading" className="py-14">
      <Container>
        <SectionHeading
          id="categories-heading"
          eyebrow="Explore by category"
          title="What kind of trip are you in the mood for?"
          description="Beaches, hills, waterfalls, ancient ruins — find destinations by the experience you want."
        />

        {isError ? (
          <ErrorState error={error} onRetry={() => void refetch()} title="Couldn't load categories" />
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState title="No categories yet" description="Categories will appear here once they're added." />
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {data.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/explore?category=${category.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/60"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-white">
                    <CategoryIcon name={category.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-snug text-foreground">{category.name}</span>
                    <span lang="bn" className="block text-xs text-muted-foreground">
                      {category.nameBn}
                    </span>
                  </span>
                  <span className="mt-auto text-xs font-medium text-brand-700">
                    {category.destinationCount} {category.destinationCount === 1 ? 'place' : 'places'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
