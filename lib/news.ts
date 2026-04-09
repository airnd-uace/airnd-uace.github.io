export type NewsType = "paper" | "member" | "project" | "event";

export interface NewsItem {
  date: string;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
  type: NewsType;
  href?: string;
}

export const allNews: NewsItem[] = [
  {
    date: "Mar 2025",
    titleEn: "Paper accepted: Volatility Clustering in Crypto Markets",
    titleEs: "Paper aceptado: Clustering de Volatilidad en Mercados Crypto",
    bodyEn: "Our latest research on regime shifts in crypto volatility has been completed and published internally.",
    bodyEs: "Nuestra última investigación sobre cambios de régimen en volatilidad crypto ha sido completada y publicada internamente.",
    type: "paper",
    href: "/research/volatility",
  },
  {
    date: "Feb 2026",
    titleEn: "Project launch: Systematic Crypto Volatility Dashboard",
    titleEs: "Lanzamiento de proyecto: Dashboard Sistemático de Volatilidad Crypto",
    bodyEn: "A new monitoring dashboard tracking implied and realized volatility across major crypto assets is now live.",
    bodyEs: "Un nuevo dashboard de monitoreo de volatilidad implícita y realizada en los principales criptoactivos ya está en funcionamiento.",
    type: "project",
    href: "/projects/systematic-crypto-volatility-dashboard",
  },
  {
    date: "Jan 2025",
    titleEn: "New member: Valentina Baez joins as Research Analyst",
    titleEs: "Nueva integrante: Valentina Baez se une como Analista de Investigación",
    bodyEn: "Valentina brings thematic research expertise to the team, exploring the intersection of fundamental analysis and quantitative methods.",
    bodyEs: "Valentina trae experiencia en investigación temática al equipo, explorando la intersección entre análisis fundamental y métodos cuantitativos.",
    type: "member",
    href: "/team/valentina-baez",
  },
  {
    date: "Dec 2025",
    titleEn: "Multi-Asset Backtesting Engine v2 shipped",
    titleEs: "Motor de Backtesting Multi-Activos v2 lanzado",
    bodyEn: "Major upgrade to our backtesting infrastructure with improved transaction cost modeling and portfolio constraints.",
    bodyEs: "Actualización importante de nuestra infraestructura de backtesting con modelado mejorado de costos de transacción y restricciones de portafolio.",
    type: "project",
    href: "/projects/multi-asset-backtesting-engine",
  },
  {
    date: "Sep 2024",
    titleEn: "Paper: Crypto Regime Detection via Hidden Markov Models",
    titleEs: "Paper: Detección de Regímenes Crypto con Modelos de Markov Ocultos",
    bodyEn: "New research applying HMMs to label bull, bear, and sideways crypto markets in real time.",
    bodyEs: "Nueva investigación aplicando HMMs para etiquetar mercados crypto alcistas, bajistas y laterales en tiempo real.",
    type: "paper",
    href: "/research/regime",
  },
  {
    date: "Jun 2025",
    titleEn: "Lab open house event",
    titleEs: "Evento de puertas abiertas del laboratorio",
    bodyEn: "We hosted prospective members and collaborators for demos of our research infrastructure and strategy pipelines.",
    bodyEs: "Recibimos a posibles miembros y colaboradores para demos de nuestra infraestructura de investigación y pipelines de estrategias.",
    type: "event",
  },
];
