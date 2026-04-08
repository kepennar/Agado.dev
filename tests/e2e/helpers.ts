import { expect, type Page } from '@playwright/test';

export type SupportedLocale = 'fr' | 'en';

export const pathForLocale = (path: string, locale: SupportedLocale = 'fr') =>
  locale === 'fr' ? path : `/en${path === '/' ? '' : path}`;

export async function getBlogPostUrls(
  page: Page,
  locale: SupportedLocale = 'fr',
) {
  await page.goto(pathForLocale('/blog', locale));

  const links = page.locator('a.blog-link');
  await expect(links.first()).toBeVisible();

  const urls = await links.evaluateAll((anchors) =>
    anchors
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href): href is string => Boolean(href)),
  );

  return [...new Set(urls)];
}

export async function openFirstBlogPostMatching(
  page: Page,
  matcher: (page: Page) => Promise<boolean>,
  locale: SupportedLocale = 'fr',
) {
  const urls = await getBlogPostUrls(page, locale);

  for (const url of urls) {
    await page.goto(url);

    if (await matcher(page)) {
      return url;
    }
  }

  throw new Error(`No ${locale} blog post matched the requested predicate.`);
}
