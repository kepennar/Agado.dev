import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button } from "./ui/button";

type ThemeValueType = "light" | "dark";

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
		<Button
			variant="ghost"
			size="icon"
			aria-label={intl.formatMessage({
				id: theme === "dark" ? "lightMode" : "darkMode",
			})}
			className="relative h-9 w-9 text-gray-50"
			onClick={() => toggleTheme()}
		>
			<Sun className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<Moon className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		</Button>
	);
}
