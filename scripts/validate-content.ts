import { existsSync } from "node:fs";
import path from "node:path";
import { halls } from "../content/halls";
import { homeCopy } from "../content/home";
import { pricing } from "../content/pricing";
import { siteCopy } from "../content/site";

const locales = ["zh", "en"] as const;
const errors: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function nonEmpty(value: string, label: string) {
  assert(value.trim().length > 0, `${label} is empty`);
}

assert(halls.length === 4, `Expected 4 halls, found ${halls.length}`);

const slugs = new Set<string>();
for (const hall of halls) {
  assert(!slugs.has(hall.slug), `Duplicate hall slug: ${hall.slug}`);
  slugs.add(hall.slug);

  for (const locale of locales) {
    nonEmpty(hall.name[locale], `${hall.slug}.name.${locale}`);
    nonEmpty(hall.tagline[locale], `${hall.slug}.tagline.${locale}`);
    nonEmpty(hall.summary[locale], `${hall.slug}.summary.${locale}`);
    nonEmpty(hall.image.alt[locale], `${hall.slug}.image.alt.${locale}`);
    assert(
      hall.panels[locale].length > 0,
      `${hall.slug}.panels.${locale} is empty`,
    );
  }

  for (const extension of ["jpg", "webp"]) {
    const file = path.join("public", `${hall.image.src}.${extension}`);
    assert(existsSync(file), `Missing hall image: ${file}`);
  }
}

for (const price of pricing) {
  for (const locale of locales) {
    nonEmpty(price.label[locale], `${price.id}.label.${locale}`);
  }
  assert(
    price.fromPrice === null ||
      (Number.isInteger(price.fromPrice) && price.fromPrice > 0),
    `${price.id}.fromPrice must be null or a positive integer`,
  );
  assert(
    !Number.isNaN(Date.parse(price.lastUpdated)),
    `${price.id}.lastUpdated is not a valid date`,
  );
}

for (const locale of locales) {
  const home = homeCopy[locale];
  nonEmpty(home.meta.title, `homeCopy.${locale}.meta.title`);
  nonEmpty(home.meta.description, `homeCopy.${locale}.meta.description`);
  nonEmpty(home.hero.title, `homeCopy.${locale}.hero.title`);
  nonEmpty(home.hero.body, `homeCopy.${locale}.hero.body`);
  assert(
    home.services.items.length === 4,
    `homeCopy.${locale}.services must have 4 items`,
  );
  assert(
    home.preplanning.steps.length === 4,
    `homeCopy.${locale}.preplanning must have 4 steps`,
  );
  assert(home.faq.items.length >= 4, `homeCopy.${locale}.faq needs 4+ items`);

  const site = siteCopy[locale];
  nonEmpty(site.brand.name, `siteCopy.${locale}.brand.name`);
  nonEmpty(site.tagline, `siteCopy.${locale}.tagline`);
  assert(
    site.addresses.length === 2,
    `siteCopy.${locale}.addresses must have 2 addresses`,
  );
  nonEmpty(site.whatsapp.booking, `siteCopy.${locale}.whatsapp.booking`);
  nonEmpty(site.whatsapp.general, `siteCopy.${locale}.whatsapp.general`);
  nonEmpty(site.whatsapp.funeral, `siteCopy.${locale}.whatsapp.funeral`);
}

if (errors.length > 0) {
  console.error(`Content validation failed (${errors.length}):`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${halls.length} halls, ${pricing.length} price entries, ${locales.length} locales.`,
);
