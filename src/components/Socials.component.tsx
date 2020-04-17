import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import Img from "gatsby-image"

import { SocialsQuery } from "../../graphql-types"
import styled from "@emotion/styled"
import { Spacer } from "./Spacer"

const SocialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const SocialLink = styled.a`
  margin: 1rem;

  @media (max-width: 500px) {
    margin: 0.5rem;
  }
`
const SocialImage = styled.img`
  height: 25px;
  @media (max-width: 500px) {
    height: 20px;
  }
`

export const Socials: FunctionComponent = () => {
  const { socials } = useStaticQuery<SocialsQuery>(socialsQuery)
  return (
    <SocialsContainer>
      {socials.edges.map(({ node }, index) => (
        <SocialLink key={index} href={node.url}>
          {node.picto.fixed && (
            <Img
              alt={node.picto.title}
              title={node.picto.title}
              fixed={node.picto.fixed}
            />
          )}
          {!node.picto.fixed && (
            <SocialImage
              alt={node.picto.title}
              title={node.picto.title}
              src={node.picto.file.url}
            />
          )}
          <Spacer direction="vertical" size="0.5rem" />
        </SocialLink>
      ))}
    </SocialsContainer>
  )
}

export const socialsQuery = graphql`
  query Socials {
    socials: allContentfulSocials {
      edges {
        node {
          label
          url
          picto {
            title
            file {
              url
            }
            fixed(height: 25) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
        }
      }
    }
  }
`
