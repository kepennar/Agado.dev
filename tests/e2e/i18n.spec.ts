import { expect, test } from '@playwright/test';

const baseUrl = 'http://127.0.0.1:4321';

test.describe('Internationalization (i18n)', () => {
  test('User switches language from English to French', async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: 'en-US' });
    const page = await context.newPage();

    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.locator('#language-switch').click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByText('Explorer & Itérer')).toBeVisible();
    await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();

    const localeCookie = (await context.cookies()).find(
      ({ name }) => name === 'locale',
    );
    expect(localeCookie?.value).toBe('fr');

    await context.close();
  });

  test('User switches language from French to English', async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();

    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.locator('#language-switch').click();

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Explore & Iterate')).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

    const localeCookie = (await context.cookies()).find(
      ({ name }) => name === 'locale',
    );
    expect(localeCookie?.value).toBe('en');

    await context.close();
  });

  test('Localized content is displayed based on selected language', async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();

    await page.goto('/');
    await page.locator('#language-switch').click();
    await page.goto('/en/blog');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Blog' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();

    await page.locator('#language-switch').click();

    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Articles' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: "Retour à l'accueil" }),
    ).toBeVisible();

    await context.close();
  });

  test('Language preference persists across sessions', async ({ browser }) => {
    const firstContext = await browser.newContext({ locale: 'fr-FR' });
    const firstPage = await firstContext.newPage();

    await firstPage.goto('/');
    await firstPage.locator('#language-switch').click();
    await expect(firstPage).toHaveURL(/\/en\/?$/);

    const localeCookie = (await firstContext.cookies()).find(
      ({ name }) => name === 'locale',
    );
    expect(localeCookie?.value).toBe('en');
    await firstContext.close();

    const secondContext = await browser.newContext({ locale: 'fr-FR' });
    await secondContext.addCookies([
      {
        name: 'locale',
        value: 'en',
        url: baseUrl,
      },
    ]);

    const secondPage = await secondContext.newPage();
    await secondPage.goto('/');

    await expect(secondPage).toHaveURL(/\/en\/?$/);
    await expect(secondPage.locator('html')).toHaveAttribute('lang', 'en');
    await expect(secondPage.getByText('Explore & Iterate')).toBeVisible();

    await secondContext.close();
  });
});
