// Contentful CMS client and data fetching functions
// Implements FR-028 (fail on CMS errors), FR-029 (language fallback), FR-030 (missing asset handling)

import { createClient } from 'contentful'
import type {
  Abstract,
  AbstractSkeleton,
  BlogPost,
  BlogPostSkeleton,
  ContentAsset,
  ContentfulLocale,
  Experience,
  ExperienceSkeleton,
  Slogan,
  SloganSkeleton,
  Social,
  SocialSkeleton,
} from './contentful.types'

// Environment variable validation (FR-028: fail build on missing credentials)
const CONTENTFUL_SPACE_ID = import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    'Build failed: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables are required. ' +
    'Please configure them in your .env file.'
  )
}

// Create Contentful client
export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
})

/**
 * Helper function to handle locale fallback (FR-029)
 * If the requested locale is not available, fallback to default locale
 */
async function fetchWithLocaleFallback(
  fetchFn: (params: any) => Promise<any>,
  params: any,
  locale?: ContentfulLocale
): Promise<any> {
  try {
    return await fetchFn(params)
  } catch (error: any) {
    // FR-029: If requested locale doesn't exist, silently fall back to default locale
    if (error.message?.includes('Unknown locale')) {
      // Silent fallback - only log in development
      if (import.meta.env.DEV) {
        console.debug(`[Contentful] Locale "${locale}" not available, using default locale`)
      }
      // Remove locale from params and retry
      const { locale: _, ...fallbackParams } = params
      return await fetchFn(fallbackParams)
    }
    throw error
  }
}

/**
 * Get all published blog posts
 * Filters by publishDate <= current date (FR-005)
 * Sorted by newest first
 * Implements FR-029: Silent fallback to French if English locale not available
 */
export async function getBlogPosts(locale?: ContentfulLocale): Promise<BlogPost[]> {
  try {
    const currentDate = new Date().toISOString()
    const queryParams = {
      content_type: 'blogPost' as const,
      'fields.publishDate[lte]': currentDate,
      order: ['-fields.publishDate'] as const,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await fetchWithLocaleFallback(
      (params) => contentfulClient.getEntries<BlogPostSkeleton>(params as any),
      queryParams,
      locale
    )

    if (!response || !response.items) {
      throw new Error('Contentful returned invalid response for blog posts')
    }

    return response.items as BlogPost[]
  } catch (error) {
    console.error(`Failed to fetch blog posts from Contentful:`, error)
    throw new Error(
      `Build failed: Unable to fetch blog posts from Contentful (locale: ${locale}). ` +
      `Ensure credentials are correct and the Contentful service is available.`
    )
  }
}

/**
 * Get a single blog post by slug
 * Implements FR-029: Silent fallback to French if English content missing
 */
export async function getBlogPost(
  slug: string,
  locale?: ContentfulLocale
): Promise<BlogPost | null> {
  try {
    const queryParams = {
      content_type: 'blogPost' as const,
      'fields.slug': slug,
      limit: 1,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await contentfulClient.getEntries<BlogPostSkeleton>(queryParams as any)

    // FR-029: If English content missing, silently fall back to default locale
    if ((!response.items || response.items.length === 0) && (locale === 'en-US' || locale === 'en')) {
      console.log(`Blog post "${slug}" not found in ${locale}, falling back to default locale`)
      const fallbackResponse = await contentfulClient.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost' as const,
        'fields.slug': slug,
        limit: 1,
      } as any)

      if (!fallbackResponse.items || fallbackResponse.items.length === 0) {
        return null
      }

      return fallbackResponse.items[0] as BlogPost
    }

    if (!response.items || response.items.length === 0) {
      return null
    }

    return response.items[0] as BlogPost
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}":`, error)
    throw new Error(
      `Build failed: Unable to fetch blog post "${slug}" from Contentful (locale: ${locale})`
    )
  }
}

/**
 * Get all experiences sorted by rank (descending)
 * Implements FR-029: Silent fallback to French if English locale not available
 */
