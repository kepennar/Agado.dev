import styled from "@emotion/styled"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { FunctionComponent } from "react"
import { CodeImage } from "./Images"

const Container = styled.header`
  position: relative;
  background: #051523;
  padding: 4rem 2rem;
  margin-bottom: 1.45rem;
  height: 300px;
`

const Content = styled.div`
  position: relative;
  max-width: 85%;
  padding: 1.45rem 1.0875rem;
  margin-left: 2rem;
  @media (max-width: 500px) {
    max-width: 100%;
    padding: 0;
    text-align: center;
  }
`

const Title = styled.h1`
  margin: 0;
  color: white;
`

const shadowSize = "8px"
const shadowColor = "black"
const shadowBlur = "8px"
const SubTitle = styled.h2`
  margin: 0;
  text-shadow: ${shadowSize} 0 ${shadowBlur} ${shadowColor},
    0 ${shadowSize} ${shadowBlur} ${shadowColor},
    -${shadowSize} 0 ${shadowBlur} ${shadowColor},
    0 -${shadowSize} ${shadowBlur} ${shadowColor};
`

const BackgroundImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  filter: blur(1px) grayscale(20%);
  max-height: 300px;
  overflow: hidden;
  background: #051523;
`

const Header: FunctionComponent<{ siteTitle: string; subTitle: string }> = ({
  siteTitle,
  subTitle,
}) => (
  <Container>
    <BackgroundImageContainer>
      <CodeImage />
    </BackgroundImageContainer>
    <Content>
      <Title>{siteTitle}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Content>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
