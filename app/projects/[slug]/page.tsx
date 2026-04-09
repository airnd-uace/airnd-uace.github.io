import { notFound } from "next/navigation";
import { allProjects, getProjectBySlug, projectSlugFromTitle } from "@/lib/projects";
import { ProjectPostClient } from "./project-post-client";

export function generateStaticParams() {
  return allProjects.map((p) => ({
    slug: projectSlugFromTitle(p.title),
  }));
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
