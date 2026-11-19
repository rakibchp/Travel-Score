import { Compass, Construction } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-950">This place isn’t on the map</h1>
      <p className="mt-2 max-w-md text-muted-foreground">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className={buttonVariants({ className: 'mt-8' })}>
        <Compass aria-hidden /> Back to home
      </Link>
    </Container>
  )
}

/** Used for routes whose screens are built in later phases, so navigation never dead-ends. */
export function ComingSoonPage({ title }: { title: string }) {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Construction className="size-7" aria-hidden />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-brand-950">{title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">We’re building this part of Explore Bangladesh right now. Check back soon!</p>
      <Link to="/" className={buttonVariants({ variant: 'outline', className: 'mt-8' })}>
        Back to home
      </Link>
    </Container>
  )
}
