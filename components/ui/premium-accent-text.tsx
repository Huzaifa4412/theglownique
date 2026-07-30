import type { ReactNode } from "react";

type PremiumAccentTextProps = {
  children: ReactNode;
  className?: string;
};

export function PremiumAccentText({
  children,
  className = "",
}: PremiumAccentTextProps) {
  return (
    <span
      className={`premium-accent-text${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
