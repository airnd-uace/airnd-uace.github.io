"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Error({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Activity className="h-8 w-8 text-emerald-600" />
      <h1 className="text-2xl font-bold text-neutral-900">
        Something went wrong
      </h1>
      <p className="max-w-md text-neutral-600">
        An unexpected error occurred. You can try again or head back to the
        homepage.
      </p>
      <div className="flex gap-3">
        <button
          onClick={unstable_retry}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
