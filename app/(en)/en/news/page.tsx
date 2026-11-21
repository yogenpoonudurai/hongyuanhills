import type { Metadata } from "next";
import { NewsPage } from "@/components/pages/NewsPage";
import { newsCopy } from "@/content/news";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/news",
  title: newsCopy.en.hub.meta.title,
  description: newsCopy.en.hub.meta.description,
  image: "/images/grounds/landscape.jpg",
});

export default function Page() {
  return <NewsPage locale="en" />;
}
