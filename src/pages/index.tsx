import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import React from "react"
import { HomePageDataQuery } from "../../graphql-types"
import { Abstract } from "../components/Abstract.component"
import { Experiences } from "../components/Experiences.component"
import { Head as HeadComponent } from "../components/Head"
import Header, {
  Actions,
  MenuLinks,
  NavbarContainer,
} from "../components/Header.component"
import { AgadoLogo } from "../components/Images"
import Layout from "../components/Layout"
import { Slogan } from "../components/Slogan.component"
import { Spacer } from "../components/Spacer"
import { AvailableLanguageType } from "../i18n/i18n.model"

const Content = styled.div`
  max-width: 1080px;
  margin: 1rem auto;
`

const AvatarContainer = styled.div`
  --offset-y: -80px;
  position: relative;
  display: flex;
  justify-content: center;

  max-width: 300px;
  top: var(--offset-y);
  margin: 0 auto var(--offset-y) auto;
  @media (min-width: 500px) {
    --offset-y: -120px;
  }
  @media print {
    display: none;
  }
`

const Articles = styled.div`
  margin-top: 1rem;
`

function IndexPage({
  data,
  pageContext: { pathName, language },
}: {
  data: HomePageDataQuery

  pageContext: { pathName: string; language: AvailableLanguageType }
}) {
  return (
    <Layout
      language={language}
      header={({ siteMetadata }) => (
        <React.Fragment>
          <Header
            siteTitle={siteMetadata.site?.siteMetadata?.title ?? ""}
            subtitle={
              <React.Fragment>
                Freelance{" "}
                <span
                  css={css`
                    white-space: nowrap;
                  `}
                >
                  @ Agado Dev
                </span>
              </React.Fragment>
            }
            withBackgroundImage
          />
          <NavbarContainer>
            <MenuLinks
              links={[
                {
                  labelId: "goToArticles",
                  href: "blog",
                  titleLabelId: "goToArticles",
                },
              ]}
              currentLanguage={language}
            />

            <Actions pagePath={pathName} />
          </NavbarContainer>
        </React.Fragment>
      )}
    >
      <Content>
        <AvatarContainer>
          <AgadoLogo />
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
export const Head = ({
  pageContext: { language },
}: {
  pageContext: {
    language: AvailableLanguageType
  }
}) => <HeadComponent lang={language} title="Kevin Pennarun" />
