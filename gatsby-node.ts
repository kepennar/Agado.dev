import path from "node:path";
import type { GatsbyNode } from "gatsby";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "./src/i18n/i18n.model";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
	actions,
}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"@/components": path.resolve(__dirname, "src/components"),
				"@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
			},
		},
	});
};
export const createPages: GatsbyNode["createPages"] = async ({
	graphql,
	actions,
	reporter,
}) => {
	const currentDate = new Date().toISOString();

	const { createPage } = actions;

	// Define a template for blog post
	const blogPost = path.resolve("./src/templates/blog-post.tsx");

	const result = await graphql<{
		allContentfulBlogPost: {
			nodes: {
				title: string;
				slug: string;
			}[];
		};
	}>(`
    query listBlogPosts {
      allContentfulBlogPost {
        nodes {
          title
          slug
        }
      }
    }
  `);

	if (result.errors) {
		reporter.panicOnBuild(
			"There was an error loading your Contentful posts",
			result.errors,
		);
		return;
	}

	const posts = result.data?.allContentfulBlogPost.nodes;
	if (!posts) {
		reporter.info("No blog posts found");
		return;
	}

	if (posts.length > 0) {
		for (const post of posts) {
			const path = `/blog/${post.slug}/`;
			createPage({
				path,
				component: blogPost,
				context: {
					pathName: path,
					slug: post.slug,
					language: DEFAULT_LANGUAGE,
					currentDate,
				},
			});
			for (const otherLanguage of AVAILABLE_LANGUAGES.filter(
				(lang) => lang !== DEFAULT_LANGUAGE,
			)) {
				const path = `/${otherLanguage}/blog/${post.slug}/`;
				createPage({
					path: `/${otherLanguage}/blog/${post.slug}/`,
					component: blogPost,
					context: {
						slug: post.slug,
						pathName: path,
						language: otherLanguage,
						currentDate,
					},
				});
			}
		}
	}
};

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
	const { createPage, deletePage } = actions;
	const currentDate = new Date().toISOString();

	console.log("[DEBUG] Generating html for ", { pagePath: page.path });

	deletePage(page);
	createPage({
		...page,
		context: {
			...page.context,
			pathName: page.path,
			language: DEFAULT_LANGUAGE,
			currentDate,
		},
	});
	for (const otherLanguage of AVAILABLE_LANGUAGES.filter(
		(lang) => lang !== DEFAULT_LANGUAGE,
	)) {
		const path = `/${otherLanguage}${page.path}`;
		createPage({
			...page,
			path,
			context: {
				...page.context,
				pathName: path,
				language: otherLanguage,
				currentDate,
			},
		});
	}
};
