Feature: Homepage layout, navigation, and main content
  As a visitor to Agado.dev
  I want to see a clear homepage layout, intuitive navigation, and engaging main content
  So that I can easily understand and use the site

  Background:
    Given I am a visitor on the Agado.dev homepage

  Scenario: Homepage layout displays correctly
    Then I should see the site header
    And I should see the main navigation menu
    And I should see the main content area
    And I should see the site footer

  Scenario: Navigation menu contains expected links
    Then the navigation menu should contain a link to "Home"
    And the navigation menu should contain a link to "Features"
    And the navigation menu should contain a link to "Docs"
    And the navigation menu should contain a link to "Sign In"

  Scenario: Main content highlights Agado.dev purpose
    Then I should see a prominent tagline or headline
    And I should see a brief description of Agado.dev
    And I should see a call-to-action button or link

  Scenario: Responsive layout adapts to screen size
    When I resize the browser window to mobile width
    Then the navigation menu should be accessible (e.g., hamburger menu)
    And the main content should remain readable
