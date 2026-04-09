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

const researchMetaByKey: Record<
  ResearchKey,
  { tags: string[]; date: string }
> = {
  volatility: { tags: ["Crypto", "Volatility", "ML"], date: "Mar 2025" },
  momentum: { tags: ["Equities", "Factor", "Macro"], date: "Jan 2025" },
  microstructure: { tags: ["HFT", "Microstructure"], date: "Nov 2024" },
  regime: { tags: ["Crypto", "ML"], date: "Sep 2024" },
  correlation: { tags: ["Equities", "Macro"], date: "Jul 2024" },
  marketMaking: { tags: ["HFT", "Microstructure"], date: "May 2024" },
  liquidityRisk: { tags: ["Equities", "Factor"], date: "Feb 2024" },
  tailRisk: { tags: ["Crypto", "Volatility"], date: "Dec 2023" },
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
