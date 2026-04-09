import { notFound } from "next/navigation";
import { isResearchSlug, RESEARCH_SLUGS } from "@/lib/research-items";
import type { ResearchKey } from "@/lib/members";
import { ResearchPostClient } from "./research-post-client";

export function generateStaticParams() {
  return RESEARCH_SLUGS.map((slug) => ({ slug }));
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
