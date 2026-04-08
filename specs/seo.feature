Feature: SEO features for Agado.dev
  As a site owner
  I want proper SEO features implemented
  So that search engines can effectively index and rank my site

  Background:
    Given the Agado.dev site is deployed and accessible

  Scenario: Meta tags are present and correct
    When I visit any public page
    Then the page should include a <title> tag
    And the page should include a <meta name="description"> tag
    And the page should include a <meta name="robots"> tag
    And the page should include Open Graph meta tags
    And the page should include Twitter Card meta tags

  Scenario: Sitemap is available and up-to-date
    When I access "/sitemap.xml"
    Then the response status should be 200
    And the content type should be "application/xml"
    And the sitemap should include all public pages
    And the sitemap should not include private or admin pages

  Scenario: robots.txt is present and correct
    When I access "/robots.txt"
    Then the response status should be 200
    And the content type should be "text/plain"
    And the file should allow crawling of public pages
    And the file should disallow crawling of private or admin pages
    And the file should reference the sitemap location
