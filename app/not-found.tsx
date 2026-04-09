import Link from "next/link";
import { Activity } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
        <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                AIR&D
              </span>
            </Link>
          </div>
        </nav>

        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-7xl font-bold text-neutral-300">404</p>
          <h1 className="text-2xl font-bold text-neutral-900">
            Page not found
          </h1>
          <p className="max-w-md text-neutral-600">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Back to home
          </Link>
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
