"use client";

import { useEffect, useState } from "react";

// The first page load has its own hero choreography; only client-side
// navigations get the page-level enter.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
