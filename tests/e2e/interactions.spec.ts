import { expect, test } from "@playwright/test";

test.describe("Hero diagram, card morph and motion preferences", () => {
  test.use({ locale: "fr-FR" });

  test("Focusing a diagram node shows its note, Escape hides it", async ({
    page,
  }) => {
    await page.goto("/");

    const plan = page.getByRole("button", { name: "plan" });
    const note = page.locator("#dg-note-plan");
    await expect(note).toBeHidden();

    await plan.focus();
    await expect(plan).toHaveAttribute("aria-expanded", "true");
    await expect(note).toBeVisible();
    await expect(note).toContainText("Discovery et architecture");
    await expect(plan).toHaveAccessibleDescription(/Discovery et architecture/);

    await page.keyboard.press("Escape");
    await expect(note).toBeHidden();
    await expect(plan).toHaveAttribute("aria-expanded", "false");
    await expect(plan).toBeFocused();

    // Tab moves to the next node and opens its note
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "act" })).toBeFocused();
    await expect(page.locator("#dg-note-act")).toBeVisible();
  });

  test("Blog card opens the article with matching shared elements", async ({
    page,
  }) => {
    await page.goto("/");

    const card = page.locator("#posts .post-card").first();
    const title = (await card.locator("h3").innerText()).trim();
    const cardName = await card
      .locator("h3")
      .evaluate((el) => getComputedStyle(el).viewTransitionName);

    await card.click();

    const h1 = page.getByRole("heading", { level: 1, name: title });
    await expect(h1).toBeVisible();
    expect(
      await h1.evaluate((el) => getComputedStyle(el).viewTransitionName),
    ).toBe(cardName);
    await expect(page.locator(".post-cover img")).toBeVisible();
    await expect(page.locator("article.blog-post-content")).toBeVisible();

    await page.goBack();
    await expect(
      page.getByRole("heading", { level: 1, name: "Kevin Pennarun" }),
    ).toBeVisible();
  });

  test("Reduced motion: no animation runs", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    // Let short colour/shadow transitions (navbar shadow on scroll) settle
    await page.waitForTimeout(1000);

    const running = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .map((a) =>
          a instanceof CSSAnimation
            ? a.animationName
            : `transition:${(a as CSSTransition).transitionProperty}`,
        ),
    );
    expect(running).toEqual([]);
  });
});
