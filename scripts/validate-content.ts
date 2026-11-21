import { existsSync } from "node:fs";
import path from "node:path";
import { aboutCopy, aboutImages } from "../content/about";
import { columbariumCopy } from "../content/columbarium";
import { contactCopy } from "../content/contact";
import { formCopy } from "../content/forms";
import { funeralCopy } from "../content/funeral";
import { groundsCopy, groundsGallery, groundsImages } from "../content/grounds";
import { halls } from "../content/halls";
import { homeCopy } from "../content/home";
import { legalCopy } from "../content/legal";
import { prePlanningCopy } from "../content/preplanning";
import { pricing } from "../content/pricing";
import { siteCopy } from "../content/site";
import { tabletsCopy } from "../content/tablets";

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
    nonEmpty(hall.intro[locale], `${hall.slug}.intro.${locale}`);
    nonEmpty(hall.locationNote[locale], `${hall.slug}.locationNote.${locale}`);
    assert(
      hall.panelDetails.length > 0,
      `${hall.slug}.panelDetails is empty`,
    );
    for (const panel of hall.panelDetails) {
      nonEmpty(panel.name[locale], `${hall.slug}.panel.name.${locale}`);
      nonEmpty(panel.body[locale], `${hall.slug}.panel.body.${locale}`);
    }
    assert(
      hall.amenities[locale].length > 0,
      `${hall.slug}.amenities.${locale} is empty`,
    );
    assert(hall.gallery.length > 0, `${hall.slug}.gallery is empty`);
    for (const image of hall.gallery) {
      nonEmpty(image.alt[locale], `${hall.slug}.gallery.alt.${locale}`);
    }
    if (hall.deity) {
      nonEmpty(hall.deity.name[locale], `${hall.slug}.deity.name.${locale}`);
      nonEmpty(hall.deity.body[locale], `${hall.slug}.deity.body.${locale}`);
    }
    nonEmpty(hall.video.title[locale], `${hall.slug}.video.title.${locale}`);
  }

  for (const image of [hall.image, hall.heroImage, hall.video.poster, ...hall.gallery]) {
    for (const extension of ["jpg", "webp"]) {
      const file = path.join("public", `${image.src}.${extension}`);
      assert(existsSync(file), `Missing image: ${file}`);
    }
  }
}

for (const [name, image] of Object.entries(groundsImages)) {
  for (const extension of ["jpg", "webp"]) {
    const file = path.join("public", `${image.src}.${extension}`);
    assert(existsSync(file), `Missing grounds image (${name}): ${file}`);
  }
}
for (const image of groundsGallery) {
  for (const extension of ["jpg", "webp"]) {
    const file = path.join("public", `${image.src}.${extension}`);
    assert(existsSync(file), `Missing grounds gallery image: ${file}`);
  }
}

for (const locale of locales) {
  const grounds = groundsCopy[locale];
  nonEmpty(grounds.meta.title, `groundsCopy.${locale}.meta.title`);
  nonEmpty(grounds.meta.description, `groundsCopy.${locale}.meta.description`);
  nonEmpty(grounds.hero.title, `groundsCopy.${locale}.hero.title`);
  assert(
    grounds.chapters.length >= 5,
    `groundsCopy.${locale}.chapters needs 5+ items`,
  );
  assert(
    grounds.siteSelection.body.length >= 2,
    `groundsCopy.${locale}.siteSelection.body needs 2+ paragraphs`,
  );
  assert(
    grounds.orientations.rows.length >= 3,
    `groundsCopy.${locale}.orientations.rows needs 3+ rows`,
  );
  assert(
    grounds.pond.sections.length >= 3,
    `groundsCopy.${locale}.pond.sections needs 3+ sections`,
  );
  assert(
    grounds.faq.items.length >= 3,
    `groundsCopy.${locale}.faq needs 3+ items`,
  );

  const columbarium = columbariumCopy[locale];
  nonEmpty(columbarium.meta.title, `columbariumCopy.${locale}.meta.title`);
  nonEmpty(columbarium.meta.description, `columbariumCopy.${locale}.meta.description`);
  nonEmpty(columbarium.hero.title, `columbariumCopy.${locale}.hero.title`);
  assert(
    columbarium.howToChoose.points.length >= 3,
    `columbariumCopy.${locale}.howToChoose needs 3+ points`,
  );
}


for (const image of [aboutImages.hero, ...aboutImages.gallery]) {
  for (const extension of ["jpg", "webp"]) {
    const file = path.join("public", `${image.src}.${extension}`);
    assert(existsSync(file), `Missing about image: ${file}`);
  }
}

