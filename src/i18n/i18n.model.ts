export const AVAILABLE_LANGUAGES = ["en", "fr"] as const
export type AvailableLanguageType = (typeof AVAILABLE_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: AvailableLanguageType = "fr"
