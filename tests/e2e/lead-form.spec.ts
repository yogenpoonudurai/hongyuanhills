import { expect, test } from "@playwright/test";

test.describe("booking form", () => {
  test("shows validation errors for required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#form").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "提交预约" }).click();

    await expect(page.getByText("请填写姓名。")).toBeVisible();
    await expect(page.getByLabel("姓名")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("submits a valid request and shows the success state", async ({
    page,
  }) => {
    await page.route("**/api/lead", async (route) => {
      const body = route.request().postDataJSON() as {
        type: string;
        consent: boolean;
      };
      expect(body.type).toBe("visit");
      expect(body.consent).toBe(true);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");
    await page.locator("#form").scrollIntoViewIfNeeded();
    await page.getByLabel("姓名").fill("Test User");
    await page.getByLabel("联络电话").fill("+60 12-345 6789");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "提交预约" }).click();

    await expect(page.getByRole("status")).toContainText("预约请求已收到");
  });

  test("shows WhatsApp fallback when the API is unavailable", async ({
    page,
  }) => {
    await page.route("**/api/lead", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: "form_disabled",
          fallback: "whatsapp",
        }),
      }),
    );

    await page.goto("/contact");
    await page.locator("#form").scrollIntoViewIfNeeded();
    await page.getByLabel("姓名").fill("Test User");
    await page.getByLabel("联络电话").fill("+60 12-345 6789");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "提交预约" }).click();

    const alert = page.locator("#form").getByRole("alert");
    await expect(alert).toContainText("如果表格无法提交");
    await expect(alert.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      /wa\.me/,
    );
  });
});
