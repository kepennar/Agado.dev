const TITLE = `Kevin Pennarun`

module.exports = {
  siteMetadata: {
    title: TITLE,
    description: `Développeur Veb`,
    author: `@kepennar`,
    siteUrl: "https://kevin.penna.run",
    image: `src/images/code.png`,
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
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0185a1`,
        theme_color: `#0185a1`,
        display: `minimal-ui`,
        icon: `src/images/panda.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: "6ww1yr2i4grh",
        accessToken:
          "c2869ad2ccb02431203c275ea22e0ebb157ef77c9ac224a8a18475188b8d4920",
        downloadLocal: true,
      },
    },
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
