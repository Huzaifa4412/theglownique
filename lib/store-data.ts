import type { StaticImageData } from 'next/image'

import homeImage from '../app/assets/hero/home.webp'
import weddingImage from '../app/assets/hero/wedding.webp'
import businessImage from '../app/assets/hero/business.webp'
import eventsImage from '../app/assets/hero/events.webp'
import gamingImage from '../app/assets/hero/gaming.webp'
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

export const heroSlides: HeroSlide[] = [
  {
    id: 'home',
    eyebrow: 'Glow at home',
    title: 'Good vibes, made visible.',
    copy: 'Turn everyday rooms into places that feel unmistakably yours.',
    image: homeImage,
    alt: 'Blush living room with a pink Good Vibes neon sign',
    accent: '#ff2f83',
  },
  {
    id: 'weddings',
    eyebrow: 'Made for your moment',
    title: 'A keepsake for the big day.',
    copy: 'Personalised wedding neon that lives on long after the last dance.',
    image: weddingImage,
    alt: 'Wedding floral arch with a warm white Better Together neon sign',
    accent: '#ff8f82',
  },
  {
    id: 'business',
    eyebrow: 'Put your name in lights',
    title: 'Make the room remember you.',
    copy: 'Branded neon for cafés, salons, studios, pop-ups and shop windows.',
    image: businessImage,
    alt: 'Boutique café with a coral Coffee First neon sign',
    accent: '#ff5d62',
  },
  {
    id: 'events',
    eyebrow: 'Set the mood',
    title: 'The party starts with a glow.',
    copy: 'Scene-stealing signs for birthdays, launches and celebrations.',
    image: eventsImage,
    alt: 'Pink party lounge with a magenta Let’s Party neon sign',
    accent: '#ff2f83',
  },
  {
    id: 'gaming',
    eyebrow: 'Level up the setup',
    title: 'Your space. Your rules.',
    copy: 'Electric icons and custom phrases built for late-night play.',
    image: gamingImage,
    alt: 'Dark gaming room with an electric blue neon controller',
    accent: '#3c7cff',
  },
  {
    id: 'custom',
    eyebrow: 'Your words, your way',
    title: 'If you can say it, we can glow it.',
    copy: 'Choose the words, colour and size. We will handle the craft.',
    image: customImage,
    alt: 'Creative studio with a green Your Idea neon sign',
    accent: '#59e879',
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    name: 'Coffee & Studio',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '28 × 16 in',
    rating: 4.8,
    reviews: 633,
    color: '#ff796c',
    background: 'linear-gradient(145deg, #6f2b21, #ca664d)',
    badge: '3D Metal Backlit',
    image: '/neon-sign/shop/iap_600x600.7162676105_56q8x34m.webp',
  },
  {
    id: 8,
    name: 'Boutique Storefront Lightbox',
    category: 'business',
    signType: 'Ultra Thin Lightbox',
    size: '30 × 12 in',
    rating: 4.9,
    reviews: 520,
    color: '#00dc5a',
    background: 'linear-gradient(145deg, #184a2d, #3ba868)',
    badge: 'Lightbox',
    image: '/neon-sign/shop/iap_600x600.8012839564_cc7lygzj.webp',
  },
  {
    id: 9,
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
    id: 10,
    name: 'The Speakeasy Lounge 3D',
    category: 'events',
    signType: '3D Metal Neon Sign',
    size: '32 × 16 in',
    rating: 4.9,
    reviews: 780,
    color: '#9b3cff',
    background: 'linear-gradient(145deg, #371457, #7835b3)',
    badge: 'Dual-Lit Metal',
    image: '/neon-sign/Bar/iap_600x600.7226399188_kdghrcbz.webp',
  },
  {
    id: 11,
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
    id: 12,
    name: 'Level Up Controller UV',
    category: 'gaming',
    signType: 'Acrylic UV Print Neon Sign',
    size: '28 × 14 in',
    rating: 4.9,
    reviews: 610,
    color: '#62daff',
    background: 'linear-gradient(145deg, #0f3747, #247d9e)',
    badge: 'UV Print + Neon',
    image: '/neon-sign/Game Room/iap_600x600.7098204330_6g78a964.webp',
  },
  {
    id: 13,
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
    id: 14,
    name: 'Executive Emblem 3D Metal',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '42 × 22 in',
    rating: 5.0,
    reviews: 512,
    color: '#ffc83b',
    background: 'linear-gradient(145deg, #3d300d, #856a1b)',
    badge: '3D Stainless Steel',
    image: '/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.png',
  },
  {
    id: 15,
    name: 'Glow Studio 3D Metallic',
    category: 'business',
    signType: '3D Metal Neon Sign',
    size: '38 × 18 in',
    rating: 4.9,
    reviews: 488,
    color: '#f40b68',
    background: 'linear-gradient(145deg, #4d0a25, #9c1b50)',
    badge: '3D Metal Halo',
    image: '/3d-metallic-neon-sign/Salon/generated/56ff8050-b84d-45b5-8284-3a40daf4fac2.png',
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
