import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("social links", () => {
  test("home page shows Facebook and Instagram links", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#social");
    await expect(section.getByRole("heading", { name: "在社群中与我们保持联系。" })).toBeVisible();
    await expect(
      section.getByRole("link", { name: /Facebook 专页/ }),
    ).toHaveAttribute("href", "https://www.facebook.com/hyhills.my/");
    await expect(
      section.getByRole("link", { name: /Instagram 主页/ }),
    ).toHaveAttribute("href", "https://www.instagram.com/hongyuanhills/");

    await expect(
      page.locator('footer a[aria-label="Facebook"]'),
    ).toHaveAttribute("href", "https://www.facebook.com/hyhills.my/");
    await expect(
      page.locator('footer a[aria-label="Instagram"]'),
    ).toHaveAttribute("href", "https://www.instagram.com/hongyuanhills/");
  });

  test("English social section renders", async ({ page }) => {
    await page.goto("/en");
    const section = page.locator("#social");
    await expect(section.getByRole("heading", { name: "Stay connected with us." })).toBeVisible();
    await expect(
      section.getByRole("link", { name: /Facebook Page/ }),
    ).toBeVisible();
  });

  test("social section is mobile-safe and accessible", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.setViewportSize({ width: 390, height: 844 });
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );
    expect(serious).toEqual([]);
  });
});
