import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeCopy } from "@/content/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/",
  title: homeCopy.en.meta.title,
  description: homeCopy.en.meta.description,
});

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
