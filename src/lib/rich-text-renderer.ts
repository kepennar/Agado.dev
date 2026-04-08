// Rich text renderer for Contentful documents
// Converts Contentful rich text to HTML with custom node renderers

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import { getImageMetadata } from './contentful';
import { createHighlighter, type Highlighter } from 'shiki';
import { getImage } from 'astro:assets';

/**
 * Detect code blocks in markdown format (```language\ncode\n```)
 * @param content - Text content that might contain a code block
 * @returns Object with code and language, or null if no code block found
 */
function detectCodeBlock(content: string): { code: string; language: string } | null {
  // More flexible regex that handles various formats
  // Matches: ```lang\ncode\n``` or ```lang\ncode``` or ```\ncode\n```
  const codeBlockRegex = /^```([\w-]+)?\s*\n([\s\S]*?)\n?```\s*$/
  const matches = content.match(codeBlockRegex)

  if (!matches) {
    return null
  }

  const rawLanguage = matches[1] || 'text' // First capture group is the language
  const code = matches[2] || '' // Second capture group is the code content

  // For diff-* languages, Shiki supports "diff" language natively
  // which will highlight diff syntax (+ and - prefixes)
  const language = rawLanguage.startsWith('diff-') ? 'diff' : rawLanguage

  return { code, language }
}

// Cached Shiki highlighter instance
let highlighterInstance: Highlighter | null = null;

/**
 * Get or create the Shiki highlighter instance
 * Uses vitesse themes for light and dark modes
 */
async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['vitesse-light', 'vitesse-dark'],
      langs: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'json',
        'css',
        'html',
        'markdown',
        'bash',
        'shell',
        'python',
        'java',
        'go',
        'rust',
        'sql',
        'yaml',
        'toml',
        'xml',
        'diff',
        'dockerfile',
        'graphql',
        'vue',
        'svelte',
        'astro',
        'nginx',
        'php',
        'ruby',
        'c',
        'cpp',
        'csharp',
      ],
    });
  }
  return highlighterInstance;
}

// Store pre-rendered code blocks during the render pass
let preRenderedCodeBlocks: Map<number, string> = new Map();
// Store pre-rendered images during the render pass
let preRenderedImages: string[] = []

/**
 * Create render options with access to pre-rendered code blocks and images
 */
