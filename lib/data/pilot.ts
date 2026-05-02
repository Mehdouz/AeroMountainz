import type { Pilot } from '@/lib/types/content'

export const pilot: Pilot = {
  name: 'Yannick Dacheux',
  imageSrc: '/images/pilote-yannick-dacheux.jpg',
  imageAlt: 'Yannick Dacheux, pilote montgolfière Annecy',
  yearsExperience: '10 ans',
  bioParagraphs: [
    'Passionné de montgolfière depuis plus de 10 ans, Yannick est pilote professionnel breveté DGAC. Avec plus de 400 heures de vol à son actif, il est également **Champion de France équipier**.',
    'Il connaît le lac d\'Annecy comme sa poche, ses courants d\'air, ses fenêtres météo, ses atterrissages secrets. Vous êtes entre les meilleures mains.',
  ],
  badges: [
    { iconKey: 'award', label: 'Pilote DGAC' },
    { iconKey: 'wind', label: '400h de vol' },
    { iconKey: 'trophy', label: 'Champion de France' },
  ],
  ctaLabel: 'Contacter Yannick directement',
}
