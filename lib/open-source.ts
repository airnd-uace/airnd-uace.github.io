export interface OpenSourceItem {
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  github: string;
  tags: string[];
}

export const openSourceItems: OpenSourceItem[] = [
  {
    titleEn: "quant-backtest",
    titleEs: "quant-backtest",
    descEn: "Open-source backtesting framework with transaction cost modeling, slippage simulation, and portfolio constraints.",
    descEs: "Framework de backtesting open-source con modelado de costos de transacción, simulación de slippage y restricciones de portafolio.",
    github: "https://github.com/aird-lab/quant-backtest",
    tags: ["Python", "Backtesting"],
  },
  {
    titleEn: "orderbook-parser",
    titleEs: "orderbook-parser",
    descEn: "High-performance L2 order book parser and feature extractor for microstructure research.",
    descEs: "Parser de libro de órdenes L2 de alto rendimiento y extractor de features para investigación de microestructura.",
    github: "https://github.com/aird-lab/orderbook-parser",
    tags: ["Rust", "HFT"],
  },
  {
    titleEn: "crypto-regime-labels",
    titleEs: "crypto-regime-labels",
    descEn: "Pre-computed HMM regime labels for BTC, ETH, and SOL. Updated monthly.",
    descEs: "Etiquetas de régimen HMM pre-computadas para BTC, ETH y SOL. Actualización mensual.",
    github: "https://github.com/aird-lab/crypto-regime-labels",
    tags: ["Dataset", "Crypto"],
  },
  {
    titleEn: "factor-zoo-data",
    titleEs: "factor-zoo-data",
    descEn: "Cleaned and standardized dataset of 50+ academic equity factors for US markets.",
    descEs: "Dataset limpio y estandarizado de más de 50 factores académicos de acciones para mercados estadounidenses.",
    github: "https://github.com/aird-lab/factor-zoo-data",
    tags: ["Dataset", "Equities"],
  },
];
