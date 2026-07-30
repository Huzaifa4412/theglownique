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
  size: string
  rating: number
  reviews: number
  color: string
  background: string
  badge?: string
  customizable?: boolean
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
    name: 'Good Vibes',
    category: 'home',
    size: '24 × 12 in',
    rating: 4.9,
    reviews: 1250,
    color: '#ff4a9a',
    background: 'linear-gradient(145deg, #4a1632, #d23372)',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Better Together',
    category: 'weddings',
    size: '34 × 14 in',
    rating: 4.9,
    reviews: 842,
    color: '#ffd7c5',
    background: 'linear-gradient(145deg, #8b4a43, #e6a086)',
    badge: 'Most loved',
  },
  {
    id: 3,
    name: 'Coffee First',
    category: 'business',
    size: '28 × 16 in',
    rating: 4.8,
    reviews: 633,
    color: '#ff796c',
    background: 'linear-gradient(145deg, #6f2b21, #ca664d)',
  },
  {
    id: 4,
    name: "Let's Party",
    category: 'events',
    size: '26 × 13 in',
    rating: 4.9,
    reviews: 1103,
    color: '#ff4bd3',
    background: 'linear-gradient(145deg, #5d153c, #c41a77)',
    badge: 'Party pick',
  },
  {
    id: 5,
    name: 'Game On',
    category: 'gaming',
    size: '30 × 15 in',
    rating: 4.8,
    reviews: 721,
    color: '#4c8dff',
    background: 'linear-gradient(145deg, #071831, #193f84)',
  },
  {
    id: 6,
    name: 'Palm Springs',
    category: 'home',
    size: '22 × 28 in',
    rating: 4.8,
    reviews: 506,
    color: '#63f78b',
    background: 'linear-gradient(145deg, #0b3428, #25734f)',
  },
  {
    id: 7,
    name: 'Open Late',
    category: 'business',
    size: '21 × 10 in',
    rating: 4.7,
    reviews: 388,
    color: '#ffd45b',
    background: 'linear-gradient(145deg, #4a2f17, #94632d)',
  },
  {
    id: 8,
    name: 'Your Words Here',
    category: 'custom',
    size: 'Custom sizing',
    rating: 5,
    reviews: 914,
    color: '#ff4a9a',
    background: 'linear-gradient(145deg, #283322, #376a44)',
    badge: 'Custom',
    customizable: true,
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
