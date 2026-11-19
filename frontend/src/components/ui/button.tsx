import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-brand-800',
        accent: 'bg-accent-strong text-accent-foreground shadow-sm hover:bg-[#a50d26]',
        outline: 'border border-input bg-white text-foreground hover:bg-secondary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-brand-100',
        ghost: 'text-foreground hover:bg-secondary',
        link: 'text-primary underline-offset-4 hover:underline rounded-none',
        light: 'bg-white text-brand-800 shadow-sm hover:bg-brand-50',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-9 px-4 text-[13px]',
        lg: 'h-12 px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { buttonVariants }
