"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LabShell, useLabShell } from "@/components/lab-shell";
import { ResearchCard } from "@/components/research-card";
import { allProjects, projectHref } from "@/lib/projects";

function ProjectsListingInner() {
  const { t, locale } = useLabShell();

  return (
    <>
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.listings.backHome}
      </Link>

      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">{t.nav.projects}</h1>
        <p className="max-w-2xl text-neutral-600">{t.listings.projectsIntro}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <ResearchCard
            key={project.title}
            title={project.title}
            desc={project.desc}
            tags={project.tags}
            date={project.date}
            readLabel={locale === "en" ? "View" : "Ver"}
            href={projectHref(project)}
          />
        ))}
      </div>
    </>
  );
}

export default function ProjectsListingPage() {
  return (
    <LabShell>
      <ProjectsListingInner />
    </LabShell>
  );
}
