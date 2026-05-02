import type { Stat } from '@/lib/types/content'

export const stats: Stat[] = [
  { iconKey: 'clock', value: '3h', label: 'Durée totale', sub: 'dont ~1h de vol' },
  { iconKey: 'users', value: '1 à 5', label: 'Personnes', sub: 'par vol' },
  { iconKey: 'calendar', value: 'Dès 14 ans', label: 'Âge minimum', sub: 'accessible à tous' },
  { iconKey: 'mapPin', value: 'Doussard', label: 'Décollage', sub: 'Lac d\'Annecy, 74210' },
  { iconKey: 'star', value: '4.9★', label: 'Avis Google', sub: '+120 avis clients' },
  { iconKey: 'award', value: 'DGAC', label: 'Pilote agréé', sub: '400h+ de vol' },
]
