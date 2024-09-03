import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FormattedMessage } from "react-intl"

import { SiteTitleQuery } from "../../graphql-types"
import Header from "./Header.component"
import "./layout.css"
import { LanguageProvider } from "../i18n/Language.context"
import { AvailableLanguageType } from "../i18n/i18n.model"

const Content = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Footer = styled.footer`
  padding: 0.75rem;
  text-align: center;
  font-size: 0.75rem;

  background-color: #ffffff0f;
`

function Layout({
  language,
  children,
}: {
  language: AvailableLanguageType
  children: React.ReactNode
}) {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <LanguageProvider language={language}>
      <div className="head">
        <Header siteTitle={data.site?.siteMetadata?.title ?? ""} />
      </div>
      <div className="content">
        <Content>
          <main>{children}</main>
        </Content>
      </div>
      <Footer>
        <FormattedMessage
          id="footerAttribution"
          values={{
            year: new Date().getFullYear(),
            a1: (chunks) => <a href="https://www.gatsbyjs.org">{chunks}</a>,
            a2: (chunks) => <a href="https://www.contentful.com">{chunks}</a>,
            a3: (chunks) => (
              <a href="https://github.com/kepennar/page-perso">{chunks}</a>
            ),
          }}
        />
      </Footer>
    </LanguageProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
