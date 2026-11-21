import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { contactCopy } from "@/content/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "zh",
  path: "/contact",
  title: contactCopy.zh.meta.title,
  description: contactCopy.zh.meta.description,
  image: "/images/grounds/landscape.jpg",
});

export default function Page() {
  return <ContactPage locale="zh" />;
}
