import styled from "@emotion/styled";
import type { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text";
import { ArrowRight } from "lucide-react";
import { useIntl } from "react-intl";
import type { Maybe } from "../../graphql-types";
import type { AvailableLanguageType } from "../i18n/i18n.model";
import { RichText } from "./ContentfulRichText/RichText.component";
import { BlogContainer } from "./Typo";

const BlogLinkContainer = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }
`;

const ArticleLinks = styled.div`

	display: inline-flex;
	align-items: center;
  gap: .2rem;

  font-size: 1.2rem;
  text-align: right;
  :hover {
		text-decoration: underline;
	}
`;

interface BlogLinkProps {
	language: AvailableLanguageType;
	blogPost: {
		slug: string;
		title?: Maybe<string>;
		publishDate?: Maybe<string>;

		abstract?: Maybe<{
			raw?: Maybe<string>;
			references?: Maybe<Maybe<ContentfulRichTextGatsbyReference>[]>;
		}>;
	};
}
export function BlogLink({ language, blogPost }: BlogLinkProps) {
	const intl = useIntl();

	return (
		<BlogLinkContainer
			href={
				language === "fr"
					? `/blog/${blogPost.slug}`
					: `/${language}/blog/${blogPost.slug}`
			}
		>
			<BlogContainer>
				<h1>{blogPost.title}</h1>
				{blogPost.publishDate ? (
					<span className="metadata">
						{new Date(blogPost.publishDate).toLocaleDateString()}
					</span>
				) : null}

				{blogPost.abstract?.raw ? (
					<RichText
						rawRichText={blogPost.abstract.raw}
						references={
							(blogPost.abstract
								.references as ContentfulRichTextGatsbyReference[]) ?? undefined
						}
					/>
				) : null}
			</BlogContainer>

			<ArticleLinks>
				<span>{intl.formatMessage({ id: "read" })}</span>{" "}
				<ArrowRight className="h-4 w-4" />
			</ArticleLinks>
		</BlogLinkContainer>
	);
}
