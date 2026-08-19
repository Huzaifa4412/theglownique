import type { Metadata } from 'next'
import { NextStudio } from 'next-sanity/studio'
import { metadata as studioMetadata, viewport } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Sanity Studio | The Glownique',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export { viewport }

export default function StudioPage() {
  return <NextStudio config={config} />
}
