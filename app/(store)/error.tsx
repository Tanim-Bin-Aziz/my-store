"use client";

// Safety net: if anything throws mid-render (e.g. the backend dies while
// data-driven sections are rendering), show the degraded skeleton homepage
// instead of Next's default error screen.
import { DegradedHome } from "@/components/home-degraded";

export default function StoreError() {
  return <DegradedHome />;
}
