import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isResearchSlug, RESEARCH_SLUGS, getResearchMeta } from "@/lib/research-items";
import type { ResearchKey } from "@/lib/members";
import { translations } from "@/lib/translations";
import { ResearchPostClient } from "./research-post-client";

export function generateStaticParams() {
  return RESEARCH_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isResearchSlug(slug)) return {};
  const t = translations.en;
  const paper = t.researchPapers[slug as ResearchKey];
  const meta = getResearchMeta(slug as ResearchKey);
  return {
    title: paper.title,
    description: paper.desc,
    keywords: meta.tags,
  };
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isResearchSlug(slug)) {
    notFound();
  }

  return <ResearchPostClient researchKey={slug as ResearchKey} />;
}
