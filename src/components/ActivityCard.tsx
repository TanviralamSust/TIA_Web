import Link from 'next/link'
import { MediaImage } from './MediaImage'

type Activity = {
  slug: string
  title: string
  date: string
  excerpt?: string | null
  mainPhoto: unknown
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const formattedDate = new Date(activity.date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-100">
        <MediaImage
          media={activity.mainPhoto as never}
          size="card"
          fallbackAlt={activity.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
          {formattedDate}
        </p>
        <h3 className="mt-1 font-serif text-lg font-bold text-forest-900">{activity.title}</h3>
        {activity.excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-forest-700">{activity.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-forest-700 group-hover:text-gold-600">
          Read more →
        </span>
      </div>
    </Link>
  )
}
