import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import {
  ExperiencesQuery,
  ContentfulExperiencesDetailsRichTextNode,
} from "../../graphql-types"
import { RichText } from "./RichText.component"
import styled from "@emotion/styled"

const ProjectMetas = styled.div`
  color: #565656;
  display: flex;
  justify-content: space-between;
`
const Project = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`
const Duration = styled.span`
  font-style: italic;
  font-size: 0.9rem;
`

const Details = styled.div`
  margin-top: 1rem;
`

interface Experience {
  title?: string
  project?: string
  duration?: string
  details?: Pick<ContentfulExperiencesDetailsRichTextNode, "json"> | null
  rank?: number
}
const Experience: FunctionComponent<{
  experience: Experience
}> = ({ experience }) => (
  <div>
    <h3>{experience.title}</h3>
    <ProjectMetas>
      <Project>{experience.project}</Project>
      <Duration>{experience.duration}</Duration>
    </ProjectMetas>

    {experience.details && (
      <Details>
        <RichText richText={experience.details.json} />
      </Details>
    )}
  </div>
)

export const Experiences: FunctionComponent = () => {
  const { experiences } = useStaticQuery<ExperiencesQuery>(experiencesQuery)

  return (
    <div>
      {experiences.edges.map(({ node }, index) => (
        <Experience key={index} experience={node} />
      ))}
    </div>
  )
}

export const experiencesQuery = graphql`
  query Experiences {
    experiences: allContentfulExperiences(sort: { fields: rank, order: ASC }) {
      edges {
        node {
          title
          project
          duration
          details {
            json
          }
          rank
        }
      }
    }
  }
`
