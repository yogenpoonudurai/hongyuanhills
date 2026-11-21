import type { Metadata } from "next";
import { ColumbariumPage } from "@/components/pages/ColumbariumPage";
import { columbariumCopy } from "@/content/columbarium";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/services/columbarium",
  title: columbariumCopy.zh.meta.title,
  description: columbariumCopy.zh.meta.description,
  image: "/images/halls/zizai-hero.jpg",
});

export default function Page() {
  return <ColumbariumPage locale="zh" />;
}
