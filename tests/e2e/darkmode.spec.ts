import { expect, test } from '@playwright/test';

test.describe('Dark Mode Toggle and Persistence', () => {
  test.use({ locale: 'fr-FR' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Default theme is light mode', async ({ page }) => {
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(page.locator('#dark-mode-toggle')).toHaveAttribute(
      'aria-label',
      'Passer en mode sombre',
    );
  });

  test('User toggles dark mode on', async ({ page }) => {
    const toggle = page.locator('#dark-mode-toggle');

    await toggle.click();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute('aria-label', 'Passer en mode clair');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
  });

  test('User toggles dark mode off', async ({ page }) => {
    const toggle = page.locator('#dark-mode-toggle');

    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await toggle.click();

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute('aria-label', 'Passer en mode sombre');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light');
  });

  test('Dark mode preference persists across sessions', async ({ page }) => {
    const toggle = page.locator('#dark-mode-toggle');

    await toggle.click();
    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute('aria-label', 'Passer en mode clair');

    await toggle.click();
    await page.reload();

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute('aria-label', 'Passer en mode sombre');
  });
});
