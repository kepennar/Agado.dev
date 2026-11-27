import { expect, test } from "@playwright/test";

// Client-side navigation (Astro ClientRouter) must keep the inline scripts working
test.describe("Client-side navigation keeps page scripts working", () => {
  test.use({ locale: "fr-FR" });

  test("Home -> blog -> post -> home", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("#dark-mode-toggle");

    // Dark mode on, then navigate without a full reload
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("link", { name: "Voir tous les articles" }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#06101e",
    );

    await page.locator("a.blog-link").first().click();
    await expect(page.locator("article.blog-post-content")).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reading progress bar still follows the scroll
    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() =>
        page.locator("#reading-progress-bar").evaluate((el) => el.style.width),
      )
      .not.toMatch(/^0%$|^$/);

    // One click toggles exactly once after navigation
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await page.getByRole("link", { name: "Portfolio Ingénieur" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Kevin Pennarun" }),
    ).toBeVisible();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Scroll-reveal sections and "show more" still work
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator("#experience").locator("..")).toHaveClass(
      /visible/,
    );
    const showMore = page.locator(".show-more-btn");
    if (await showMore.count()) {
      await showMore.click();
      await expect(page.locator(".older-experiences")).toBeVisible();
    }

    // Mobile menu opens and Escape closes it
    await page.setViewportSize({ width: 390, height: 844 });
    const menuButton = page.locator(".mobile-menu-btn");
    await menuButton.click();
    await expect(page.locator(".mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".mobile-menu")).toBeHidden();
    await expect(menuButton).toBeFocused();
  });
});
