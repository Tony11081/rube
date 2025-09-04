import Studio from './Studio'

// Ensures the Studio route is dynamically rendered
export const dynamic = 'force-dynamic'

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}