import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HallPage } from "@/components/pages/HallPage";
import { getHall, halls } from "@/content/halls";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return halls.map((hall) => ({ slug: hall.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hall = getHall(slug);
  if (!hall) return {};

  return buildMetadata({
    locale: "zh",
    path: `/services/columbarium/${slug}`,
    title: `${hall.name.zh}｜宏缘宝地骨灰殿`,
    description: hall.summary.zh,
    image: `${hall.heroImage.src}.jpg`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hall = getHall(slug);
  if (!hall) notFound();

  return <HallPage hall={hall} locale="zh" />;
}
