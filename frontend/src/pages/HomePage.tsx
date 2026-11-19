import { CallToAction } from '@/components/home/CallToAction'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { DestinationShowcase } from '@/components/home/DestinationShowcase'
import { DivisionGrid } from '@/components/home/DivisionGrid'
import { HeroSection } from '@/components/home/HeroSection'
import { ScoreSummary } from '@/components/home/ScoreSummary'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ScoreSummary />
      <DivisionGrid />
      <DestinationShowcase />
      <CategoryGrid />
      <CallToAction />
    </>
  )
}
