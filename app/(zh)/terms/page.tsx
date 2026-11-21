import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { legalCopy } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/terms",
  title: legalCopy.zh.terms.meta.title,
  description: legalCopy.zh.terms.meta.description,
  image: "/images/hero.jpg",
});

export default function Page() {
  return <LegalPage locale="zh" doc={legalCopy.zh.terms} path="/terms" />;
}
