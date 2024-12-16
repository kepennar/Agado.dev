import { type Options as RenderRichTextOptionsType } from "@contentful/rich-text-react-renderer"
import { Block, BLOCKS, Inline, MARKS, Text } from "@contentful/rich-text-types"
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { Maybe } from "../../graphql-types"
import { CodeBlock, detectCodeBlock } from "./CodeBlock.component"

export function RichText({
  rawRichText,
  references,
}: {
  rawRichText: Maybe<string>
  references?: ContentfulRichTextGatsbyReference[]
}) {
  if (!rawRichText) {
    return null
  }

  const options: RenderRichTextOptionsType = {
    renderMark: {
      [MARKS.CODE]: (text) => <code>{text}</code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const text = (
          node.content?.[0]?.nodeType === "text" ? node.content[0].value : ""
        ) as string

        const codeBlock = detectCodeBlock(text)

        if (codeBlock) {
          const { code, language } = codeBlock
          return <CodeBlock code={code} language={language} />
        }
        return <p>{children}</p>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const gatsbyImageData = node.data.target as {
          gatsbyImageData?: ImageDataLike
          description?: string
        }

        const image = gatsbyImageData ? getImage(gatsbyImageData) : null
        if (!image) {
          return null
        }
        return (
          <GatsbyImage image={image} alt={gatsbyImageData.description ?? ""} />
        )
      },
    },
  }

  return (
    <div className="cmsTxt">
      {renderRichText({ raw: rawRichText, references }, options)}
    </div>
  )
}

export function richTextToString(
  rawRichText: Maybe<string> | undefined
): string | null {
  if (!rawRichText) {
    return null
  }
  const document = JSON.parse(rawRichText)
  let result = ""

  const processNode = (node: Block | Inline | Text) => {
    if (node.nodeType === "text") {
      result += node.value ?? ""
    } else if (node.content) {
      node.content.forEach(processNode)
    }
  }

  document.content.forEach(processNode)

  return result
}
