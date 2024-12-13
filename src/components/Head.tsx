import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { SiteMetadataQuery } from "../../graphql-types"

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          image
        }
      }
    }
  `)
  return site?.siteMetadata
}

export function Head({
  description = "",
  image,
  lang = "fr",
  meta = [],
  title,
}: {
  title: string
  description?: string
  image?: string
  lang?: string
  meta?: { name: string; content: string }[]
}) {
  const siteMetadata = useSiteMetadata()

  const metaDescription = description ?? siteMetadata?.description
  const imageUrl = image ?? siteMetadata?.image
  const allMeta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: imageUrl,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata?.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `twitter:image`,
      content: imageUrl,
    },
    ...meta,
  ]
  return (
    <React.Fragment>
      <html lang={lang} />
      <title>{title}</title>
      {allMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
    </React.Fragment>
  )
}
