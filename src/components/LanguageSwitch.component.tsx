import styled from "@emotion/styled"
import { ChangeEvent } from "react"

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  color: #333;
  cursor: pointer;
  appearance: none;
  outline: none;
  &:focus {
    border-color: #ffffff0f;
  }
`

export function LanguageSwitch() {
  const language =
    typeof window !== "undefined" && window.location.pathname.startsWith("/en")
      ? "en"
      : "fr"

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof window === "undefined") {
      // not available server side
      return
    }
    window.location.href = event.target.value === "en" ? "/en" : "/"
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
