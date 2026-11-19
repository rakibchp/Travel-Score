import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, action, className }: Props) {
  return (
    <div className={cn('mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-strong">{eyebrow}</p>
        )}
        <h2 id={id} className="text-2xl font-extrabold tracking-tight text-brand-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
