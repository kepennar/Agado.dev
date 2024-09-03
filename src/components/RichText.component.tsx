import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Maybe } from "../../graphql-types"

export function RichText({ rawRichText }: { rawRichText: Maybe<string> }) {
  if (!rawRichText) {
    return null
  }
  return <div className="cmsTxt">{renderRichText({ raw: rawRichText })}</div>
}