for (const locale of locales) {
  const about = aboutCopy[locale];
  nonEmpty(about.meta.title, `aboutCopy.${locale}.meta.title`);
  nonEmpty(about.meta.description, `aboutCopy.${locale}.meta.description`);
  nonEmpty(about.hero.title, `aboutCopy.${locale}.hero.title`);
  assert(about.story.body.length >= 2, `aboutCopy.${locale}.story needs 2+ paragraphs`);
  assert(about.values.items.length === 4, `aboutCopy.${locale}.values must have 4 items`);
  assert(about.why.items.length === 4, `aboutCopy.${locale}.why must have 4 items`);

  const funeral = funeralCopy[locale];
  nonEmpty(funeral.meta.title, `funeralCopy.${locale}.meta.title`);
  nonEmpty(funeral.hero.title, `funeralCopy.${locale}.hero.title`);
  assert(funeral.services.items.length === 5, `funeralCopy.${locale}.services must have 5 items`);
  assert(funeral.process.steps.length === 5, `funeralCopy.${locale}.process must have 5 steps`);
  assert(funeral.faq.items.length >= 3, `funeralCopy.${locale}.faq needs 3+ items`);
  assert(funeral.checklist.items.length >= 3, `funeralCopy.${locale}.checklist needs 3+ items`);

  const preplanning = prePlanningCopy[locale];
  nonEmpty(preplanning.meta.title, `prePlanningCopy.${locale}.meta.title`);
  nonEmpty(preplanning.hero.title, `prePlanningCopy.${locale}.hero.title`);
  assert(preplanning.benefits.items.length === 4, `prePlanningCopy.${locale}.benefits must have 4 items`);
  assert(preplanning.steps.items.length === 4, `prePlanningCopy.${locale}.steps must have 4 items`);
  assert(preplanning.faq.items.length >= 3, `prePlanningCopy.${locale}.faq needs 3+ items`);

  const contact = contactCopy[locale];
  nonEmpty(contact.meta.title, `contactCopy.${locale}.meta.title`);
  nonEmpty(contact.hero.title, `contactCopy.${locale}.hero.title`);
  nonEmpty(contact.form.title, `contactCopy.${locale}.form.title`);
  nonEmpty(contact.form.intro, `contactCopy.${locale}.form.intro`);
  assert(contact.directions.points.length >= 3, `contactCopy.${locale}.directions needs 3+ points`);

  const tablets = tabletsCopy[locale];
  nonEmpty(tablets.meta.title, `tabletsCopy.${locale}.meta.title`);
  nonEmpty(tablets.header.title, `tabletsCopy.${locale}.header.title`);
  assert(tablets.expect.items.length === 3, `tabletsCopy.${locale}.expect must have 3 items`);
  nonEmpty(tablets.form.submit, `tabletsCopy.${locale}.form.submit`);
  nonEmpty(tablets.form.successTitle, `tabletsCopy.${locale}.form.successTitle`);
  nonEmpty(tablets.form.message, `tabletsCopy.${locale}.form.message`);

  for (const key of ["privacy", "terms"] as const) {
    const doc = legalCopy[locale][key];
    nonEmpty(doc.meta.title, `legalCopy.${locale}.${key}.meta.title`);
    nonEmpty(doc.title, `legalCopy.${locale}.${key}.title`);
    nonEmpty(doc.intro, `legalCopy.${locale}.${key}.intro`);
    nonEmpty(doc.lastUpdated, `legalCopy.${locale}.${key}.lastUpdated`);
    assert(doc.sections.length >= 5, `legalCopy.${locale}.${key} needs 5+ sections`);
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
  nonEmpty(site.footer.privacy, `siteCopy.${locale}.footer.privacy`);
  nonEmpty(site.footer.terms, `siteCopy.${locale}.footer.terms`);

  const form = formCopy[locale];
  nonEmpty(form.eyebrow, `formCopy.${locale}.eyebrow`);
  nonEmpty(form.title, `formCopy.${locale}.title`);
  nonEmpty(form.intro, `formCopy.${locale}.intro`);
  nonEmpty(form.privacy, `formCopy.${locale}.privacy`);
  nonEmpty(form.submit, `formCopy.${locale}.submit`);
  assert(
    form.interests.length === 5,
    `formCopy.${locale}.interests must have 5 options`,
  );
  assert(
    form.times.length === 4,
    `formCopy.${locale}.times must have 4 options`,
  );
  for (const [key, value] of Object.entries(form.errors)) {
    nonEmpty(value, `formCopy.${locale}.errors.${key}`);
  }
  for (const [key, value] of Object.entries(form.success)) {
    nonEmpty(value, `formCopy.${locale}.success.${key}`);
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed (${errors.length}):`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${halls.length} halls, ${pricing.length} price entries, ${locales.length} locales.`,
);
