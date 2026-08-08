import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function Prose({
  content,
  className = '',
}: {
  content: SerializedEditorState | null | undefined
  className?: string
}) {
  if (!content) return null

  return (
    <div
      className={`prose max-w-none prose-headings:font-serif prose-headings:text-forest-900 prose-a:text-forest-700 prose-a:underline-offset-2 ${className}`}
    >
      <RichText data={content} />
    </div>
  )
}
