import Link from 'next/link'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Hero } from '@/components/Hero'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Prose } from '@/components/Prose'
import { ActivityCard } from '@/components/ActivityCard'
import { StaffCard } from '@/components/StaffCard'
import { Button } from '@/components/Button'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [homePage, activities, staff] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }),
    payload.find({
      collection: 'activities',
      where: { published: { equals: true } },
      sort: '-date',
      limit: 3,
    }),
    payload.find({
      collection: 'staff',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 4,
    }),
  ])

  return (
    <>
      <Hero
        bannerImage={homePage.bannerImage}
        heading={homePage.heading}
        subheading={homePage.subheading}
      />

      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <SectionHeading title={homePage.introHeading || 'Welcome to Toronto Islamic Academy'} center />
          <div className="mt-6 text-left">
            <Prose content={homePage.introText} />
          </div>
        </Container>
      </section>

      {activities.docs.length > 0 && (
        <section className="bg-forest-50 py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="School Life" title="Recent Activities" />
              <Link
                href="/activities"
                className="text-sm font-semibold text-forest-700 hover:text-gold-600"
              >
                View all activities →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activities.docs.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {staff.docs.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Our Team" title="Meet Our Staff" />
              <Link href="/staff" className="text-sm font-semibold text-forest-700 hover:text-gold-600">
                Meet the full team →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {staff.docs.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-forest-800 py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-cream-50">
            We&apos;re here to help you shape your future.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/admissions" variant="gold">
              Apply Today
            </Button>
            <Button href="/contact" variant="outline">
              Connect With Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
