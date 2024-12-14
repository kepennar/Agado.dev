import type { GatsbyNode } from "gatsby"
import path from "node:path"
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "./src/i18n/i18n.model"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const currentDate = new Date().toISOString()

  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve("./src/templates/blog-post.tsx")

  const result = await graphql<{
    allContentfulBlogPost: {
      nodes: {
        title: string
        id: string
      }[]
    }
  }>(`
    query listBlogPosts {
      allContentfulBlogPost {
        nodes {
          title
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data?.allContentfulBlogPost.nodes
  if (!posts) {
    reporter.info("No blog posts found")
    return
  }

  if (posts.length > 0) {
    for (const post of posts) {
      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          language: DEFAULT_LANGUAGE,
          currentDate,
        },
      })
      for (const otherLanguage of AVAILABLE_LANGUAGES.filter(
        (lang) => lang !== DEFAULT_LANGUAGE
      )) {
        createPage({
          path: `/${otherLanguage}/blog/${post.slug}/`,
          component: blogPost,
          context: {
            slug: post.slug,
            language: otherLanguage,
            currentDate,
          },
        })
      }
    }
  }
}

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const currentDate = new Date().toISOString()
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      language: DEFAULT_LANGUAGE,
      currentDate,
    },
  })
  for (const otherLanguage of AVAILABLE_LANGUAGES.filter(
    (lang) => lang !== DEFAULT_LANGUAGE
  )) {
    createPage({
      ...page,
      path: `/${otherLanguage}${page.path}`,
      context: {
        ...page.context,
        language: otherLanguage,
        currentDate,
      },
    })
  }
}
