import { IntlProvider } from "react-intl"
import { AvailableLanguageType, DEFAULT_LANGUAGE } from "./i18n.model"

import { englishLocales } from "./en"
import { frenchLocales } from "./fr"

const LANGUAGES_RESOURCES: Record<
  AvailableLanguageType,
  Record<string, string>
> = {
  fr: frenchLocales,
  en: englishLocales,
}

export function LanguageProvider({
  language,
  children,
}: {
  language: AvailableLanguageType
  children: React.ReactNode
}) {
  return (
    <IntlProvider
      messages={LANGUAGES_RESOURCES[language]}
      locale={language}
      defaultLocale={DEFAULT_LANGUAGE}
    >
      {children}
    </IntlProvider>
  )
}
