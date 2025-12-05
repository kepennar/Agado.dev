// TypeScript type definitions for Contentful entities
// Based on data-model.md and contracts/contentful-schema.json

import type { Document } from '@contentful/rich-text-types'
import type { Asset, Entry, EntrySkeletonType } from 'contentful'

// Locale types - Note: Contentful space may use 'fr'/'en' or 'fr-FR'/'en-US' depending on configuration
export type ContentfulLocale = 'fr-FR' | 'en-US' | 'fr' | 'en' | '*'

// BlogPost entity skeleton
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost'
  fields: {
    title: string
    slug: string
    publishDate: string // ISO 8601 date string
    abstract: Document
    content: Document
  }
}

export type BlogPost = Entry<BlogPostSkeleton, undefined, string>

// Experience entity skeleton
export interface ExperienceSkeleton extends EntrySkeletonType {
  contentTypeId: 'experiences'
  fields: {
    title: string
    project: string
    projectLink?: string
    duration: string
    details: Document
    rank: number
  }
}

export type Experience = Entry<ExperienceSkeleton, undefined, string>

// Abstract entity skeleton
export interface AbstractSkeleton extends EntrySkeletonType {
  contentTypeId: 'abstract'
  fields: {
    content: Document
  }
}

export type Abstract = Entry<AbstractSkeleton, undefined, string>

// Slogan entity skeleton
export interface SloganSkeleton extends EntrySkeletonType {
  contentTypeId: 'slogan'
  fields: {
    text: Document
  }
}

export type Slogan = Entry<SloganSkeleton, undefined, string>

// Social entity skeleton
export interface SocialSkeleton extends EntrySkeletonType {
  contentTypeId: 'socials'
  fields: {
    label: string
    url: string
    picto: Asset
  }
}

export type Social = Entry<SocialSkeleton, undefined, string>

// ContentAsset type (Contentful native Asset)
export type ContentAsset = Asset
