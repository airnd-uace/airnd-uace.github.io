"use client";

import Link from "next/link";
import { ArrowLeft, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LabShell, useLabShell } from "@/components/lab-shell";
import { alumni } from "@/lib/alumni";

function AlumniListingInner() {
  const { locale, t } = useLabShell();

  return (
    <>
      <Link
        href="/#team"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.nav.team}
      </Link>

      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {t.team.alumni}
        </h1>
        <p className="max-w-2xl text-neutral-600">{t.team.alumniDesc}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alumni.map((a) => (
          <Card
            key={a.name}
            className="bg-white border-neutral-200 hover:border-neutral-400 transition-all shadow-sm"
          >
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-neutral-200">
                  <AvatarFallback className="bg-neutral-100 text-xs font-medium text-neutral-600">
                    {a.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {a.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {locale === "en" ? a.roleEn : a.roleEs}
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-600">
                {locale === "en" ? a.nowAtEn : a.nowAtEs}
              </p>
              {a.linkedin && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1.5 px-2 text-xs text-neutral-500 hover:text-neutral-900"
                  asChild
                >
                  <a href={a.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default function AlumniPage() {
  return (
    <LabShell>
      <AlumniListingInner />
    </LabShell>
  );
}
