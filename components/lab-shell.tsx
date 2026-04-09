"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Activity, Menu, Search } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchCommand } from "@/components/search-command";
import { LOCALE_KEY } from "@/lib/constants";
import { translations, type Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

export type LabShellContextValue = {
  locale: Locale;
  setLocale: (l: Locale | ((prev: Locale) => Locale)) => void;
  t: (typeof translations)[Locale];
};

const LabShellContext = createContext<LabShellContextValue | null>(null);

export function useLabShell() {
  const ctx = useContext(LabShellContext);
  if (!ctx) {
    throw new Error("useLabShell must be used within LabShell");
  }
  return ctx;
}

export function LabShell({
  children,
  mainClassName,
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const t = translations[locale];

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  const toggleLocale = useCallback(() => {
    setLocale((l) => (l === "en" ? "es" : "en"));
  }, []);

  const navLinks = [
    { href: "/#about", label: t.about.title },
    { href: "/research", label: t.nav.research },
    { href: "/projects", label: t.nav.projects },
    { href: "/#team", label: t.nav.team },
    { href: "/news", label: t.news.title },
  ];

  return (
    <LabShellContext.Provider value={value}>
      <SearchCommand locale={locale} />
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              <div className="flex items-center gap-7 text-sm text-neutral-500">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-neutral-900 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                    document.dispatchEvent(e);
                  }}
                  className="flex h-8 items-center gap-1.5 rounded-full border border-neutral-200 px-3 text-xs text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600"
                  aria-label="Search"
                >
                  <Search className="h-3.5 w-3.5" />
                  <kbd className="hidden sm:inline text-[10px] text-neutral-400">⌘K</kbd>
                </button>
                <button
                  type="button"
                  onClick={toggleLocale}
                  className="text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                  aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
                >
                  <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>EN</span>
                  <span className="mx-1 text-neutral-300">|</span>
                  <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>SP</span>
                </button>
                <Link href="/#contact">
                  <Button
                    size="sm"
                    className="bg-neutral-900 text-white hover:bg-neutral-700 rounded-full h-8 px-4 text-xs font-medium"
                  >
                    {t.nav.joinUs}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                  document.dispatchEvent(e);
                }}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleLocale}
                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
              >
                {locale === "en" ? "EN" : "SP"}
              </button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-600">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-emerald-600" />
                      AIR&D
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/#contact"
                      onClick={() => setSheetOpen(false)}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-neutral-900 text-white hover:bg-neutral-700 rounded-full h-9 text-xs font-medium mt-2"
                      >
                        {t.nav.joinUs}
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        <div className={cn("mx-auto px-6 py-12", mainClassName ?? "max-w-5xl")}>{children}</div>

        <SiteFooter locale={locale} />
      </main>
    </LabShellContext.Provider>
  );
}
