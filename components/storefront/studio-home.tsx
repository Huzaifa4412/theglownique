import Image from "next/image";
import Link from "next/link";
import homeImage from "@/app/assets/hero/home.webp";
import weddingImage from "@/app/assets/hero/wedding.webp";
import businessImage from "@/app/assets/hero/business.webp";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SmoothScroll } from "@/components/storefront/smooth-scroll";
import { StudioMotionLoader } from "@/components/storefront/studio-motion-loader";
import {
  HeroTypewriter,
  StudioCatalog,
  StudioReviews,
  StudioWallPreview,
} from "./studio-interactions";
import { StudioColorStudio } from "@/components/storefront/studio-color-studio";
import {
  heroTypePhrases,
  homeAnswer,
  homeBusinessLinks,
  homeFaqs,
  homeMarqueeItems,
  homeSignTypes,
} from "@/lib/home-content";
import { serializeJsonLd } from "@/lib/utils";
import { ETSY_SHOP_URL, HAS_VERIFIED_REVIEWS } from "@/lib/site";
import styles from "./studio-home.module.css";

export function StudioHome() {
  return (
    <main className={styles.home} id="main-content" data-studio-home>
      <SmoothScroll />
      <StudioMotionLoader />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className={styles.hero}
        aria-labelledby="hero-heading"
        data-hero
      >
        {/* Ghost word drifting behind the headline on scroll. */}
        <span className={styles.heroGhost} aria-hidden="true" data-parallax="0.8">
          glow.
        </span>
        <div className={styles.heroHeading}>
          <div>
            <p className={styles.kicker}>
              <span className={styles.dot} /> The custom sign studio
            </p>
            <h1 id="hero-heading">
              <span className={styles.heroLine}>
                <span>Custom neon signs.</span>
              </span>
              <span className={styles.heroLine}>
                <span>
                  {/* The complete phrase, statically rendered for search
                      engines and screen readers; the typed copy is
                      aria-hidden. */}
                  <span className="sr-only">{heroTypePhrases[0]}</span>
                  <em className={styles.heroTypeLine}>
                    <HeroTypewriter phrases={heroTypePhrases} />
                  </em>
                </span>
              </span>
            </h1>
          </div>
          <div className={styles.heroAside}>
            <p>
              For the space you call yours.
              <br />
              LED neon, channel letters and illuminated signage, made to
              order.
            </p>
            <span className={styles.magnetic} data-magnetic>
              <CustomQuoteButton
                className={styles.primary}
                label="Create my sign"
              />
            </span>
            <a className={styles.textLink} href="#categories">
              Find your kind of glow <span>↘</span>
            </a>
            {/* A hand-set margin note, like a pencil annotation on a proof. */}
            <span className={styles.annotation} aria-hidden="true">
              <svg
                viewBox="0 0 60 34"
                width="52"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path className={styles.annotationPath} d="M56 4 C 40 26, 20 30, 5 18" />
                <path className={styles.annotationPath} d="M11 10 L 5 18 L 14 20" />
              </svg>
              free mockup, always ✳
            </span>
          </div>
        </div>
        <div className={styles.heroGallery}>
          <Link
            className={styles.heroMain}
            href="/custom-signage/home-decor-signs"
            data-parallax="0.5"
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
            data-parallax="1"
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
          <Link
            className={styles.heroSmall}
            href="/business-signs"
            data-parallax="1.4"
          >
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
          {HAS_VERIFIED_REVIEWS && (
            <a
              className={styles.heroBadge}
              href={ETSY_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">★</span> Verified Etsy reviews ↗
            </a>
          )}
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <div className={styles.marquee} aria-label="What every order includes">
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeGroup}>
            {homeMarqueeItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
              Shop on Etsy ↗
            </a>
          </div>
          <div className={styles.marqueeGroup} aria-hidden="true">
            {homeMarqueeItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <a
              href={ETSY_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Shop on Etsy ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── The one-line answer (AEO/GEO) ─────────────────────────────── */}
      {/* A real question heading over a direct, self-contained answer — the
          extractable pattern answer engines lift whole. The wording tracks
          the entity statement in the SEO research. */}
      <section
        className={styles.definition}
        aria-labelledby="what-we-make-heading"
      >
        <h2 className={styles.definitionQuestion} id="what-we-make-heading">
          What does The Glownique make?
        </h2>
        <p className={styles.definitionText} data-words>
          {homeAnswer.split(" ").map((word, index) => (
            <span key={`${word}-${index}`}>{word} </span>
          ))}
        </p>
      </section>

      {/* ── Sign types: the rail ──────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.rail}`}
        id="categories"
        aria-labelledby="sign-types-heading"
        data-rail
      >
        <div className={styles.sectionHeading} data-reveal>
          <span className={styles.sectionIndex} aria-hidden="true">01</span>
          <div>
            <p className={styles.kicker}>Four ways to glow</p>
            <h2 id="sign-types-heading">
              Different materials.
              <br />
              <em>A finish that feels like you.</em>
            </h2>
          </div>
          <Link className={styles.textLink} href="/custom-signage">
            Compare all sign types ↗
          </Link>
        </div>
        <div className={styles.railViewport} data-rail-viewport>
          <div className={styles.railTrack} data-rail-track>
            {homeSignTypes.map((type, index) => (
              <Link
                className={styles.railCard}
                key={type.href}
                href={type.href}
              >
                <div className={styles.railImage}>
                  <Image
                    src={type.image}
                    alt={type.alt}
                    fill
                    sizes="(max-width: 700px) 78vw, (max-width: 1000px) 44vw, 30vw"
                  />
                  <span className={styles.materialNumber}>0{index + 1}</span>
                </div>
                <p className={styles.railDescriptor}>{type.descriptor}</p>
                <h3>
                  {type.name}
                  <span>↗</span>
                </h3>
                <p className={styles.railDetail}>{type.detail}</p>
              </Link>
            ))}
            <Link className={styles.railEnd} href="/products">
              <p className={styles.kicker}>Still deciding?</p>
              <p className={styles.railEndTitle}>
                Compare all four,
                <br />
                <em>side by side.</em>
              </p>
              <span className={styles.roundArrowDark}>↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.railProgressTrack} aria-hidden="true">
          <span className={styles.railProgress} data-rail-progress />
        </div>
        {/* Routes commercial intent down to the industry pages (keyword map:
            the homepage never competes with its own cluster pages). */}
        <nav className={styles.railFootnote} aria-label="Popular business signs">
          <span>Businesses start here:</span>
          {homeBusinessLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      {/* ── Spaces ────────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.spaces}`}
        id="inspiration"
        aria-labelledby="spaces-heading"
      >
        <div className={styles.spacesPhoto} data-drift>
          <Image
            src={businessImage}
            alt="Coffee First LED neon sign lighting a terracotta café wall above the counter"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
            placeholder="blur"
          />
          <span className={styles.photoTag}>The space sets the story.</span>
        </div>
        <div className={styles.spacesCopy} data-reveal>
          <span className={styles.sectionIndex} aria-hidden="true">02</span>
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

      {/* ── Interactive colour studio ─────────────────────────────────── */}
      <section
        className={styles.glowLab}
        id="color-studio"
        aria-labelledby="glow-lab-heading"
        data-glow-lab
      >
        <div className={styles.glowLabCopy} data-reveal>
          <p className={`${styles.kicker} ${styles.kickerLight}`}>
            Interactive colour studio
          </p>
          <h2 id="glow-lab-heading">
            See your neon sign
            <br />
            in <em>every shade.</em>
          </h2>
          <p>
            Preview our handcrafted LED neon colours on a real custom sign.
            Click any swatch — or hit{" "}
            <strong className={styles.glowStrong}>RGBA Party</strong> to watch
            it morph through every shade in real time.
          </p>
        </div>
        <StudioColorStudio />
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.process}`}
        id="custom"
        aria-labelledby="process-heading"
      >
        <div className={styles.processCopy} data-reveal>
          <span className={styles.sectionIndex} aria-hidden="true">04</span>
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
            <span
              className={styles.processLine}
              data-process-line
              aria-hidden="true"
            />
            <li data-step>
              <span>01</span>
              <div>
                <h3>Send us your idea</h3>
                <p>Share your wording, style and approximate size.</p>
              </div>
            </li>
            <li data-step>
              <span>02</span>
              <div>
                <h3>See it before it’s made</h3>
                <p>Review your free design preview and project quote.</p>
              </div>
            </li>
            <li data-step>
              <span>03</span>
              <div>
                <h3>Made for your space</h3>
                <p>Approve the details. We craft and ship your sign.</p>
              </div>
            </li>
          </ol>
          <span className={styles.magnetic} data-magnetic>
            <CustomQuoteButton
              className={styles.primary}
              label="Get my free design preview"
            />
          </span>
          <a className={styles.textLink} href="#color-studio">
            Try the interactive colour studio ↗
          </a>
        </div>
        <StudioWallPreview />
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────── */}
      {HAS_VERIFIED_REVIEWS && <StudioReviews />}

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
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
        <div className={styles.answerIntro} data-reveal>
          <span className={styles.sectionIndex} aria-hidden="true">05</span>
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
