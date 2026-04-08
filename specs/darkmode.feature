Feature: Dark Mode Toggle and Persistence
  As a user of Agado.dev
  I want to be able to toggle dark mode on and off
  And have my preference persist across sessions
  So that I can use the site in my preferred theme

  Background:
    Given I am on the Agado.dev homepage

  Scenario: Default theme is light mode
    Then the site should display in light mode by default

  Scenario: User toggles dark mode on
    When I click the dark mode toggle
    Then the site should switch to dark mode
    And the dark mode toggle should indicate dark mode is active

  Scenario: User toggles dark mode off
    Given dark mode is enabled
    When I click the dark mode toggle
    Then the site should switch to light mode
    And the dark mode toggle should indicate light mode is active

  Scenario: Dark mode preference persists across sessions
    When I enable dark mode
    And I reload the page
    Then the site should remain in dark mode
    When I disable dark mode
    And I reload the page
    Then the site should remain in light mode
