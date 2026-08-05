import type { StaticImageData } from 'next/image'

import homeImage from '../app/assets/hero/home.webp'
import weddingImage from '../app/assets/hero/wedding.webp'
import businessImage from '../app/assets/hero/business.webp'
import customImage from '../app/assets/hero/custom.webp'

export type CategoryId =
  | 'home'
  | 'weddings'
  | 'business'
  | 'events'
  | 'gaming'
  | 'custom'

export type SignType =
  | 'Neon Sign'
  | '3D Metal Neon Sign'
  | 'Ultra Thin Lightbox'
  | 'Acrylic UV Print Neon Sign'

export const SIGN_TYPES: { id: SignType; label: string; description: string }[] = [
  {
    id: 'Neon Sign',
    label: 'Neon Sign',
    description: 'Flexible LED silicone neon tubing on clear, laser-cut acrylic',
  },
  {
    id: '3D Metal Neon Sign',
    label: '3D Metal Neon Sign',
    description: 'Stainless-steel channel letters — frontlit, halo backlit or dual-lit',
  },
  {
    id: 'Ultra Thin Lightbox',
    label: 'Ultra Thin Lightbox',
    description: 'Slim edge-lit aluminium lightbox with even, shadow-free light',
  },
  {
    id: 'Acrylic UV Print Neon Sign',
    label: 'Acrylic UV Print Neon Sign',
    description: 'Full-colour UV-printed acrylic traced with glowing LED neon contours',
  },
]

export type HeroSlide = {
  id: CategoryId
  eyebrow: string
  title: string
  copy: string
  image: StaticImageData
  alt: string
  accent: string
}

export type Product = {
  id: number
  name: string
  category: CategoryId
  signType?: SignType
  size: string
  color: string
  background: string
  badge?: string
  customizable?: boolean
  image?: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  /** 1–5, only from a real review. Omit if unknown — never default it. */
  stars?: number
  /** True only for reviews traceable to a real order (e.g. an Etsy purchase). */
  verified?: boolean
}

export const categoryLabels: Record<CategoryId, string> = {
  home: 'For Home',
  weddings: 'Weddings',
  business: 'For Business',
  events: 'Events',
  gaming: 'Gaming',
  custom: 'Create Your Own',
}

