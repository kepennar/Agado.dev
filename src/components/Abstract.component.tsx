import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import { AbstractQuery } from "../../graphql-types"
import { RichText } from "./RichText.component"
import { Socials } from "./Socials.component"
import styled from "@emotion/styled"

const AbstractContainer = styled.div`
  font-size: 1.05rem;
`

export const Abstract: FunctionComponent = () => {
  const { abstract } = useStaticQuery<AbstractQuery>(abstractQuery)

  return (
    <AbstractContainer>
      <h2>À propos de Kevin</h2>
      <Socials />
      <RichText richText={abstract.content.json} />
    </AbstractContainer>
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
