export function SectionHeading({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow?: string
  title: string
  center?: boolean
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-forest-900 sm:text-4xl">{title}</h2>
    </div>
  )
}
