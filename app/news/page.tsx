"use client";

import Link from "next/link";
import { ArrowLeft, FileText, FolderOpen, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LabShell, useLabShell } from "@/components/lab-shell";
import { allNews, type NewsType } from "@/lib/news";

const typeIcon: Record<NewsType, typeof FileText> = {
  paper: FileText,
  project: FolderOpen,
  member: Users,
  event: Calendar,
};

function NewsListingInner() {
  const { locale, t } = useLabShell();

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
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {locale === "en" ? "News & Updates" : "Noticias y Actualizaciones"}
        </h1>
        <p className="max-w-2xl text-neutral-600">
          {locale === "en"
            ? "Latest announcements, publications, and milestones from the lab."
            : "Últimos anuncios, publicaciones e hitos del laboratorio."}
        </p>
      </header>

      <div className="space-y-6">
        {allNews.map((item, i) => {
          const Icon = typeIcon[item.type];
          const title = locale === "en" ? item.titleEn : item.titleEs;
          const body = locale === "en" ? item.bodyEn : item.bodyEs;

          const inner = (
            <div className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[11px] border-neutral-300 text-neutral-500">
                    {item.date}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-neutral-900">{title}</p>
                <p className="text-sm text-neutral-600">{body}</p>
              </div>
            </div>
          );

          if (item.href) {
            return (
              <Link key={i} href={item.href} className="block">
                {inner}
              </Link>
            );
          }
          return <div key={i}>{inner}</div>;
        })}
      </div>
    </>
  );
}

export default function NewsListingPage() {
  return (
    <LabShell>
      <NewsListingInner />
    </LabShell>
  );
}
