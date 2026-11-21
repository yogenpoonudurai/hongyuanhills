import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeCopy } from "@/content/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/",
  title: homeCopy.zh.meta.title,
  description: homeCopy.zh.meta.description,
});

export default function ChineseHomePage() {
  return <HomePage locale="zh" />;
}
