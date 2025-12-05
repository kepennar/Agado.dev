// Internationalization (i18n) model
// Defines available languages and default language constants

import { fr } from './fr'
import { en } from './en'
import type { Translations } from './fr'
import type { ContentfulLocale } from '@/lib/contentful.types'

/**
 * Available languages in the application
 */
export const AVAILABLE_LANGUAGES = ['fr', 'en'] as const

/**
 * Language type derived from available languages
 */
export type Language = typeof AVAILABLE_LANGUAGES[number]

/**
 * Default language (French)
 */
export const DEFAULT_LANGUAGE: Language = 'fr'

/**
 * Map UI language codes to Contentful locale codes
 * Note: Update these based on your Contentful space locale configuration
 * Common formats: 'fr-FR'/'en-US' or just 'fr'/'en' or use '*' for default
 */
export const LANGUAGE_TO_LOCALE: Record<Language, string> = {
  fr: '*', // Using '*' to get default locale from Contentful
  en: 'en', // Will be updated once English locale is confirmed in Contentful
}

/**
 * Language display names for UI
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
}

/**
 * Get Contentful locale from UI language
 */
export function getContentfulLocale(language: Language): string {
  return LANGUAGE_TO_LOCALE[language]
}

/**
 * Check if a language is valid
 */
export function isValidLanguage(lang: string): lang is Language {
  return AVAILABLE_LANGUAGES.includes(lang as Language)
}

/**
 * Get translations for a given language
 */
export function getTranslations(lang: Language): Translations {
  return lang === 'en' ? en : fr
}

/**
 * Get Contentful locale parameter for data fetching
 * Returns undefined for default locale (French), 'en' for English
 */
export function getContentfulLocaleParam(lang: Language): ContentfulLocale | undefined {
  return lang === 'en' ? 'en' : undefined
}

/**
 * Get date locale string (e.g. 'fr-FR', 'en-US')
 */
export function getDateLocale(lang: Language): string {
  return lang === 'en' ? 'en-US' : 'fr-FR'
}

/**
 * Prefix a path with the language segment (no-op for default locale)
 */
export function localizedUrl(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) return path
  return `/en${path === '/' ? '' : path}`
}
