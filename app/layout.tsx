import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aird.ai"),
  title: {
    default: "AIR&D — Alternative Investments, Research & Development",
    template: "%s | AIR&D",
  },
  description:
    "AIR&D is an independent, student-run quantitative research lab building systematic strategies, studying market microstructure, and developing open infrastructure for financial research.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AIR&D",
    title: "AIR&D — Alternative Investments, Research & Development",
    description:
      "Independent, student-run quantitative research lab. Systematic strategies, market microstructure, and open financial infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIR&D — Alternative Investments, Research & Development",
    description:
      "Independent, student-run quantitative research lab.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable)}>
      <body className="min-h-full overflow-x-hidden flex flex-col">{children}</body>
    </html>
  );
}
