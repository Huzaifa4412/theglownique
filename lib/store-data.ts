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
    description: 'Vivid LED flexible silicone neon tubing with acrylic backing',
  },
  {
    id: '3D Metal Neon Sign',
    label: '3D Metal Neon Sign',
    description: '3D fabricated metal channel lettering (Frontlit, Backlit, or Dual-Lit)',
  },
  {
    id: 'Ultra Thin Lightbox',
    label: 'Ultra Thin Lightbox',
    description: 'Sleek aluminum frame with uniform edge-lit LED face',
  },
  {
    id: 'Acrylic UV Print Neon Sign',
    label: 'Acrylic UV Print Neon Sign',
    description: 'Precision UV printed artwork combined with glowing neon contours',
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
  rating: number
  reviews: number
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
    copy: 'Flexible silicone LED neon tubing with crystal-clear acrylic backing.',
    image: homeImage,
    alt: 'Pink neon sign glowing in a dark room',
    accent: '#ff2f83',
  },
  {
    id: 'business',
    eyebrow: '2. 3D Metal Neon Sign',
    title: 'Architectural 3D Channel Lettering.',
    copy: 'Fabricated stainless steel letters with Frontlit, Backlit, and Dual-Lit LED illumination.',
    image: businessImage,
    alt: 'Corporate 3D Metallic Channel Lettering Sign',
    accent: '#ffaa33',
  },
  {
    id: 'custom',
    eyebrow: '3. Acrylic UV Print Neon',
    title: 'High-Definition UV Artwork + Neon.',
    copy: 'Photographic UV printing onto premium acrylic with glowing LED neon contours.',
    image: customImage,
    alt: '3D Acrylic UV Print Neon Sign with contour glow',
    accent: '#6d26ff',
  },
  {
    id: 'weddings',
    eyebrow: '4. Ultra Thin Slim Lightbox',
    title: 'Client Concept to Glowing Lightbox.',
    copy: 'See how we transform client sketches into precision 100% uniform edge-lit ultra thin lightboxes.',
    image: weddingImage,
    alt: 'Client Concept vs TheGlownique Ultra Thin Slim Lightbox',
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
    rating: 4.9,
    reviews: 1250,
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
    rating: 5.0,
    reviews: 940,
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
    rating: 5.0,
    reviews: 820,
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
    rating: 4.9,
    reviews: 670,
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
    rating: 4.9,
    reviews: 842,
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
    rating: 4.9,
    reviews: 580,
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
    rating: 4.9,
    reviews: 715,
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
    rating: 5.0,
    reviews: 510,
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
    rating: 4.8,
    reviews: 490,
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
    rating: 5.0,
    reviews: 412,
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
    rating: 4.9,
    reviews: 630,
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
    rating: 4.9,
    reviews: 1103,
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
    rating: 4.8,
    reviews: 721,
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
    rating: 5.0,
    reviews: 620,
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
    rating: 4.9,
    reviews: 890,
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
    rating: 5.0,
    reviews: 914,
    color: '#ff4a9a',
    background: 'linear-gradient(145deg, #283322, #376a44)',
    badge: 'Custom',
    customizable: true,
    image: '/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'The glow is rich, the finish is immaculate, and it changed the whole room in seconds.',
    name: 'Jessica M.',
    role: 'Boutique owner',
    initials: 'JM',
  },
  {
    quote:
      'The preview made ordering so easy. It arrived safely and became the centre of our wedding.',
    name: 'Daniel K.',
    role: 'Verified buyer',
    initials: 'DK',
  },
  {
    quote:
      'Exactly what I pictured, only brighter. The colour is beautiful even when the sign is off.',
    name: 'Sarah T.',
    role: 'Interior stylist',
    initials: 'ST',
  },
]
