import { css } from "@emotion/react"
import styled from "@emotion/styled"

interface SpacerProps {
  direction: "horizontal" | "vertical"
  size: string
}

export const Spacer = styled.div<SpacerProps>`
  ${(props) => css`
    height: ${props.direction === "vertical" ? props.size : "100%"};
    width: ${props.direction === "vertical" ? "100%" : props.size};
  `}
`
