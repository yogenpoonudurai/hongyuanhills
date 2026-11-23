import { expect, test } from "@playwright/test";
import { approvedSiteContract } from "../contracts/approved-site-contract";

function approvedWhatsAppHref(message: string) {
  return `https://wa.me/${approvedSiteContract.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

test.describe("WhatsApp booking and contact", () => {
  test("home booking entry points open the prefilled WhatsApp conversation", async ({
    page,
  }) => {
    await page.goto("/");

    const headerBooking = page.getByRole("link", { name: "预约参观" }).first();
    await expect(headerBooking).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.zh.booking),
    );
    await expect(headerBooking).toHaveAttribute("target", "_blank");

    const heroBooking = page.getByRole("link", { name: "预约参观" }).nth(1);
    await expect(heroBooking).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.zh.booking),
    );
    await expect(heroBooking).toHaveAttribute("target", "_blank");

    const heroEnquiry = page.getByRole("link", { name: "WhatsApp 咨询" });
    await expect(heroEnquiry).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.zh.general),
    );
  });

  test("contact page offers WhatsApp as its primary contact path", async ({
    page,
  }) => {
    await page.goto("/contact");

    const heroWhatsApp = page.getByRole("link", { name: "WhatsApp 咨询" }).first();
    await expect(heroWhatsApp).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.zh.general),
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
      page.getByRole("link", { name: "WhatsApp Us" }).first(),
    ).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.en.general),
    );

    const booking = page.getByRole("link", { name: "Book a Visit" });
    await expect(booking).toHaveAttribute(
      "href",
      approvedWhatsAppHref(approvedSiteContract.whatsapp.messages.en.booking),
    );
  });
});
