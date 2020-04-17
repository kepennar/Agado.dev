import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent, useState } from "react"
import {
  ContentfulExperiencesDetailsRichTextNode,
  ExperiencesQuery,
} from "../../graphql-types"
import { RichText } from "./RichText.component"
import { Spacer } from "./Spacer"

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

const ShowMoreContainer = styled.div`
  text-align: center;
`

export const Experiences: FunctionComponent = () => {
  const { experiences } = useStaticQuery<ExperiencesQuery>(experiencesQuery)
  const [showMore, setShowMore] = useState(false)

  const lastExperiences = experiences.edges.slice(0, 4)
  const oldExperiences = experiences.edges.slice(4)

  const handleShowMore = () => {
    setShowMore(true)
  }

  return (
    <div>
      {lastExperiences.map(({ node }, index) => (
        <>
          <Experience key={index} experience={node} />
          <Spacer direction="vertical" size="1rem" />
        </>
      ))}
      {!showMore && (
        <ShowMoreContainer>
          <a href="" onClick={handleShowMore}>
            VOIR +
          </a>
          <Spacer direction="vertical" size="1rem" />
        </ShowMoreContainer>
      )}
      {showMore &&
        oldExperiences.map(({ node }, index) => (
          <>
            <Experience key={index} experience={node} />
            <Spacer direction="vertical" size="1rem" />
          </>
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
