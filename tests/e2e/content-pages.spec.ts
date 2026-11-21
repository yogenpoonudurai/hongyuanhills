import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const newRoutes = [
  "/about",
  "/services/funeral-services",
  "/pre-planning",
  "/contact",
  "/services/ancestral-tablets",
  "/privacy-policy",
  "/terms",
];

async function submitLead(
  page: Page,
  options: {
    section: string;
    submitLabel: string;
    expectedType?: "visit" | "notify";
  },
) {
  const captured: { payload?: { type?: string; consent?: boolean } } = {};
  await page.route("**/api/lead", async (route) => {
    captured.payload = route.request().postDataJSON() as {
      type?: string;
      consent?: boolean;
    };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  const section = page.locator(options.section);
  await section.getByLabel("姓名").fill("Content Test");
  await section.getByLabel("联络电话").fill("+60 12-345 6789");
  await section.getByRole("checkbox").check();
  await section.getByRole("button", { name: options.submitLabel }).click();
  await expect(section.getByRole("status")).toBeVisible();

  expect(captured.payload?.consent).toBe(true);
  if (options.expectedType)
    expect(captured.payload?.type).toBe(options.expectedType);
}

test.describe("content pages", () => {
  test("about page has metadata and content", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "承载文化传统",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/about/",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://hongyuanhills.com/en/about/",
    );
    await expect(page.getByText("我们的价值")).toBeVisible();
  });

  test("funeral page shows urgent contact and service details", async ({
    page,
  }) => {
    await page.goto("/services/funeral-services");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "告别的时刻",
    );
    await expect(page.getByText("如需即时协助")).toBeVisible();
    await expect(
      page.locator('a[href^="tel:"]').filter({ visible: true }).first(),
    ).toBeVisible();
    await expect(page.getByText("遗体接送").first()).toBeVisible();
  });

  test("pre-planning form submits", async ({ page }) => {
    await page.goto("/pre-planning");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "提前规划",
    );
    await expect(page.getByText("免费咨询").first()).toBeVisible();
    await submitLead(page, {
      section: "#form",
      submitLabel: "提交预约",
      expectedType: "visit",
    });
  });

  test("contact page lists addresses and submits an enquiry", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "欢迎预约参观",
    );
    await expect(page.getByText("墓园地址").first()).toBeVisible();
    await submitLead(page, {
      section: "#form",
      submitLabel: "提交预约",
      expectedType: "visit",
    });
  });

  test("ancestral tablets page sends a notify request", async ({ page }) => {
    await page.goto("/services/ancestral-tablets");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "即将推出",
    );
    await expect(page.getByText("开放时通知我")).toBeVisible();
    await submitLead(page, {
      section: "#notify",
      submitLabel: "通知我",
      expectedType: "notify",
    });
    await expect(page.getByRole("status")).toContainText("已收到您的通知请求");
  });

  test("legal pages render and are linked from the footer", async ({
    page,
  }) => {
    for (const route of ["/privacy-policy", "/terms"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByText("最后更新", { exact: false }).first(),
      ).toBeVisible();
    }

    const privacy = page.locator('footer a[href^="/privacy-policy"]');
    const terms = page.locator('footer a[href^="/terms"]');
    await expect(privacy).toHaveCount(1);
    await expect(terms).toHaveCount(1);
  });

  test("no horizontal overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    for (const route of newRoutes) {
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
