import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { legalCopy } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/privacy-policy",
  title: legalCopy.zh.privacy.meta.title,
  description: legalCopy.zh.privacy.meta.description,
  image: "/images/hero.jpg",
});

export default function Page() {
  return (
    <LegalPage
      locale="zh"
      doc={legalCopy.zh.privacy}
      path="/privacy-policy"
    />
  );
}
