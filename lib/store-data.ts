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
    name: 'Better Together',
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
    id: 3,
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
    id: 4,
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
    id: 5,
    name: 'Boutique Storefront',
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
    id: 6,
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
    id: 7,
    name: 'The Speakeasy Lounge',
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
    id: 8,
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
    id: 9,
    name: 'Level Up Controller',
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
    id: 10,
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
    id: 11,
    name: 'Hustle Fitness Studio',
    category: 'business',
    signType: 'Neon Sign',
    size: '32 × 16 in',
    rating: 4.8,
    reviews: 475,
    color: '#ffdd00',
    background: 'linear-gradient(145deg, #473a0c, #9c8223)',
    badge: 'Fitness',
    image: '/neon-sign/Gym/iap_600x600.7571300006_i4rdiuk4.webp',
  },
  {
    id: 12,
    name: 'Stay Cozy Bedroom',
    category: 'home',
    signType: 'Neon Sign',
    size: '22 × 28 in',
    rating: 4.8,
    reviews: 506,
    color: '#ffaad2',
    background: 'linear-gradient(145deg, #4f283b, #a6587e)',
    image: '/neon-sign/girls room/iap_600x600.7552798476_ngboezmi.webp',
  },
  {
    id: 13,
    name: 'Gamer Cave Setup',
    category: 'home',
    signType: 'Neon Sign',
    size: '24 × 16 in',
    rating: 4.9,
    reviews: 680,
    color: '#00dc5a',
    background: 'linear-gradient(145deg, #123d21, #2f8c4e)',
    image: '/neon-sign/Boys room/iap_600x600.8171132106_tw1ledca.webp',
  },
  {
    id: 14,
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
