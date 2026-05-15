/**
 * Seed initial Sanity — version page-based + i18n FR/EN.
 *
 * Crée :
 *   • siteSettings (FR)
 *   • Contenus réutilisables FR : pilot, formulas, faqs, reviews, journey, stats, gallery
 *   • Pages FR : home, bon-cadeau, pilote, contact, mentions-legales, politique-confidentialite
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

// Comme paragraphsToPortableText mais gère **bold** ET *italic*.
function richParagraphsToPortableText(paragraphs: string[], prefix: string) {
  return paragraphs.map((p, i) => {
    const parts = p.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
    return {
      _type: 'block' as const,
      _key: `${prefix}-${i}`,
      style: 'normal',
      markDefs: [],
      children: parts.map((part, j) => {
        const isStrong = part.startsWith('**') && part.endsWith('**')
        const isEm = !isStrong && part.startsWith('*') && part.endsWith('*')
        const text = isStrong ? part.slice(2, -2) : isEm ? part.slice(1, -1) : part
        const marks: string[] = []
        if (isStrong) marks.push('strong')
        if (isEm) marks.push('em')
        return { _type: 'span' as const, _key: `${prefix}-${i}-${j}`, text, marks }
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

async function clearDrafts(draftIds: string[]) {
  if (draftIds.length === 0) return
  let tx = client.transaction()
  for (const id of draftIds) tx = tx.delete(`drafts.${id}`)
  await tx.commit({ visibility: 'async' })
}

// ============================================================
// Données spécifiques au seed
// ============================================================

// FAQ Bon Cadeau — réponses en texte simple (le formatage RichText d'origine
// ne portait aucun marquage réel, donc rien à perdre côté contenu).
const bonCadeauFaqs: { question: string; answer: string }[] = [
  {
    question: 'Et si la personne ne peut pas voler à la date prévue ?',
    answer:
      "Pas de souci : il suffit de prévenir Yannick à l'avance. Le créneau est reporté gratuitement à une autre date, dans la limite de validité du bon cadeau (12 mois).",
  },
  {
    question: 'Et si la personne a peur le jour J ?',
    answer:
      'Le bon cadeau peut être transféré à un proche sur simple demande, sans surcoût. Aucune perte sèche.',
  },
  {
    question: 'Que se passe-t-il en cas de mauvaise météo le jour J ?',
    answer:
      "Chaque vol est confirmé par téléphone le matin selon les conditions aérologiques. En cas d'annulation, le vol est reporté gratuitement à une autre date. La sécurité prime sur tout.",
  },
  {
    question: 'Y a-t-il des contre-indications médicales ?',
    answer:
      "Le vol est déconseillé aux femmes enceintes, aux personnes ayant subi une opération récente, et aux personnes souffrant de problèmes cardiaques sévères. En cas de doute, n'hésitez pas à nous contacter avant d'offrir.",
  },
  {
    question: 'Peut-on prolonger la validité au-delà de 12 mois ?',
    answer:
      'Une prolongation peut être accordée sur demande motivée (problème de santé, indisponibilité prolongée). Contactez-nous, nous trouverons une solution.',
  },
  {
    question: 'Comment le bénéficiaire réserve-t-il son créneau ?',
    answer:
      "Toutes les informations utiles (coordonnées de Yannick, numéro unique du bon) figurent directement sur le bon cadeau. Il nous contacte par téléphone ou par mail, en direct, pour convenir d'une date. Les vols ont lieu principalement d'avril à octobre, à l'aube.",
  },
  {
    question: "Combien de temps à l'avance faut-il réserver ?",
    answer:
      'Idéalement 2 à 4 semaines avant la date souhaitée, particulièrement en haute saison (mai à septembre).',
  },
  {
    question: 'Le bon cadeau est-il remboursable ?',
    answer:
      "Le bon cadeau n'est pas remboursable. Sa validité de 12 mois et la flexibilité de réservation (avec report météo gratuit) sont conçues pour garantir que la personne en profite pleinement.",
  },
]

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
  bonCadeauFaq: (i: number) => `bc-faq-${i}-${LANG}`,
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
    { label: 'Le pilote', href: '/pilote' },
    { label: 'Bon cadeau', href: '/bon-cadeau' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]
  const legalLinks = [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
  ]
  const logoId = await uploadImage(site.brand.logo)
  await client.createOrReplace({
    _id: ids.siteSettings,
    _type: 'siteSettings',
    language: LANG,
    url: site.url,
    brand: {
      _type: 'brand',
      logo: imageRef(logoId),
      logoAlt: site.brand.logoAlt,
      siteName: site.brand.siteName,
      description: site.brand.description,
    },
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

  console.log(`• bon cadeau faqs (${bonCadeauFaqs.length})`)
  for (const [i, f] of bonCadeauFaqs.entries()) {
    await client.createOrReplace({
      _id: ids.bonCadeauFaq(i),
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
  const ctaBg = imageCache.get(site.cta.backgroundImage)!
  const pilotImg = imageCache.get(pilot.imageSrc)!

  // Page : bon-cadeau
  console.log('• page : bon-cadeau')
  const bcHeroBg = await uploadImage('/images/hero-balloon.jpg')
  const bcGal1 = await uploadImage('/images/gallery-1.jpg')
  const bcGal2 = await uploadImage('/images/gallery-2.jpg')
  const bcGal3 = await uploadImage('/images/gallery-3.jpg')
  const bcGal4 = await uploadImage('/images/gallery-4.jpg')
  const bcCtaBg = await uploadImage('/images/cta-bg.jpg')
  await client.createOrReplace({
    _id: ids.page('bon-cadeau'),
    _type: 'page',
    language: LANG,
    title: 'Bon cadeau',
    slug: { _type: 'slug', current: 'bon-cadeau' },
    sections: [
      {
        _type: 'bonCadeauHeroSection',
        _key: 'bc-hero',
        backgroundImage: imageRef(bcHeroBg),
        backgroundAlt: 'Vol en montgolfière au-dessus du lac d\'Annecy',
        titleStart: 'Offrir un vol en',
        titleEmphasized: 'montgolfière',
        titleEnd: 'à Annecy',
        subtitle: 'Offrez le ciel au-dessus du lac d\'Annecy. Le souvenir d\'une vie, prêt à être emballé.',
        priceLabel: 'À partir de',
        priceAmount: 200,
        priceCurrency: '€',
        priceSubtext: 'Une personne · Vol au lever du soleil',
        primaryCta: { _type: 'ctaButton', label: 'Offrir ce cadeau', href: '#offrir' },
        secondaryCta: { _type: 'ctaButton', label: 'Comment ça marche', href: '#comment-ca-marche' },
        reassuranceItems: [
          { _key: 'r1', _type: 'bonCadeauReassuranceItem', label: 'Envoi immédiat par mail' },
          { _key: 'r2', _type: 'bonCadeauReassuranceItem', label: 'Valable 12 mois' },
          { _key: 'r3', _type: 'bonCadeauReassuranceItem', label: '4,9 ★ sur Google' },
          { _key: 'r4', _type: 'bonCadeauReassuranceItem', label: 'Pilote breveté DGAC' },
        ],
      },
      {
        _type: 'bonCadeauOccasionsSection',
        _key: 'bc-occasions',
        eyebrow: 'Pour qui ?',
        headingStart: 'Le cadeau des',
        headingEmphasized: 'grandes occasions',
        items: [
          { _key: 'o1', _type: 'bonCadeauOccasionItem', iconKey: 'medal', label: 'Demande\nen mariage' },
          { _key: 'o2', _type: 'bonCadeauOccasionItem', iconKey: 'cake', label: 'Anniversaire' },
          { _key: 'o3', _type: 'bonCadeauOccasionItem', iconKey: 'cup', label: 'Anniversaire\nde mariage' },
          { _key: 'o4', _type: 'bonCadeauOccasionItem', iconKey: 'heart', label: 'Saint-\nValentin' },
          { _key: 'o5', _type: 'bonCadeauOccasionItem', iconKey: 'tree', label: 'Noël' },
          { _key: 'o6', _type: 'bonCadeauOccasionItem', iconKey: 'users', label: 'Fête mères\net pères' },
          { _key: 'o7', _type: 'bonCadeauOccasionItem', iconKey: 'clock', label: 'Départ\nretraite' },
          { _key: 'o8', _type: 'bonCadeauOccasionItem', iconKey: 'star', label: 'Cadeau\nspontané' },
        ],
      },
      {
        _type: 'bonCadeauExperienceSection',
        _key: 'bc-experience',
        eyebrow: "L'expérience offerte",
        headingStart: 'Le vol qu\'ils vont',
        headingEmphasized: 'vivre',
        subtitle: 'Une heure suspendue au-dessus du lac et des Alpes.',
        body: richParagraphsToPortableText(
          [
            "Avant l'aube, rendez-vous à Doussard. Le ballon se gonfle dans le silence du matin — un spectacle en soi.",
            "Puis le décollage, en douceur. Pendant une heure, le lac d'Annecy s'étire en miroir entre la Tournette, les Aravis et les Bauges. La lumière change à chaque minute.",
            "L'atterrissage se fait en pleine nature. Tradition aéronautique : un toast au champagne avant de repartir.",
          ],
          'bc-exp-body',
        ),
        linkLabel: 'Découvrir le déroulé complet d\'un vol',
        linkHref: '/#formules',
        gallery: [
          { _key: 'g1', _type: 'bonCadeauGalleryItem', image: imageRef(bcGal1), alt: 'Lever du soleil sur le lac d\'Annecy', caption: 'Lever du soleil' },
          { _key: 'g2', _type: 'bonCadeauGalleryItem', image: imageRef(bcGal2), alt: 'Vue depuis la nacelle de la montgolfière', caption: 'Vue depuis la nacelle' },
          { _key: 'g3', _type: 'bonCadeauGalleryItem', image: imageRef(bcGal3), alt: 'Survol du lac d\'Annecy en montgolfière', caption: 'Au-dessus du lac' },
          { _key: 'g4', _type: 'bonCadeauGalleryItem', image: imageRef(bcGal4), alt: 'Toast au champagne après l\'atterrissage', caption: 'Toast champagne' },
        ],
      },
      {
        _type: 'bonCadeauContentsSection',
        _key: 'bc-contents',
        eyebrow: 'Le bon cadeau',
        headingStart: 'Ce que vous',
        headingEmphasized: 'recevez',
        mockupEyebrow: 'Bon cadeau · Aero Montagnes',
        mockupTitleStart: 'Vol en',
        mockupTitleEmphasized: 'montgolfière',
        mockupTitleEnd: 'à Annecy',
        mockupRecipient: 'Pour Camille,\navec tout mon amour.',
        mockupNumberLabel: 'N° 24-A1839',
        mockupValidityLabel: 'Valable 12 mois',
        bullets: [
          {
            _key: 'b1',
            _type: 'bonCadeauContentBullet',
            body: richParagraphsToPortableText(
              ['**Personnalisé au nom du bénéficiaire** — son prénom apparaît directement sur le bon'],
              'bc-bul-1',
            ),
          },
          {
            _key: 'b2',
            _type: 'bonCadeauContentBullet',
            body: richParagraphsToPortableText(
              ['Un **message personnel** de votre part, optionnel'],
              'bc-bul-2',
            ),
          },
          {
            _key: 'b3',
            _type: 'bonCadeauContentBullet',
            body: richParagraphsToPortableText(
              ['Une **présentation soignée**, prête à être offerte'],
              'bc-bul-3',
            ),
          },
          {
            _key: 'b4',
            _type: 'bonCadeauContentBullet',
            body: richParagraphsToPortableText(
              ['**Coordonnées de Yannick et numéro unique** figurent sur le bon — tout ce qu\'il faut pour réserver'],
              'bc-bul-4',
            ),
          },
          {
            _key: 'b5',
            _type: 'bonCadeauContentBullet',
            body: richParagraphsToPortableText(
              ['Au choix : *format numérique* (envoi immédiat par mail) ou *format imprimé* (expédié sous 24 h ouvrées)'],
              'bc-bul-5',
            ),
          },
        ],
      },
      {
        _type: 'bonCadeauHowtoSection',
        _key: 'bc-howto',
        eyebrow: 'En 3 étapes',
        headingStart: 'Comment',
        headingEmphasized: 'ça marche',
        subtitle: 'Trois étapes, quelques minutes.',
        steps: [
          {
            _key: 's1',
            _type: 'bonCadeauStep',
            number: '01',
            title: 'Vous personnalisez',
            description: richParagraphsToPortableText(
              ['Vous choisissez le format (mail ou imprimé), ajoutez le prénom du bénéficiaire et un message personnel.'],
              'bc-step-1',
            ),
          },
          {
            _key: 's2',
            _type: 'bonCadeauStep',
            number: '02',
            title: 'Vous le recevez',
            description: richParagraphsToPortableText(
              ['Immédiatement par mail dans votre boîte. Ou sous quelques jours par courrier, selon votre choix.'],
              'bc-step-2',
            ),
          },
          {
            _key: 's3',
            _type: 'bonCadeauStep',
            number: '03',
            title: 'Le bénéficiaire réserve',
            description: richParagraphsToPortableText(
              ['Un appel ou message à Yannick suffit pour fixer la date. **Aucun intermédiaire.** 12 mois pour choisir le bon moment.'],
              'bc-step-3',
            ),
          },
        ],
      },
      {
        _type: 'bonCadeauFactsSection',
        _key: 'bc-facts',
        eyebrow: 'Infos pratiques',
        headingStart: 'Bon à savoir',
        headingEmphasized: 'avant d\'offrir',
        items: [
          {
            _key: 'f1',
            _type: 'bonCadeauFactItem',
            iconKey: 'clock',
            title: '12 mois de validité',
            description: 'Tout le temps de trouver le créneau parfait, dès la date d\'achat.',
          },
          {
            _key: 'f2',
            _type: 'bonCadeauFactItem',
            iconKey: 'calendar',
            title: 'Réservation en direct',
            description: 'Avec Yannick, votre pilote. Aucun intermédiaire, aucun call-center.',
          },
          {
            _key: 'f3',
            _type: 'bonCadeauFactItem',
            iconKey: 'users',
            title: 'À partir de 14 ans',
            description: 'Ou 1m35 minimum (norme constructeur du panier).',
          },
          {
            _key: 'f4',
            _type: 'bonCadeauFactItem',
            iconKey: 'pin',
            title: 'Décollage à Doussard',
            description: 'À 25 minutes d\'Annecy, au sud du lac.',
          },
          {
            _key: 'f5',
            _type: 'bonCadeauFactItem',
            iconKey: 'star',
            title: 'Durée variable',
            description: 'Environ 1 h en l\'air. Chaque vol est unique selon les conditions aérologiques.',
          },
          {
            _key: 'f6',
            _type: 'bonCadeauFactItem',
            iconKey: 'cloud',
            title: 'Report météo gratuit',
            description: 'En cas de météo défavorable le jour J, le vol est reporté sans frais.',
          },
        ],
      },
      {
        _type: 'bonCadeauTestimonialsSection',
        _key: 'bc-testimonials',
        eyebrow: 'Ils l\'ont offert',
        headingStart: 'Le cadeau qu\'ils',
        headingEmphasized: 'recommandent',
        googleRatingStars: '4,9',
        googleRatingLabel: '+50 avis Google',
        items: [
          {
            _key: 't1',
            _type: 'bonCadeauTestimonialItem',
            stars: 5,
            name: 'Sophie',
            occasion: 'anniversaire 40 ans',
            quote:
              "Offert pour les 40 ans de mon mari. Le matin du vol, je l'ai vu tellement nerveux puis tellement émerveillé. Il en parle encore six mois après. Le meilleur cadeau que je lui aie fait.",
          },
          {
            _key: 't2',
            _type: 'bonCadeauTestimonialItem',
            stars: 5,
            name: 'Thomas',
            occasion: 'anniv. de mariage',
            quote:
              "On l'a offert à mes parents pour leurs 50 ans de mariage. Ils n'avaient jamais volé. Ma mère a pleuré au décollage. Une expérience qui restera.",
          },
          {
            _key: 't3',
            _type: 'bonCadeauTestimonialItem',
            stars: 5,
            name: 'Julien',
            occasion: 'demande en mariage',
            quote:
              "Cadeau de demande en mariage. Yannick avait préparé en secret. Au-dessus du lac, j'ai sorti la bague. Elle a dit oui dans les nuages.",
          },
        ],
      },
      {
        _type: 'faqSection',
        _key: 'bc-faq',
        eyebrow: 'Questions fréquentes',
        heading: "Tout ce qu'il faut **savoir**",
        faqs: bonCadeauFaqs.map((_, i) => ref(ids.bonCadeauFaq(i), `bc-faq-ref-${i}`)),
      },
      {
        _type: 'bonCadeauFinalCtaSection',
        _key: 'bc-final',
        eyebrow: 'Prêt à offrir',
        headingLine1: 'Offrez plus',
        headingLine2: 'qu\'un cadeau.',
        subtext: 'Offrez un souvenir qu\'il ou elle racontera longtemps.',
        primaryCta: { _type: 'ctaButton', label: 'Offrir maintenant — 200 €', href: '#offrir' },
        secondaryCta: { _type: 'ctaButton', label: 'Une question ? Contactez-nous', href: '/contact' },
        reassuranceItems: [
          { _key: 'fr1', _type: 'bonCadeauReassuranceItem', label: 'Envoi immédiat par mail' },
          { _key: 'fr2', _type: 'bonCadeauReassuranceItem', label: 'Valable 12 mois' },
          { _key: 'fr3', _type: 'bonCadeauReassuranceItem', label: 'Report météo gratuit' },
        ],
        backgroundImage: imageRef(bcCtaBg),
        backgroundAlt: 'Vol en montgolfière au lever du soleil',
      },
    ],
    seo: {
      _type: 'seo',
      title: 'Offrir un vol en montgolfière à Annecy — Bon cadeau 200 € | Aero Montagnes',
      description:
        "Offrez un vol en montgolfière au-dessus du lac d'Annecy. Bon cadeau 200 €, valable 12 mois, envoi immédiat par mail. Le souvenir d'une vie.",
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
        _type: 'pilotHeroSection',
        _key: 'pilotHero',
        eyebrow: 'Votre pilote',
        titleStart: pilot.name + ',',
        titleEmphasized: 'pilote de montgolfière breveté DGAC',
        subtitle:
          'Plus de 10 ans d\'expérience au-dessus du lac d\'Annecy.\nChampion de France équipier.',
        portraitImage: imageRef(pilotImg),
        portraitAlt: pilot.imageAlt,
        badgeNumber: '10 ans',
        badgeLabel: 'au-dessus du lac',
        stats: [
          { _key: 's1', _type: 'pilotHeroStat', value: '400 h', label: 'de vol' },
          { _key: 's2', _type: 'pilotHeroStat', value: 'DGAC', label: 'Brevet professionnel' },
          { _key: 's3', _type: 'pilotHeroStat', value: 'Champion', label: 'de France équipier' },
        ],
        primaryCta: { _type: 'ctaButton', label: 'Réserver un vol', href: '/#formules' },
        secondaryCta: { _type: 'ctaButton', label: 'Contacter Yannick', href: '/contact' },
        scrollLabel: 'Son histoire',
        scrollHref: '#mon-histoire',
      },
      {
        _type: 'pilotStorySection',
        _key: 'pilotStory',
        eyebrow: 'Mon parcours',
        headingStart: 'Pilote de montgolfière à Annecy, en cinq',
        headingEmphasized: 'moments',
        headingEnd: '.',
        lede:
          'De mon premier vol à mon titre de Champion de France, le parcours qui m\'a amené à faire voler des passagers exclusivement au-dessus du lac d\'Annecy.',
        items: [
          {
            _key: 'step-1',
            _type: 'pilotStoryItem',
            date: '[année]',
            dateTime: '2014',
            title: 'Mon premier vol en montgolfière',
            body: richParagraphsToPortableText(
              [
                "À **[âge] ans**, [contexte — cadeau, rencontre, baptême de l'air]. Ce matin-là, au-dessus de [lieu], je comprends qu'on ne pilote pas une montgolfière — on la lit. *Le déclic d'une vocation.*",
              ],
              'pilot-story-1',
            ),
            tags: ['Premier vol', 'Vocation'],
          },
          {
            _key: 'step-2',
            _type: 'pilotStoryItem',
            date: '[année]',
            dateTime: '2016',
            title: 'L\'obtention du brevet de pilote DGAC',
            body: richParagraphsToPortableText(
              [
                "[X mois] de formation à [école]. Je décroche le **brevet professionnel de pilote de montgolfière délivré par la DGAC**. Les premières années, je vole partout en France : j'accumule les heures comme on collectionne des paysages.",
              ],
              'pilot-story-2',
            ),
            tags: ['Brevet DGAC', 'Formation', 'Aérostation'],
          },
          {
            _key: 'step-3',
            _type: 'pilotStoryItem',
            date: '[année]',
            dateTime: '2018',
            title: 'Le lac d\'Annecy —',
            titleEmphasized: 'tout change',
            body: richParagraphsToPortableText(
              [
                "Je découvre le **lac d'Annecy comme terrain de vol** [contexte]. Le lac respire avec les montagnes : il aspire l'air frais des **Bauges** la nuit, le souffle en thermiques douces au lever du soleil. La **Tournette** joue avec les vents d'est, le col de la **Forclaz** canalise ceux du sud. Je décide de m'installer en Haute-Savoie et d'y voler exclusivement.",
              ],
              'pilot-story-3',
            ),
            tags: ['Lac d\'Annecy', 'Massif des Bauges', 'Tournette', 'Haute-Savoie'],
          },
          {
            _key: 'step-4',
            _type: 'pilotStoryItem',
            date: '[année]',
            dateTime: '2021',
            title: 'Champion de France équipier de montgolfière',
            body: richParagraphsToPortableText(
              [
                "Aux côtés de [pilote chef], lors du championnat de France de montgolfière à [lieu]. Le titre m'apprend l'essentiel : la précision en aérostation n'est pas une question de force, c'est de l'écoute. **Anticiper, pas réagir.**",
              ],
              'pilot-story-4',
            ),
            tags: ['Champion de France', 'Compétition', 'Précision'],
          },
          {
            _key: 'step-5',
            _type: 'pilotStoryItem',
            date: 'Aujourd\'hui',
            dateTime: '2026',
            title: '400 h de vol, et toujours',
            titleEmphasized: 'la même envie',
            body: richParagraphsToPortableText(
              [
                "Je fais voler [X] à [Y] passagers par an au-dessus du lac d'Annecy, au départ du **site de décollage de Doussard**. Chaque vol reste une première fois — la lumière, le vent et les nuages ne se répètent jamais.",
              ],
              'pilot-story-5',
            ),
            tags: ['+400 h de vol', 'Décollage Doussard', 'Vol partagé / privé'],
          },
        ],
        footerCta:
          'Prêt à découvrir le lac d\'Annecy depuis le ciel,\navec un pilote breveté ?',
        footerLinkLabel: 'Découvrir les vols proposés',
        footerLinkHref: '/#formules',
        signature: '— Yannick',
        signatureRole: 'Pilote breveté DGAC · Aero Montagnes',
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
        _type: 'contactSection',
        _key: 'contact',
        // Hero
        eyebrow: 'Contact · Aero Annecy',
        titleStart: 'Parlons de',
        titleEmphasized: 'votre vol',
        subtitle:
          "Une question, une date à caler, un cadeau à offrir, ou simplement l'envie d'en savoir plus avant de réserver. Écrivez-nous — on répond, par retour, dans la journée.",
        infoLines: [
          { _key: 'il1', _type: 'infoLine', label: 'Pilote · réponse directe', value: 'Yannick — sous 24h' },
          { _key: 'il2', _type: 'infoLine', label: 'Saison de vol', value: 'Avril — Octobre' },
          { _key: 'il3', _type: 'infoLine', label: 'Base de décollage', value: `${site.location.short}` },
        ],
        // Coordonnées
        infoColumns: [
          {
            _key: 'ic1',
            _type: 'infoColumn',
            num: '01 · Téléphone',
            label: 'Le plus rapide pour une réponse →',
            value: site.contact.phoneDisplay,
            link: `tel:${site.contact.phone}`,
            hint: 'Du lundi au samedi · 8h — 19h\nVols en soirée hors saison',
          },
          {
            _key: 'ic2',
            _type: 'infoColumn',
            num: '02 · Email',
            label: 'Pour les groupes, devis ou cadeaux →',
            value: site.contact.email,
            link: `mailto:${site.contact.email}`,
            hint: 'Réponse sous 24h (jours ouvrés)',
          },
          {
            _key: 'ic3',
            _type: 'infoColumn',
            num: '03 · Adresse',
            label: 'Lieu de RDV avant chaque vol →',
            value: site.location.addressLine1,
            valueLine2: site.location.addressLine2,
            hint: 'Briefing 1h avant l\'envol\nParking gratuit sur place',
          },
        ],
        // Formulaire
        formEyebrow: 'Formulaire · une question',
        formTitleStart: 'Écrivez-nous,',
        formTitleEmphasized: 'on répond.',
        formLede:
          "Plus vous précisez votre intention — date envisagée, nombre de passagers, occasion — plus la réponse arrive vite et juste. Six champs suffisent.",
        formMeta: [
          { _key: 'fm1', _type: 'formMetaRow', key: 'Réponse', value: 'Sous 24h, jours ouvrés' },
          { _key: 'fm2', _type: 'formMetaRow', key: 'Urgent', value: `Appelez plutôt — ${site.contact.phoneDisplay}` },
          { _key: 'fm3', _type: 'formMetaRow', key: 'Confidentiel', value: 'Vos données ne sortent pas d\'Aero. RGPD.' },
        ],
        subjects: [
          { _key: 's1', _type: 'subjectOption', value: 'reservation', label: 'Réserver un vol' },
          { _key: 's2', _type: 'subjectOption', value: 'cadeau', label: 'Bon cadeau' },
          { _key: 's3', _type: 'subjectOption', value: 'prive', label: 'Vol privé / groupe' },
          { _key: 's4', _type: 'subjectOption', value: 'info', label: 'Une question' },
        ],
        paxOptions: [
          '1 personne',
          '2 personnes',
          '3 personnes',
          '4 personnes',
          '5 personnes',
          'Plus de 5 (à préciser)',
        ],
        consentText:
          "J'accepte que mes informations soient utilisées pour me répondre. Aucune newsletter, aucun partage avec des tiers.",
        submitLabel: 'Envoyer le message',
        submitHint: 'Réponse · sous 24h',
        successMessage: 'Message envoyé ✓',
        errorMessage: 'Erreur — réessayez ou appelez.',
        // Lieu / Carte
        lieuEyebrow: 'Le lieu · point de RDV',
        lieuTitleStart: 'À Doussard,',
        lieuTitleEmphasized: 'à la pointe sud du lac.',
        lieuLede:
          "Notre base de décollage se trouve au Bout-du-Lac, à 25 minutes d'Annecy. RDV 1h avant l'envol pour le briefing, le gonflage et un café — le plus beau moment du matin, après le vol.",
        lieuList: [
          `${site.location.addressLine1}, ${site.location.addressLine2}`,
          'Parking gratuit sur place, sous les platanes',
          '25 min depuis Annecy · 1h30 depuis Genève · 1h depuis Chambéry',
          'Arrêt bus Lignes Lacustres à 200 m',
        ],
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.7!2d6.2167!3d45.7747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRG91c3NhcmQsIEZyYW5jZQ!5e0!3m2!1sfr!2sfr!4v1700000000000',
      },
      {
        _type: 'faqSection',
        _key: 'faq',
        eyebrow: 'FAQ · les questions fréquentes',
        heading: "Avant d'écrire, peut-être la réponse est là.",
        lede:
          "Quatre questions qu'on reçoit toutes les semaines. Si la vôtre n'y est pas, le formulaire est juste au-dessus.",
        dark: true,
        faqs: faqs.map((_, i) => ref(ids.faq(i), `contact-faq-${i}`)),
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
  // Nettoyage : ancienne page « vols » supprimée du site
  try {
    await client.delete(ids.page('vols'))
  } catch {}
  try {
    await client.delete(`drafts.${ids.page('vols')}`)
  } catch {}
  await seedPages()
  await seedBlog()
  console.log('• cleanup drafts (pages)')
  await clearDrafts([
    ids.page('home'),
    ids.page('bon-cadeau'),
    ids.page('pilote'),
    ids.page('contact'),
    ids.page('mentions-legales'),
    ids.page('politique-confidentialite'),
  ])
  console.log('\n✓ Seed terminé.')
  console.log(
    "⚠  N'oublie pas de RÉVOQUER ton SANITY_API_WRITE_TOKEN sur sanity.io/manage.",
  )
}

seed().catch((e) => {
  console.error('✗ seed failed:', e)
  process.exit(1)
})
