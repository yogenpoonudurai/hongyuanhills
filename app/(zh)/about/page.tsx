import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { aboutCopy } from "@/content/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/about",
  title: aboutCopy.zh.meta.title,
  description: aboutCopy.zh.meta.description,
  image: "/images/about.jpg",
});

export default function Page() {
  return <AboutPage locale="zh" />;
}
