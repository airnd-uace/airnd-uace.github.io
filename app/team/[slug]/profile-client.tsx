"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Activity,
} from "lucide-react";
import { ResearchCard } from "@/components/research-card";
import { LOCALE_KEY } from "@/lib/constants";
import type { Member } from "@/lib/members";
import { allProjects } from "@/lib/projects";
import { translations, type Locale } from "@/lib/translations";

const researchData: Record<string, { tags: string[]; date: string }> = {
  volatility: { tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025" },
  momentum: { tags: ["Equities", "Factor", "Macro"], date: "Jan 2025" },
  microstructure: { tags: ["HFT", "Microstructure"], date: "Nov 2024" },
  regime: { tags: ["Crypto", "ML"], date: "Sep 2024" },
  correlation: { tags: ["Equities", "Macro"], date: "Jul 2024" },
  marketMaking: { tags: ["HFT", "Microstructure"], date: "May 2024" },
  liquidityRisk: { tags: ["Equities", "Factor"], date: "Feb 2024" },
  tailRisk: { tags: ["Crypto", "Volatility"], date: "Dec 2023" },
};

export function MemberProfileClient({ member }: { member: Member }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const t = translations[locale];
  const memberProjects = allProjects.filter((project) =>
    member.projects.includes(project.title),
  );

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                AIR&D
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocale((value) => (value === "en" ? "es" : "en"))}
                className="text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
              >
                <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>
                  EN
                </span>
                <span className="mx-1 text-neutral-300">|</span>
                <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>
                  SP
                </span>
              </button>
              <Link href="/#team">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-full border-neutral-300 px-4 text-xs font-medium text-neutral-700 hover:border-neutral-500 hover:text-neutral-900"
                >
                  {t.nav.team}
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-4xl space-y-12 px-6 py-12">
          <Link
            href="/#team"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.nav.team}
          </Link>

          <section className="flex flex-col items-start gap-8 md:flex-row">
            <Avatar className="h-24 w-24 shrink-0 border-2 border-neutral-200">
              <AvatarFallback className="bg-neutral-100 text-2xl font-semibold text-neutral-600">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">{member.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="border-neutral-300 text-xs text-neutral-600">
                    {t.roles[member.roleKey]}
                  </Badge>
                  <Badge variant="outline" className="border-neutral-300 text-xs text-neutral-600">
                    {t.focus[member.focusKey]}
                  </Badge>
                </div>
              </div>
              <p className="max-w-2xl leading-relaxed text-neutral-600">{member.bio}</p>

              <div className="flex gap-1 pt-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`mailto:${member.email}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{member.email}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Twitter</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-200" />

          {member.papers.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {locale === "en" ? "Publications" : "Publicaciones"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {member.papers.map((key) => {
                  const paper = t.researchPapers[key];
                  const meta = researchData[key];

                  return (
                    <ResearchCard
                      key={key}
                      title={paper.title}
                      desc={paper.desc}
                      tags={meta.tags}
                      date={meta.date}
                      readLabel={t.research.read}
                    />
                  );
                })}
              </div>
            </section>
          )}

          <Separator className="bg-neutral-200" />

          {memberProjects.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {locale === "en" ? "Projects" : "Proyectos"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {memberProjects.map((project) => (
                  <ResearchCard
                    key={project.title}
                    title={project.title}
                    desc={project.desc}
                    tags={project.tags}
                    date={project.date}
                    readLabel={locale === "en" ? "View" : "Ver"}
                  />
                ))}
              </div>
            </section>
          )}

          <Separator className="bg-neutral-200" />

          <section className="space-y-4 pb-8">
            <h2 className="text-xl font-bold text-neutral-900">
              {locale === "en" ? "Get in Touch" : "Contacto"}
            </h2>
            <p className="text-sm text-neutral-600">
              {locale === "en"
                ? `Interested in ${member.name.split(" ")[0]}'s work? Reach out directly.`
                : `¿Interesado en el trabajo de ${member.name.split(" ")[0]}? Escríbele directamente.`}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            </div>
          </section>
        </div>

        <footer className="mt-4 border-t border-neutral-200 bg-white">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs text-neutral-600">{t.footer.company}</span>
            </Link>
            <p className="text-xs text-neutral-500">© 2025</p>
          </div>
        </footer>
      </main>
    </TooltipProvider>
  );
}
