import Image from "next/image";
import Link from "next/link";
import homeImage from "@/app/assets/hero/home.webp";
import weddingImage from "@/app/assets/hero/wedding.webp";
import businessImage from "@/app/assets/hero/business.webp";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StudioCatalog, StudioWallPreview } from "./studio-interactions";
import { homeFaqs, homeSignTypes } from "@/lib/home-content";
import { serializeJsonLd } from "@/lib/utils";
import { ETSY_SHOP_URL, HAS_VERIFIED_REVIEWS } from "@/lib/site";
import { testimonials } from "@/lib/store-data";
import styles from "./studio-home.module.css";

export function StudioHome() {
  const review = HAS_VERIFIED_REVIEWS
    ? testimonials.find((item) => item.verified)
    : undefined;
  return (
    <main className={styles.home} id="main-content">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroHeading}>
          <div>
            <p className={styles.kicker}>
              <span className={styles.dot} /> The custom sign studio
            </p>
            <h1 id="hero-heading">
              Custom neon signs.
              <br />
              <em>Unmistakably yours.</em>
            </h1>
          </div>
          <div className={styles.heroAside}>
            <p>
              For the space you call yours.
              <br />
              LED neon, dimensional letters and illuminated signs, made to
              order.
            </p>
            <CustomQuoteButton
              className={styles.primary}
              label="Create my sign"
            />
            <a className={styles.textLink} href="#categories">
              Find your kind of glow <span>↘</span>
            </a>
          </div>
        </div>
        <div className={styles.heroGallery}>
          <Link
            className={styles.heroMain}
            href="/custom-signage/home-decor-signs"
          >
            <Image
              src={homeImage}
              alt="Pink Good Vibes neon lettering above a cream sofa in a warm, pink living room"
              fill
              preload
              sizes="(max-width: 700px) 100vw, 66vw"
              placeholder="blur"
            />
            <div className={styles.imageCaption}>
              <span>
                A room with a point of view.<small>Neon signs for home</small>
              </span>
              <span className={styles.roundArrow}>↗</span>
            </div>
          </Link>
          <Link
            className={styles.heroSmall}
            href="/custom-signage/wedding-signs"
          >
            <Image
              src={weddingImage}
              alt="Warm white Better Together neon sign framed by wedding flowers"
              fill
              sizes="(max-width: 700px) 46vw, 32vw"
              placeholder="blur"
            />
            <div className={styles.imageCaption}>
              <span>
                For your forever.<small>Wedding neon signs</small>
              </span>
              <span className={styles.roundArrow}>↗</span>
            </div>
          </Link>
          <Link className={styles.heroSmall} href="/business-signs">
            <Image
              src="/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"
              alt="Estudio Sur logo in warm illuminated metal letters"
              fill
              sizes="(max-width: 700px) 46vw, 32vw"
            />
            <div className={styles.imageCaption}>
              <span>
                Make your mark.<small>Custom business signage</small>
              </span>
              <span className={styles.roundArrow}>↗</span>
            </div>
          </Link>
        </div>
        <div className={styles.serviceStrip}>
          <span>Made to order, made for you</span>
          <span>Free design preview</span>
          <span>Tracked worldwide delivery</span>
          <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
            Shop on Etsy ↗
          </a>
        </div>
      </section>

      <section
        className={styles.section}
        id="categories"
        aria-labelledby="sign-types-heading"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Four ways to glow</p>
            <h2 id="sign-types-heading">
              Different materials.
              <br />
              <em>A finish that feels like you.</em>
            </h2>
          </div>
          <Link className={styles.textLink} href="/products">
            Compare all sign types ↗
          </Link>
        </div>
        <div className={styles.materialGrid}>
          {homeSignTypes.map((type, index) => (
            <Link className={styles.material} key={type.href} href={type.href}>
              <div className={styles.materialImage}>
                <Image
                  src={type.image}
                  alt={type.alt}
                  fill
                  sizes="(max-width: 700px) 46vw, 23vw"
                />
                <span className={styles.materialNumber}>0{index + 1}</span>
              </div>
              <p>{type.descriptor}</p>
              <h3>
                {type.name}
                <span>↗</span>
              </h3>
              <p className={styles.materialDetail}>{type.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.spaces}`}
        id="inspiration"
        aria-labelledby="spaces-heading"
      >
        <div className={styles.spacesPhoto}>
          <Image
            src={businessImage}
            alt="Coffee First LED neon sign lighting a terracotta café wall above the counter"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
            placeholder="blur"
          />
          <span className={styles.photoTag}>The space sets the story.</span>
        </div>
        <div className={styles.spacesCopy}>
          <p className={styles.kicker}>A sign for every setting</p>
          <h2 id="spaces-heading">
            Good spaces
            <br />
            have <em>personality.</em>
          </h2>
          <p>
            A favourite phrase. Your name above the door. That finishing touch
            you knew was missing.
          </p>
          <nav className={styles.spaceLinks} aria-label="Shop signs by space">
            <Link href="/business-signs">
              For your business <span>01 ↗</span>
            </Link>
            <Link href="/custom-signage/wedding-signs">
              For the big day <span>02 ↗</span>
            </Link>
            <Link href="/custom-signage/home-decor-signs">
              For your home <span>03 ↗</span>
            </Link>
            <Link href="/custom-signage/gaming-neon-signs">
              For your game room <span>04 ↗</span>
            </Link>
          </nav>
          <Link href="/custom-signage" className={styles.textLink}>
            All spaces & occasions ↗
          </Link>
        </div>
      </section>

      <StudioCatalog />

      <section
        className={`${styles.section} ${styles.process}`}
        id="custom"
        aria-labelledby="process-heading"
      >
        <div className={styles.processCopy}>
          <p className={styles.kicker}>From your idea to your wall</p>
          <h2 id="process-heading">
            Picture it.
            <br />
            <em>We’ll make it glow.</em>
          </h2>
          <p>
            You don’t need a finished design. A few words, a logo or a photo of
            your space is a good place to start.
          </p>
          <ol className={styles.steps}>
            <li>
              <span>01</span>
              <div>
                <h3>Send us your idea</h3>
                <p>Share your wording, style and approximate size.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>See it before it’s made</h3>
                <p>Review your free design preview and project quote.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Made for your space</h3>
                <p>Approve the details. We craft and ship your sign.</p>
              </div>
            </li>
          </ol>
          <CustomQuoteButton
            className={styles.primary}
            label="Get my free design preview"
          />
          <Link
            className={styles.textLink}
            id="color-studio"
            href="/products/custom-neon-signs#color-studio"
          >
            Try the interactive colour studio ↗
          </Link>
        </div>
        <StudioWallPreview />
      </section>

      {review && (
        <aside className={styles.review} aria-label="Customer review">
          <p className={styles.kicker}>A note from an Etsy customer</p>
          <blockquote>“{review.quote}”</blockquote>
          <p>
            {review.name} <span>— {review.role}</span>
          </p>
          <a
            className={styles.textLink}
            href={ETSY_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read customer reviews on Etsy ↗
          </a>
        </aside>
      )}

      <section
        className={`${styles.section} ${styles.answers}`}
        id="faq"
        aria-labelledby="faq-heading"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: homeFaqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
        <div className={styles.answerIntro}>
          <p className={styles.kicker}>A little clarity</p>
          <h2 id="faq-heading">
            Before you
            <br />
            <em>make it yours.</em>
          </h2>
          <p>The practical details, without the guesswork.</p>
          <Link className={styles.textLink} href="/guides">
            Explore the sign buying guides ↗
          </Link>
          <Link className={styles.textLink} href="/blog">
            Ideas from the journal ↗
          </Link>
        </div>
        <div className={styles.faqList}>
          {homeFaqs.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
              <Link href={item.href}>{item.link} ↗</Link>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
