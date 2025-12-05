// Table of contents extractor for Contentful rich text documents
// Extracts headings from rich text for navigation (FR-009)

import type { Document } from '@contentful/rich-text-types'

/**
 * Represents a table of contents item
 */
export interface TocItem {
  level: number // 1-6 for h1-h6
  text: string
  id: string // Slugified for anchor links
}

/**
 * Extract table of contents from a Contentful rich text document
 * Traverses the document tree and collects all heading nodes
 * @param document - Contentful rich text document
 * @returns Array of TOC items with level, text, and anchor ID
 */
export function extractTableOfContents(document: Document): TocItem[] {
  const toc: TocItem[] = []

  /**
   * Recursively traverse nodes to find headings
   */
  function traverse(node: any): void {
    if (!node) return

    // Check if node is a heading
    if (node.nodeType && node.nodeType.startsWith('heading-')) {
      const level = parseInt(node.nodeType.split('-')[1], 10)

      // Extract text content from heading node
      const text = extractTextFromNode(node)

      // Generate anchor ID (same logic as in rich-text-renderer.ts)
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

      toc.push({ level, text, id })
    }

    // Recursively traverse child nodes
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse)
    }
  }

  traverse(document)
  return toc
}

/**
 * Extract plain text content from a node
 * Handles nested text nodes and marks
 */
function extractTextFromNode(node: any): string {
  if (!node) return ''

  // If it's a text node, return its value
  if (node.nodeType === 'text') {
    return node.value || ''
  }

  // If it has content, recursively extract text from children
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(extractTextFromNode).join('')
  }

  return ''
}

/**
 * Filter TOC items by level
 * Useful for creating hierarchical navigation
 */
export function filterTocByLevel(toc: TocItem[], maxLevel: number): TocItem[] {
  return toc.filter(item => item.level <= maxLevel)
}

/**
 * Group TOC items by parent-child relationships
 * Creates a nested structure for hierarchical display
 */
export interface NestedTocItem extends TocItem {
  children: NestedTocItem[]
}

export function nestTableOfContents(toc: TocItem[]): NestedTocItem[] {
  const nested: NestedTocItem[] = []
  const stack: NestedTocItem[] = []

  for (const item of toc) {
    const nestedItem: NestedTocItem = { ...item, children: [] }

    // Find the appropriate parent in the stack
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      // Top-level item
      nested.push(nestedItem)
    } else {
      // Add as child of the last item in stack
      stack[stack.length - 1].children.push(nestedItem)
    }

    stack.push(nestedItem)
  }

  return nested
}
