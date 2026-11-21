import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/pages/NewsArticlePage";
import { getNewsPost, news } from "@/content/news";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};

  return buildMetadata({
    locale: "zh",
    path: `/news/${slug}`,
    title: `${post.title.zh}｜宏缘宝地`,
    description: post.excerpt.zh,
    image: `${post.image?.src ?? "/images/hero"}.jpg`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return <NewsArticlePage post={post} locale="zh" />;
}
