import type { GatsbyConfig } from "gatsby"

import dotenv from "dotenv"

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const TITLE = `Kevin Pennarun`
const DESCRIPTION = "Freelance @ Agado Dev"

const config = {
  contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    title: TITLE,
    description: DESCRIPTION,
    author: `@kepennar`,
    siteUrl: "https://agado.dev",
    image: `/icons/icon-192x192.png`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-pnpm",
    "gatsby-plugin-preact",
    "gatsby-plugin-graphql-codegen",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    "gatsby-plugin-sitemap",

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: TITLE,
        short_name: `Agado Dev`,
        start_url: `/`,
        background_color: `#4267b2`,
        theme_color: `#4267b2`,
        display: `minimal-ui`,
        icon: `src/images/agado-logo/agado-logo_without_text.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: config.contentfulSpaceId,
        accessToken: config.contentfulAccessToken,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    { resolve: "gatsby-plugin-svgr", options: { svgo: false } },
    "gatsby-plugin-robots-txt",

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    "gatsby-plugin-offline",
  ],
}
export default gatsbyConfig
