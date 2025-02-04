export function getHeadingId(node: React.ReactNode) {
	const text = node?.toString();
	if (!text) {
		return undefined;
	}
	return slugify(text);
}

export function slugify(
	text: string,
	options: { lower?: boolean; separator?: string } = {},
): string {
	const { lower = true, separator = "-" } = options;

	return text
		.normalize("NFKD") // Normalize to decompose diacritics
		.replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
		.replace(/[^a-zA-Z0-9\s]/g, "") // Remove non-alphanumeric characters
		.trim() // Trim whitespace
		.replace(/\s+/g, separator) // Replace spaces with the chosen separator
		.replace(new RegExp(`[${separator}]{2,}`, "g"), separator) // Remove duplicate separators
		.toLowerCase(); // Convert to lowercase if `lower` is true
}
