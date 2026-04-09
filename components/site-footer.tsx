"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { LOCALE_KEY } from "@/lib/constants";
import { translations, type Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  /** When set (e.g. from a page that already tracks locale), footer stays in sync. Otherwise reads `LOCALE_KEY` from localStorage. */
  locale?: Locale;
  className?: string;
};

export function SiteFooter({ locale: localeProp, className }: SiteFooterProps) {
  const [locale, setLocale] = useState<Locale>(localeProp ?? "en");

  useEffect(() => {
    if (localeProp) {
      setLocale(localeProp);
      return;
    }
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") setLocale(stored);
  }, [localeProp]);

  const t = translations[locale];

  const quickLinks = [
    { href: "/#about", label: t.about.title },
    { href: "/research", label: t.nav.research },
    { href: "/projects", label: t.nav.projects },
    { href: "/#team", label: t.nav.team },
    { href: "/#philosophy", label: t.nav.philosophy },
    { href: "/#contact", label: t.contact.title },
    { href: "/news", label: t.news.title },
  ];

  return (
    <footer className={cn("border-t border-neutral-200 bg-white", className)}>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{t.footer.quickLinks}</p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{t.footer.social}</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Instagram className="h-3.5 w-3.5" /> Instagram
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Twitter className="h-3.5 w-3.5" /> Twitter
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{t.footer.legal}</p>
            <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} AIR&D</p>
            <p className="text-xs text-neutral-500">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
