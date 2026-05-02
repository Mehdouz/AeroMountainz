import type { Formula } from '@/lib/types/content'

export const formulas: Formula[] = [
  {
    tag: 'Découverte',
    title: 'Baptême\ndécouverte',
    price: '250 €',
    priceDetail: 'par personne',
    description:
      'Rejoignez le vol partagé au lever du soleil. Idéal pour une première expérience magique au-dessus du lac d\'Annecy.',
    features: [
      '1 à 5 personnes',
      'Vol d\'environ 1 heure',
      'Départ à l\'aube',
      'Toast champenois',
    ],
    highlight: false,
  },
  {
    tag: 'Populaire',
    title: 'Vol privatif\nduo',
    price: '650 €',
    priceDetail: 'pour 2 personnes',
    description:
      'Un vol en exclusivité pour deux. Romantique, intime, inoubliable. Le cadre parfait pour une demande en mariage.',
    features: [
      '2 personnes uniquement',
      'Vol d\'1h en privatif',
      'Personnalisation possible',
      'Champagne & surprise',
    ],
    highlight: true,
  },
  {
    tag: 'Sur mesure',
    title: 'Vol privatif\nfamille',
    price: 'Sur devis',
    priceDetail: 'à partir de 5 pers.',
    description:
      'Offrez à vos proches une expérience hors du commun. Formule adaptée à vos envies, pour tout groupe jusqu\'à 5 personnes.',
    features: [
      'Jusqu\'à 5 personnes',
      'Itinéraire personnalisé',
      'Accompagnement dédié',
      'Possibilité bon cadeau',
    ],
    highlight: false,
  },
]
