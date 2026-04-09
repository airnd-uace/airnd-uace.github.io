"use client";

import { useEffect } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans antialiased">
        <title>Error — AIR&D</title>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <p className="text-7xl font-bold text-neutral-300">!</p>
          <h1 className="text-2xl font-bold text-neutral-900">
            Something went wrong
          </h1>
          <p className="max-w-md text-neutral-600">
            A critical error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={unstable_retry}
            className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Try again
          </button>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
