"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCALE_KEY, tagColor } from "@/lib/constants";
import type { Project } from "@/lib/projects";
import { membersForProjectTitle } from "@/lib/members";
import { translations, type Locale } from "@/lib/translations";

export function ProjectPostClient({ project }: { project: Project }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const t = translations[locale];
  const team = membersForProjectTitle(project.title);

  const extra =
    locale === "en"
      ? [
          "This project is developed and maintained within the AIR&D lab. Roadmaps, demos, and technical write-ups are shared with collaborators and partners as appropriate.",
          "Core contributors are listed below. For implementation details or partnerships, contact the team.",
        ]
      : [
          "Este proyecto se desarrolla y mantiene dentro del laboratorio AIR&D. Las hojas de ruta, demos y documentación técnica se comparten con colaboradores según corresponda.",
          "Los contribuidores principales aparecen abajo. Para detalles de implementación o alianzas, contacta al equipo.",
        ];

  const kindLabel = locale === "en" ? "Project" : "Proyecto";

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale((l) => (l === "en" ? "es" : "en"))}
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-700"
              aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            >
              <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>EN</span>
              <span className="mx-1 text-neutral-300">|</span>
              <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>SP</span>
            </button>
            <Link href="/#team">
              <Button size="sm" variant="outline" className="h-8 rounded-full border-neutral-300 px-4 text-xs font-medium text-neutral-700 hover:border-neutral-500 hover:text-neutral-900">
                {t.nav.team}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.nav.projects}
        </Link>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-800">
              {kindLabel}
            </Badge>
            <span className="text-sm text-neutral-500">{project.date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">{project.title}</h1>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`text-[11px] px-2 py-0 ${tagColor[tag] ?? "text-neutral-600 border-neutral-300"}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <Separator className="my-10 bg-neutral-200" />

        {team.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              {locale === "en" ? "Team" : "Equipo"}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {team.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/team/${m.slug}`}
                    className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pl-1.5 pr-3 text-sm text-neutral-800 transition-colors hover:border-neutral-400"
                  >
                    <Avatar className="h-7 w-7 border border-neutral-200">
                      {m.image && <AvatarImage src={m.image} alt={m.name} />}
                      <AvatarFallback className="bg-neutral-100 text-[10px] font-medium text-neutral-600">
                        {m.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{m.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600">
          <p className="text-lg font-medium text-neutral-800">{project.desc}</p>
          {extra.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <footer className="mt-4 border-t border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs text-neutral-600">{t.footer.company}</span>
          </Link>
          <p className="text-xs text-neutral-500">© 2025</p>
        </div>
      </footer>
    </main>
  );
}
