import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, getProjectBySlug, projectSlugFromTitle } from "@/lib/projects";
import { ProjectPostClient } from "./project-post-client";

export function generateStaticParams() {
  return allProjects.map((p) => ({
    slug: projectSlugFromTitle(p.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.desc,
    keywords: project.tags,
  };
}

export default async function ProjectPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return <ProjectPostClient project={project} />;
}
