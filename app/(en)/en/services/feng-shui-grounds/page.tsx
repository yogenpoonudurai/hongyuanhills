import type { Metadata } from "next";
import { GroundsPage } from "@/components/pages/GroundsPage";
import { groundsCopy } from "@/content/grounds";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/services/feng-shui-grounds",
  title: groundsCopy.en.meta.title,
  description: groundsCopy.en.meta.description,
  image: "/images/grounds/hero.jpg",
});

export default function Page() {
  return <GroundsPage locale="en" />;
}