export async function getExperiences(locale?: ContentfulLocale): Promise<Experience[]> {
  try {
    const queryParams = {
      content_type: 'experiences' as const,
      order: ['-fields.rank'] as const,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await fetchWithLocaleFallback(
      (params) => contentfulClient.getEntries<ExperienceSkeleton>(params as any),
      queryParams,
      locale
    )

    if (!response || !response.items) {
      throw new Error('Contentful returned invalid response for experiences')
    }

    return response.items as Experience[]
  } catch (error) {
    console.error(`Failed to fetch experiences from Contentful:`, error)
    throw new Error(
      `Build failed: Unable to fetch experiences from Contentful (locale: ${locale})`
    )
  }
}

/**
 * Get the abstract (professional bio)
 * Only one abstract exists per locale
 * Implements FR-029: Silent fallback to French if English locale not available
 */
export async function getAbstract(locale?: ContentfulLocale): Promise<Abstract | null> {
  try {
    const queryParams = {
      content_type: 'abstract' as const,
      limit: 1,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await fetchWithLocaleFallback(
      (params) => contentfulClient.getEntries<AbstractSkeleton>(params as any),
      queryParams,
      locale
    )

    if (!response.items || response.items.length === 0) {
      throw new Error(`No abstract found for locale ${locale}`)
    }

    return response.items[0] as Abstract
  } catch (error) {
    console.error(`Failed to fetch abstract from Contentful:`, error)
    throw new Error(
      `Build failed: Unable to fetch abstract from Contentful (locale: ${locale})`
    )
  }
}

/**
 * Get the slogan (tagline)
 * Only one slogan exists per locale
 * Implements FR-029: Silent fallback to French if English locale not available
 */
export async function getSlogan(locale?: ContentfulLocale): Promise<Slogan | null> {
  try {
    const queryParams = {
      content_type: 'slogan' as const,
      limit: 1,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await fetchWithLocaleFallback(
      (params) => contentfulClient.getEntries<SloganSkeleton>(params as any),
      queryParams,
      locale
    )

    if (!response.items || response.items.length === 0) {
      throw new Error(`No slogan found for locale ${locale}`)
    }

    return response.items[0] as Slogan
  } catch (error) {
    console.error(`Failed to fetch slogan from Contentful:`, error)
    throw new Error(
      `Build failed: Unable to fetch slogan from Contentful (locale: ${locale})`
    )
  }
}

/**
 * Get all social media links
 * Implements FR-029: Silent fallback to French if English locale not available
 */
export async function getSocials(locale?: ContentfulLocale): Promise<Social[]> {
  try {
    const queryParams = {
      content_type: 'socials' as const,
      ...(locale && locale !== '*' ? { locale } : {}),
    }

    const response = await fetchWithLocaleFallback(
      (params) => contentfulClient.getEntries<SocialSkeleton>(params as any),
      queryParams,
      locale
    )

    if (!response || !response.items) {
      throw new Error('Contentful returned invalid response for socials')
    }

    return response.items as Social[]
  } catch (error) {
    console.error(`Failed to fetch socials from Contentful:`, error)
    throw new Error(
      `Build failed: Unable to fetch socials from Contentful (locale: ${locale})`
    )
  }
}

/**
 * Get image URL from Contentful asset
 * Implements FR-030: Returns placeholder image if asset is missing
 */
export function getImageUrl(asset: ContentAsset | null | undefined): string {
  if (!asset?.fields?.file?.url) {
    console.warn('Image asset missing or invalid, using placeholder')
    return '/images/placeholder.png'
  }

  // Contentful URLs don't include protocol, add https:
  const url = asset.fields.file.url
  // Check if url is a string and starts with //
  if (typeof url === 'string' && url.startsWith('//')) {
    return `https:${url}`
  }
  return typeof url === 'string' ? url : '/images/placeholder.png'
}

/**
 * Get optimized image metadata for Astro Image component
 * Returns image URL with dimensions and alt text for use with Astro's Image component
 * Implements FR-030: Returns placeholder metadata if asset is missing
 */
export function getImageMetadata(asset: ContentAsset | null | undefined) {
  if (!asset?.fields?.file?.url) {
    console.warn('Image asset missing or invalid, using placeholder metadata')
    return {
      src: '/images/placeholder.png',
      width: 800,
      height: 600,
      alt: 'Placeholder image',
    }
  }

  const file = asset.fields.file
  const url = typeof file.url === 'string' && file.url.startsWith('//')
    ? `https:${file.url}`
    : file.url

  // Extract dimensions from Contentful metadata
  const details = file.details as any
  const width = details?.image?.width || 800
  const height = details?.image?.height || 600

  // Get alt text from title or description
  const alt = (asset.fields.title || asset.fields.description || 'Image') as string

  return {
    src: url as string,
    width,
    height,
    alt,
  }
}

/**
 * Generate Contentful image transformation URL
 * Uses Contentful's Images API for optimization
 * @param asset - Contentful asset
 * @param options - Transformation options (width, format, quality)
 * @returns Optimized image URL with query parameters
 */
export function getContentfulImageUrl(
  asset: ContentAsset | null | undefined,
  options: {
    width?: number
    format?: 'webp' | 'avif' | 'jpg' | 'png'
    quality?: number
  } = {}
): string {
  const baseUrl = getImageUrl(asset)
  if (baseUrl === '/images/placeholder.png') {
    return baseUrl
  }

  const { width = 1200, format = 'webp', quality = 80 } = options

  // Contentful Images API parameters
  const params = new URLSearchParams({
    w: width.toString(),
    fm: format,
    q: quality.toString(),
    fit: 'fill',
  })

  return `${baseUrl}?${params.toString()}`
}
