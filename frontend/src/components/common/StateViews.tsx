import { CircleAlert, MapPinned, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ApiClientError } from '@/services/apiClient'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/40 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 [&_svg]:size-6">
        {icon ?? <MapPinned aria-hidden />}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

type ErrorStateProps = {
  error: unknown
  onRetry?: () => void
  title?: string
  className?: string
}

export function ErrorState({ error, onRetry, title = 'Something went wrong', className }: ErrorStateProps) {
  const message =
    error instanceof ApiClientError
      ? error.message
      : 'We could not load this section. Please try again.'

  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center rounded-2xl border border-red-100 bg-red-50/60 px-6 py-10 text-center', className)}
    >
      <CircleAlert className="mb-3 size-7 text-accent-strong" aria-hidden />
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          <RefreshCw aria-hidden /> Try again
        </Button>
      )}
    </div>
  )
}
