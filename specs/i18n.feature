Feature: Internationalization (i18n)
  As a user of Agado.dev
  I want to experience the application in my preferred language
  So that I can use the platform comfortably regardless of my native language

  Background:
    Given the application supports multiple languages

  Scenario: User switches language from English to French
    Given the user is on the homepage
    And the current language is English
    When the user selects "fr" from the language switcher
    Then the application language should change to French
    And all visible text should be displayed in French

  Scenario: User switches language from French to English
    Given the user is on any page
    And the current language is French
    When the user selects "en" from the language switcher
    Then the application language should change to English
    And all visible text should be displayed in English

  Scenario: Localized content is displayed based on selected language
    Given the user selects "fr" from the language switcher
    When the user navigates to the dashboard
    Then the dashboard content should be displayed in French

  Scenario: Language preference persists across sessions
    Given the user selects "fr" from the language switcher
    When the user logs out and logs back in
    Then the application language should remain French
