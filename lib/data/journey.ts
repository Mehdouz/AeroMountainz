import type { JourneyStep } from '@/lib/types/content'

export const journey: JourneyStep[] = [
  {
    number: '01',
    time: '05h30',
    title: 'Rendez-vous à l\'aube',
    description:
      'Retrouvez-nous sur le site de décollage à Doussard, au bord du lac. Le soleil commence à peine à poindre sur les Alpes.',
  },
  {
    number: '02',
    time: '05h45',
    title: 'Briefing & préparation',
    description:
      'Yannick vous accueille et vous explique les consignes de sécurité. L\'équipe commence à déballer l\'enveloppe.',
  },
  {
    number: '03',
    time: '06h15',
    title: 'Gonflage du ballon',
    description:
      'Un spectacle en soi : regardez la montgolfière prendre vie sous l\'effet du brûleur. La nacelle se redresse doucement.',
  },
  {
    number: '04',
    time: '06h30',
    title: '~1h de vol',
    description:
      'Vous vous élevez silencieusement au-dessus du lac d\'Annecy. Vues panoramiques sur les Aravis, la Tournette, et l\'eau turquoise.',
  },
  {
    number: '05',
    time: '07h30',
    title: 'Atterrissage',
    description:
      'L\'équipe au sol vous accompagne jusqu\'à la zone d\'atterrissage. Un moment de grâce et d\'adrénaline douce.',
  },
  {
    number: '06',
    time: '08h00',
    title: 'Toast champenois',
    description:
      'Tradition aéronautique : on célèbre le vol autour d\'un toast avec le pilote, dans l\'esprit des premiers aéronautes.',
  },
]
