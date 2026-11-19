import {
  Droplets,
  Flower2,
  Landmark,
  Leaf,
  Library,
  MapPin,
  Mountain,
  Sailboat,
  Shovel,
  Sparkles,
  Star,
  TreePalm,
  TreePine,
  Waves,
  type LucideIcon,
} from 'lucide-react'

/**
 * Maps the icon name stored on a category document to a component.
 * Only icons listed here are bundled; unknown names fall back to MapPin,
 * so admins can't break the page with a typo.
 */
const ICONS: Record<string, LucideIcon> = {
  Droplets,
  Flower2,
  Landmark,
  Leaf,
  Library,
  Mountain,
  Sailboat,
  Shovel,
  Sparkles,
  Star,
  TreePalm,
  TreePine,
  Waves,
}

export function CategoryIcon({ name, className }: { name: string | null; className?: string }) {
  const Icon = (name && ICONS[name]) || MapPin
  return <Icon className={className} aria-hidden />
}
