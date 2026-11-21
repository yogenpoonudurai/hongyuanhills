import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("bilingual home", () => {
  test("Chinese home has the correct language, title and hreflang", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "一处安宁归宿",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/en/",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/",
    );
  });

  test("English home has the correct language and canonical", async ({
    page,
  }) => {
    await page.goto("/en");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "A peaceful resting place",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/en/",
    );
  });
});

test.describe("mobile layout", () => {
  test("no horizontal overflow at narrow widths", async ({ page }) => {
    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `overflow at ${width}px`).toBeLessThanOrEqual(
        clientWidth + 1,
      );
    }
  });

  test("mobile drawer opens, locks scroll and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "打开菜单" }).click();
    const dialog = page.getByRole("dialog", { name: "菜单" });
    await expect(dialog).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await dialog.getByRole("button", { name: "关闭" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("all images load and contact CTAs exist", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);

    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute("src")),
    );

    expect(broken).toEqual([]);
    expect(await page.locator('a[href^="tel:"]').count()).toBeGreaterThan(0);
    expect(
      await page.locator('a[href^="https://wa.me/"]').count(),
    ).toBeGreaterThan(0);
  });
});

test.describe("accessibility", () => {
  test("no serious or critical axe violations on both locales", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const path of ["/", "/en"]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(serious, `axe violations on ${path}`).toEqual([]);
    }
  });
});
