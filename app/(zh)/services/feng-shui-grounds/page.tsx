import type { Metadata } from "next";
import { GroundsPage } from "@/components/pages/GroundsPage";
import { groundsCopy } from "@/content/grounds";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/services/feng-shui-grounds",
  title: groundsCopy.zh.meta.title,
  description: groundsCopy.zh.meta.description,
  image: "/images/grounds/hero.jpg",
});

export default function Page() {
  return <GroundsPage locale="zh" />;
}
