import styled from "@emotion/styled";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { useIntl } from "react-intl";
import { Button } from "./ui/button";

type ThemeValueType = "light" | "dark";

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
`;

const Slider = styled.div`
  width: 36px;
  height: 18px;
  @media (min-width: 500px) {
    height: 24px;
    width: 50px;
  }

  background-color: var(--secondary-background-color);
  mix-blend-mode: plus-lighter;
  border-radius: 24px;
  position: relative;
  transition: background-color 0.2s ease-in-out;
`;

const SliderButton = styled.div<{ theme: ThemeValueType }>`
  width: 16px;
  height: 16px;
  left: ${(props) => (props.theme === "dark" ? "18px" : "1px")};

  @media (min-width: 500px) {
    width: 22px;
    height: 22px;
    left: ${(props) => (props.theme === "dark" ? "26px" : "1px")};
  }
  background-color: var(--background-color);
  border-radius: 50%;
  position: absolute;
  top: 1px;
  transition:
    transform 0.2s ease-in-out,
    left 0.2s ease-in-out;
`;

const SliderLabel = styled.span<{ isLarge?: true }>`
  font-size: 0.9rem;
  margin-left: 5px;
  color: var(--secondary-text-color);

  @media (max-width: 500px) {
    display: ${(props) => (props.isLarge ? "none" : "inline")};
  }
  @media (min-width: 500px) {
    font-size: 1rem;
    margin-left: 10px;
    display: ${(props) => (props.isLarge ? "inline" : "none")};
  }
`;

export function DarkModeSwitch() {
	const [theme, setTheme] = useState<ThemeValueType>("light");

	useEffect(() => {
		const theme =
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		setTheme(theme);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		window.document.body.setAttribute("data-theme", theme);
	}, [theme]);

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	const intl = useIntl();

	return (
		<>
			<SwitchContainer onClick={toggleTheme}>
				<Slider>
					<SliderButton theme={theme} />
				</Slider>
				<SliderLabel isLarge>
					{intl.formatMessage({ id: "darkMode" })}
				</SliderLabel>
				<SliderLabel>{intl.formatMessage({ id: "dark" })}</SliderLabel>
			</SwitchContainer>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Toggle theme"
				className="relative h-9 w-9"
				onClick={() => toggleTheme()}
			>
				<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
		</>
	);
}
