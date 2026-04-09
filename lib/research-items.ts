import type { ResearchKey } from "@/lib/members";

export const researchByKey = {
  all: [
    { key: "volatility" as const, tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025" },
    { key: "momentum" as const, tags: ["Equities", "Factor", "Macro"], date: "Jan 2025" },
    { key: "microstructure" as const, tags: ["HFT", "Microstructure"], date: "Nov 2024" },
    { key: "regime" as const, tags: ["Crypto", "ML"], date: "Sep 2024" },
    { key: "correlation" as const, tags: ["Equities", "Macro"], date: "Jul 2024" },
    { key: "marketMaking" as const, tags: ["HFT", "Microstructure"], date: "May 2024" },
    { key: "liquidityRisk" as const, tags: ["Equities", "Factor"], date: "Feb 2024" },
    { key: "tailRisk" as const, tags: ["Crypto", "Volatility"], date: "Dec 2023" },
  ],
  crypto: [
    { key: "volatility" as const, tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025" },
    { key: "regime" as const, tags: ["Crypto", "ML"], date: "Sep 2024" },
    { key: "tailRisk" as const, tags: ["Crypto", "Volatility"], date: "Dec 2023" },
  ],
  equities: [
    { key: "momentum" as const, tags: ["Equities", "Factor", "Macro"], date: "Jan 2025" },
    { key: "correlation" as const, tags: ["Equities", "Macro"], date: "Jul 2024" },
    { key: "liquidityRisk" as const, tags: ["Equities", "Factor"], date: "Feb 2024" },
  ],
  hft: [
    { key: "microstructure" as const, tags: ["HFT", "Microstructure"], date: "Nov 2024" },
    { key: "marketMaking" as const, tags: ["HFT", "Microstructure"], date: "May 2024" },
  ],
} as const;

export interface ResearchMeta {
  tags: string[];
  date: string;
  venue?: string;
  pdfUrl?: string;
  bibtex?: string;
}

const researchMetaByKey: Record<ResearchKey, ResearchMeta> = {
  volatility: {
    tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025",
    venue: "AIR&D Working Paper",
    pdfUrl: "#",
    bibtex: `@article{aird2025volatility,\n  title={Volatility Clustering in Crypto Markets},\n  author={Prada, Thomas and Guzmán, Sebastián},\n  journal={AIR&D Working Papers},\n  year={2025}\n}`,
  },
  momentum: {
    tags: ["Equities", "Factor", "Macro"], date: "Jan 2025",
    venue: "AIR&D Working Paper",
    pdfUrl: "#",
    bibtex: `@article{aird2025momentum,\n  title={Momentum Factor Decay Post-2020},\n  author={Chacón, Dilan and Félix, Solange},\n  journal={AIR&D Working Papers},\n  year={2025}\n}`,
  },
  microstructure: {
    tags: ["HFT", "Microstructure"], date: "Nov 2024",
    venue: "AIR&D Technical Report",
    pdfUrl: "#",
    bibtex: `@article{aird2024microstructure,\n  title={Microstructure Signals in Order Books},\n  author={Diaz, Ferney and Solano, Cesar},\n  journal={AIR&D Technical Reports},\n  year={2024}\n}`,
  },
  regime: {
    tags: ["Crypto", "ML"], date: "Sep 2024",
    venue: "AIR&D Working Paper",
    pdfUrl: "#",
    bibtex: `@article{aird2024regime,\n  title={Crypto Regime Detection via Hidden Markov Models},\n  author={Prada, Thomas and Alvarado, Juan Luckas},\n  journal={AIR&D Working Papers},\n  year={2024}\n}`,
  },
  correlation: {
    tags: ["Equities", "Macro"], date: "Jul 2024",
    venue: "AIR&D Working Paper",
    bibtex: `@article{aird2024correlation,\n  title={Cross-Asset Correlation Breakdown During Stress},\n  author={Félix, Solange and Ariza, Santiago},\n  journal={AIR&D Working Papers},\n  year={2024}\n}`,
  },
  marketMaking: {
    tags: ["HFT", "Microstructure"], date: "May 2024",
    venue: "AIR&D Technical Report",
    bibtex: `@article{aird2024marketmaking,\n  title={Adaptive Market Making with Inventory Constraints},\n  author={Diaz, Ferney and Solano, Cesar},\n  journal={AIR&D Technical Reports},\n  year={2024}\n}`,
  },
  liquidityRisk: {
    tags: ["Equities", "Factor"], date: "Feb 2024",
    venue: "AIR&D Working Paper",
    bibtex: `@article{aird2024liquidity,\n  title={Liquidity-Adjusted Factor Returns},\n  author={Chacón, Dilan and Baez, Valentina},\n  journal={AIR&D Working Papers},\n  year={2024}\n}`,
  },
  tailRisk: {
    tags: ["Crypto", "Volatility"], date: "Dec 2023",
    venue: "AIR&D Working Paper",
    bibtex: `@article{aird2023tailrisk,\n  title={Tail Risk Hedging in Crypto Derivatives},\n  author={Prada, Thomas and Ariza, Santiago and Rodriguez, Camilo},\n  journal={AIR&D Working Papers},\n  year={2023}\n}`,
  },
};

export const RESEARCH_SLUGS = Object.keys(researchMetaByKey) as ResearchKey[];

export function isResearchSlug(s: string): s is ResearchKey {
  return RESEARCH_SLUGS.includes(s as ResearchKey);
}

export function getResearchMeta(key: ResearchKey) {
  return researchMetaByKey[key];
}

export function researchPostHref(key: ResearchKey): string {
  return `/research/${key}`;
}
