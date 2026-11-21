import type { Metadata } from "next";
import { FuneralServicesPage } from "@/components/pages/FuneralServicesPage";
import { funeralCopy } from "@/content/funeral";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/services/funeral-services",
  title: funeralCopy.en.meta.title,
  description: funeralCopy.en.meta.description,
  image: "/images/grounds/landscape.jpg",
});

export default function Page() {
  return <FuneralServicesPage locale="en" />;
}
