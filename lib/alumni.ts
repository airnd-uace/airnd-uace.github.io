export interface Alumnus {
  name: string;
  roleEn: string;
  roleEs: string;
  initials: string;
  nowAtEn: string;
  nowAtEs: string;
  linkedin?: string;
}

export const alumni: Alumnus[] = [
  {
    name: "Andrés Mejía",
    roleEn: "Quant Researcher",
    roleEs: "Investigador Cuant",
    initials: "AM",
    nowAtEn: "Now at Goldman Sachs",
    nowAtEs: "Ahora en Goldman Sachs",
    linkedin: "https://linkedin.com/in/andresmejia",
  },
  {
    name: "Laura Castillo",
    roleEn: "Data Engineer",
    roleEs: "Ingeniera de Datos",
    initials: "LC",
    nowAtEn: "Now at Two Sigma",
    nowAtEs: "Ahora en Two Sigma",
    linkedin: "https://linkedin.com/in/lauracastillo",
  },
  {
    name: "Miguel Torres",
    roleEn: "Portfolio Manager",
    roleEs: "Portfolio Manager",
    initials: "MT",
    nowAtEn: "MS in Financial Engineering, Columbia",
    nowAtEs: "MS en Ingeniería Financiera, Columbia",
    linkedin: "https://linkedin.com/in/migueltorres",
  },
  {
    name: "Isabella Restrepo",
    roleEn: "Research Analyst",
    roleEs: "Analista de Investigación",
    initials: "IR",
    nowAtEn: "Now at Citadel",
    nowAtEs: "Ahora en Citadel",
    linkedin: "https://linkedin.com/in/isabellarestrepo",
  },
  {
    name: "David Herrera",
    roleEn: "Macro Analyst",
    roleEs: "Analista Macro",
    initials: "DH",
    nowAtEn: "PhD Economics, MIT",
    nowAtEs: "PhD Economía, MIT",
    linkedin: "https://linkedin.com/in/davidherrera",
  },
  {
    name: "Carolina Vargas",
    roleEn: "Risk Analyst",
    roleEs: "Analista de Riesgo",
    initials: "CV",
    nowAtEn: "Now at Jane Street",
    nowAtEs: "Ahora en Jane Street",
    linkedin: "https://linkedin.com/in/carolinavargas",
  },
];
