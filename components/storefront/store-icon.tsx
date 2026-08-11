"use client";

import {
  Check,
  CheckCircle,
  Cube,
  FacebookLogo,
  FileText,
  ImageSquare,
  InstagramLogo,
  PinterestLogo,
  Storefront,
  SealCheck,
  ShieldCheck,
  Sparkle,
  TiktokLogo,
  Truck,
  X,
} from "@phosphor-icons/react";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

const icons = {
  Check,
  CheckCircle,
  Cube,
  FacebookLogo,
  FileText,
  ImageSquare,
  InstagramLogo,
  PinterestLogo,
  Storefront,
  SealCheck,
  ShieldCheck,
  Sparkle,
  TiktokLogo,
  Truck,
  WhatsappLogo: WhatsappIcon,
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
