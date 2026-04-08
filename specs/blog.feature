Feature: Blog features
  As a user of Agado.dev
  I want to browse and read blog posts with a table of contents and syntax highlighting
  So that I can easily discover, navigate, and understand technical content

  Background:
    Given the blog contains multiple published posts

  Scenario: Viewing the blog listing page
    When I visit the blog listing page
    Then I should see a list of blog posts
    And each post should display its title, summary, and publication date
    And each post should link to its full content page

  Scenario: Viewing a single blog post
    Given a blog post titled "Understanding Async in JS" exists
    When I visit the blog post page for "Understanding Async in JS"
    Then I should see the post title, content, and publication date

  Scenario: Table of contents is displayed for long posts
    Given a blog post with multiple headings exists
    When I visit the blog post page
    Then I should see a table of contents listing all headings in the post
    And clicking a table of contents entry should scroll to the corresponding section

  Scenario: Syntax highlighting for code blocks
    Given a blog post contains code blocks in various languages
    When I view the blog post
    Then code blocks should be syntax highlighted according to their language
    And code blocks should be visually distinct from regular text
