import type { Metadata } from "next";
import { ColumbariumPage } from "@/components/pages/ColumbariumPage";
import { columbariumCopy } from "@/content/columbarium";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/services/columbarium",
  title: columbariumCopy.en.meta.title,
  description: columbariumCopy.en.meta.description,
  image: "/images/halls/zizai-hero.jpg",
});

export default function Page() {
  return <ColumbariumPage locale="en" />;
}
