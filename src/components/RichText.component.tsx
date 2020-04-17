import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document as ContentfulDocument } from "@contentful/rich-text-types"
import React, { FunctionComponent } from "react"

export const RichText: FunctionComponent<{ richText: ContentfulDocument }> = ({
  richText,
}) => <div className="csmTxt">{documentToReactComponents(richText)}</div>
