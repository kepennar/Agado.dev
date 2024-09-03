import styled from "@emotion/styled"
import { Fragment, FunctionComponent, MouseEvent, useState } from "react"
import { HomePageDataQuery } from "../../graphql-types"
import { RichText } from "./RichText.component"
import { Spacer } from "./Spacer"
import { useIntl } from "react-intl"

const ExperienceContainer = styled.div`
  @media print {
    break-inside: avoid;
  }
`
const ProjectMetas = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--secondary-text-color);
`
const Project = styled.span`
  font-size: 1.05rem;
  font-weight: bold;
`
const ProjectLink = styled.a`
  color: #496396;
`
const Duration = styled.span`
  font-style: italic;
  font-size: 0.9rem;
`

const Details = styled.div`
  margin-top: 1rem;
`

type ExperiencesQueryType = HomePageDataQuery["experiences"]
type ExperienceType = ExperiencesQueryType["edges"][0]["node"]

const Experience: FunctionComponent<{
  experience: ExperienceType
}> = ({ experience }) => (
  <ExperienceContainer>
    <h3>{experience.title}</h3>
    <ProjectMetas>
      <Project>
        {experience.projectLink ? (
          <ProjectLink href={experience.projectLink}>
            {experience.project}
          </ProjectLink>
        ) : (
          experience.project
        )}
      </Project>
      <Duration>{experience.duration}</Duration>
    </ProjectMetas>

    {experience.details?.raw && (
      <Details>
        <RichText rawRichText={experience.details.raw} />
      </Details>
    )}
  </ExperienceContainer>
)

const ShowMoreContainer = styled.div`
  text-align: center;
`

export function Experiences({
  experiences,
}: {
  experiences: ExperiencesQueryType
}) {
  const intl = useIntl()

  const [showMore, setShowMore] = useState(false)

  const lastExperiences = experiences.edges.slice(0, 4)
  const oldExperiences = experiences.edges.slice(4)

  const handleShowMore = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setShowMore(true)
  }

  return (
    <div>
      <h2>{intl.formatMessage({ id: "experiences" })}</h2>
      {lastExperiences.map(({ node }, index) => (
        <Fragment key={index}>
          <Experience key={index} experience={node} />
          <Spacer direction="vertical" size="1rem" />
        </Fragment>
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
          <Fragment key={index}>
            <Experience key={index} experience={node} />
            <Spacer direction="vertical" size="1rem" />
          </Fragment>
        ))}
    </div>
  )
}
