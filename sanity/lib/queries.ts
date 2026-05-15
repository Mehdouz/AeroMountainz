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
    lede,
    dark,
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
  },
  _type == "contactSection" => {
    eyebrow,
    titleStart,
    titleEmphasized,
    subtitle,
    infoLines,
    infoColumns,
    formEyebrow,
    formTitleStart,
    formTitleEmphasized,
    formLede,
    formMeta,
    subjects,
    paxOptions,
    consentText,
    submitLabel,
    submitHint,
    successMessage,
    errorMessage,
    lieuEyebrow,
    lieuTitleStart,
    lieuTitleEmphasized,
    lieuLede,
    lieuList,
    mapEmbedUrl
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
    "slug": slug.current,
    _updatedAt,
    "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
      "lang": _key,
      "slug": value->slug.current
    }
  }
`)

// ============================================================
// Bon Cadeau (singleton par locale)
// ============================================================

export const bonCadeauPageQuery = defineQuery(`
  *[_type == "bonCadeauPage" && language == $locale][0]{
    _id,
    title,
    language,
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "ogImage": seo.ogImage.asset->url,
      "noIndex": seo.noIndex
    },
    hero{
      "backgroundImage": backgroundImage.asset->url,
      backgroundAlt,
      titleStart,
      titleEmphasized,
      titleEnd,
      subtitle,
      priceLabel,
      priceAmount,
      priceCurrency,
      priceSubtext,
      primaryCta,
      secondaryCta,
      "reassuranceItems": reassuranceItems[]{ label }
    },
    occasions{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      "items": items[]{ iconKey, label }
    },
    experience{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      subtitle,
      body,
      linkLabel,
      linkHref,
      "gallery": gallery[]{
        "src": image.asset->url,
        alt,
        caption
      }
    },
    contents{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      mockupEyebrow,
      mockupTitleStart,
      mockupTitleEmphasized,
      mockupTitleEnd,
      mockupRecipient,
      mockupNumberLabel,
      mockupValidityLabel,
      "bullets": bullets[]{ body }
    },
    howto{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      subtitle,
      "steps": steps[]{ number, title, description }
    },
    facts{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      "items": items[]{ iconKey, title, description }
    },
    testimonials{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      googleRatingStars,
      googleRatingLabel,
      "items": items[]{ quote, name, occasion, stars }
    },
    faq{
      eyebrow,
      headingStart,
      headingEmphasized,
      headingEnd,
      "items": items[]{ question, answer }
    },
    finalCta{
      eyebrow,
      headingLine1,
      headingLine2,
      subtext,
      primaryCta,
      secondaryCta,
      "reassuranceItems": reassuranceItems[]{ label },
      "backgroundImage": backgroundImage.asset->url,
      backgroundAlt
    }
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
    "slug": slug.current,
    _updatedAt,
    "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
      "lang": _key,
      "slug": value->slug.current
    }
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
