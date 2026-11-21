import type { Metadata } from "next";
import { FuneralServicesPage } from "@/components/pages/FuneralServicesPage";
import { funeralCopy } from "@/content/funeral";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/services/funeral-services",
  title: funeralCopy.zh.meta.title,
  description: funeralCopy.zh.meta.description,
  image: "/images/grounds/landscape.jpg",
});

export default function Page() {
  return <FuneralServicesPage locale="zh" />;
}
