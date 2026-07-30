"use client";

import {
  Check,
  CheckCircle,
  Cube,
  FileText,
  ImageSquare,
  InstagramLogo,
  PinterestLogo,
  SealCheck,
  ShieldCheck,
  Sparkle,
  TiktokLogo,
  Truck,
  X,
} from "@phosphor-icons/react";

const icons = {
  Check,
  CheckCircle,
  Cube,
  FileText,
  ImageSquare,
  InstagramLogo,
  PinterestLogo,
  SealCheck,
  ShieldCheck,
  Sparkle,
  TiktokLogo,
  Truck,
  X,
} as const;

export type StoreIconName = keyof typeof icons;

type StoreIconProps = {
  name: StoreIconName;
  label?: string;
};

export function StoreIcon({ name, label }: StoreIconProps) {
  const Glyph = icons[name];

  return (
    <i
      className="icon-box"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      <Glyph focusable="false" />
    </i>
  );
}
