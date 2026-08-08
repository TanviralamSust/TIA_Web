import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { StaffCard } from '@/components/StaffCard'

export const metadata: Metadata = {
  title: 'Our Staff | Toronto Islamic Academy',
  description: 'Meet the dedicated staff and educators at Toronto Islamic Academy.',
}

export default async function StaffPage() {
  const payload = await getPayloadClient()
  const staff = await payload.find({
    collection: 'staff',
    where: { published: { equals: true } },
    sort: 'order',
    limit: 100,
  })

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">Our Staff</h1>
          <p className="mt-4 max-w-2xl text-cream-100">
            Meet the dedicated educators and administrators who make Toronto Islamic Academy a
            nurturing place to learn and grow.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {staff.docs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {staff.docs.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-center text-forest-600">Staff information coming soon.</p>
          )}
        </Container>
      </section>
    </>
  )
}
