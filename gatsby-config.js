const dotenv = require("dotenv")

dotenv.config()

const TITLE = `Kevin Pennarun`
const DESCRIPTION = "Freelance @ Agado Dev"

const config = {
  contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}
module.exports = {
  siteMetadata: {
    title: TITLE,
    description: DESCRIPTION,
    author: `@kepennar`,
    siteUrl: "https://agado.dev",
    image: `/icons/icon-192x192.png`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        strict: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
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
        accessToken:config.contentfulAccessToken,
      },
    },
    `gatsby-plugin-svgr`,
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
