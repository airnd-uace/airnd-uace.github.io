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
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  /** Width for main content area (default wide for grids). */
  mainClassName?: string;
}) {
  const [locale, setLocale] = useState<Locale>("en");

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

  return (
    <LabShellContext.Provider value={value}>
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </Link>
            <div className="flex items-center gap-3">
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

        <div className={cn("mx-auto px-6 py-12", mainClassName ?? "max-w-5xl")}>{children}</div>

        <footer className="mt-4 border-t border-neutral-200 bg-white">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs text-neutral-600">{t.footer.company}</span>
            </Link>
            <p className="text-xs text-neutral-500">© 2025</p>
          </div>
        </footer>
      </main>
    </LabShellContext.Provider>
  );
}
