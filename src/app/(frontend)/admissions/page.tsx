import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Prose } from '@/components/Prose'
import { AdmissionForm } from './AdmissionForm'

export const metadata: Metadata = {
  title: 'Admissions | Toronto Islamic Academy',
  description:
    'Learn about admission requirements, required documents, and how to apply to Toronto Islamic Academy for JK through Grade 8.',
}

export default async function AdmissionsPage() {
  const payload = await getPayloadClient()
  const admissions = await payload.findGlobal({ slug: 'admissions-page' })

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">Admissions</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            {admissions.overview && (
              <div>
                <SectionHeading eyebrow="Get Started" title="Admission Overview" />
                <div className="mt-4">
                  <Prose content={admissions.overview} />
                </div>
              </div>
            )}

            {admissions.programsOffered && admissions.programsOffered.length > 0 && (
              <div>
                <SectionHeading title="Grades & Programs Offered" />
                <ul className="mt-4 space-y-3">
                  {admissions.programsOffered.map((program, i) => (
                    <li key={i} className="rounded-lg border border-forest-100 p-4">
                      <p className="font-semibold text-forest-900">{program.name}</p>
                      {program.description && (
                        <p className="mt-1 text-sm text-forest-700">{program.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {admissions.requirements && (
              <div>
                <SectionHeading title="Admission Requirements" />
                <div className="mt-4">
                  <Prose content={admissions.requirements} />
                </div>
              </div>
            )}

            {admissions.requiredDocuments && admissions.requiredDocuments.length > 0 && (
              <div>
                <SectionHeading title="Required Documents" />
                <ul className="mt-4 list-disc space-y-2 pl-5 text-forest-800">
                  {admissions.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {admissions.tuitionInfo && (
              <div>
                <SectionHeading title="Tuition Information" />
                <div className="mt-4">
                  <Prose content={admissions.tuitionInfo} />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-8 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
              <SectionHeading eyebrow="Apply Now" title="Admission Inquiry" />
              <p className="mt-3 text-sm text-forest-600">
                Fill out the form below and our admissions team will reach out to guide you
                through the next steps.
              </p>
              <div className="mt-6">
                <AdmissionForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
