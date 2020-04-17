import { graphql, useStaticQuery } from "gatsby"
import React, { FunctionComponent } from "react"
import { SloganQuery } from "../../graphql-types"
import { RichText } from "./RichText.component"
import styled from "@emotion/styled"

const AbstractContainer = styled.div`
  font-size: 1.05rem;
`

export const Slogan: FunctionComponent = () => {
  const { Slogan } = useStaticQuery<SloganQuery>(sloganQuery)

  return (
    <AbstractContainer>
      <RichText richText={Slogan.text.json} />
    </AbstractContainer>
  )
}

export const sloganQuery = graphql`
  query Slogan {
    Slogan: contentfulSlogan {
      text {
        json
      }
    }
  }
`
