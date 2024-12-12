import styled from "@emotion/styled"
import { graphql } from "gatsby"
import React from "react"
import { BlogListPageDataQuery } from "../../../graphql-types"
import { BlogLink } from "../../components/BlogLink.component"
import { Head as HeadComponent } from "../../components/Head"
import Header, {
  Actions,
  MenuLinks,
  NavbarContainer,
} from "../../components/Header.component"
import Layout from "../../components/Layout"
import { AvailableLanguageType } from "../../i18n/i18n.model"

const BlogLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  max-width: 800px;
  margin: 0 auto;

  hr {
    background: hsl(0deg 0% 100% / 19%);
  }
`

export default function ({
  data,
  pageContext: { language },
}: {
  data: BlogListPageDataQuery
  pageContext: { language: AvailableLanguageType; currentDate: Date }
}) {
  return (
    <Layout
      language={language}
      header={() => (
        <React.Fragment>
          <Header siteTitle={"Articles"} />
          <NavbarContainer>
            <MenuLinks links={[]} currentLanguage={language} />

            <Actions currentPage="/blog" />
          </NavbarContainer>
        </React.Fragment>
      )}
    >
      <BlogLinksContainer>
        {data.allContentfulBlogPost.edges.map(({ node }, index, arr) => (
          <React.Fragment key={node.id}>
            <BlogLink blogPost={node} language={language} />
            {index !== arr.length - 1 ? <hr /> : null}
          </React.Fragment>
        ))}
      </BlogLinksContainer>
    </Layout>
  )
}

export const BlogListPageQuery = graphql`
  query BlogListPageData($language: String!, $currentDate: Date!) {
    allContentfulBlogPost(
      filter: {
        node_locale: { eq: $language }
        publishDate: { lte: $currentDate }
      }
    ) {
      edges {
        node {
          id
          title
          publishDate
          abstract {
            raw
            references {
              __typename
              contentful_id
              title
              description
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
export const Head = () => <HeadComponent title="Kevin Pennarun" />
