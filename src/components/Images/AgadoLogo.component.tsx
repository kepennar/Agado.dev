import React, { FunctionComponent } from "react"

import { ReactComponent as LogoSvg } from "../../images/agado-logo/agado-logo.svg"
import styled from "@emotion/styled"

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
`
interface AgadoLogoProps {
  width?: string
}
export const AgadoLogo: FunctionComponent<AgadoLogoProps> = ({ width }) => (
  <LogoContainer>
    <LogoSvg width={width} />
  </LogoContainer>
)
