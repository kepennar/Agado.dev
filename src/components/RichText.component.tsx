import { type Options as RenderRichTextOptionsType } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { Maybe } from "../../graphql-types"
import { Highlight, themes } from "prism-react-renderer"

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

        const codeBlockRegex = /^```(?:\w+)\n([\s\S]*?)\n```$/
        const matches = text.match(codeBlockRegex)

        if (matches) {
          const language = text.match(/^```(\w+)/)?.[1] ?? "text"
          const code = matches[1] ?? ""

          return (
            <Highlight
              theme={themes.jettwaveDark}
              code={code}
              language={language}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          )
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
