import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { ActivityCard } from '@/components/ActivityCard'

export const metadata: Metadata = {
  title: 'Recent Activities | Toronto Islamic Academy',
  description:
    'See recent activities and school life at Toronto Islamic Academy, including trips, events, and student achievements.',
}

export default async function ActivitiesPage() {
  const payload = await getPayloadClient()
  const activities = await payload.find({
    collection: 'activities',
    where: { published: { equals: true } },
    sort: '-date',
    limit: 100,
  })

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">
            Recent Activities
          </h1>
          <p className="mt-4 max-w-2xl text-cream-100">
            A look at school life at Toronto Islamic Academy &mdash; trips, events, classroom
            moments, and student achievements.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {activities.docs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activities.docs.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p className="text-center text-forest-600">
              No activities have been posted yet. Check back soon!
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
