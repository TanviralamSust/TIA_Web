import Image from 'next/image'

type MediaDoc = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null } | undefined>
} | null | undefined

export function MediaImage({
  media,
  size,
  fallbackAlt,
  className = '',
  fill = false,
  priority = false,
  sizes,
}: {
  media: MediaDoc | number | string
  size?: 'thumbnail' | 'card' | 'hero'
  fallbackAlt: string
  className?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
}) {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return null
  }

  const variant = size ? media.sizes?.[size] : undefined
  const url = variant?.url || media.url
  const width = variant?.width || media.width || 1200
  const height = variant?.height || media.height || 800

  if (!url) return null

  const alt = media.alt || fallbackAlt

  if (fill) {
    return <Image src={url} alt={alt} fill priority={priority} sizes={sizes} className={className} />
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}