// Exactly 4 Hero Slides for the 4 Product Sign Types
export const heroSlides: HeroSlide[] = [
  {
    id: 'home',
    eyebrow: '1. LED Neon Sign',
    title: 'Good vibes, made visible in light.',
    copy: 'Handcrafted flexible silicone LED neon on crystal-clear acrylic — safe, and made to your words.',
    image: homeImage,
    alt: 'Pink custom LED neon sign glowing on a dark bedroom wall',
    accent: '#ff2f83',
  },
  {
    id: 'business',
    eyebrow: '2. 3D Metal Neon Sign',
    title: 'Architectural 3D channel lettering.',
    copy: 'Fabricated stainless-steel channel letters with frontlit, halo backlit and dual-lit LED.',
    image: businessImage,
    alt: 'Corporate 3D metal channel-letter sign with illuminated lettering',
    accent: '#ffaa33',
  },
  {
    id: 'events',
    eyebrow: '3. Acrylic UV Print Neon',
    title: 'Custom art & branding in glow.',
    copy: 'Full-colour UV printing on premium acrylic, traced with glowing LED neon contours.',
    image: weddingImage,
    alt: '3D acrylic UV-print neon sign with a glowing contour outline',
    accent: '#6d26ff',
  },
  {
    id: 'custom',
    eyebrow: '4. Ultra Thin Slim Lightbox',
    title: 'Client concept to glowing lightbox.',
    copy: 'See how we turn client sketches into precision edge-lit, ultra-thin lightboxes with 100% even light.',
    image: customImage,
    alt: 'Client concept sketch beside a finished ultra-thin slim LED lightbox',
    accent: '#00dc5a',
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Good Vibes Only',
    category: 'home',
    signType: 'Neon Sign',
    size: '24 × 12 in',
    color: '#ff4a9a',
    background: 'linear-gradient(145deg, #4a1632, #d23372)',
    badge: 'Bestseller',
    image: '/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp',
  },
  {
    id: 2,
    name: 'Corporate HQ 3D Metal Sign',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '48 × 24 in',
    color: '#e6c875',
    background: 'linear-gradient(145deg, #2b2512, #6b5722)',
    badge: '3D Metal Frontlit',
    image: '/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png',
  },
  {
    id: 3,
    name: 'Ultra Thin Slim Lightbox Sign',
    category: 'business',
    signType: 'Ultra Thin Lightbox',
    size: '36 × 24 in',
    color: '#00dc5a',
    background: 'linear-gradient(145deg, #103b22, #298a52)',
    badge: 'Ultra Thin Lightbox',
    image: '/ultra-thin-slim-lightbox/IMG-20260803-WA0004.jpg',
  },
  {
    id: 4,
    name: '3D Acrylic UV Contour Sign',
    category: 'business',
    signType: 'Acrylic UV Print Neon Sign',
    size: '32 × 18 in',
    color: '#00e5ff',
    background: 'linear-gradient(145deg, #09333d, #14738a)',
    badge: 'UV Print + Neon',
    image: '/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png',
  },
  {
    id: 5,
    name: 'Better Together Wedding',
    category: 'weddings',
    signType: 'Neon Sign',
    size: '34 × 14 in',
    color: '#ffd7c5',
    background: 'linear-gradient(145deg, #8b4a43, #e6a086)',
    badge: 'Most loved',
    image: '/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp',
  },
  {
    id: 6,
    name: 'Edge-Lit Anodized Lightbox',
    category: 'business',
    signType: 'Ultra Thin Lightbox',
    size: '40 × 20 in',
    color: '#ffc83b',
    background: 'linear-gradient(145deg, #3d300d, #856a1b)',
    badge: 'Edge-Lit LED',
    image: '/ultra-thin-slim-lightbox/IMG-20260803-WA0006.jpg',
  },
  {
    id: 7,
    name: 'Luxury Salon 3D Metallic',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '36 × 18 in',
    color: '#ff79c6',
    background: 'linear-gradient(145deg, #421633, #8c326c)',
    badge: '3D Halo Backlit',
    image: '/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.png',
  },
  {
    id: 8,
    name: '3D Layered Acrylic Studio',
    category: 'business',
    signType: 'Acrylic UV Print Neon Sign',
    size: '30 × 20 in',
    color: '#ff3b9a',
    background: 'linear-gradient(145deg, #42102b, #8a235c)',
    badge: '3D Acrylic Art',
    image: '/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png',
  },
  {
    id: 9,
    name: 'Retail Matrix Slim Lightbox',
    category: 'business',
    signType: 'Ultra Thin Lightbox',
    size: '32 × 16 in',
    color: '#62daff',
    background: 'linear-gradient(145deg, #0f3747, #247d9e)',
    badge: 'Slim Lightbox',
    image: '/ultra-thin-slim-lightbox/IMG-20260803-WA0008.jpg',
  },
  {
    id: 10,
    name: 'Happily Ever After',
    category: 'weddings',
    signType: 'Acrylic UV Print Neon Sign',
    size: '36 × 18 in',
    color: '#fff0f5',
    background: 'linear-gradient(145deg, #5c2c43, #b8628b)',
    badge: 'Wedding favorite',
    image: '/neon-sign/Marriage/iap_600x600.7378705048_ipwhq76b.webp',
  },
  {
    id: 11,
    name: 'Artisan Bistro 3D Metal',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '40 × 20 in',
    color: '#ffaa33',
    background: 'linear-gradient(145deg, #3d2507, #855315)',
    badge: '3D Dual-Lit',
    image: '/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.png',
  },
  {
    id: 12,
    name: "Let's Party Cocktails",
    category: 'events',
    signType: 'Neon Sign',
    size: '26 × 13 in',
    color: '#ff4bd3',
    background: 'linear-gradient(145deg, #5d153c, #c41a77)',
    badge: 'Party pick',
    image: '/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp',
  },
  {
    id: 13,
    name: 'Game On Arcade',
    category: 'gaming',
    signType: 'Neon Sign',
    size: '30 × 15 in',
    color: '#4c8dff',
    background: 'linear-gradient(145deg, #071831, #193f84)',
    badge: 'Gaming',
    image: '/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp',
  },
  {
    id: 14,
    name: 'Storefront Lightbox Display',
    category: 'business',
    signType: 'Ultra Thin Lightbox',
    size: '48 × 24 in',
    color: '#ff3d8d',
    background: 'linear-gradient(145deg, #4d0a25, #9c1b50)',
    badge: 'Storefront Lightbox',
    image: '/ultra-thin-slim-lightbox/IMG-20260803-WA0010.jpg',
  },
  {
    id: 15,
    name: 'No Pain No Gain Gym',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '36 × 14 in',
    color: '#ff2020',
    background: 'linear-gradient(145deg, #421010, #962525)',
    badge: 'Frontlit Metal',
    image: '/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp',
  },
  {
    id: 16,
    name: 'Your Custom Name Sign',
    category: 'custom',
    signType: 'Neon Sign',
    size: 'Custom sizing',
    color: '#ff4a9a',
    background: 'linear-gradient(145deg, #283322, #376a44)',
    badge: 'Custom',
    customizable: true,
    image: '/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp',
  },
]

