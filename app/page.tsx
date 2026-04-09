"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  FlaskConical,
  FolderOpen,
  TrendingUp,
  Users,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Search,
  Twitter,
  ExternalLink,
  Activity,
} from "lucide-react";
import { CarouselItem } from "@/components/ui/carousel";
import { ResearchCard, CarouselWithDots } from "@/components/research-card";
import { AsciiHeroBackground } from "@/components/ascii-hero-background";
import { SearchCommand } from "@/components/search-command";
import { SiteFooter } from "@/components/site-footer";
import { useInView } from "@/hooks/use-in-view";
import { translations, type Locale } from "@/lib/translations";
import { members } from "@/lib/members";
import { projectsByKey, projectHref } from "@/lib/projects";
import { LOCALE_KEY } from "@/lib/constants";
import { researchByKey, researchPostHref } from "@/lib/research-items";
import { allNews, type NewsType } from "@/lib/news";
import { openSourceItems } from "@/lib/open-source";

const newsTypeIcon: Record<NewsType, typeof FileText> = {
  paper: FileText,
  project: FolderOpen,
  member: Users,
  event: Calendar,
};

function AnimatedSection({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default function Page() {
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

  const toggleLocale = () => setLocale((l) => (l === "en" ? "es" : "en"));

  const openSearch = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  const navLinks = [
    { href: "#about", label: t.about.title },
    { href: "/research", label: t.nav.research, isRoute: true },
    { href: "/projects", label: t.nav.projects, isRoute: true },
    { href: "#team", label: t.nav.team },
    { href: "#philosophy", label: t.nav.philosophy },
  ];

  return (
    <TooltipProvider>
      <SearchCommand locale={locale} />
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        {/* NAV */}
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 shrink-0">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-7">
              <div className="flex items-center gap-7 text-sm text-neutral-500">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link key={link.href} href={link.href} className="hover:text-neutral-900 transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href} className="hover:text-neutral-900 transition-colors">
                      {link.label}
                    </a>
                  ),
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openSearch}
                  className="flex h-8 items-center gap-1.5 rounded-full border border-neutral-200 px-3 text-xs text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600"
                  aria-label="Search"
                >
                  <Search className="h-3.5 w-3.5" />
                  <kbd className="hidden sm:inline text-[10px] text-neutral-400">⌘K</kbd>
                </button>
                <button
                  type="button"
                  onClick={toggleLocale}
                  className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
                >
                  <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>EN</span>
                  <span className="mx-1 text-neutral-300">|</span>
                  <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>SP</span>
                </button>
                <a href="#contact">
                  <Button size="sm" className="bg-neutral-900 text-white hover:bg-neutral-700 rounded-full h-8 px-4 text-xs font-medium">
                    {t.nav.joinUs}
                  </Button>
                </a>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <button type="button" onClick={openSearch} className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors" aria-label="Search">
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
                    {navLinks.map((link) =>
                      link.isRoute ? (
                        <Link key={link.href} href={link.href} onClick={() => setSheetOpen(false)} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a key={link.href} href={link.href} onClick={() => setSheetOpen(false)} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                          {link.label}
                        </a>
                      ),
                    )}
                    <a href="#contact" onClick={() => setSheetOpen(false)}>
                      <Button size="sm" className="w-full bg-neutral-900 text-white hover:bg-neutral-700 rounded-full h-9 text-xs font-medium mt-2">
                        {t.nav.joinUs}
                      </Button>
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6">
          {/* HERO */}
          <section className="relative left-1/2 isolate flex min-h-[calc(100vh-3.5rem)] w-screen -translate-x-1/2 flex-col justify-center overflow-hidden rounded-none py-12 md:py-16 md:rounded-[2rem]">
            <AsciiHeroBackground />
            <div
              className="absolute inset-0 rounded-none border border-neutral-200/80 shadow-sm md:rounded-[2rem]"
              style={{
                background: "linear-gradient(180deg, rgba(255, 243, 214, 0.96) 0%, rgba(255, 222, 163, 0.94) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
              }}
            />
            <div
              className="absolute inset-0 rounded-none md:rounded-[2rem]"
              style={{
                background: "radial-gradient(circle at 76% 34%, rgba(249, 115, 22, 0.22), transparent 30%)",
              }}
            />
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
              <div className="space-y-8 md:max-w-3xl">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 text-[11px] bg-emerald-500/10 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse inline-block" />
                    {t.hero.badge}
                  </Badge>
                  <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-900">
                    {t.hero.title1}
                    <br />
                    <span className="text-neutral-600">{t.hero.title2}</span>
                  </h1>
                </div>
                <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
                  {t.hero.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-neutral-900 text-white hover:bg-neutral-800 gap-2 font-medium" asChild>
                    <Link href="/research">
                      {t.hero.viewResearch} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-500" asChild>
                    <a href="#contact">{t.hero.joinUs}</a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-8 pt-4">
                  {[
                    { label: t.stats.researchPapers, value: "12+" },
                    { label: t.stats.activeMembers, value: "11" },
                    { label: t.stats.strategiesTested, value: "40+" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-2xl font-bold text-neutral-900">{value}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-200" />

          {/* ABOUT */}
          <AnimatedSection>
            <section id="about" className="py-20 space-y-10">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900">{t.about.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{t.about.desc}</p>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                  {t.focusAreas.title}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: TrendingUp, title: t.focusAreas.quantitative, desc: t.focusAreas.quantitativeDesc },
                    { icon: Activity, title: t.focusAreas.microstructure, desc: t.focusAreas.microstructureDesc },
                    { icon: BarChart2, title: t.focusAreas.backtesting, desc: t.focusAreas.backtestingDesc },
                    { icon: BookOpen, title: t.focusAreas.macro, desc: t.focusAreas.macroDesc },
                  ].map(({ icon: Icon, title, desc }) => (
                    <Card key={title} className="bg-white border-neutral-200 hover:border-neutral-300 transition-all group shadow-sm">
                      <CardContent className="p-6 flex gap-4 items-start">
                        <div className="p-2 rounded-lg bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                          <Icon className="w-4 h-4 text-neutral-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-neutral-900">{title}</h3>
                          <p className="text-sm text-neutral-600 mt-1">{desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* RESEARCH */}
          <AnimatedSection>
            <section id="research" className="py-20 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-900">{t.research.title}</h2>
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 gap-1 text-xs" asChild>
                  <Link href="/research">
                    {t.research.allPapers} <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="bg-neutral-100 border border-neutral-200 h-9">
                  <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.all}</TabsTrigger>
                  <TabsTrigger value="crypto" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.crypto}</TabsTrigger>
                  <TabsTrigger value="equities" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.equities}</TabsTrigger>
                  <TabsTrigger value="hft" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.hft}</TabsTrigger>
                </TabsList>

                {(["all", "crypto", "equities", "hft"] as const).map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                    <CarouselWithDots itemCount={researchByKey[tab].length}>
                      {researchByKey[tab].map((r) => (
                        <CarouselItem key={r.key} className="pl-4 basis-1/3">
                          <ResearchCard
                            title={t.researchPapers[r.key].title}
                            desc={t.researchPapers[r.key].desc}
                            tags={r.tags}
                            date={r.date}
                            readLabel={t.research.read}
                            href={researchPostHref(r.key)}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselWithDots>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* PROJECTS */}
          <AnimatedSection>
            <section id="projects" className="py-20 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-900">{t.nav.projects}</h2>
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 gap-1 text-xs" asChild>
                  <Link href="/projects">
                    {t.listings.viewAllProjects} <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="bg-neutral-100 border border-neutral-200 h-9">
                  <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                  <TabsTrigger value="crypto" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Crypto</TabsTrigger>
                  <TabsTrigger value="equities" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Equities</TabsTrigger>
                  <TabsTrigger value="hft" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">HFT</TabsTrigger>
                </TabsList>

                {(["all", "crypto", "equities", "hft"] as const).map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                    <CarouselWithDots itemCount={projectsByKey[tab].length}>
                      {projectsByKey[tab].map((project) => (
                        <CarouselItem key={project.title} className="pl-4 basis-1/3">
                          <ResearchCard
                            title={project.title}
                            desc={project.desc}
                            tags={project.tags}
                            date={project.date}
                            readLabel="View"
                            href={projectHref(project)}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselWithDots>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* OPEN SOURCE & DATASETS */}
          <AnimatedSection>
            <section id="open-source" className="py-20 space-y-8">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900">{t.openSource.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{t.openSource.desc}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {openSourceItems.map((item) => (
                  <a
                    key={item.github}
                    href={item.github}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Card className="bg-white border-neutral-200 hover:border-neutral-400 transition-all group shadow-sm h-full">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-neutral-500 shrink-0" />
                            <h3 className="font-semibold text-sm text-neutral-900 group-hover:underline">
                              {locale === "en" ? item.titleEn : item.titleEs}
                            </h3>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {locale === "en" ? item.descEn : item.descEs}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[11px] px-2 py-0 border-neutral-300 text-neutral-500">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* MEMBERS */}
          <AnimatedSection>
            <section id="team" className="py-20 space-y-8">
              <h2 className="text-3xl font-bold text-neutral-900">{t.team.title}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {members.map(({ slug, name, roleKey, focusKey, initials, email, linkedin, image }) => (
                  <Card key={name} className="bg-white border-neutral-200 hover:border-neutral-400 transition-all group shadow-sm h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col gap-4 flex-1">
                      <Link
                        href={`/team/${slug}`}
                        className="block -m-2 p-2 rounded-lg hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9 border border-neutral-200">
                            {image && <AvatarImage src={image} alt={name} />}
                            <AvatarFallback className="bg-neutral-100 text-neutral-600 text-xs font-medium">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm text-neutral-900 group-hover:underline">{name}</p>
                            <p className="text-xs text-neutral-600">{t.roles[roleKey]}</p>
                          </div>
                        </div>
                        <Separator className="bg-neutral-200 my-4" />
                        <p className="text-xs text-neutral-600 text-left">{t.focus[focusKey]}</p>
                      </Link>
                      <div className="flex justify-end gap-1 pt-1 border-t border-neutral-100">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900" asChild>
                              <a href={linkedin} target="_blank" rel="noreferrer">
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>LinkedIn</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900" asChild>
                              <a href={`mailto:${email}`}>
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{email}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900">
                              <Github className="w-3.5 h-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>GitHub</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900">
                              <Twitter className="w-3.5 h-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Twitter</TooltipContent>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-neutral-50 border-neutral-200 border-dashed">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-neutral-500" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{t.team.alumni}</p>
                      <p className="text-sm text-neutral-600">{t.team.alumniDesc}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 text-xs shrink-0" asChild>
                    <Link href="/team/alumni">
                      {t.team.view} <ChevronRight className="w-3 h-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* PHILOSOPHY */}
          <AnimatedSection>
            <section id="philosophy" className="py-20">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: FlaskConical, label: t.philosophy.build, sub: t.philosophy.buildSub },
                  { icon: BarChart2, label: t.philosophy.rigor, sub: t.philosophy.rigorSub },
                  { icon: TrendingUp, label: t.philosophy.ship, sub: t.philosophy.shipSub },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="space-y-2">
                    <Icon className="w-5 h-5 text-neutral-500 mb-3" />
                    <p className="font-semibold text-base text-neutral-900">{label}</p>
                    <p className="text-sm text-neutral-600">{sub}</p>
                  </div>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* NEWS & UPDATES */}
          <AnimatedSection>
            <section id="news" className="py-20 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-900">{t.news.title}</h2>
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 gap-1 text-xs" asChild>
                  <Link href="/news">
                    {t.news.viewAll} <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {allNews.slice(0, 4).map((item, i) => {
                  const Icon = newsTypeIcon[item.type];
                  const title = locale === "en" ? item.titleEn : item.titleEs;
                  const body = locale === "en" ? item.bodyEn : item.bodyEs;

                  const inner = (
                    <div className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <Badge variant="outline" className="text-[11px] border-neutral-300 text-neutral-500">
                          {item.date}
                        </Badge>
                        <p className="text-sm font-semibold text-neutral-900">{title}</p>
                        <p className="text-sm text-neutral-600 line-clamp-2">{body}</p>
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
            </section>
          </AnimatedSection>

          <Separator className="bg-neutral-200" />

          {/* CONTACT */}
          <AnimatedSection>
            <section id="contact" className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-neutral-900">{t.contact.title}</h2>
                <p className="text-neutral-600 text-sm max-w-md">
                  {t.contact.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:border-neutral-500 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="mailto:hello@aird.ai"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:border-neutral-500 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  {t.contact.contact}
                </a>
              </div>
            </section>
          </AnimatedSection>
        </div>

        <SiteFooter locale={locale} className="mt-4" />
      </main>
    </TooltipProvider>
  );
}
