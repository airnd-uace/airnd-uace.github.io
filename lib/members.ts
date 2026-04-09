export type ResearchKey =
  | "volatility"
  | "momentum"
  | "microstructure"
  | "regime"
  | "correlation"
  | "marketMaking"
  | "liquidityRisk"
  | "tailRisk";

export type RoleKey =
  | "quantResearcher"
  | "dataEngineer"
  | "macroAnalyst"
  | "portfolioManager"
  | "riskAnalyst"
  | "researchAnalyst";

export type FocusKey =
  | "volatilityModels"
  | "pipelineInfra"
  | "globalMacro"
  | "factorModels"
  | "alternativeStrategies"
  | "varStress"
  | "marketMicrostructure"
  | "researchInfra"
  | "regimeId"
  | "backtesting"
  | "thematic";

export interface Member {
  slug: string;
  name: string;
  roleKey: RoleKey;
  focusKey: FocusKey;
  initials: string;
  email: string;
  linkedin: string;
  bio: string;
  papers: ResearchKey[];
  projects: string[];
  image?: string;
}

export const members: Member[] = [
  {
    slug: "thomas-prada",
    name: "Thomas Prada",
    roleKey: "quantResearcher",
    focusKey: "volatilityModels",
    initials: "TP",
    email: "thomas@aird.ai",
    linkedin: "https://linkedin.com/in/thomasprada",
    bio: "Thomas leads volatility research at AIR&D, developing statistical models to identify regime shifts in crypto and traditional markets. His work bridges time-series econometrics with modern machine learning techniques, and he's passionate about building tools that make quantitative research more accessible.",
    papers: ["volatility", "regime", "tailRisk"],
    projects: ["Systematic Crypto Volatility Dashboard", "Crypto Regime Detection Pipeline", "Tail Risk Options Screener"],
  },
  {
    slug: "ferney-diaz",
    name: "Ferney Diaz",
    roleKey: "dataEngineer",
    focusKey: "pipelineInfra",
    initials: "FD",
    email: "ferney@aird.ai",
    linkedin: "https://linkedin.com/in/ferneydiaz",
    bio: "Ferney architects the data infrastructure that powers the lab's research. From real-time market data ingestion to reproducible backtesting pipelines, he ensures that every experiment runs on clean, reliable data. He has a deep interest in distributed systems and streaming architectures.",
    papers: ["microstructure", "marketMaking"],
    projects: ["Multi-Asset Backtesting Engine", "Real-time Order Flow Monitor", "Microstructure Signal Sandbox"],
  },
  {
    slug: "solange-felix",
    name: "Solange Félix",
    roleKey: "macroAnalyst",
    focusKey: "globalMacro",
    initials: "SF",
    email: "solange@aird.ai",
    linkedin: "https://linkedin.com/in/solangefelix",
    bio: "Solange brings a top-down macro perspective to the lab, researching how monetary policy, geopolitics, and structural shifts shape asset returns. She develops frameworks for regime identification and cross-asset correlation analysis that inform the team's strategy selection.",
    papers: ["correlation", "momentum"],
    projects: ["Portfolio Risk Dashboard", "Multi-Asset Backtesting Engine"],
  },
  {
    slug: "dilan-chacon",
    name: "Dilan Chacón",
    roleKey: "quantResearcher",
    focusKey: "factorModels",
    initials: "DC",
    email: "dilan@aird.ai",
    linkedin: "https://linkedin.com/in/dilanchacon",
    bio: "Dilan focuses on factor-based investing, studying how academic factors behave across different market regimes and geographies. His research on momentum decay and liquidity-adjusted returns has shaped the lab's approach to systematic equity strategies.",
    papers: ["momentum", "liquidityRisk"],
    projects: ["Factor Zoo Explorer", "Multi-Asset Backtesting Engine"],
  },
  {
    slug: "santiago-ariza",
    name: "Santiago Ariza",
    roleKey: "portfolioManager",
    focusKey: "alternativeStrategies",
    initials: "SA",
    email: "santiago@aird.ai",
    linkedin: "https://linkedin.com/in/santiagoariza",
    bio: "Santiago bridges the gap between research and implementation, translating quantitative insights into executable portfolio strategies. He specializes in alternative risk premia, portfolio construction, and risk-aware allocation across asset classes.",
    papers: ["correlation", "liquidityRisk", "tailRisk"],
    projects: ["Portfolio Risk Dashboard", "Tail Risk Options Screener"],
  },
  {
    slug: "camilo-rodriguez",
    name: "Camilo Rodriguez",
    roleKey: "riskAnalyst",
    focusKey: "varStress",
    initials: "CR",
    email: "camilo@aird.ai",
    linkedin: "https://linkedin.com/in/camilorodriguez",
    bio: "Camilo is the lab's risk specialist, building VaR models, stress testing frameworks, and tail risk monitoring tools. He combines quantitative rigor with practical portfolio experience to ensure every strategy is evaluated through a risk-first lens.",
    papers: ["tailRisk", "correlation"],
    projects: ["Portfolio Risk Dashboard", "Tail Risk Options Screener"],
  },
  {
    slug: "cesar-solano",
    name: "Cesar Solano",
    roleKey: "quantResearcher",
    focusKey: "marketMicrostructure",
    initials: "CS",
    email: "cesar@aird.ai",
    linkedin: "https://linkedin.com/in/cesarsolano",
    bio: "Cesar researches market microstructure, extracting predictive signals from order book dynamics and trade flow data. His work on adaptive market making and order flow imbalance has advanced the lab's high-frequency research capabilities.",
    papers: ["microstructure", "marketMaking"],
    projects: ["Microstructure Signal Sandbox", "Real-time Order Flow Monitor"],
  },
  {
    slug: "gabriel-lopez",
    name: "Gabriel Lopez",
    roleKey: "dataEngineer",
    focusKey: "researchInfra",
    initials: "GL",
    email: "gabriel@aird.ai",
    linkedin: "https://linkedin.com/in/gabriellopez",
    bio: "Gabriel builds and maintains the lab's research infrastructure, from experiment tracking and version control to compute orchestration. He's focused on making quantitative research reproducible and collaborative at scale.",
    papers: ["microstructure"],
    projects: ["Multi-Asset Backtesting Engine", "Factor Zoo Explorer", "Crypto Regime Detection Pipeline"],
  },
  {
    slug: "juan-luckas-alvarado",
    name: "Juan Luckas Alvarado",
    roleKey: "macroAnalyst",
    focusKey: "regimeId",
    initials: "JLA",
    email: "juanluckas@aird.ai",
    linkedin: "https://linkedin.com/in/juanluckas",
    bio: "Juan Luckas specializes in regime identification, applying hidden Markov models and unsupervised learning to detect macro state transitions. His regime labels power downstream strategy selectors and dynamic allocation models across the lab.",
    papers: ["regime", "correlation"],
    projects: ["Crypto Regime Detection Pipeline", "Portfolio Risk Dashboard"],
  },
  {
    slug: "sebastian-guzman",
    name: "Sebastián Guzmán",
    roleKey: "quantResearcher",
    focusKey: "backtesting",
    initials: "SG",
    email: "sebastian@aird.ai",
    linkedin: "https://linkedin.com/in/sebastianguzman",
    bio: "Sebastián leads the lab's backtesting efforts, designing simulation frameworks that account for transaction costs, slippage, and survivorship bias. He's passionate about methodology and ensuring every backtest tells an honest story.",
    papers: ["momentum", "volatility"],
    projects: ["Multi-Asset Backtesting Engine", "Systematic Crypto Volatility Dashboard"],
  },
  {
    slug: "valentina-baez",
    name: "Valentina Baez",
    roleKey: "researchAnalyst",
    focusKey: "thematic",
    initials: "VB",
    email: "valentina@aird.ai",
    linkedin: "https://linkedin.com/in/valentinabaez",
    bio: "Valentina explores thematic research at the intersection of fundamental analysis and quantitative methods. She identifies emerging investment themes and maps them to systematic signals, bringing a creative and interdisciplinary perspective to the lab.",
    papers: ["liquidityRisk", "regime"],
    projects: ["Factor Zoo Explorer", "Systematic Crypto Volatility Dashboard"],
  },
];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}

export function membersForResearchKey(key: ResearchKey): Member[] {
  return members.filter((m) => m.papers.includes(key));
}

export function membersForProjectTitle(title: string): Member[] {
  return members.filter((m) => m.projects.includes(title));
}
