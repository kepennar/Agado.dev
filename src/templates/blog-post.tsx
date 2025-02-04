import styled from "@emotion/styled";
import { graphql } from "gatsby";
import type { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text";
import React from "react";
import type { BlogPageDataQuery } from "../../graphql-types";
import {
	RichText,
	richTextToString,
} from "../components/ContentfulRichText/RichText.component";
import { Toc } from "../components/ContentfulRichText/Toc.component";
import { Head as HeadComponent } from "../components/Head";
import {
	Actions,
	MenuLinks,
	NavbarContainer,
} from "../components/Header.component";
import Layout from "../components/Layout";
import { BlogContainer } from "../components/Typo";
import type { AvailableLanguageType } from "../i18n/i18n.model";

const TitleContainer = styled.div`
  max-width: 1024px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export default function ({
	data,
	pageContext: { pathName, language },
}: {
	data: BlogPageDataQuery;

	pageContext: {
		pathName: string;
		language: AvailableLanguageType;
		currentDate: Date;
	};
}) {
	if (!data.contentfulBlogPost) {
		return null;
	}

	const { title, content, publishDate } = data.contentfulBlogPost;
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

						<Actions pagePath={pathName} />
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
					{content?.raw ? <Toc contentFulRaw={content.raw} /> : null}
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
	);
}

export const BlogPageQuery = graphql`
  query BlogPageData($slug: String!, $language: String!, $currentDate: Date!) {
    contentfulBlogPost(
      slug: { eq: $slug }
      node_locale: { eq: $language }
      publishDate: { lte: $currentDate }
    ) {
      title
      publishDate
      abstract {
        raw
        references {
          __typename
          contentful_id
          gatsbyImageData(
            width: 500
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
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
`;
export function Head({
	data,
	pageContext: { language },
}: {
	data: BlogPageDataQuery;
	pageContext: {
		language: AvailableLanguageType;
	};
}) {
	const imageData =
		data.contentfulBlogPost?.abstract?.references?.[0]?.gatsbyImageData;
	const imageSrc = imageData
		? imageData.images.sources[0]?.srcSet
				.split("\n")
				.map((src: string) => src.split(" ")[0])
				.at(-1)
		: undefined;

	return (
		<HeadComponent
			lang={language}
			title={data.contentfulBlogPost?.title ?? ""}
			description={
				richTextToString(data.contentfulBlogPost?.abstract?.raw ?? undefined) ??
				undefined
			}
			image={imageSrc}
		/>
	);
}
