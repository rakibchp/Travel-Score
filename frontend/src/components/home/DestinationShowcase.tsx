import { Sparkles, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EmptyState } from '@/components/common/StateViews'
import { Container } from '@/components/layout/Container'

/**
 * Featured and popular destinations.
 * The destination directory and its endpoints (/destinations/featured, /destinations/popular)
 * arrive next; until then this section shows a friendly empty state rather than placeholder data.
 */
export function DestinationShowcase() {
  return (
    <section aria-label="Featured and popular destinations" className="py-14">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Featured" title="Handpicked destinations" />
          <EmptyState
            icon={<Sparkles aria-hidden />}
            title="Featured places are on their way"
            description="Our curated list of must-visit destinations from all 64 districts is being prepared."
          />
        </div>
        <div>
          <SectionHeading eyebrow="Popular" title="Where explorers are going" />
          <EmptyState
            icon={<TrendingUp aria-hidden />}
            title="No trends yet"
            description="Once explorers start marking visits, the most-visited destinations will show up here."
          />
        </div>
      </Container>
    </section>
  )
}
