import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/Layout"
import { PandaImage } from "../components/Images"
import SEO from "../components/Seo"
import { Experiences } from "../components/Experiences.component"
import { Abstract } from "../components/Abstract.component"
import { Socials } from "../components/Socials.component"

const Content = styled.div`
  margin-bottom: 1.45rem;
`

const AvatarContainer = styled.div`
  position: relative;
  max-width: 300px;
  top: -150px;
  margin-bottom: -150px;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Content>
      <AvatarContainer>
        <PandaImage />
      </AvatarContainer>
      <Socials />
      <Abstract />
      <Experiences />
    </Content>
  </Layout>
)

export default IndexPage
