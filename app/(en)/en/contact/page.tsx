import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { contactCopy } from "@/content/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "/contact",
  title: contactCopy.en.meta.title,
  description: contactCopy.en.meta.description,
  image: "/images/grounds/landscape.jpg",
});

export default function Page() {
  return <ContactPage locale="en" />;
}
