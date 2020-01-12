import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import {
  ExperiencesQuery,
  ContentfulExperiencesDetailsRichTextNode,
} from "../../graphql-types"
import { RichText } from "./RichText.component"

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
    <h3>{experience.title}</h3>- {experience.project} - {experience.duration}
    {experience.details && <RichText richText={experience.details.json} />}
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
