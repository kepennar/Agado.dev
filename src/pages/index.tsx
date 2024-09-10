import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { HomePageDataQuery } from "../../graphql-types"
import { Abstract } from "../components/Abstract.component"
import { DarkModeSwitch } from "../components/DarkModeSwitch.component"
import { Experiences } from "../components/Experiences.component"
import { Head as HeadComponent } from "../components/Head"
import { AgadoLogo } from "../components/Images"
import { LanguageSwitch } from "../components/LanguageSwitch.component"
import Layout from "../components/Layout"
import { Slogan } from "../components/Slogan.component"
import { Spacer } from "../components/Spacer"
import { AvailableLanguageType } from "../i18n/i18n.model"

const ActionsContainer = styled.div`
  position: absolute;
  display: flex;
  column-gap: 0.5rem;
  top: 1rem;
  right: 1rem;
`

const Content = styled.div`
  max-width: 1080px;
  margin: 1rem auto;
`

const AvatarContainer = styled.div`
  position: relative;
  max-width: 300px;
  top: -170px;
  margin: 0 auto -170px auto;
  @media print {
    display: none;
  }
`

const Articles = styled.div`
  margin-top: 1rem;
`

function IndexPage({
  data,
  pageContext: { language },
}: {
  data: HomePageDataQuery
  pageContext: { language: AvailableLanguageType }
}) {
  return (
    <Layout language={language}>
      <ActionsContainer>
        <LanguageSwitch />
        <DarkModeSwitch />
      </ActionsContainer>
      <Content>
        <AvatarContainer>
          <AgadoLogo width="200px" />
        </AvatarContainer>
        <Spacer direction="vertical" size="1rem" />

        <Slogan slogan={data.slogan} />
        <Spacer direction="vertical" size="1rem" />
        <Articles>
          <Abstract abstract={data.abstract} socials={data.socials} />
          <Spacer direction="vertical" size="2rem" />
          <Experiences experiences={data.experiences} />
        </Articles>
      </Content>
    </Layout>
  )
}
export default IndexPage

export const HomePageQuery = graphql`
  query HomePageData($language: String!) {
    socials: allContentfulSocials(filter: { node_locale: { eq: $language } }) {
      edges {
        node {
          label
          url
          picto {
            title
            description
            url
          }
        }
      }
    }
    experiences: allContentfulExperiences(
      filter: { node_locale: { eq: $language } }
      sort: { rank: DESC }
    ) {
      edges {
        node {
          title
          project
          projectLink
          duration
          details {
            raw
          }
          rank
        }
      }
    }
    abstract: contentfulAbstract(node_locale: { eq: $language }) {
      content {
        raw
      }
    }
    slogan: contentfulSlogan(node_locale: { eq: $language }) {
      text {
        raw
      }
    }
  }
`
export const Head = () => <HeadComponent title="Kevin Pennarun" />
