/**
 * Source de seed (snapshot du contenu FR initial).
 * Le typage est laissé inférer pour ne pas dépendre des types runtime
 * qui ont migré vers une structure page-based.
 */
export const site = {
  url: 'https://www.aero-mountains.com',
  brand: {
    logo: '/images/logo.png',
    logoAlt: 'Logo Aero Mountains',
    siteName: 'Aero Mountains',
    description:
      'Vol en montgolfière privé et partagé au-dessus du lac d\'Annecy. Pilote Yannick Dacheux, breveté DGAC.',
  },
  contact: {
    phone: '+33673940721',
    phoneDisplay: '06 73 94 07 21',
    email: 'contact@aero-mountains.com',
  },
  location: {
    addressLine1: 'Site de décollage de Doussard',
    addressLine2: '74210 Doussard — Haute-Savoie',
    short: 'Doussard, 74210 — Lac d\'Annecy',
  },
  navLinks: [
    { label: 'Vols', href: '#formules' },
    { label: 'Le déroulé', href: '#journey' },
    { label: 'Le pilote', href: '#pilote' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'FAQ', href: '#faq' },
  ],
  legalLinks: [
    { label: 'Mentions légales', href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
  ],
  hero: {
    eyebrow: 'Doussard · Lac d\'Annecy · Alpes',
    titleStart: 'Vol en',
    titleEmphasized: 'montgolfière',
    titleEnd: 'à Annecy',
    subtitle:
      'Au-dessus du lac et des Alpes, au lever du soleil.\nUne heure de silence, de lumière et de vertige.',
    primaryCta: { label: 'Réserver mon vol', href: '#formules' },
    secondaryCta: { label: 'Offrir un bon cadeau', href: '#formules' },
    backgroundImage: '/images/hero-balloon.jpg',
    backgroundAlt: 'Vol en montgolfière au-dessus du lac d\'Annecy',
    scrollLabel: 'Défiler',
  },
  cta: {
    eyebrow: 'Prêt à décoller ?',
    titleStart: 'Réservez votre vol',
    titleEmphasized: 'au-dessus d\'Annecy',
    description:
      'Confirmation par téléphone le matin du vol selon la météo. Vol reporté sans frais en cas de conditions défavorables.',
    backgroundImage: '/images/cta-bg.jpg',
    primaryCtaLabel: '',
    secondaryCtaLabel: 'Envoyer un message',
    locationLabel: 'Décollage : Doussard, 74210 — Lac d\'Annecy',
  },
  reviewsAggregate: {
    rating: '4.9',
    countLabel: '+120 avis',
    source: 'Google Reviews',
  },
  cloudBreakQuote: {
    quote:
      'Au-dessus des nuages, le lac d\'Annecy n\'est plus qu\'un miroir posé entre les Alpes.',
  },
}