function createRenderOptions() {
  let imageCounter = 0;
  let codeBlockIndex = 0
  return {
    renderNode: {
      // Render embedded images directly using pre-rendered optimized HTML
      // Images are optimized at build time using Astro's getImage API
      [BLOCKS.EMBEDDED_ASSET]: () => {
        const preRenderedHtml = preRenderedImages[imageCounter]
        imageCounter++;

        if (preRenderedHtml) {
          return preRenderedHtml;
        }

        // Fallback if something went wrong
        return '<div class="image-error">Image failed to load</div>';
      },

      // Add ID attributes to headings for TOC navigation (FR-009)
      [BLOCKS.HEADING_1]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h1 id="${id}">${text}</h1>`
      },
      [BLOCKS.HEADING_2]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h2 id="${id}">${text}</h2>`
      },
      [BLOCKS.HEADING_3]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h3 id="${id}">${text}</h3>`
      },
      [BLOCKS.HEADING_4]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h4 id="${id}">${text}</h4>`
      },
      [BLOCKS.HEADING_5]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h5 id="${id}">${text}</h5>`
      },
      [BLOCKS.HEADING_6]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `<h6 id="${id}">${text}</h6>`
      },

      // Render table rows: first row uses <th>, subsequent rows use <td>
      [BLOCKS.TABLE]: (node: any) => {
        const rows = node.content || [];
        if (rows.length === 0) return '<table></table>';

        // First row as <thead> with <th> cells
        const headerRow = rows[0];
        const headerCells = (headerRow.content || [])
          .map((cell: any) => {
            const cellContent = cell.content?.map((p: any) =>
              p.content?.map((c: any) => c.value || '').join('') || ''
            ).join('') || '';
            return `<th>${cellContent}</th>`;
          })
          .join('');

        // Remaining rows as <tbody> with <td> cells
        const bodyRows = rows.slice(1)
          .map((row: any) => {
            const cells = (row.content || [])
              .map((cell: any) => {
                const cellContent = cell.content?.map((p: any) =>
                  p.content?.map((c: any) => c.value || '').join('') || ''
                ).join('') || '';
                return `<td>${cellContent}</td>`;
              })
              .join('');
            return `<tr>${cells}</tr>`;
          })
          .join('');

        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      },

      // Render hyperlinks with proper attributes
      [INLINES.HYPERLINK]: (node: any) => {
        const text = node.content.map((c: any) => c.value).join('')
        const uri = node.data.uri
        return `<a href="${uri}" target="_blank" rel="noopener noreferrer">${text}</a>`
      },

      // Render paragraphs with class for styling, or as code blocks if detected
      [BLOCKS.PARAGRAPH]: (node: any, next: any) => {
        // Check if this paragraph contains a code block
        const text = node.content?.[0]?.nodeType === 'text' ? node.content[0].value : ''
        const codeBlock = detectCodeBlock(text)

        if (codeBlock) {
          // Get pre-rendered HTML from the map
          const preRenderedHtml = preRenderedCodeBlocks.get(codeBlockIndex)
          codeBlockIndex++

          if (preRenderedHtml) {
            // Return the pre-rendered HTML directly
            return `<div class="my-8 rounded-lg border border-gray-300 dark:border-gray-800 overflow-hidden">${preRenderedHtml}</div>`
          }

          // Fallback if something went wrong
          return `<pre><code>${codeBlock.code}</code></pre>`
        }

        return `<p class="rich-text-paragraph">${next(node.content)}</p>`
      },
    },
  }
}

/**
 * Embedded image extracted from rich text
 */
export interface EmbeddedImage {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Result of rendering rich text with images
 */
export interface RenderResult {
  html: string
  embeddedImages: EmbeddedImage[]
}

// Counters for tracking during rendering

/**
 * Pre-scan document for code blocks and render them with Shiki
 * @param document - Contentful rich text document
 * @returns Map of code block index to rendered HTML
 */
async function prerenderCodeBlocks(document: Document): Promise<Map<number, string>> {
  const codeBlockMap = new Map<number, string>()
  const highlighter = await getHighlighter()
  let blockIndex = 0

  function traverse(node: any) {
    if (node.nodeType === BLOCKS.PARAGRAPH) {
      const text = node.content?.[0]?.nodeType === 'text' ? node.content[0].value : ''
      const codeBlock = detectCodeBlock(text)

      if (codeBlock) {
        try {
          const html = highlighter.codeToHtml(codeBlock.code, {
            lang: codeBlock.language,
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          codeBlockMap.set(blockIndex, html)
        } catch (error) {
          console.error(`Failed to highlight code block with language "${codeBlock.language}":`, error)
          // Fallback to plain pre/code
          codeBlockMap.set(blockIndex, `<pre><code>${codeBlock.code}</code></pre>`)
        }
        blockIndex++
      }
    }

    if (node.content) {
      node.content.forEach(traverse)
    }
  }

  traverse(document)
  return codeBlockMap
}

/**
 * Pre-scan document for images and render them with Astro's getImage
 * Generates optimized <picture> elements with srcset at build time
 * @param document - Contentful rich text document
 * @returns Map of image index to rendered HTML
 */
async function prerenderImages(document: Document): Promise<string[]> {
  const renderedImages: string[] = []

  async function traverse(node: any, isFirst: boolean = false) {
    if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
      const asset = node.data.target as Asset;
      const metadata = getImageMetadata(asset);

      try {
        // Generate optimized images using Astro's getImage API
        const widths = [480, 768, 896, 1200];
        const format = 'webp';

        // Calculate aspect ratio to maintain image proportions
        const aspectRatio = metadata.width / metadata.height;

        // Generate optimized versions for each width
        const sources = await Promise.all(
          widths.map(async (width) => {
            const height = Math.round(width / aspectRatio);
            const optimized = await getImage({
              src: metadata.src,
              width,
              height,
              format,
              quality: 80,
            });
            return `${optimized.src} ${width}w`;
          })
        );

        // Generate fallback image (original format)
        const fallbackWidth = 1200;
        const fallbackHeight = Math.round(fallbackWidth / aspectRatio);
        const fallbackImage = await getImage({
          src: metadata.src,
          width: fallbackWidth,
          height: fallbackHeight,
          quality: 80,
        });

        // Build picture element HTML with srcset
        const pictureHtml = `
          <picture class="rich-text-image">
            <source
              type="image/webp"
              srcset="${sources.join(', ')}"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
            />
            <img
              src="${fallbackImage.src}"
              alt="${metadata.alt}"
              width="${metadata.width}"
              height="${metadata.height}"
              loading="${isFirst ? 'eager' : 'lazy'}"
              fetchpriority="${isFirst ? 'high' : 'auto'}"
              decoding="async"
            />
          </picture>
        `.trim();

        renderedImages.push(pictureHtml);

      } catch (error) {
        console.error(`Failed to optimize image:`, error);
        // Fallback to simple img tag
        renderedImages.push(
          `<img src="${metadata.src}" alt="${metadata.alt}" class="rich-text-image" loading="lazy" />`
        );
      }


    }

    if (node.content) {
      for (let i = 0; i < node.content.length; i++) {
        await traverse(node.content[i], renderedImages.length === 0);
      }
    }
  }

  await traverse(document);
  return renderedImages;
}

/**
 * Extract embedded assets (images) from rich text document
 * Traverses the document tree and collects all embedded assets
 * @param document - Contentful rich text document
 * @returns Array of embedded images with metadata
 * @deprecated No longer needed as images are rendered directly in HTML
 */
export function extractEmbeddedAssets(document: Document): EmbeddedImage[] {
  const images: EmbeddedImage[] = []

  function traverse(node: any) {
    if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
      const asset = node.data.target as Asset
      const metadata = getImageMetadata(asset)
      images.push(metadata)
    }

    if (node.content) {
      node.content.forEach(traverse)
    }
  }

  traverse(document)
  return images
}

/**
 * Convert Contentful rich text document to HTML with syntax-highlighted code blocks and optimized images
 * Code blocks are rendered server-side using Shiki for optimal performance
 * Images are optimized at build time using Astro's getImage API
 * @param document - Contentful rich text document
 * @returns Object with HTML (images now embedded directly) and empty embeddedImages array for backward compatibility
 */
export async function renderRichText(document: Document): Promise<RenderResult> {
  if (!document) {
    console.warn('Empty document provided to renderRichText')
    return { html: '', embeddedImages: [] }
  }


  try {
    // Pre-render all code blocks with Shiki and images with Astro's getImage
    const [codeBlocks, images] = await Promise.all([
      prerenderCodeBlocks(document),
      prerenderImages(document),
    ]);

    preRenderedCodeBlocks = codeBlocks;
    preRenderedImages = images;

    // Render the document with pre-rendered code blocks and images
    const html = documentToHtmlString(document, createRenderOptions())

    // Clear the pre-rendered maps
    preRenderedCodeBlocks.clear()
    preRenderedImages = []

    // Return empty embeddedImages array for backward compatibility
    // Images are now embedded directly in the HTML
    return { html, embeddedImages: [] }
  } catch (error) {
    console.error('Failed to render rich text:', error)
    return {
      html: '<p class="error">Failed to render content</p>',
      embeddedImages: [],
    }
  }
}
