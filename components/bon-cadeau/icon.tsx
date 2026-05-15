import {
  Award,
  Cake,
  Calendar,
  Clock,
  Cloud,
  Gift,
  Heart,
  MapPin,
  Star,
  TreePine,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { BonCadeauIconKey } from '@/lib/types/content'

const ICON_MAP: Record<BonCadeauIconKey, LucideIcon> = {
  heart: Heart,
  gift: Gift,
  cake: Cake,
  cup: Trophy,
  tree: TreePine,
  users: Users,
  clock: Clock,
  star: Star,
  calendar: Calendar,
  pin: MapPin,
  cloud: Cloud,
  medal: Award,
}

export default function BonCadeauIcon({
  iconKey,
  className,
  strokeWidth = 1.25,
}: {
  iconKey: BonCadeauIconKey
  className?: string
  strokeWidth?: number
}) {
  const Component = ICON_MAP[iconKey] ?? Gift
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />
}
