"use client";

import { useState, useEffect } from "react";
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
  ArrowRight,
  BarChart2,
  BookOpen,
  Briefcase,
  FlaskConical,
  TrendingUp,
  Users,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Activity,
} from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { translations, type Locale } from "@/lib/translations";

const LOCALE_KEY = "quant-lab-locale";

const researchByKey = {
  all: [
    { key: "volatility" as const,    tags: ["Crypto", "Volatility", "ML"],       date: "Mar 2025" },
    { key: "momentum" as const,      tags: ["Equities", "Factor", "Macro"],       date: "Jan 2025" },
    { key: "microstructure" as const,tags: ["HFT", "Microstructure"],             date: "Nov 2024" },
    { key: "regime" as const,        tags: ["Crypto", "ML"],                      date: "Sep 2024" },
    { key: "correlation" as const,   tags: ["Equities", "Macro"],                 date: "Jul 2024" },
    { key: "marketMaking" as const,  tags: ["HFT", "Microstructure"],             date: "May 2024" },
    { key: "liquidityRisk" as const, tags: ["Equities", "Factor"],                date: "Feb 2024" },
    { key: "tailRisk" as const,      tags: ["Crypto", "Volatility"],              date: "Dec 2023" },
  ],
  crypto: [
    { key: "volatility" as const, tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025" },
    { key: "regime" as const,     tags: ["Crypto", "ML"],               date: "Sep 2024" },
    { key: "tailRisk" as const,   tags: ["Crypto", "Volatility"],       date: "Dec 2023" },
  ],
  equities: [
    { key: "momentum" as const,      tags: ["Equities", "Factor", "Macro"], date: "Jan 2025" },
    { key: "correlation" as const,   tags: ["Equities", "Macro"],           date: "Jul 2024" },
    { key: "liquidityRisk" as const, tags: ["Equities", "Factor"],          date: "Feb 2024" },
  ],
  hft: [
    { key: "microstructure" as const, tags: ["HFT", "Microstructure"], date: "Nov 2024" },
    { key: "marketMaking" as const,   tags: ["HFT", "Microstructure"], date: "May 2024" },
  ],
};

const allProjects = [
  { title: "Systematic Crypto Volatility Dashboard", desc: "A monitoring dashboard that tracks implied and realized volatility across major crypto assets.", tags: ["Crypto", "Volatility", "ML"],      date: "Feb 2026" },
  { title: "Multi-Asset Backtesting Engine",          desc: "Reusable strategy testing infrastructure with transaction costs, slippage, and portfolio constraints.", tags: ["Equities", "Factor", "Macro"], date: "Dec 2025" },
  { title: "Microstructure Signal Sandbox",           desc: "Experimental workspace for order book imbalance, queue-position, and trade-signing signals.", tags: ["HFT", "Microstructure"],             date: "Oct 2025" },
  { title: "Crypto Regime Detection Pipeline",        desc: "End-to-end pipeline that labels market regimes in real time and feeds downstream strategy selectors.", tags: ["Crypto", "ML"],              date: "Aug 2025" },
  { title: "Factor Zoo Explorer",                     desc: "Interactive tool to browse, backtest, and compare over 50 academic factors across US equities.", tags: ["Equities", "Factor"],              date: "Jun 2025" },
  { title: "Real-time Order Flow Monitor",            desc: "WebSocket-based dashboard streaming level-2 order book data with live imbalance and trade-sign metrics.", tags: ["HFT", "Microstructure"],   date: "Apr 2025" },
  { title: "Portfolio Risk Dashboard",                desc: "Unified risk view with VaR, CVaR, stress scenarios, and factor exposure decomposition across asset classes.", tags: ["Equities", "Macro"],     date: "Jan 2025" },
  { title: "Tail Risk Options Screener",              desc: "Screens listed options for cheap tail protection based on skew, term structure, and realized vol ratios.", tags: ["Crypto", "Volatility"],     date: "Nov 2024" },
];

const projectsByKey = {
  all:      allProjects,
  crypto:   allProjects.filter((p) => p.tags.includes("Crypto")),
  equities: allProjects.filter((p) => p.tags.includes("Equities")),
  hft:      allProjects.filter((p) => p.tags.includes("HFT")),
};

const members = [
  { name: "Thomas Prada",        roleKey: "quantResearcher" as const,  focusKey: "volatilityModels" as const,       initials: "TP",  email: "thomas@aird.ai",    linkedin: "https://linkedin.com/in/thomasprada" },
  { name: "Ferney Diaz",         roleKey: "dataEngineer" as const,      focusKey: "pipelineInfra" as const,          initials: "FD",  email: "ferney@aird.ai",    linkedin: "https://linkedin.com/in/ferneydiaz" },
  { name: "Solange Félix",       roleKey: "macroAnalyst" as const,      focusKey: "globalMacro" as const,            initials: "SF",  email: "solange@aird.ai",   linkedin: "https://linkedin.com/in/solangefelix" },
  { name: "Dilan Chacón",        roleKey: "quantResearcher" as const,   focusKey: "factorModels" as const,           initials: "DC",  email: "dilan@aird.ai",     linkedin: "https://linkedin.com/in/dilanchacon" },
  { name: "Santiago Ariza",      roleKey: "portfolioManager" as const,  focusKey: "alternativeStrategies" as const,  initials: "SA",  email: "santiago@aird.ai",  linkedin: "https://linkedin.com/in/santiagoariza" },
  { name: "Camilo Rodriguez",    roleKey: "riskAnalyst" as const,       focusKey: "varStress" as const,              initials: "CR",  email: "camilo@aird.ai",    linkedin: "https://linkedin.com/in/camilorodriguez" },
  { name: "Cesar Solano",        roleKey: "quantResearcher" as const,   focusKey: "marketMicrostructure" as const,   initials: "CS",  email: "cesar@aird.ai",     linkedin: "https://linkedin.com/in/cesarsolano" },
  { name: "Gabriel Lopez",       roleKey: "dataEngineer" as const,      focusKey: "researchInfra" as const,          initials: "GL",  email: "gabriel@aird.ai",   linkedin: "https://linkedin.com/in/gabriellopez" },
  { name: "Juan Luckas Alvarado",roleKey: "macroAnalyst" as const,      focusKey: "regimeId" as const,               initials: "JLA", email: "juanluckas@aird.ai",linkedin: "https://linkedin.com/in/juanluckas" },
  { name: "Sebastián Guzmán",    roleKey: "quantResearcher" as const,   focusKey: "backtesting" as const,            initials: "SG",  email: "sebastian@aird.ai", linkedin: "https://linkedin.com/in/sebastianguzman" },
  { name: "Valentina Baez",      roleKey: "researchAnalyst" as const,   focusKey: "thematic" as const,               initials: "VB",  email: "valentina@aird.ai", linkedin: "https://linkedin.com/in/valentinabaez" },
];

const tagColor: Record<string, string> = {
  Crypto: "bg-violet-500/10 text-violet-700 border-violet-500/30",
  Volatility: "bg-red-500/10 text-red-700 border-red-500/30",
  ML: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  Equities: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  Factor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  Macro: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  HFT: "bg-cyan-500/10 text-cyan-700 border-cyan-500/30",
  Microstructure: "bg-pink-500/10 text-pink-700 border-pink-500/30",
};

function ResearchCard({
  title,
  desc,
  tags,
  date,
  readLabel,
}: {
  title: string;
  desc: string;
  tags: string[];
  date: string;
  readLabel: string;
}) {
  return (
    <Card className="h-full bg-white border-neutral-200 hover:border-neutral-400 transition-all duration-300 group shadow-sm">
      <CardContent className="p-6 h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-snug group-hover:text-neutral-900 transition-colors text-neutral-900">
            {title}
          </h3>
          <span className="text-xs text-neutral-500 shrink-0 mt-0.5">{date}</span>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed flex-1">{desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`text-[11px] px-2 py-0 ${tagColor[tag] ?? "text-neutral-600 border-neutral-300"}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 hover:text-neutral-900 p-0 h-auto gap-1 text-xs"
          >
            {readLabel} <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CarouselWithDots({ children, itemCount }: { children: React.ReactNode; itemCount: number }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSnapCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ml-4">
        {children}
      </CarouselContent>
      {itemCount > 3 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0 shrink-0" />
          <div className="flex gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? "w-4 h-1.5 bg-neutral-900" : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 shrink-0" />
        </div>
      )}
    </Carousel>
  );
}

export default function Page() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const t = translations[locale];

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        {/* NAV */}
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </div>

            {/* Right side: links + lang + CTA */}
            <div className="hidden md:flex items-center gap-7">
              <div className="flex items-center gap-7 text-sm text-neutral-500">
                <a href="#about" className="hover:text-neutral-900 transition-colors">{t.about.title}</a>
                <a href="#research" className="hover:text-neutral-900 transition-colors">{t.nav.research}</a>
                <a href="#projects" className="hover:text-neutral-900 transition-colors">Projects</a>
                <a href="#team" className="hover:text-neutral-900 transition-colors">{t.nav.team}</a>
                <a href="#philosophy" className="hover:text-neutral-900 transition-colors">{t.nav.philosophy}</a>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLocale((l) => (l === "en" ? "es" : "en"))}
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
              <button
                onClick={() => setLocale((l) => (l === "en" ? "es" : "en"))}
                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
              >
                {locale === "en" ? "EN" : "SP"}
              </button>
              <a href="#contact">
                <Button size="sm" className="bg-neutral-900 text-white hover:bg-neutral-700 rounded-full h-8 px-4 text-xs font-medium">
                  {t.nav.joinUs}
                </Button>
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6">
          {/* HERO */}
          <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center space-y-8">
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
              <Button className="bg-neutral-900 text-white hover:bg-neutral-800 gap-2 font-medium">
                {t.hero.viewResearch} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-500">
                {t.hero.joinUs}
              </Button>
            </div>

            {/* Stats row */}
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
          </section>

          <Separator className="bg-neutral-200" />

          {/* ABOUT */}
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

          <Separator className="bg-neutral-200" />

          {/* RESEARCH */}
          <section id="research" className="py-20 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-neutral-900">{t.research.title}</h2>
              <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 gap-1 text-xs">
                {t.research.allPapers} <ExternalLink className="w-3 h-3" />
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="bg-neutral-100 border border-neutral-200 h-9">
                <TabsTrigger value="all"      className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.all}</TabsTrigger>
                <TabsTrigger value="crypto"   className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.crypto}</TabsTrigger>
                <TabsTrigger value="equities" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.equities}</TabsTrigger>
                <TabsTrigger value="hft"      className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">{t.research.hft}</TabsTrigger>
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
                        />
                      </CarouselItem>
                    ))}
                  </CarouselWithDots>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <Separator className="bg-neutral-200" />

          {/* PROJECTS */}
          <section id="projects" className="py-20 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-neutral-900">Projects</h2>
              <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 gap-1 text-xs">
                View all projects <ExternalLink className="w-3 h-3" />
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="bg-neutral-100 border border-neutral-200 h-9">
                <TabsTrigger value="all"      className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="crypto"   className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Crypto</TabsTrigger>
                <TabsTrigger value="equities" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Equities</TabsTrigger>
                <TabsTrigger value="hft"      className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">HFT</TabsTrigger>
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
                        />
                      </CarouselItem>
                    ))}
                  </CarouselWithDots>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <Separator className="bg-neutral-200" />

          {/* MEMBERS */}
          <section id="team" className="py-20 space-y-8">
            <h2 className="text-3xl font-bold text-neutral-900">{t.team.title}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {members.map(({ name, roleKey, focusKey, initials, email, linkedin }) => (
                <Card key={name} className="bg-white border-neutral-200 hover:border-neutral-300 transition-all group shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-neutral-200">
                        <AvatarFallback className="bg-neutral-100 text-neutral-600 text-xs font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-neutral-900">{name}</p>
                        <p className="text-xs text-neutral-600">{t.roles[roleKey]}</p>
                      </div>
                    </div>
                    <Separator className="bg-neutral-200" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">{t.focus[focusKey]}</span>
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={linkedin} target="_blank" rel="noreferrer">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900">
                                <Linkedin className="w-3.5 h-3.5" />
                              </Button>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>LinkedIn</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={`mailto:${email}`}>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-500 hover:text-neutral-900">
                                <Mail className="w-3.5 h-3.5" />
                              </Button>
                            </a>
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
                <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 text-xs shrink-0">
                  {t.team.view} <ChevronRight className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          </section>

          <Separator className="bg-neutral-200" />

          {/* PHILOSOPHY */}
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

          <Separator className="bg-neutral-200" />

          {/* CONTACT */}
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
        </div>

        {/* FOOTER */}
        <footer className="border-t border-neutral-200 mt-4 bg-white">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs text-neutral-600">{t.footer.company}</span>
            </div>
            <p className="text-xs text-neutral-500">© 2025</p>
          </div>
        </footer>
      </main>
    </TooltipProvider>
  );
}