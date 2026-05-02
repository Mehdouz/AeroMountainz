/**
 * Seed initial Sanity — version page-based + i18n FR/EN.
 *
 * Crée :
 *   • siteSettings (FR)
 *   • Contenus réutilisables FR : pilot, formulas, faqs, reviews, journey, stats, gallery
 *   • Pages FR : home, vols, bon-cadeau, pilote, contact, mentions-legales, politique-confidentialite
 *   • Blog : 1 author (Yannick), 3 categories, 3 posts FR (stubs à enrichir dans le Studio)
 *
 * Le seed ne crée QUE le FR. Les versions EN sont à créer dans le Studio
 * via le bouton "Translate" du plugin @sanity/document-internationalization.
 *
 * Usage : `pnpm seed` (nécessite SANITY_API_WRITE_TOKEN temporaire).
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join, basename } from 'node:path'

import { site } from '../lib/data/site'
import { stats } from '../lib/data/stats'
import { formulas } from '../lib/data/formulas'
import { journey } from '../lib/data/journey'
import { reviews } from '../lib/data/reviews'
import { faqs } from '../lib/data/faqs'
import { gallery } from '../lib/data/gallery'
import { pilot } from '../lib/data/pilot'

loadEnv({ path: join(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN',
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  token,
  useCdn: false,
})

const LANG = 'fr'

// ============================================================
// Helpers
// ============================================================

const imageCache = new Map<string, string>()

async function uploadImage(localPath: string): Promise<string> {
  const cached = imageCache.get(localPath)
  if (cached) return cached
  const fullPath = join(process.cwd(), 'public', localPath.replace(/^\//, ''))
  const buffer = readFileSync(fullPath)
  const filename = basename(localPath)
  console.log(`  ↑ upload ${filename}`)
  const asset = await client.assets.upload('image', buffer, { filename })
  imageCache.set(localPath, asset._id)
  return asset._id
}

const imageRef = (assetId: string) => ({
  _type: 'image' as const,
  asset: { _type: 'reference' as const, _ref: assetId },
})

const ref = (id: string, _key: string) => ({
  _type: 'reference' as const,
  _key,
  _ref: id,
})

function paragraphsToPortableText(paragraphs: string[]) {
  return paragraphs.map((p, i) => {
    const parts = p.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
    return {
      _type: 'block' as const,
      _key: `b-${i}`,
      style: 'normal',
      markDefs: [],
      children: parts.map((part, j) => {
        const isStrong = part.startsWith('**') && part.endsWith('**')
        return {
          _type: 'span' as const,
          _key: `s-${i}-${j}`,
          text: isStrong ? part.slice(2, -2) : part,
          marks: isStrong ? ['strong'] : [],
        }
      }),
    }
  })
}

const lipsumBlock = (text: string, key: string) => ({
  _type: 'block' as const,
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
})

const headingBlock = (text: string, key: string, style: 'h2' | 'h3' = 'h2') => ({
  _type: 'block' as const,
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
})

// ============================================================
// IDs déterministes
// ============================================================

// Sanity filtre/namespace les _id avec un point (`.`) en prefix (cf. sanity.imageAsset, etc.).
// On utilise donc `-` comme séparateur pour rester en zone "user-defined".
const ids = {
  siteSettings: `siteSettings-${LANG}`,
  pilot: `pilot-${LANG}`,
  formula: (i: number) => `formula-${i}-${LANG}`,
  faq: (i: number) => `faq-${i}-${LANG}`,
  review: (i: number) => `review-${i}-${LANG}`,
  journeyStep: (i: number) => `journeyStep-${i}-${LANG}`,
  stat: (i: number) => `stat-${i}-${LANG}`,
  galleryItem: (i: number) => `galleryItem-${i}-${LANG}`,
  page: (slug: string) => `page-${slug}-${LANG}`,
  post: (slug: string) => `post-${slug}-${LANG}`,
  category: (slug: string) => `category-${slug}-${LANG}`,
  author: (slug: string) => `author-${slug}`, // pas de langue pour author
}

// ============================================================
// Seed
// ============================================================

async function seedSiteSettings() {
  console.log('• siteSettings')
  // Nav et legal links pointent vers les pages réelles (le composant Link préfixe la locale).
  const navLinks = [
    { label: 'Vols', href: '/vols' },
    { label: 'Le pilote', href: '/pilote' },
    { label: 'Bon cadeau', href: '/bon-cadeau' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]
  const legalLinks = [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
  ]
  await client.createOrReplace({
    _id: ids.siteSettings,
    _type: 'siteSettings',
    language: LANG,
    url: site.url,
    brand: { _type: 'brand', ...site.brand },
    contact: { _type: 'contact', ...site.contact },
    location: { _type: 'location', ...site.location },
    navLinks: navLinks.map((l, i) => ({
      _key: `nav-${i}`,
      _type: 'navLink',
      ...l,
    })),
    legalLinks: legalLinks.map((l, i) => ({
      _key: `legal-${i}`,
      _type: 'navLink',
      ...l,
    })),
  })
}

async function seedReusables() {
  console.log('• pilot')
  const pilotImg = await uploadImage(pilot.imageSrc)
  await client.createOrReplace({
    _id: ids.pilot,
    _type: 'pilot',
    language: LANG,
    name: pilot.name,
    image: imageRef(pilotImg),
    imageAlt: pilot.imageAlt,
    yearsExperience: pilot.yearsExperience,
    bioParagraphs: paragraphsToPortableText(pilot.bioParagraphs),
    badges: pilot.badges.map((b, i) => ({
      _key: `badge-${i}`,
      _type: 'pilotBadge',
      ...b,
    })),
    ctaLabel: pilot.ctaLabel,
  })

  console.log(`• formulas (${formulas.length})`)
  for (const [i, f] of formulas.entries()) {
    await client.createOrReplace({
      _id: ids.formula(i),
      _type: 'formula',
      language: LANG,
      ...f,
      orderRank: i,
    })
  }

  console.log(`• faqs (${faqs.length})`)
  for (const [i, f] of faqs.entries()) {
    await client.createOrReplace({
      _id: ids.faq(i),
      _type: 'faq',
      language: LANG,
      ...f,
      orderRank: i,
    })
  }

  console.log(`• reviews (${reviews.length})`)
  for (const [i, r] of reviews.entries()) {
    await client.createOrReplace({
      _id: ids.review(i),
      _type: 'review',
      language: LANG,
      ...r,
      orderRank: i,
    })
  }

  console.log(`• journey (${journey.length})`)
  for (const [i, j] of journey.entries()) {
    await client.createOrReplace({
      _id: ids.journeyStep(i),
      _type: 'journeyStep',
      language: LANG,
      ...j,
      orderRank: i,
    })
  }

  console.log(`• stats (${stats.length})`)
  for (const [i, s] of stats.entries()) {
    await client.createOrReplace({
      _id: ids.stat(i),
      _type: 'stat',
      language: LANG,
      ...s,
      orderRank: i,
    })
  }

  console.log(`• gallery (${gallery.length})`)
  for (const [i, g] of gallery.entries()) {
    const imgId = await uploadImage(g.src)
    await client.createOrReplace({
      _id: ids.galleryItem(i),
      _type: 'galleryItem',
      language: LANG,
      image: imageRef(imgId),
      alt: g.alt,
      span: g.span,
      orderRank: i,
    })
  }
}

// ---- Sections builders ----

async function buildHomeSections() {
  const heroBg = await uploadImage(site.hero.backgroundImage)
  const heroClouds = await uploadImage(site.hero.cloudsImage)
  const ctaBg = await uploadImage(site.cta.backgroundImage)

  return [
    {
      _type: 'heroSection',
      _key: 'hero',
      eyebrow: site.hero.eyebrow,
      titleStart: site.hero.titleStart,
      titleEmphasized: site.hero.titleEmphasized,
      titleEnd: site.hero.titleEnd,
      subtitle: site.hero.subtitle,
      primaryCta: { _type: 'ctaButton', ...site.hero.primaryCta },
      secondaryCta: { _type: 'ctaButton', ...site.hero.secondaryCta },
      backgroundImage: imageRef(heroBg),
      backgroundAlt: site.hero.backgroundAlt,
      cloudsImage: imageRef(heroClouds),
      scrollLabel: site.hero.scrollLabel,
    },
    {
      _type: 'statsSection',
      _key: 'stats',
      eyebrow: "L'essentiel",
      heading: 'Ce que vous vivrez',
      stats: stats.map((_, i) => ref(ids.stat(i), `stat-${i}`)),
    },
    {
      _type: 'formulasSection',
      _key: 'formulas',
      eyebrow: 'Nos formules',
      heading: 'Choisissez votre expérience',
      subtext:
        'Chaque vol est confirmé par téléphone le matin selon les conditions météo. Report sans frais.',
      formulas: formulas.map((_, i) => ref(ids.formula(i), `formula-${i}`)),
    },
    {
      _type: 'cloudBreakQuoteSection',
      _key: 'quote',
      quote: site.cloudBreakQuote.quote,
    },
    {
      _type: 'journeySection',
      _key: 'journey',
      eyebrow: 'Le déroulé',
      heading: 'Comment se passe un vol',
      footer: 'Durée totale : environ 3 heures',
      steps: journey.map((_, i) => ref(ids.journeyStep(i), `step-${i}`)),
    },
    {
      _type: 'pilotSection',
      _key: 'pilot',
      eyebrow: 'Le pilote',
      pilot: { _type: 'reference', _ref: ids.pilot },
    },
    {
      _type: 'gallerySection',
      _key: 'gallery',
      eyebrow: 'Galerie',
      heading: "Le lac d'Annecy vu du ciel",
      items: gallery.map((_, i) => ref(ids.galleryItem(i), `gallery-${i}`)),
    },
    {
      _type: 'reviewsSection',
      _key: 'reviews',
      eyebrow: 'Témoignages',
      heading: 'Ils ont volé avec nous',
      reviews: reviews.map((_, i) => ref(ids.review(i), `review-${i}`)),
      aggregateRating: site.reviewsAggregate.rating,
      aggregateCountLabel: site.reviewsAggregate.countLabel,
      aggregateSource: site.reviewsAggregate.source,
    },
    {
      _type: 'faqSection',
      _key: 'faq',
      eyebrow: 'FAQ',
      heading: 'Questions fréquentes',
      faqs: faqs.map((_, i) => ref(ids.faq(i), `faq-${i}`)),
    },
    {
      _type: 'ctaSection',
      _key: 'cta',
      eyebrow: site.cta.eyebrow,
      titleStart: site.cta.titleStart,
      titleEmphasized: site.cta.titleEmphasized,
      description: site.cta.description,
      backgroundImage: imageRef(ctaBg),
      primaryCtaLabel: site.cta.primaryCtaLabel || 'Appeler',
      secondaryCtaLabel: site.cta.secondaryCtaLabel,
      locationLabel: site.cta.locationLabel,
    },
  ]
}

async function seedPages() {
  console.log('• page : home')
  await client.createOrReplace({
    _id: ids.page('home'),
    _type: 'page',
    language: LANG,
    title: 'Accueil',
    slug: { _type: 'slug', current: 'home' },
    sections: await buildHomeSections(),
    seo: {
      _type: 'seo',
      title: 'Aero Mountains — Vol en montgolfière à Annecy',
      description:
        "Décollage à l'aube, lac d'Annecy sous vos pieds, sommets alpins à perte de vue. Vol en montgolfière avec Yannick Dacheux, pilote breveté DGAC.",
    },
  })

  // ---- Pages stub (à enrichir dans le Studio) ----
  const heroBg = imageCache.get(site.hero.backgroundImage)!
  const ctaBg = imageCache.get(site.cta.backgroundImage)!

  // Page : vols (formules)
  console.log('• page : vols')
  await client.createOrReplace({
    _id: ids.page('vols'),
    _type: 'page',
    language: LANG,
    title: 'Vols',
    slug: { _type: 'slug', current: 'vols' },
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero',
        eyebrow: 'Nos vols',
        titleStart: 'Vivez votre',
        titleEmphasized: 'vol en montgolfière',
        titleEnd: '',
        subtitle: 'Trois formules pour découvrir le lac d\'Annecy depuis le ciel.',
        primaryCta: { _type: 'ctaButton', label: 'Réserver', href: '#formules' },
        secondaryCta: { _type: 'ctaButton', label: 'Nous contacter', href: '/contact' },
        backgroundImage: imageRef(heroBg),
        backgroundAlt: site.hero.backgroundAlt,
        scrollLabel: 'Découvrir',
      },
      {
        _type: 'formulasSection',
        _key: 'formulas',
        eyebrow: 'Formules',
        heading: 'Choisissez votre vol',
        formulas: formulas.map((_, i) => ref(ids.formula(i), `formula-${i}`)),
      },
      {
        _type: 'faqSection',
        _key: 'faq',
        eyebrow: 'FAQ',
        heading: 'Questions fréquentes',
        faqs: faqs.map((_, i) => ref(ids.faq(i), `faq-${i}`)),
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        eyebrow: site.cta.eyebrow,
        titleStart: site.cta.titleStart,
        titleEmphasized: site.cta.titleEmphasized,
        description: site.cta.description,
        backgroundImage: imageRef(ctaBg),
        primaryCtaLabel: 'Appeler',
        secondaryCtaLabel: site.cta.secondaryCtaLabel,
        locationLabel: site.cta.locationLabel,
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Nos vols en montgolfière à Annecy',
      description:
        'Découvrez nos formules de vol en montgolfière au-dessus du lac d\'Annecy : baptême découverte, vol privatif duo, vol famille.',
    },
  })

  // Page : bon-cadeau
  console.log('• page : bon-cadeau')
  await client.createOrReplace({
    _id: ids.page('bon-cadeau'),
    _type: 'page',
    language: LANG,
    title: 'Bon cadeau',
    slug: { _type: 'slug', current: 'bon-cadeau' },
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero',
        eyebrow: 'Idée cadeau',
        titleStart: 'Offrez un',
        titleEmphasized: 'vol en montgolfière',
        titleEnd: '',
        subtitle: 'Un souvenir inoubliable, sans date d\'expiration.',
        primaryCta: { _type: 'ctaButton', label: 'Acheter un bon', href: '#offrir' },
        secondaryCta: { _type: 'ctaButton', label: 'Nous contacter', href: '/contact' },
        backgroundImage: imageRef(heroBg),
        backgroundAlt: site.hero.backgroundAlt,
        scrollLabel: 'En savoir plus',
      },
      {
        _type: 'richTextSection',
        _key: 'content',
        heading: 'Comment ça marche',
        body: [
          headingBlock('Étape 1 : choisir une formule', 'h1'),
          lipsumBlock(
            "Sélectionnez la formule qui vous fait envie : baptême découverte, vol privatif duo ou vol famille.",
            'p1',
          ),
          headingBlock('Étape 2 : recevoir le bon', 'h2'),
          lipsumBlock(
            'Vous recevez par email un bon cadeau personnalisable que vous pouvez imprimer ou transférer au bénéficiaire.',
            'p2',
          ),
          headingBlock('Étape 3 : réservation à la convenance du bénéficiaire', 'h3'),
          lipsumBlock(
            'Le bénéficiaire choisit librement la date du vol selon les disponibilités.',
            'p3',
          ),
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        eyebrow: 'Offrir',
        titleStart: 'Offrir un',
        titleEmphasized: 'vol en montgolfière',
        description: 'Contactez-nous pour commander votre bon cadeau personnalisé.',
        backgroundImage: imageRef(ctaBg),
        primaryCtaLabel: 'Appeler',
        secondaryCtaLabel: 'Envoyer un message',
        locationLabel: site.cta.locationLabel,
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Bon cadeau vol en montgolfière à Annecy',
      description:
        "Offrez un vol en montgolfière inoubliable au-dessus du lac d'Annecy. Bon cadeau valable sans date limite.",
    },
  })

  // Page : pilote
  console.log('• page : pilote')
  await client.createOrReplace({
    _id: ids.page('pilote'),
    _type: 'page',
    language: LANG,
    title: 'Le pilote',
    slug: { _type: 'slug', current: 'pilote' },
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero',
        eyebrow: 'Votre pilote',
        titleStart: pilot.name + ',',
        titleEmphasized: 'pilote breveté DGAC',
        titleEnd: '',
        subtitle: 'Plus de 10 ans d\'expérience au-dessus du lac d\'Annecy.',
        primaryCta: { _type: 'ctaButton', label: 'Réserver un vol', href: '/vols' },
        secondaryCta: { _type: 'ctaButton', label: 'Le contacter', href: '/contact' },
        backgroundImage: imageRef(heroBg),
        backgroundAlt: site.hero.backgroundAlt,
        scrollLabel: 'Découvrir',
      },
      {
        _type: 'pilotSection',
        _key: 'pilot',
        eyebrow: 'Présentation',
        pilot: { _type: 'reference', _ref: ids.pilot },
      },
      {
        _type: 'reviewsSection',
        _key: 'reviews',
        eyebrow: 'Avis',
        heading: 'Ce qu\'ils en disent',
        reviews: reviews.map((_, i) => ref(ids.review(i), `review-${i}`)),
        aggregateRating: site.reviewsAggregate.rating,
        aggregateCountLabel: site.reviewsAggregate.countLabel,
        aggregateSource: site.reviewsAggregate.source,
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        eyebrow: 'Décollons',
        titleStart: 'Réservez votre',
        titleEmphasized: 'vol en montgolfière',
        description: 'Vol confirmé par téléphone le matin selon la météo.',
        backgroundImage: imageRef(ctaBg),
        primaryCtaLabel: 'Appeler',
        secondaryCtaLabel: 'Envoyer un message',
        locationLabel: site.cta.locationLabel,
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Yannick Dacheux, pilote montgolfière à Annecy',
      description:
        'Yannick Dacheux, pilote professionnel breveté DGAC avec 400h+ de vol et Champion de France. Découvrez le lac d\'Annecy avec un expert.',
    },
  })

  // Page : contact
  console.log('• page : contact')
  await client.createOrReplace({
    _id: ids.page('contact'),
    _type: 'page',
    language: LANG,
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    sections: [
      {
        _type: 'richTextSection',
        _key: 'intro',
        eyebrow: 'Contact',
        heading: 'Une question, un projet de vol ?',
        body: [
          lipsumBlock(
            "Nous sommes joignables 7j/7 pour toute question sur nos vols, formules ou bons cadeaux. Yannick vous répond personnellement.",
            'p1',
          ),
          headingBlock('Téléphone', 'h2'),
          lipsumBlock(site.contact.phoneDisplay, 'p2'),
          headingBlock('Email', 'h2'),
          lipsumBlock(site.contact.email, 'p3'),
          headingBlock('Lieu de décollage', 'h2'),
          lipsumBlock(site.location.short, 'p4'),
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta',
        eyebrow: 'Réserver',
        titleStart: 'Prêt à',
        titleEmphasized: 'décoller ?',
        description: 'Confirmation par téléphone le matin du vol selon la météo.',
        backgroundImage: imageRef(ctaBg),
        primaryCtaLabel: 'Appeler',
        secondaryCtaLabel: 'Envoyer un email',
        locationLabel: site.location.short,
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Contact — Aero Mountains Annecy',
      description:
        "Contactez Yannick pour réserver un vol en montgolfière au-dessus du lac d'Annecy.",
    },
  })

  // Page : mentions-legales
  console.log('• page : mentions-legales')
  await client.createOrReplace({
    _id: ids.page('mentions-legales'),
    _type: 'page',
    language: LANG,
    title: 'Mentions légales',
    slug: { _type: 'slug', current: 'mentions-legales' },
    sections: [
      {
        _type: 'richTextSection',
        _key: 'content',
        heading: 'Mentions légales',
        body: [
          headingBlock('Éditeur du site', 'h2'),
          lipsumBlock('À compléter : raison sociale, SIRET, adresse, capital social.', 'p1'),
          headingBlock('Hébergement', 'h2'),
          lipsumBlock('À compléter : nom de l\'hébergeur, adresse, téléphone.', 'p2'),
          headingBlock('Propriété intellectuelle', 'h2'),
          lipsumBlock('À compléter.', 'p3'),
        ],
      },
    ],
    seo: { _type: 'seo', title: 'Mentions légales', noIndex: true },
  })

  // Page : politique-confidentialite
  console.log('• page : politique-confidentialite')
  await client.createOrReplace({
    _id: ids.page('politique-confidentialite'),
    _type: 'page',
    language: LANG,
    title: 'Politique de confidentialité',
    slug: { _type: 'slug', current: 'politique-confidentialite' },
    sections: [
      {
        _type: 'richTextSection',
        _key: 'content',
        heading: 'Politique de confidentialité',
        body: [
          headingBlock('Données collectées', 'h2'),
          lipsumBlock('À compléter : nature des données collectées, finalité.', 'p1'),
          headingBlock('Cookies', 'h2'),
          lipsumBlock('À compléter.', 'p2'),
          headingBlock('Vos droits', 'h2'),
          lipsumBlock(
            'À compléter : droit d\'accès, de rectification, de suppression (RGPD).',
            'p3',
          ),
        ],
      },
    ],
    seo: { _type: 'seo', title: 'Politique de confidentialité', noIndex: true },
  })
}

async function seedBlog() {
  console.log('• author : Yannick')
  await client.createOrReplace({
    _id: ids.author('yannick-dacheux'),
    _type: 'author',
    name: 'Yannick Dacheux',
    slug: { _type: 'slug', current: 'yannick-dacheux' },
    avatar: imageRef(imageCache.get(pilot.imageSrc)!),
    bio: paragraphsToPortableText(pilot.bioParagraphs.slice(0, 1)),
  })

  const categories = [
    { slug: 'decouverte', title: 'Découverte', description: 'Articles pour découvrir l\'univers de la montgolfière.' },
    { slug: 'conseils', title: 'Conseils', description: 'Conseils pratiques pour préparer votre vol.' },
    { slug: 'coulisses', title: 'Coulisses', description: 'Les coulisses d\'Aero Mountains.' },
  ]

  console.log(`• categories (${categories.length})`)
  for (const c of categories) {
    await client.createOrReplace({
      _id: ids.category(c.slug),
      _type: 'category',
      language: LANG,
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      description: c.description,
    })
  }

  const posts = [
    {
      slug: 'histoire-de-la-montgolfiere',
      title: 'Une brève histoire de la montgolfière',
      excerpt:
        'Des frères Montgolfier au vol moderne au-dessus des Alpes, retour sur deux siècles d\'aérostation.',
      categorySlug: 'decouverte',
      coverImage: site.hero.backgroundImage,
      coverAlt: 'Montgolfière au-dessus du lac d\'Annecy',
    },
    {
      slug: 'meilleure-saison-vol-montgolfiere-annecy',
      title: 'Quelle est la meilleure saison pour voler à Annecy ?',
      excerpt:
        "Mai-juin et septembre-octobre offrent les conditions idéales : matins stables, lumière dorée, atterrissages confortables.",
      categorySlug: 'conseils',
      coverImage: '/images/gallery-1.jpg',
      coverAlt: 'Montgolfière au-dessus du lac d\'Annecy au lever du soleil',
    },
    {
      slug: 'que-voir-depuis-le-ciel-au-dessus-d-annecy',
      title: 'Que voir depuis le ciel au-dessus d\'Annecy ?',
      excerpt:
        "Les Aravis, la Tournette, le bout du lac, les pâturages... Le top 10 de ce qu'on voit depuis la nacelle.",
      categorySlug: 'decouverte',
      coverImage: '/images/gallery-5.jpg',
      coverAlt: 'Vue aérienne d\'Annecy',
    },
  ]

  console.log(`• posts (${posts.length})`)
  for (const p of posts) {
    const coverId = await uploadImage(p.coverImage)
    await client.createOrReplace({
      _id: ids.post(p.slug),
      _type: 'post',
      language: LANG,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      excerpt: p.excerpt,
      coverImage: imageRef(coverId),
      coverImageAlt: p.coverAlt,
      publishedAt: new Date().toISOString(),
      author: { _type: 'reference', _ref: ids.author('yannick-dacheux') },
      categories: [
        { _key: 'cat-1', _type: 'reference', _ref: ids.category(p.categorySlug) },
      ],
      body: [
        headingBlock('Introduction', 'h-intro'),
        lipsumBlock(
          "Cet article est un brouillon généré automatiquement par le seed. Va dans le Studio → Blog → Articles pour le rédiger.",
          'p-1',
        ),
        headingBlock('À développer', 'h-develop'),
        lipsumBlock(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          'p-2',
        ),
      ],
      seo: { _type: 'seo', title: p.title, description: p.excerpt },
    })
  }
}

// ============================================================
// Run
// ============================================================

async function seed() {
  console.log(`▶ Seeding (project: ${projectId}, dataset: ${dataset}, lang: ${LANG})\n`)
  await seedSiteSettings()
  await seedReusables()
  await seedPages()
  await seedBlog()
  console.log('\n✓ Seed terminé.')
  console.log(
    "⚠  N'oublie pas de RÉVOQUER ton SANITY_API_WRITE_TOKEN sur sanity.io/manage.",
  )
}

seed().catch((e) => {
  console.error('✗ seed failed:', e)
  process.exit(1)
})
