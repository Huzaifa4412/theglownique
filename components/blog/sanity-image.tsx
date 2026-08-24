import Image from "next/image";

import type { BlogImage } from "@/lib/blog";
import { cn } from "@/lib/utils";

type SanityImageProps = {
  image: BlogImage | null | undefined;
  /** Falls back to the image's own alt. Pass "" for a decorative image. */
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Crop to the container instead of using the asset's own aspect ratio. */
  fill?: boolean;
};

/**
 * A Sanity asset rendered through next/image.
 *
 * The dimensions come from the asset's own metadata, fetched in the GROQ
 * projection rather than guessed here, so the browser reserves the right box
 * before the bytes arrive. Combined with `lqip` — the base64 thumbnail Sanity
 * generates on upload — a card never reflows and never flashes white.
 *
 * Returns null on a missing asset rather than rendering a broken frame: a post
 * whose cover failed to upload should look like a post without a cover, not
 * like a bug.
 */
export function SanityImage({
  image,
  alt,
  sizes,
  className,
  priority = false,
  fill = false,
}: SanityImageProps) {
  if (!image?.url) return null;

  const resolvedAlt = alt ?? image.alt ?? "";
  const blur = image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {};

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={resolvedAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        {...blur}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={resolvedAlt}
      width={image.width ?? 1200}
      height={image.height ?? 800}
      sizes={sizes}
      priority={priority}
      className={className}
      {...blur}
    />
  );
}
