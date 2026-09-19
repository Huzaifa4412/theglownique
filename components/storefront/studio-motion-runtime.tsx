"use client";

import { useRef } from "react";

import { useStudioMotion } from "@/components/storefront/hooks/use-studio-motion";

export function StudioMotionRuntime() {
  // The runtime renders nothing; the hook scopes itself to the studio home
  // root it finds in the document (see use-studio-motion.ts). A ref keeps the
  // useGSAP scope stable across re-renders.
  const scopeRef = useRef<HTMLElement | null>(null);
  useStudioMotion(scopeRef);
  return null;
}
