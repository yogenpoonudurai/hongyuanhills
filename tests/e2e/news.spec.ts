import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const articleSlug = "online-visit-requests";
const expectedHomePosts = [
  { slug: "online-visit-requests", title: "WhatsApp 预约参观现已开放" },
  { slug: "ancestral-tablets-coming-soon", title: "神主牌服务筹备中" },
  { slug: "hall-video-tours-coming-soon", title: "四座骨灰殿导览影片即将上线" },
];

test.describe("news and updates", () => {
  test("hub lists posts and has bilingual metadata", async ({ page }) => {
    await page.goto("/news");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "新闻与动态",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/news/",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/en/news/",
    );
    await expect(page.locator("main article")).toHaveCount(3);

    await page.goto("/en/news");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "News & Updates",
    );
  });

  test("article renders content and metadata", async ({ page }) => {
    await page.goto(`/news/${articleSlug}`);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "WhatsApp 预约参观",
    );
    await expect(page.locator('time[datetime="2026-11-21"]')).toBeVisible();
    await expect(
      page.getByText("预约参观与一般查询可通过 WhatsApp 联系我们", { exact: false }),
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://hongyuanhills.com/news/${articleSlug}/`,
    );
    await expect(page.getByRole("link", { name: "返回新闻列表" })).toBeVisible();

    await page.goto(`/en/news/${articleSlug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Book a visit via WhatsApp",
    );
  });

  test("home page shows the latest three posts", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#news");
    await expect(section.getByRole("heading", { name: "最新消息" })).toBeVisible();
    const postLinks = section.locator('a[href^="/news/"]');
    await expect(postLinks).toHaveCount(expectedHomePosts.length);
    for (const post of expectedHomePosts) {
      const postLink = section.getByRole("link").filter({ hasText: post.title });
      await expect(postLink).toHaveAttribute("href", `/news/${post.slug}/`);
    }
  });

  test("language switch maps a news article", async ({ page }) => {
    await page.goto(`/news/${articleSlug}`);
    await page
      .locator("footer")
      .getByRole("link", { name: "English" })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/en/news/${articleSlug}/?$`),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("no overflow and no serious axe violations on news pages", async ({
    page,
  }) => {
    test.setTimeout(120_000);

    for (const route of ["/news", `/news/${articleSlug}`]) {
      for (const prefix of ["", "/en"]) {
        await page.setViewportSize({ width: 320, height: 800 });
        await page.goto(`${prefix}${route}`);

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth, `overflow on ${prefix}${route}`).toBeLessThanOrEqual(
          clientWidth + 1,
        );

        await page.setViewportSize({ width: 390, height: 844 });
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
