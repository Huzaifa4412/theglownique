"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-in reveal shared by the collection pages.
 *
 * Kept as its own client component so the page itself can stay a Server
 * Component: the only interactive thing on a collection page is this motion,
 * and shipping the whole page as client code to get it would be the wrong
 * trade.
 *
 * Only the position animates. Opacity stays at 1 throughout, so a section is
 * never parked invisible waiting on an intersection observer: a full-page
 * capture, a link preview, a slow scroll on a low-end phone and a crawler that
 * does not scroll all see the finished page. The slide is the motion; the
 * fade was the risk.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 22 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
