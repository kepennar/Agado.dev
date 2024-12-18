import styled from "@emotion/styled"
import { ChangeEvent } from "react"

const SelectContainer = styled.div`
  @media (min-width: 500px) {
    font-size: 1.4rem;
  }

  border: 0;
  // padding: 1px;
  position: relative;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  color: #333;
  cursor: pointer;
  appearance: none;
  outline: none;
  &:focus {
    border: none;
    box-shadow: none;
    outline: none;
  }

  option {
    padding-block: 0;
    padding-inline: 0;
  }
`

export function LanguageSwitch({ pagePath }: { pagePath: string }) {
  const language = pagePath.startsWith("/en") ? "en" : "fr"

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof window === "undefined") {
      // not available server side
      return
    }
    const currentPage = pagePath.replace("/en", "")
    window.location.href =
      event.target.value === "en" ? `/en${currentPage}` : `${currentPage}`
  }

  return (
    <SelectContainer>
      <StyledSelect value={language} onChange={handleChange}>
        <option value="fr">🇫🇷</option>
        <option value="en">🇬🇧</option>
      </StyledSelect>
    </SelectContainer>
  )
}
