import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { legalCopy } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/terms",
  title: legalCopy.en.terms.meta.title,
  description: legalCopy.en.terms.meta.description,
  image: "/images/hero.jpg",
});

export default function Page() {
  return (
    <LegalPage locale="en" doc={legalCopy.en.terms} path="/terms" />
  );
}
