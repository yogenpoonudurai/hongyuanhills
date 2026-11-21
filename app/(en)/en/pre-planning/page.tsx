import type { Metadata } from "next";
import { PrePlanningPage } from "@/components/pages/PrePlanningPage";
import { prePlanningCopy } from "@/content/preplanning";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/pre-planning",
  title: prePlanningCopy.en.meta.title,
  description: prePlanningCopy.en.meta.description,
  image: "/images/grounds/site.jpg",
});

export default function Page() {
  return <PrePlanningPage locale="en" />;
}
