import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { getYouTubeEmbedUrl } from '@/lib/youtube'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { MediaImage } from '@/components/MediaImage'

type Args = {
  params: Promise<{ slug: string }>
}

async function getActivity(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'activities',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivity(slug)
  if (!activity) return {}
  return {
    title: `${activity.title} | Toronto Islamic Academy`,
    description: activity.excerpt || undefined,
  }
}

export default async function ActivityDetailPage({ params }: Args) {
  const { slug } = await params
  const activity = await getActivity(slug)

  if (!activity) notFound()

  const formattedDate = new Date(activity.date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const embedUrl = activity.youtubeUrl ? getYouTubeEmbedUrl(activity.youtubeUrl) : null

  return (
    <>
      <section className="relative flex min-h-[360px] items-end overflow-hidden bg-forest-900">
        <div className="absolute inset-0">
          <MediaImage
            media={activity.mainPhoto}
            size="hero"
            fallbackAlt={activity.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 to-forest-900/30" />
        </div>
        <Container className="relative py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {formattedDate}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-cream-50 sm:text-4xl">
            {activity.title}
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          {activity.excerpt && (
            <p className="text-lg text-forest-700">{activity.excerpt}</p>
          )}

          <div className="mt-6">
            <Prose content={activity.body} />
          </div>

          {embedUrl && (
            <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                title={`${activity.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {activity.gallery && activity.gallery.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-forest-900">Photos</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {activity.gallery.map((item, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-xl bg-forest-100"
                  >
                    <MediaImage
                      media={item.photo}
                      size="card"
                      fallbackAlt={`${activity.title} photo ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
