import { defineQuery } from 'next-sanity'

// ============================================================
// Site settings (singleton par locale)
// ============================================================

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && language == $locale][0]{
    url,
    brand,
    contact,
    location,
    navLinks,
    legalLinks
  }
`)

// ============================================================
// Page (avec sections expanded)
// ============================================================

const pageSectionsProjection = `
sections[]{
  _type,
  _key,
  _type == "heroSection" => {
    eyebrow,
    titleStart,
    titleEmphasized,
    titleEnd,
    subtitle,
    primaryCta,
    secondaryCta,
    "backgroundImage": backgroundImage.asset->url,
    backgroundAlt,
    "cloudsImage": cloudsImage.asset->url,
    scrollLabel
  },
  _type == "statsSection" => {
    eyebrow,
    heading,
    "stats": stats[]->{ iconKey, value, label, sub }
  },
  _type == "formulasSection" => {
    eyebrow,
    heading,
    subtext,
    "formulas": formulas[]->{ tag, title, price, priceDetail, description, features, highlight }
  },
  _type == "cloudBreakQuoteSection" => { quote, author },
  _type == "journeySection" => {
    eyebrow,
    heading,
    footer,
    "steps": steps[]->{ number, time, title, description }
  },
  _type == "pilotSection" => {
    eyebrow,
    "pilot": pilot->{
      name,
      "imageSrc": image.asset->url,
      imageAlt,
      yearsExperience,
      bioParagraphs,
      badges,
      ctaLabel
    }
  },
  _type == "gallerySection" => {
    eyebrow,
    heading,
    "items": items[]->{ "src": image.asset->url, alt, span }
  },
  _type == "reviewsSection" => {
    eyebrow,
    heading,
    "reviews": reviews[]->{ stars, text, author, date },
    aggregateRating,
    aggregateCountLabel,
    aggregateSource
  },
  _type == "faqSection" => {
    eyebrow,
    heading,
    "faqs": faqs[]->{ question, answer }
  },
  _type == "ctaSection" => {
    eyebrow,
    titleStart,
    titleEmphasized,
    description,
    "backgroundImage": backgroundImage.asset->url,
    primaryCtaLabel,
    secondaryCtaLabel,
    locationLabel
  },
  _type == "richTextSection" => {
    eyebrow,
    heading,
    body
  }
}
`

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug && language == $locale][0]{
    _id,
    title,
    "slug": slug.current,
    language,
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "ogImage": seo.ogImage.asset->url,
      "noIndex": seo.noIndex
    },
    ${pageSectionsProjection}
  }
`)

export const allPageSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current) && language == $locale]{
    "slug": slug.current
  }
`)

// ============================================================
// Blog posts
// ============================================================

export const postsListQuery = defineQuery(`
  *[_type == "post" && language == $locale] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    "coverImage": coverImage.asset->url,
    coverImageAlt,
    publishedAt,
    "author": author->{ name, "slug": slug.current }
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && language == $locale][0]{
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    "coverImage": coverImage.asset->url,
    coverImageAlt,
    publishedAt,
    "author": author->{
      name,
      "slug": slug.current,
      "avatar": avatar.asset->url,
      bio
    },
    "categories": categories[]->{ title, "slug": slug.current, description },
    body,
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "ogImage": seo.ogImage.asset->url,
      "noIndex": seo.noIndex
    }
  }
`)

export const allPostSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && language == $locale]{
    "slug": slug.current
  }
`)

// ============================================================
// Categories
// ============================================================

export const categoriesQuery = defineQuery(`
  *[_type == "category" && language == $locale] | order(title asc){
    title,
    "slug": slug.current,
    description
  }
`)
