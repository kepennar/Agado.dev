import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React from "react";
import type { BlogListPageDataQuery } from "../../../graphql-types";
import { BlogLink } from "../../components/BlogLink.component";
import { Head as HeadComponent } from "../../components/Head";
import Header, {
	Actions,
	MenuLinks,
	NavbarContainer,
} from "../../components/Header.component";
import Layout from "../../components/Layout";
import type { AvailableLanguageType } from "../../i18n/i18n.model";

const BlogLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  max-width: 800px;
  margin: 0 auto;

  hr {
    background: var(--secondary-background-color);
  }
`;

export default function ({
	data,
	pageContext: { pathName, language },
}: {
	data: BlogListPageDataQuery;
	pageContext: {
		pathName: string;
		language: AvailableLanguageType;
		currentDate: Date;
	};
}) {
	return (
		<Layout
			language={language}
			header={() => (
				<React.Fragment>
					<Header siteTitle={"Articles"} />
					<NavbarContainer>
						<MenuLinks links={[]} currentLanguage={language} />

						<Actions pagePath={pathName} />
					</NavbarContainer>
				</React.Fragment>
			)}
		>
			<BlogLinksContainer>
				{data.allContentfulBlogPost.edges
					.filter(withSlug)
					.map(({ node }, index, arr) => (
						<React.Fragment key={node.slug}>
							<BlogLink blogPost={node} language={language} />
							{index !== arr.length - 1 ? <hr /> : null}
						</React.Fragment>
					))}
			</BlogLinksContainer>
		</Layout>
	);
}

type BlogListEdgeType =
	BlogListPageDataQuery["allContentfulBlogPost"]["edges"][0];
function withSlug(edge: BlogListEdgeType): edge is BlogListEdgeType & {
	node: BlogListEdgeType["node"] & { slug: string };
} {
	return !!edge.node.slug;
}

export const BlogListPageQuery = graphql`
  query BlogListPageData($language: String!, $currentDate: Date!) {
    allContentfulBlogPost(
      filter: {
        node_locale: { eq: $language }
        publishDate: { lte: $currentDate }
      }
      sort: { publishDate: DESC }
    ) {
      edges {
        node {
          slug
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
`;
export const Head = ({
	pageContext: { language },
}: {
	pageContext: {
		language: AvailableLanguageType;
	};
}) => <HeadComponent lang={language} title="Kevin Pennarun" />;
