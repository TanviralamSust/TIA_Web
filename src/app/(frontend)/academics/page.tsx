import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export const metadata: Metadata = {
  title: 'Academics | Toronto Islamic Academy',
  description:
    'Explore our Ontario curriculum, Quran studies, Islamic studies, and Arabic language programs from JK through Grade 8.',
}

export default async function AcademicsPage() {
  const payload = await getPayloadClient()
  const academics = await payload.findGlobal({ slug: 'academics-page' })

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">Academics</h1>
        </Container>
      </section>

      {academics.intro && (
        <section className="py-16">
          <Container className="max-w-3xl">
            <Prose content={academics.intro} />
          </Container>
        </section>
      )}

      {academics.sections && academics.sections.length > 0 && (
        <section className={academics.intro ? 'bg-forest-50 py-16' : 'py-16'}>
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              {academics.sections.map((section, i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-forest-900">{section.title}</h2>
                  <div className="mt-3">
                    <Prose content={section.description} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
