import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text"
import React from "react"
import { BlogPageDataQuery } from "../../graphql-types"
import { Head as HeadComponent } from "../components/Head"
import {
  Actions,
  MenuLinks,
  NavbarContainer,
} from "../components/Header.component"
import Layout from "../components/Layout"
import { RichText } from "../components/RichText.component"
import { BlogContainer } from "../components/Typo"
import { AvailableLanguageType } from "../i18n/i18n.model"

const TitleContainer = styled.div`
  margin: 2rem 1rem;
`

export default function ({
  data,
  pageContext: { language },
}: {
  data: BlogPageDataQuery
  pageContext: { language: AvailableLanguageType; currentDate: Date }
}) {
  if (!data.contentfulBlogPost) {
    return null
  }

  const { title, content, publishDate } = data.contentfulBlogPost
  return (
    <Layout
      language={language}
      header={() => (
        <React.Fragment>
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

            <Actions currentPage="/blog" />
          </NavbarContainer>
          <TitleContainer>
            <h1>{title}</h1>
            <span className="metadata">
              {new Date(publishDate).toLocaleDateString()}
            </span>
          </TitleContainer>
        </React.Fragment>
      )}
    >
      <div>
        <BlogContainer>
          {content?.raw ? (
            <RichText
              rawRichText={content.raw}
              references={
                (content.references as ContentfulRichTextGatsbyReference[]) ??
                undefined
              }
            />
          ) : null}
        </BlogContainer>
      </div>
    </Layout>
  )
}

export const BlogPageQuery = graphql`
  query BlogPageData($id: String!, $language: String!, $currentDate: Date!) {
    contentfulBlogPost(
      id: { eq: $id }
      node_locale: { eq: $language }
      publishDate: { lte: $currentDate }
    ) {
      title
      publishDate
      content {
        raw
        references {
          __typename
          contentful_id
          title
          description
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`
export const Head = () => <HeadComponent title="Kevin Pennarun" />
