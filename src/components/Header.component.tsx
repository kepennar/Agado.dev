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
  margin: 0 auto;
  max-width: 85%;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin: 0;
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

const Header: FunctionComponent<{ siteTitle: string }> = ({ siteTitle }) => (
  <Container>
    <BackgroundImageContainer>
      <CodeImage />
    </BackgroundImageContainer>
    <Content>
      <Title>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Title>
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
