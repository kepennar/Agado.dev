import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document as ContentfulDocument } from "@contentful/rich-text-types"
import { Global, css } from "@emotion/core"
import React, { FunctionComponent } from "react"

const RichTextStyles = css`
  h1,
  h2,
  h3 {
    color: #0185a1;
  }
`

export const RichText: FunctionComponent<{ richText: ContentfulDocument }> = ({
  richText,
}) => (
  <>
    <Global styles={RichTextStyles} />
    {documentToReactComponents(richText)}
  </>
)
