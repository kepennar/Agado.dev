import styled from "@emotion/styled"
import { graphql, Script, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { FormattedMessage } from "react-intl"

import { SiteTitleQuery } from "../../graphql-types"
import { LanguageProvider } from "../i18n/Language.context"
import { AvailableLanguageType } from "../i18n/i18n.model"
import "./layout.css"

const Head = styled.div`
  min-height: 14rem;
`

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
  header,
  children,
}: {
  header: (data: { siteMetadata: SiteTitleQuery }) => ReactNode
  language: AvailableLanguageType
  children: React.ReactNode
}) {
  const siteMetadata = useStaticQuery<SiteTitleQuery>(graphql`
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
      <Head>{header({ siteMetadata })}</Head>
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
      <Script id="openpanel-inline-script">
        {`
        window.op = window.op||function(...args){(window.op.q=window.op.q||[]).push(args);};
          window.op('init', {
            clientId: '${process.env.GATSBY_OP_CLIENT_ID}',
            trackScreenViews: true,
            trackOutgoingLinks: true,
            trackAttributes: true,
          });
        `}
      </Script>
      <Script id="openpanel-sdk-script" src="https://openpanel.dev/op1.js" />
    </LanguageProvider>
  )
}

export default Layout
