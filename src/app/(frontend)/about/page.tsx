import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Prose } from '@/components/Prose'
import { MediaImage } from '@/components/MediaImage'

export const metadata: Metadata = {
  title: 'About Us | Toronto Islamic Academy',
  description:
    'Learn about Toronto Islamic Academy\'s mission, vision, and Islamic educational approach.',
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const about = await payload.findGlobal({ slug: 'about-page' })

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">About Us</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <Prose content={about.intro} />
        </Container>
      </section>

      <section className="bg-forest-50 py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Purpose" title="Mission" />
            <div className="mt-4">
              <Prose content={about.mission} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Looking Ahead" title="Vision" />
            <div className="mt-4">
              <Prose content={about.vision} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Our Approach" title="Islamic Values & Educational Approach" />
          <div className="mt-6">
            <Prose content={about.islamicValues} />
          </div>
        </Container>
      </section>

      {about.principalMessage?.message && (
        <section className="bg-forest-50 py-16">
          <Container className="max-w-3xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
              <div className="flex items-center gap-4">
                {about.principalMessage.photo && typeof about.principalMessage.photo === 'object' && (
                  <MediaImage
                    media={about.principalMessage.photo}
                    size="thumbnail"
                    fallbackAlt={about.principalMessage.name || 'Principal'}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-serif text-lg font-bold text-forest-900">
                    {about.principalMessage.name}
                  </p>
                  <p className="text-sm text-gold-600">{about.principalMessage.role}</p>
                </div>
              </div>
              <div className="mt-6">
                <Prose content={about.principalMessage.message} />
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
