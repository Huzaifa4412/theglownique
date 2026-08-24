/**
 * A tiny builder for Sanity portable text.
 *
 * Hand-writing portable text JSON is unreadable and gets `_key` collisions
 * wrong, which Sanity rejects at import time with an error that does not say
 * which block. So the content module is written with these helpers and
 * `finalize()` stamps every block, span and markDef with a unique key at the
 * end — one place to get right instead of several hundred.
 *
 * Images are written as `{__image: "cover"}` placeholders and swapped for real
 * asset references by the seed runner once the files are uploaded, because a
 * reference cannot exist before the upload does.
 */

/** Bold run inside a paragraph. */
export const b = (text) => ({ __mark: "strong", text });

/** Italic run. */
export const i = (text) => ({ __mark: "em", text });

/** Link run. `href` may be an internal path or an absolute URL. */
export const a = (text, href) => ({ __link: href, text });

/**
 * A paragraph (or any block style) assembled from strings and mark helpers.
 *
 * Link annotations live in `markDefs` and are referenced by key from the span,
 * which is why the two are built together here rather than separately.
 */
function block(style, parts) {
  const children = [];
  const markDefs = [];

  for (const part of parts) {
    if (typeof part === "string") {
      children.push({ _type: "span", text: part, marks: [] });
      continue;
    }
    if (part.__link) {
      const def = { _type: "link", href: part.__link, __needsKey: true };
      markDefs.push(def);
      children.push({ _type: "span", text: part.text, marks: [def] });
      continue;
    }
    children.push({ _type: "span", text: part.text, marks: [part.__mark] });
  }

  return { _type: "block", style, markDefs, children };
}

export const p = (...parts) => block("normal", parts);
export const h2 = (text) => block("h2", [text]);
export const h3 = (text) => block("h3", [text]);
export const h4 = (text) => block("h4", [text]);
export const quote = (text) => block("blockquote", [text]);

/** Bullet list. Each item is a string or an array of inline parts. */
export const ul = (items) =>
  items.map((item) => ({
    ...block("normal", Array.isArray(item) ? item : [item]),
    listItem: "bullet",
    level: 1,
  }));

/** Numbered list. */
export const ol = (items) =>
  items.map((item) => ({
    ...block("normal", Array.isArray(item) ? item : [item]),
    listItem: "number",
    level: 1,
  }));

export const callout = (tone, title, text) => ({ _type: "blogCallout", tone, title, text });

export const table = (caption, columns, rows, note) => ({
  _type: "blogTable",
  caption,
  columns,
  rows: rows.map((cells) => ({ _type: "row", cells })),
  ...(note ? { note } : {}),
});

export const pullquote = (text, attribution) => ({
  _type: "blogQuote",
  text,
  ...(attribution ? { attribution } : {}),
});

export const cta = (heading, text, label, href) => ({
  _type: "blogCta",
  heading,
  text,
  label,
  ...(href ? { href } : {}),
});

/** Placeholder swapped for a real asset reference by the seed runner. */
export const image = (imageKey, alt, caption) => ({
  _type: "blogImage",
  __image: imageKey,
  alt,
  ...(caption ? { caption } : {}),
});

/**
 * Stamp unique `_key`s through a body array and flatten nested arrays (the
 * list helpers return arrays, so `[...h2("x"), ...ul([...])]` would otherwise
 * need spreading at every call site).
 */
export function finalize(blocks) {
  let counter = 0;
  const key = () => `k${(counter += 1).toString(36)}`;

  return blocks.flat().map((node) => {
    const out = { ...node, _key: key() };

    if (Array.isArray(out.markDefs)) {
      // The span holds the same object identity as the markDef, so keying the
      // def first and then mapping the span's marks to strings keeps them
      // pointing at each other.
      out.markDefs = out.markDefs.map((def) => {
        const withKey = { _type: def._type, href: def.href, _key: key() };
        def.__assignedKey = withKey._key;
        return withKey;
      });
    }

    if (Array.isArray(out.children)) {
      out.children = out.children.map((child) => ({
        _type: "span",
        _key: key(),
        text: child.text,
        marks: (child.marks ?? []).map((mark) =>
          typeof mark === "string" ? mark : mark.__assignedKey,
        ),
      }));
    }

    if (Array.isArray(out.rows)) {
      out.rows = out.rows.map((row) => ({ ...row, _key: key() }));
    }

    return out;
  });
}
