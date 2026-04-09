import { BLOCKS, type Document, type Inline, type Text, type TopLevelBlock } from '@contentful/rich-text-types'
import { describe, expect, it } from 'vitest'

import {
  extractTableOfContents,
  filterTocByLevel,
  nestTableOfContents,
  type TocItem,
} from './toc-extractor'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const headingNodeTypes: Record<HeadingLevel, TopLevelBlock['nodeType']> = {
  1: BLOCKS.HEADING_1,
  2: BLOCKS.HEADING_2,
  3: BLOCKS.HEADING_3,
  4: BLOCKS.HEADING_4,
  5: BLOCKS.HEADING_5,
  6: BLOCKS.HEADING_6,
}

function text(value: string): Text {
  return {
    nodeType: 'text',
    value,
    marks: [],
    data: {},
  }
}

function paragraph(...children: Array<Text | Inline>): TopLevelBlock {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: children,
  }
}

function heading(level: HeadingLevel, ...children: Array<Text | Inline>): TopLevelBlock {
  return {
    nodeType: headingNodeTypes[level],
    data: {},
    content: children,
  }
}

function document(...content: TopLevelBlock[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content,
  }
}

describe('extractTableOfContents', () => {
  it('collects headings in document order and builds anchor ids from text content', () => {
    const content = document(
      paragraph(text('Intro copy')),
      heading(2, text('Getting Started')),
      heading(3, text('API '), text('& Usage')),
      paragraph(text('More copy')),
      heading(2, text('FAQ 101')),
    )

    expect(extractTableOfContents(content)).toEqual([
      { level: 2, text: 'Getting Started', id: 'getting-started' },
      { level: 3, text: 'API & Usage', id: 'api--usage' },
      { level: 2, text: 'FAQ 101', id: 'faq-101' },
    ])
  })
})

describe('filterTocByLevel', () => {
  it('keeps only items up to the requested heading level', () => {
    const toc: TocItem[] = [
      { level: 2, text: 'Overview', id: 'overview' },
      { level: 3, text: 'Install', id: 'install' },
      { level: 4, text: 'Flags', id: 'flags' },
    ]

    expect(filterTocByLevel(toc, 3)).toEqual([
      { level: 2, text: 'Overview', id: 'overview' },
      { level: 3, text: 'Install', id: 'install' },
    ])
  })
})

describe('nestTableOfContents', () => {
  it('nests deeper headings under the nearest shallower parent', () => {
    const toc: TocItem[] = [
      { level: 2, text: 'Overview', id: 'overview' },
      { level: 3, text: 'Install', id: 'install' },
      { level: 4, text: 'CLI', id: 'cli' },
      { level: 3, text: 'Deploy', id: 'deploy' },
      { level: 2, text: 'Appendix', id: 'appendix' },
    ]

    expect(nestTableOfContents(toc)).toEqual([
      {
        level: 2,
        text: 'Overview',
        id: 'overview',
        children: [
          {
            level: 3,
            text: 'Install',
            id: 'install',
            children: [
              {
                level: 4,
                text: 'CLI',
                id: 'cli',
                children: [],
              },
            ],
          },
          {
            level: 3,
            text: 'Deploy',
            id: 'deploy',
            children: [],
          },
        ],
      },
      {
        level: 2,
        text: 'Appendix',
        id: 'appendix',
        children: [],
      },
    ])
  })
})
