import styled from "@emotion/styled"
import { HomePageDataQuery } from "../../graphql-types"
import { RichText } from "./ContentfulRichText/RichText.component"

const AbstractContainer = styled.div`
  font-size: 1.25rem;
`

export function Slogan({ slogan }: { slogan: HomePageDataQuery["slogan"] }) {
  if (!slogan?.text?.raw) {
    return null
  }

  return (
    <AbstractContainer>
      <RichText rawRichText={slogan.text.raw} />
    </AbstractContainer>
  )
}
