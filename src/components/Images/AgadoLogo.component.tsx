import type { FunctionComponent } from "react";

import styled from "@emotion/styled";
import { ReactComponent as LogoSvg } from "../../images/agado-logo/agado-logo.svg";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 150px;

  border-radius: 25px;
  padding: 2rem;

  @media (min-width: 500px) {
    width: 200px;
  }
  background: rgba(255, 255, 255, 0.1);

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.01);
  }
`;

export const AgadoLogo: FunctionComponent = () => (
	<LogoContainer>
		<LogoSvg />
	</LogoContainer>
);

const EmphasedName = styled.span`
  font-family: "Arial", sans-serif;
  color: white;
`;
const Ext = styled.span`
  font-family: "Arial", sans-serif;

  color: #4267b2;
`;
export function AgadoName() {
	return (
		<div>
			<EmphasedName>Agado</EmphasedName> <Ext>Dev</Ext>
		</div>
	);
}
