import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const hallSlugs = [
  "zizai-pavilion",
  "benyuan-pavilion",
  "sanyuan-hall",
  "danxiang-pavilion",
];

const newRoutes = [
  "/services/feng-shui-grounds",
  "/services/columbarium",
  ...hallSlugs.map((slug) => `/services/columbarium/${slug}`),
];

test.describe("service pages", () => {
  test("grounds page has metadata, chapter navigation and no overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/services/feng-shui-grounds");

    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "山环水抱",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/services/feng-shui-grounds/",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/en/services/feng-shui-grounds/",
    );
    await expect(
      page.locator('nav[aria-label="本页章节"]'),
    ).toBeVisible();

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.locator('nav[aria-label="本页章节"] a[href="#orientations"]').click();
    await expect(page).toHaveURL(/#orientations$/);
    await expect(page.locator("#orientations h2")).toBeVisible();
  });

  test("columbarium hub lists all four halls", async ({ page }) => {
    await page.goto("/services/columbarium");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "四座殿堂",
    );
    for (const slug of hallSlugs) {
      await expect(
        page.locator(`a[href*="/services/columbarium/${slug}"]`).filter({ visible: true }).first(),
      ).toBeVisible();
    }
    await expect(page.getByText("自在菩萨").filter({ visible: true }).first()).toBeVisible();
    await expect(page.getByText("地藏王菩萨", { exact: false }).filter({ visible: true }).first()).toBeVisible();
  });

  test("each hall page renders its core content", async ({ page }) => {
    for (const slug of hallSlugs) {
      await page.goto(`/services/columbarium/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("价格请咨询").first()).toBeVisible();
      await expect(
        page.locator('button[aria-label^="查看图片"]'),
      ).toHaveCount(3);
      await expect(
        page.locator('a[href*="/services/columbarium/"]'),
      ).not.toHaveCount(0);
    }
  });

  test("gallery lightbox opens, changes image and closes", async ({ page }) => {
    await page.goto("/services/columbarium/zizai-pavilion");
    const galleryButtons = page.locator('button[aria-label^="查看图片"]');
    await galleryButtons.first().click();

    const dialog = page.locator("dialog");
    await expect(dialog).toHaveJSProperty("open", true);
    await expect(dialog.getByText("图片 1/3")).toBeVisible();

    await dialog.getByRole("button", { name: "下一张" }).click();
    await expect(dialog.getByText("图片 2/3")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveJSProperty("open", false);
  });

  test("language switch maps an interior page to its counterpart", async ({
    page,
  }) => {
    await page.goto("/services/columbarium");
    await page.locator("footer").getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/services\/columbarium\/?$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.locator("footer").getByRole("link", { name: "中文" }).click();
    await expect(page).toHaveURL(/\/services\/columbarium\/?$/);
  });

  test("no horizontal overflow at 320px on new pages", async ({ page }) => {
    for (const route of [
      "/services/feng-shui-grounds",
      "/services/columbarium",
      "/services/columbarium/sanyuan-hall",
    ]) {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `overflow on ${route}`).toBeLessThanOrEqual(
        clientWidth + 1,
      );
    }
  });

  test("no serious axe violations on new pages", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of newRoutes) {
      for (const prefix of ["", "/en"]) {
        await page.goto(`${prefix}${route}`);
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter(
          (violation) =>
            violation.impact === "serious" || violation.impact === "critical",
        );
        expect(serious, `axe violations on ${prefix}${route}`).toEqual([]);
      }
    }
  });
});
