// Estimated reading time calculator for Contentful rich text documents

import type { Document } from '@contentful/rich-text-types'

/**
 * Extract all text content from a Contentful rich text document node
 * Reuses the traversal pattern from toc-extractor.ts
 */
function extractAllText(node: any): string {
  if (!node) return ''

  // Text node
  if (node.nodeType === 'text') {
    return node.value || ''
  }

  // Recursively extract from children
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(extractAllText).join(' ')
  }

  return ''
}

/**
 * Estimate reading time for a Contentful rich text document
 * @param document - Contentful rich text Document
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function estimateReadingTime(document: Document): number {
  const text = extractAllText(document)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const wordsPerMinute = 200
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, minutes)
}
