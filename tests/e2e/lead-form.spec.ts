import { expect, test } from "@playwright/test";

test.describe("WhatsApp booking and contact", () => {
  test("home booking entry points open the prefilled WhatsApp conversation", async ({
    page,
  }) => {
    await page.goto("/");

    const headerBooking = page.getByRole("link", { name: "预约参观" }).first();
    await expect(headerBooking).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/\d+\?text=/,
    );
    await expect(headerBooking).toHaveAttribute("target", "_blank");

    const heroBooking = page.getByRole("link", { name: "预约参观" }).nth(1);
    await expect(heroBooking).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/\d+\?text=/,
    );
    await expect(heroBooking).toHaveAttribute("target", "_blank");
  });

  test("contact page offers WhatsApp as its primary contact path", async ({
    page,
  }) => {
    await page.goto("/contact");

    const heroWhatsApp = page.getByRole("link", { name: "WhatsApp" }).first();
    await expect(heroWhatsApp).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/\d+\?text=/,
    );
    await expect(heroWhatsApp).toHaveAttribute("target", "_blank");
    await expect(page.locator("form")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "通过 WhatsApp 与我们联系" }),
    ).toBeVisible();
  });

  test("English contact page uses localized WhatsApp guidance", async ({
    page,
  }) => {
    await page.goto("/en/contact");
    await expect(
      page.getByRole("heading", { name: "Message us on WhatsApp" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "WhatsApp" }).first(),
    ).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=/);
  });
});
