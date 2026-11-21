import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("theme and font", () => {
  test("switches to Sanctuary, persists and switches back", async ({ page }) => {
    await page.goto("/");

    const group = page.getByRole("group", { name: "主题" });
    await expect(group.getByRole("button", { name: "经典" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await group.getByRole("button", { name: "静谧" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "sanctuary",
    );
    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.body).backgroundColor),
      )
      .toBe("rgb(237, 241, 233)");

    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "sanctuary",
    );

    await page
      .getByRole("group", { name: "主题" })
      .getByRole("button", { name: "经典" })
      .click();
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-theme",
      "sanctuary",
    );
  });

  test("both themes pass serious axe checks", async ({ page }) => {
    await page.goto("/");

    for (const theme of ["ivory", "sanctuary"] as const) {
      if (theme === "sanctuary") {
        await page
          .getByRole("group", { name: "主题" })
          .getByRole("button", { name: "静谧" })
          .click();
        await page.waitForTimeout(350);
      }

      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(serious, `axe violations in ${theme} theme`).toEqual([]);
    }
  });

  test("loads the Chinese Kaiti-style font", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const fonts = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return {
        loaded: document.fonts.check("16px cnFont"),
        status: document.fonts.status,
        bodyFont: getComputedStyle(document.body).fontFamily,
        h1Font: h1 ? getComputedStyle(h1).fontFamily : "",
      };
    });

    expect(fonts.status).toBe("loaded");
    expect(fonts.loaded).toBe(true);
    expect(fonts.bodyFont).toContain("cnFont");
    expect(fonts.h1Font).toContain("cnFont");
  });
});
