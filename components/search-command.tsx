"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FileText, FolderOpen, User } from "lucide-react";
import { members } from "@/lib/members";
import { allProjects, projectHref } from "@/lib/projects";
import { researchByKey, researchPostHref } from "@/lib/research-items";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";

export function SearchCommand({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = translations[locale];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const papers = useMemo(
    () =>
      researchByKey.all.map((r) => ({
        key: r.key,
        title: t.researchPapers[r.key].title,
        href: researchPostHref(r.key),
      })),
    [t],
  );

  const projects = useMemo(
    () =>
      allProjects.map((p) => ({
        title: p.title,
        href: projectHref(p),
      })),
    [],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={
          locale === "en" ? "Search papers, projects, team..." : "Buscar papers, proyectos, equipo..."
        }
      />
      <CommandList>
        <CommandEmpty>
          {locale === "en" ? "No results found." : "Sin resultados."}
        </CommandEmpty>
        <CommandGroup heading={t.research.title}>
          {papers.map((p) => (
            <CommandItem key={p.key} onSelect={() => go(p.href)}>
              <FileText className="mr-2 h-4 w-4 shrink-0 text-neutral-500" />
              <span>{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t.nav.projects}>
          {projects.map((p) => (
            <CommandItem key={p.href} onSelect={() => go(p.href)}>
              <FolderOpen className="mr-2 h-4 w-4 shrink-0 text-neutral-500" />
              <span>{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading={t.nav.team}>
          {members.map((m) => (
            <CommandItem
              key={m.slug}
              onSelect={() => go(`/team/${m.slug}`)}
            >
              <User className="mr-2 h-4 w-4 shrink-0 text-neutral-500" />
              <span>{m.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
