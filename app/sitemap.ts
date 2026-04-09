import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { RESEARCH_SLUGS } from "@/lib/research-items";
import { allProjects, projectSlugFromTitle } from "@/lib/projects";
import { members } from "@/lib/members";

const BASE = "https://aird.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/news`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/team/alumni`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const researchPages: MetadataRoute.Sitemap = RESEARCH_SLUGS.map((key) => ({
    url: `${BASE}/research/${key}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = allProjects.map((p) => ({
    url: `${BASE}/projects/${projectSlugFromTitle(p.title)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const teamPages: MetadataRoute.Sitemap = members.map((m) => ({
    url: `${BASE}/team/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...researchPages, ...projectPages, ...teamPages];
}
