import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"

import { CodeImageFluidQuery } from "../../../graphql-types"

export const CodeImage = () => {
  const { mobileImage, desktopImage } = useStaticQuery<CodeImageFluidQuery>(
    codeImageQuery
  )

  const sources: FluidObject[] = [
    mobileImage.childImageSharp.fluid,
    {
      ...desktopImage.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]
  return <Img style={{ height: "100%" }} fluid={sources} />
}

export const codeImageQuery = graphql`
  query CodeImageFluid {
    mobileImage: file(relativePath: { eq: "code.png" }) {
      childImageSharp {
        fluid(maxWidth: 768) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    desktopImage: file(relativePath: { eq: "code-desktop.png" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
