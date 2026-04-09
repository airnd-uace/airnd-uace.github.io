"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LabShell, useLabShell } from "@/components/lab-shell";
import { ResearchCard } from "@/components/research-card";
import { researchByKey, researchPostHref } from "@/lib/research-items";

function ResearchListingInner() {
  const { t } = useLabShell();

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
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">{t.research.title}</h1>
        <p className="max-w-2xl text-neutral-600">{t.listings.researchIntro}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {researchByKey.all.map((r) => (
          <ResearchCard
            key={r.key}
            title={t.researchPapers[r.key].title}
            desc={t.researchPapers[r.key].desc}
            tags={r.tags}
            date={r.date}
            readLabel={t.research.read}
            href={researchPostHref(r.key)}
          />
        ))}
      </div>
    </>
  );
}

export default function ResearchListingPage() {
  return (
    <LabShell>
      <ResearchListingInner />
    </LabShell>
  );
}
