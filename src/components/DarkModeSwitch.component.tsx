import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"

type ThemeValueType = "light" | "dark"

const SwitchContainer = styled.button`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  @media print {
    display: none;
  }
`

const Slider = styled.div`
  width: 50px;
  height: 24px;
  background-color: var(--secondary-background-color);
  mix-blend-mode: plus-lighter;
  border-radius: 24px;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`

const SliderButton = styled.div<{ theme: ThemeValueType }>`
  width: 22px;
  height: 22px;
  background-color: var(--background-color);
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.theme === "dark" ? "26px" : "1px")};
  transition:
    transform 0.2s ease-in-out,
    left 0.2s ease-in-out;
`

const SliderLabel = styled.span`
  margin-left: 10px;
  color: #e0e0e0cc;
`

export function DarkModeSwitch() {
  const [theme, setTheme] = useState<ThemeValueType>("light")

  useEffect(() => {
    const theme =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    setTheme(theme)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    window.document.body.setAttribute("data-theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const intl = useIntl()

  return (
    <SwitchContainer
      onClick={toggleTheme}
      data-track="switch-theme"
      data-theme={theme === "light" ? "dark" : "light"}
    >
      <Slider>
        <SliderButton theme={theme} />
      </Slider>
      <SliderLabel>{intl.formatMessage({ id: "darkMode" })}</SliderLabel>
    </SwitchContainer>
  )
}
