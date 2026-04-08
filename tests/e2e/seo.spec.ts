import { expect, test } from '@playwright/test';

import { getBlogPostUrls } from './helpers';

test.describe('SEO features for Agado.dev', () => {
  test.use({ locale: 'fr-FR' });

  test('Meta tags are present and correct', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Agado Dev - Kevin Pennarun');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Portfolio et blog de Kevin Pennarun/,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /index,follow/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Agado Dev - Kevin Pennarun',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      /Portfolio et blog de Kevin Pennarun/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      'Agado Dev - Kevin Pennarun',
    );
  });

  test('Sitemap is available and up-to-date', async ({ page, request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/(application|text)\/xml/);

    const sitemap = await response.text();
    expect(sitemap).toContain('https://agado.dev/');
    expect(sitemap).toContain('https://agado.dev/blog');
    expect(sitemap).toContain('https://agado.dev/en/blog');

    const postUrls = await getBlogPostUrls(page, 'fr');
    expect(postUrls.length).toBeGreaterThan(0);
    expect(sitemap).toContain(`https://agado.dev${postUrls[0]}`);
  });

  test('robots.txt is present and correct', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('text/plain');

    const robots = await response.text();
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://agado.dev/sitemap.xml');
  });
});
