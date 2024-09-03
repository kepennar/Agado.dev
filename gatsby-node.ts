import type { GatsbyNode } from "gatsby"
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "./src/i18n/i18n.model"

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      language: DEFAULT_LANGUAGE,
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
      },
    })
  }
}
