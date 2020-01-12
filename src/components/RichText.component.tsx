import React from "react"

import { Document as ContentfulDocument } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FunctionComponent } from "react"

export const RichText: FunctionComponent<{ richText: ContentfulDocument }> = ({
  richText,
}) => <>{documentToReactComponents(richText)}</>
