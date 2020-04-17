import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { FunctionComponent, Fragment } from "react"
import {
  SideProjectsQuery,
  GatsbyContentfulFixed_WithWebpFragment,
} from "../../graphql-types"
import { Spacer } from "./Spacer"

interface SideProject {
  name?: string
  description?: string
  url?: string
  image?: {
    title: string
    fixed: GatsbyContentfulFixed_WithWebpFragment
  }
}
const SideProjectLink = styled.a`
  color: inherit;
  text-decoration: none;
  width: 80%;
  min-width: 400px;
  max-width: 800px;
  &:hover {
    color: hsla(0, 0%, 0%, 0.9);
  }
`
const SideProjectContainer = styled.div`
  width: 100%;

  border: 1px solid #e6e6e6;
  padding: 2rem;
  border-radius: 5px;
  &:hover {
    border-color: #ccc;
  }

  @media (max-width: 500px) {
    width: 95vw;
    margin: auto;
  }
`
const SideProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SideProject: FunctionComponent<{
  sideProject: SideProject
}> = ({ sideProject }) => (
  <SideProjectLink href={sideProject.url}>
    <SideProjectContainer>
      <h4>{sideProject.name}</h4>
      <SideProjectContent>
        <Img
          alt={sideProject.image.title}
          title={sideProject.image.title}
          fixed={sideProject.image.fixed}
        />
        <Spacer direction="vertical" size=".5rem" />
        <div>{sideProject.description}</div>
      </SideProjectContent>
    </SideProjectContainer>
  </SideProjectLink>
)

const SideProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SideProjects: FunctionComponent = () => {
  const { sideProjects } = useStaticQuery<SideProjectsQuery>(sideProjectsQuery)
  return (
    <div>
      <h3>Projets annexes</h3>
      <Spacer direction="vertical" size="1rem" />
      <SideProjectsContainer>
        {sideProjects.edges.map(({ node }, index) => (
          <Fragment key={index}>
            <SideProject key={index} sideProject={node} />
            <Spacer direction="vertical" size=".8rem" />
          </Fragment>
        ))}
      </SideProjectsContainer>
    </div>
  )
}

export const sideProjectsQuery = graphql`
  query SideProjects {
    sideProjects: allContentfulSideProject {
      edges {
        node {
          name
          description
          url
          image {
            title
            fixed(height: 70) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
        }
      }
    }
  }
`
