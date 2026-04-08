import { expect, test } from '@playwright/test';

test.describe('Homepage layout, navigation, and main content', () => {
  test.use({ locale: 'fr-FR' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('Homepage layout displays correctly', async ({ page }) => {
    await expect(page.locator('header#about')).toBeVisible();
    await expect(page.locator('nav.navbar')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Navigation menu contains expected links for the portfolio', async ({
    page,
  }) => {
    await expect(
      page.getByRole('link', { name: 'Portfolio Ingénieur' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Expertises' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Expérience', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Articles', exact: true }),
    ).toBeVisible();
  });

  test('Main content highlights Agado.dev purpose', async ({ page }) => {
    await expect(page.getByText('Explorer & Itérer')).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Kevin Pennarun',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Ingénieur Logiciel & Architecte Systèmes',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: "Voir l'expérience" }),
    ).toBeVisible();
  });

  test('Responsive layout adapts to screen size', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const menuButton = page.getByRole('button', { name: 'Toggle menu' });
    await expect(menuButton).toBeVisible();

    await menuButton.click();

    await expect(page.locator('.mobile-menu')).toBeVisible();
    await expect(page.locator('.mobile-menu').getByRole('link', { name: 'À propos' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 1, name: 'Kevin Pennarun' }),
    ).toBeVisible();
  });
});
