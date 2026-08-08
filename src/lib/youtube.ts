export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
  )
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1]}`
}
