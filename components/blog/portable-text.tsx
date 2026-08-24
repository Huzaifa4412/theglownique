import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";

import { SanityImage } from "@/components/blog/sanity-image";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { type BlogImage, headingId } from "@/lib/blog";
import { whatsappQuoteUrl } from "@/lib/site";

/**
 * The blog body renderer.
 *
 * Headings carry the same ids the table of contents generates, produced by the
 * same `headingId()` — if these two ever compute ids differently, every TOC
 * link silently scrolls nowhere, so they share one function on purpose.
 *
 * Duplicate heading text gets a numeric suffix here exactly as it does in
 * `buildToc`, and the counter below walks the body in the same order, which is
 * what keeps the two in step.
 */

const CALLOUT_STYLES = {
  note: {
    icon: Info,
    wrap: "border-[#eadfe4] bg-[#faf7f8]",
    accent: "text-[#5e5862]",
  },
  tip: {
    icon: Lightbulb,
    wrap: "border-[#fde2ec] bg-[#fff0f5]",
    accent: "text-[#ce0754]",
  },
  warning: {
    icon: TriangleAlert,
    wrap: "border-[#f6d9a8] bg-[#fdf6ea]",
    accent: "text-[#8a5a06]",
  },
} as const;

type CalloutTone = keyof typeof CALLOUT_STYLES;

/**
 * Heading ids have to be unique across one document, and the only way to know
 * a heading is a repeat is to have seen the earlier one. A module-level counter
 * would leak between concurrently rendered posts on the server, so the map is
 * created per render and closed over by the components below.
 */
function createComponents(): PortableTextComponents {
  const seen = new Map<string, number>();

  const idFor = (text: string) => {
    const base = headingId(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  /** Pull the plain text out of a heading node so it can be slugged. */
  const textOf = (value: unknown): string => {
    const children = (value as { children?: { text?: string }[] })?.children ?? [];
    return children.map((child) => child.text ?? "").join("");
  };

  return {
    block: {
      h2: ({ children, value }) => (
        <h2 id={idFor(textOf(value))} className="blog-prose__h2">
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 id={idFor(textOf(value))} className="blog-prose__h3">
          {children}
        </h3>
      ),
      h4: ({ children }) => <h4 className="blog-prose__h4">{children}</h4>,
      blockquote: ({ children }) => <blockquote className="blog-prose__quote">{children}</blockquote>,
      normal: ({ children }) => <p>{children}</p>,
    },

    list: {
      bullet: ({ children }) => <ul className="blog-prose__ul">{children}</ul>,
      number: ({ children }) => <ol className="blog-prose__ol">{children}</ol>,
    },

    marks: {
      code: ({ children }) => <code className="blog-prose__code">{children}</code>,
      /**
       * Internal paths render as <Link> so navigation stays client-side;
       * anything else is an external source and gets the safety attributes.
       */
      link: ({ children, value }) => {
        const href = (value as { href?: string })?.href ?? "";
        if (href.startsWith("/")) {
          return <Link href={href}>{children}</Link>;
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
    },

    types: {
      blogImage: ({ value }) => {
        const image = value as BlogImage;
        if (!image?.url) return null;
        return (
          <figure className="blog-prose__figure">
            <SanityImage
              image={image}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="w-full rounded-2xl border border-[#eadfe4]"
            />
            {image.caption ? (
              <figcaption className="blog-prose__caption">{image.caption}</figcaption>
            ) : null}
          </figure>
        );
      },

      blogCallout: ({ value }) => {
        const { tone, title, text } = value as { tone?: CalloutTone; title?: string; text: string };
        const style = CALLOUT_STYLES[tone ?? "note"] ?? CALLOUT_STYLES.note;
        const Icon = style.icon;
        return (
          <aside className={`blog-callout ${style.wrap}`}>
            <Icon className={`h-5 w-5 shrink-0 ${style.accent}`} aria-hidden="true" />
            <div>
              {title ? <p className="blog-callout__title">{title}</p> : null}
              <p className="blog-callout__text">{text}</p>
            </div>
          </aside>
        );
      },

      blogTable: ({ value }) => {
        const { caption, columns, rows, note } = value as {
          caption: string;
          columns: string[];
          rows: { cells: string[] }[];
          note?: string;
        };
        return (
          <figure className="blog-table">
            <figcaption className="blog-table__caption">{caption}</figcaption>
            {/* The wrapper scrolls, not the page: a five-column table on a
                360px phone has to go somewhere, and it must not be sideways
                scroll on <body>. tabIndex makes the scroll region reachable
                by keyboard, which a scrollable div otherwise is not. */}
            <div className="blog-table__scroll" tabIndex={0} role="group" aria-label={caption}>
              <table>
                <thead>
                  <tr>
                    {columns?.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.cells?.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th key={cellIndex} scope="row">
                            {cell}
                          </th>
                        ) : (
                          <td key={cellIndex}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {note ? <p className="blog-table__note">{note}</p> : null}
          </figure>
        );
      },

      blogQuote: ({ value }) => {
        const { text, attribution } = value as { text: string; attribution?: string };
        return (
          <figure className="blog-pullquote">
            <blockquote>{text}</blockquote>
            {attribution ? <figcaption>{attribution}</figcaption> : null}
          </figure>
        );
      },

      blogCta: ({ value }) => {
        const { heading, text, label, href } = value as {
          heading: string;
          text?: string;
          label: string;
          href?: string;
        };
        return (
          <aside className="blog-inline-cta">
            <div>
              <p className="blog-inline-cta__heading">{heading}</p>
              {text ? <p className="blog-inline-cta__text">{text}</p> : null}
            </div>
            {href ? (
              <Link href={href} className="button button--primary shrink-0">
                {label}
              </Link>
            ) : (
              <a
                href={whatsappQuoteUrl("custom sign")}
                target="_blank"
                rel="noopener noreferrer"
                data-meta-source="blog-inline-cta"
                className="button button--whatsapp shrink-0"
              >
                <span>{label}</span>
                <WhatsappIcon className="h-5 w-5 shrink-0" />
              </a>
            )}
          </aside>
        );
      },
    },
  };
}

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="blog-prose">
      <PortableText value={value} components={createComponents()} />
    </div>
  );
}
