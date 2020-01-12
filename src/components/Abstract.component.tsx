import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import { AbstractQuery } from "../../graphql-types"
import { RichText } from "./RichText.component"

export const Abstract: FunctionComponent = () => {
  const { abstract } = useStaticQuery<AbstractQuery>(abstractQuery)

  return (
    <div>
      <RichText richText={abstract.content.json} />
    </div>
  )
}

export const abstractQuery = graphql`
  query Abstract {
    abstract: contentfulAbstract {
      content {
        json
      }
    }
  }
`
