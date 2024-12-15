import styled from "@emotion/styled"
import { ReactNode } from "react"
import { DarkModeSwitch } from "./DarkModeSwitch.component"
import { AgadoName, CodeImage } from "./Images"
import { LanguageSwitch } from "./LanguageSwitch.component"
import { AvailableLanguageType } from "../i18n/i18n.model"
import { useIntl } from "react-intl"

const Container = styled.header<{ withBackgroundImage?: true }>`
  position: absolute;
  z-index: 0;

  top: 0;
  left: 0;
  right: 0;
  background: var(--header-background-color);
  padding: 4rem 2rem;
  margin-bottom: 1.45rem;
  height: ${(props) => (props.withBackgroundImage ? "300px" : "100px")};
  @media print {
    height: 100px;
  }
`

const Content = styled.div`
  position: relative;
  max-width: 85%;
  padding: 1.45rem 1.0875rem;
  margin: auto;
  @media (max-width: 500px) {
    max-width: 100%;
    padding: 0;
    text-align: center;
  }
`

const Title = styled.h1`
  margin: 0;
  color: var(--text-color);
`

const shadowSize = "8px"
const shadowColor = "black"
const shadowBlur = "8px"
const SubTitle = styled.h2`
  margin: 0;
  text-shadow:
    ${shadowSize} 0 ${shadowBlur} ${shadowColor},
    0 ${shadowSize} ${shadowBlur} ${shadowColor},
    -${shadowSize} 0 ${shadowBlur} ${shadowColor},
    0 -${shadowSize} ${shadowBlur} ${shadowColor};
  @media print {
    display: none;
  }
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
  @media print {
    display: none;
  }
`
export const NavbarContainer = styled.div`
  z-index: 10;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  background-color: #4267b230;
  backdrop-filter: blur(4px);
  border-bottom: 1px solid #2d3647;
`
export const MenuLink = styled.a`
  color: var(--link-color);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`
const MenuLinksContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  @media (min-width: 500px) {
    gap: 2rem;
  }
`
const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export function MenuLinks({
  links,
  currentLanguage,
}: {
  currentLanguage: AvailableLanguageType
  links: { href: string; labelId: string; titleLabelId: string }[]
}) {
  const intl = useIntl()

  return (
    <MenuLinksContainer>
      <MenuLink
        href={currentLanguage === "fr" ? "/" : `/${currentLanguage}`}
        title="Visit Kevin Pennarun's profile"
      >
        <AgadoName />
      </MenuLink>
      <Centered>
        {links.map(({ href, labelId, titleLabelId }) => (
          <MenuLink
            key={href}
            href={
              currentLanguage === "fr"
                ? `/${href}`
                : `/${currentLanguage}/${href}`
            }
            title={intl.formatMessage({ id: titleLabelId })}
          >
            {intl.formatMessage({ id: labelId })}
          </MenuLink>
        ))}
      </Centered>
    </MenuLinksContainer>
  )
}

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.1rem;
  @media (min-width: 500px) {
    column-gap: 0.5rem;
  }
`
export function Actions({ currentPage }: { currentPage: string }) {
  return (
    <ActionsContainer>
      <LanguageSwitch currentPage={currentPage} />
      <DarkModeSwitch />
    </ActionsContainer>
  )
}
function Header({
  siteTitle = "",
  subtitle,
  withBackgroundImage,
}: {
  siteTitle: ReactNode
  subtitle?: ReactNode
  withBackgroundImage?: true
}) {
  return (
    <Container withBackgroundImage={withBackgroundImage}>
      {withBackgroundImage ? (
        <BackgroundImageContainer>
          <CodeImage />
        </BackgroundImageContainer>
      ) : null}
      <Content>
        <Title>{siteTitle}</Title>
        {subtitle ? <SubTitle>{subtitle}</SubTitle> : null}
      </Content>
    </Container>
  )
}

export default Header
