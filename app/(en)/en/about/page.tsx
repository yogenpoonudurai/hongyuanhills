import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { aboutCopy } from "@/content/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/about",
  title: aboutCopy.en.meta.title,
  description: aboutCopy.en.meta.description,
  image: "/images/about.jpg",
});

export default function Page() {
  return <AboutPage locale="en" />;
}
