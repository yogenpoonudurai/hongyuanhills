import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { legalCopy } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/privacy-policy",
  title: legalCopy.en.privacy.meta.title,
  description: legalCopy.en.privacy.meta.description,
  image: "/images/hero.jpg",
});

export default function Page() {
  return (
    <LegalPage
      locale="en"
      doc={legalCopy.en.privacy}
      path="/privacy-policy"
    />
  );
}
