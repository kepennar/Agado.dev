# Agado.dev - Astro Portfolio & Blog

Modern personal portfolio and technical blog built with Astro, featuring content managed through Contentful CMS.

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build/) - Static Site Generation (SSG)
- **UI Components**: React 19 with partial hydration
- **Styling**: Tailwind CSS 3.x
- **CMS**: Contentful (headless CMS)
- **Syntax Highlighting**: Shiki with custom transformers
- **Icons**: Lucide React
- **Deployment**: Static hosting (Netlify, Vercel, or CDN)

## Features

- ✅ Static site generation for optimal performance
- ✅ Contentful CMS integration for blog content
- ✅ Internationalization (French & English)
- ✅ Dark mode with localStorage persistence
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with meta tags, sitemap, robots.txt
- ✅ Rich text content rendering with embedded images
- ✅ Syntax highlighting for code blocks
- ✅ Table of contents for blog posts
- ✅ Progressive image loading (lazy load, WebP support)
- ✅ PWA manifest

## Quick Start

For detailed setup instructions, see [specs/001-gatsby-to-astro/quickstart.md](../specs/001-gatsby-to-astro/quickstart.md)

### Prerequisites

- Node.js 20+ (LTS)
- pnpm 9+
- Contentful account with Space ID and Access Token

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and add your Contentful credentials
3. Install dependencies: `pnpm install`

### Development

```bash
pnpm dev
```

Visit http://localhost:4321

### Build

```bash
pnpm build
```

Output: `dist/` directory

## Deployment

The site is fully static and can be deployed to any static hosting service.

## Migration Notes

This project is the Astro migration of the previous Gatsby-based website.
Migration specification: [specs/001-gatsby-to-astro/](../specs/001-gatsby-to-astro/)
