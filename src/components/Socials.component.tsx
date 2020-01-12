import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"

import { SocialsQuery } from "../../graphql-types"
import styled from "@emotion/styled"

const SocialsContainer = styled.div`
  display: flex;
`

const SocialLink = styled.a`
  margin: 1rem;
`
const SocialImage = styled.img`
  width: 60px;
`

export const Socials: FunctionComponent = () => {
  const { socials } = useStaticQuery<SocialsQuery>(socialsQuery)

  return (
    <SocialsContainer>
      {socials.edges.map(({ node }, index) => (
        <div key={index}>
          <SocialLink href={node.url}>
            <SocialImage src={node.picto.file.url} title={node.label} />
          </SocialLink>
        </div>
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
            file {
              url
            }
          }
        }
      }
    }
  }
`
