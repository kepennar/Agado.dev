import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function LanguageSwitch({ pagePath }: { pagePath: string }) {
	const language = pagePath.startsWith("/en") ? "en" : "fr";

	const handleChange = (value: "fr" | "en") => {
		const currentPage = pagePath.replace("/en/", "/");
		window.location.href =
			value === "en" ? `/en${currentPage}` : `${currentPage}`;
	};

	return (
		<Select
			value={language}
			onValueChange={handleChange}
			defaultValue={language}
		>
			<SelectTrigger className="w-18 border-transparent text-gray-50">
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="min-w-0" sideOffset={0}>
				<SelectItem value="fr" className="w-14 cursor-pointer">
					🇫🇷
				</SelectItem>
				<SelectItem value="en" className="w-14 cursor-pointer">
					🇬🇧
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
