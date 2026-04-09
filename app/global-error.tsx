"use client";

import { useEffect } from "react";

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
      <body
        style={{
          margin: 0,
          fontFamily:
            'Inter, "Segoe UI", sans-serif',
          backgroundColor: "#fafafa",
          color: "#171717",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <title>Error — AIR&D</title>
        <p style={{ fontSize: "4rem", fontWeight: 700, color: "#d4d4d4" }}>
          !
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Something went wrong
        </h1>
        <p style={{ maxWidth: "28rem", color: "#525252" }}>
          A critical error occurred. Please try again.
        </p>
        <button
          onClick={unstable_retry}
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "9999px",
            backgroundColor: "#171717",
            color: "#fff",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
