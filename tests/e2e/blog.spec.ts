import { expect, test } from '@playwright/test';

import { openFirstBlogPostMatching } from './helpers';

test.describe('Blog features', () => {
  test.use({ locale: 'fr-FR' });

  test('Viewing the blog listing page', async ({ page }) => {
    await page.goto('/blog');

    const posts = page.locator('a.blog-link');
    const postCount = await posts.count();

    expect(postCount).toBeGreaterThan(0);

    for (let index = 0; index < postCount; index += 1) {
      const post = posts.nth(index);

      await expect(post.locator('h2.blog-title')).toBeVisible();
      await expect(post.locator('time.blog-date')).toBeVisible();
      await expect(post.locator('.blog-abstract')).toBeVisible();
      await expect(post).toHaveAttribute('href', /\/blog\//);
    }
  });

  test('Viewing a single blog post', async ({ page }) => {
    await page.goto('/blog');

    const firstPost = page.locator('a.blog-link').first();
    const expectedTitle = await firstPost.locator('h2.blog-title').innerText();

    await firstPost.click();

    await expect(
      page.getByRole('heading', { level: 1, name: expectedTitle }),
    ).toBeVisible();
    await expect(page.locator('.article-meta .publish-date')).toBeVisible();
    await expect(page.locator('article.blog-post-content')).toBeVisible();
    await expect(page.locator('.blog-post-content .cms-content')).toBeVisible();
  });

  test('Table of contents is displayed for long posts', async ({ page }) => {
    await openFirstBlogPostMatching(
      page,
      async (candidate) => (await candidate.locator('#toc .toc-link').count()) > 1,
    );

    const tocLinks = page.locator('#toc .toc-link');
    const tocCount = await tocLinks.count();
    expect(tocCount).toBeGreaterThan(1);

    const firstTocLink = tocLinks.first();
    const targetId = (await firstTocLink.getAttribute('href'))?.replace('#', '');

    expect(targetId).toBeTruthy();

    await firstTocLink.click();

    await expect(page).toHaveURL(new RegExp(`#${targetId}$`));
    await expect(page.locator(`#${targetId}`)).toBeVisible();
  });

  test('Syntax highlighting for code blocks', async ({ page }) => {
    await openFirstBlogPostMatching(
      page,
      async (candidate) => (await candidate.locator('.cms-content .shiki').count()) > 0,
    );

    const codeBlock = page.locator('.cms-content .shiki').first();
    await expect(codeBlock).toBeVisible();

    const styles = await codeBlock.evaluate((element) => {
      const codeStyles = window.getComputedStyle(element);
      const paragraph = document.querySelector('.cms-content p');
      const paragraphStyles = paragraph
        ? window.getComputedStyle(paragraph)
        : null;

      return {
        codeBackground: codeStyles.backgroundColor,
        codeFontFamily: codeStyles.fontFamily,
        paragraphBackground: paragraphStyles?.backgroundColor ?? '',
        paragraphFontFamily: paragraphStyles?.fontFamily ?? '',
      };
    });

    expect(styles.codeBackground).not.toBe(styles.paragraphBackground);
    expect(styles.codeFontFamily).not.toBe(styles.paragraphFontFamily);
  });
});
