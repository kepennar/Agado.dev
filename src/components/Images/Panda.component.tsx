import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"
import { PandaImageFluidQuery } from "../../../graphql-types"

export const PandaImage = () => {
  const { placeholderImage } = useStaticQuery<PandaImageFluidQuery>(
    pandaImageQuery
  )

  const fluidImage = placeholderImage.childImageSharp.fluid as FluidObject
  return (
    <Img
      style={{ borderRadius: "50px" }}
      fluid={fluidImage}
      alt="Panda avatar"
    />
  )
}

export const pandaImageQuery = graphql`
  query PandaImageFluid {
    placeholderImage: file(relativePath: { eq: "panda.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
