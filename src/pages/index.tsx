import styled from "@emotion/styled"
import React from "react"
import { Abstract } from "../components/Abstract.component"
import { Experiences } from "../components/Experiences.component"
import { AgadoLogo } from "../components/Images"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { SideProjects } from "../components/SideProjects.component"
import { Spacer } from "../components/Spacer"
import { Slogan } from "../components/Slogan.component"

const Content = styled.div`
  max-width: 1280px;
  margin: 1rem auto;
`

const AvatarContainer = styled.div`
  position: relative;
  max-width: 300px;
  top: -170px;
  margin: 0 auto -170px auto;
`

const Articles = styled.div`
  margin-top: 1rem;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Kevin Pennarun" />

    <Content>
      <AvatarContainer>
        <AgadoLogo width="200px" />
      </AvatarContainer>

      <Slogan />
      <Spacer direction="vertical" size="1rem" />
      <Articles>
        <Abstract />
        <Spacer direction="vertical" size="1rem" />
        <Experiences />
        <Spacer direction="vertical" size="1rem" />
        <SideProjects />
      </Articles>
    </Content>
  </Layout>
)

export default IndexPage
