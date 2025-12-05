// Utility functions for the application

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500')
 * cn('px-4', condition && 'py-2', { 'bg-red-500': isError })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date for display
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (defaults to 'fr-FR')
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, locale: string = 'fr-FR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calculate reading time for text content
 * Assumes average reading speed of 200 words per minute
 * @param text - Text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 150)
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Slugify a string for URL-safe usage
 * @param text - Text to slugify
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, '') // Remove non-word characters except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, '') // Remove trailing hyphens
}

/**
 * Check if code is running on the client (browser)
 * @returns true if running in browser, false if SSR
 */
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Check if code is running on the server (SSR)
 * @returns true if running on server, false if client
 */
export function isServer(): boolean {
  return !isClient()
}

/**
 * Safely access localStorage
 * Returns null if localStorage is not available (SSR)
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isClient()) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient()) return
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silently fail if localStorage is not available
    }
  },

  removeItem: (key: string): void => {
    if (!isClient()) return
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  },
}
