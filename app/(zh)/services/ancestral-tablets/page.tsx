import type { Metadata } from "next";
import { TabletsPage } from "@/components/pages/TabletsPage";
import { tabletsCopy } from "@/content/tablets";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/services/ancestral-tablets",
  title: tabletsCopy.zh.meta.title,
  description: tabletsCopy.zh.meta.description,
  image: "/images/halls/zizai-hero.jpg",
});

export default function Page() {
  return <TabletsPage locale="zh" />;
}
