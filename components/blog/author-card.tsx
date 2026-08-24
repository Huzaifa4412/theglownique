import { SanityImage } from "@/components/blog/sanity-image";
import type { BlogAuthor } from "@/lib/blog";

/**
 * The byline block at the foot of a post.
 *
 * It renders `expertise`, not a bio, because the content plan's quality
 * contract asks pages to show "relevant experience" — "Ali has worked in
 * signage for eight years" is a fact a reader can weigh, and "Ali loves
 * lighting" is not. The schema makes the field required for the same reason.
 *
 * The reviewer, when present, sits in the same block rather than a separate
 * one: the useful signal is that a second qualified person checked the first
 * one's work, and splitting them apart loses that pairing.
 */
export function AuthorCard({
  author,
  reviewer,
}: {
  author: BlogAuthor;
  reviewer?: BlogAuthor | null;
}) {
  return (
    <section className="blog-author" aria-label="About the author">
      <div className="blog-author__person">
        {author.image?.url ? (
          <div className="blog-author__avatar">
            <SanityImage image={author.image} alt="" sizes="72px" fill />
          </div>
        ) : null}
        <div>
          <p className="blog-author__name">{author.name}</p>
          <p className="blog-author__role">{author.role}</p>
          <p className="blog-author__bio">{author.expertise}</p>
          {author.links && author.links.length > 0 ? (
            <p className="blog-author__links">
              {author.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer nofollow">
                  {link.label}
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </div>

      {reviewer && reviewer.name !== author.name ? (
        <p className="blog-author__reviewer">
          <strong>Reviewed by {reviewer.name}</strong>
          {reviewer.role ? `, ${reviewer.role}. ` : ". "}
          {reviewer.expertise}
        </p>
      ) : null}
    </section>
  );
}