/**
 * REAL reviews, transcribed verbatim from the public Etsy shop
 * (https://www.etsy.com/shop/TheGlownique/reviews) on 2026-08-05, where the
 * shop stood at 5.0 from 8 reviews. Names are the reviewers' own Etsy display
 * names, already public on that page.
 *
 * ⚠️  These are displayed as visible social proof ONLY — deliberately NOT
 * marked up with Review/AggregateRating structured data. Google's review
 * snippet guidelines prohibit both relevant cases:
 *   1. "If the entity that's being reviewed controls the reviews about itself,
 *      their pages that use LocalBusiness or any other type of Organization
 *      structured data are ineligible for star review feature."
 *   2. "Don't aggregate reviews or ratings from other websites."
 * Adding AggregateRating here would breach both and risks a structured-data
 * manual action. Showing the quotes and linking to Etsy to verify them is
 * compliant, and more persuasive anyway.
 *
 * Only edit this list by copying real review text. Never invent an entry.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Ordered a custom LED sign for my teenage son for Christmas. Item arrived very well packaged and very quickly and was exactly what my son was looking for. He loves it.',
    name: 'Lindsay',
    role: 'Verified Etsy buyer · Dec 2025',
    initials: 'L',
    stars: 5,
    verified: true,
  },
  {
    quote:
      "I'm honestly so impressed with this sign! The quality is way better than I expected — it's bright, sturdy, and looks amazing in my space. The seller was super helpful and quick to answer my questions, and the mockup they sent made it easy to picture before ordering. Everyone who comes over keeps complimenting it.",
    name: 'saad',
    role: 'Verified Etsy buyer · Oct 2025',
    initials: 'S',
    stars: 5,
    verified: true,
  },
  {
    quote:
      "I'm so happy with my custom neon sign! The quality is amazing, colors are bright, and it looks even better in person. Shipping was fast and the packaging kept it safe. Seller was super helpful with mockups and quick replies. It adds such a cozy vibe to my room—highly recommend!",
    name: 'mughal',
    role: 'Verified Etsy buyer · Sep 2025',
    initials: 'M',
    stars: 5,
    verified: true,
  },
  {
    quote:
      'Super fast shipping and amazing support—my sign turned out perfect!',
    name: 'Khizar',
    role: 'Verified Etsy buyer · Sep 2025',
    initials: 'K',
    stars: 5,
    verified: true,
  },
  {
    quote:
      'The sign looks even better in person, super vibrant and well-made. What really surprised me was the delivery — it came way faster than I expected! Great quality, perfect gift, and excellent service. Highly recommend.',
    name: 'Khalid',
    role: 'Verified Etsy buyer · Jul 2025',
    initials: 'K',
    stars: 5,
    verified: true,
  },
]
