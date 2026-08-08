import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { DonateForm } from './DonateForm'

export const metadata: Metadata = {
  title: 'Donate | Toronto Islamic Academy',
  description: 'Support Toronto Islamic Academy with a one-time donation.',
}

export default async function DonatePage() {
  const payload = await getPayloadClient()
  const donate = await payload.findGlobal({ slug: 'donate-page' })

  const suggestedAmounts = (donate.suggestedAmounts || [])
    .map((item) => item.amount)
    .filter((v): v is number => typeof v === 'number')

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">Donate</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            {donate.intro && <Prose content={donate.intro} />}

            {donate.etransferInstructions && (
              <div className="mt-10 rounded-2xl bg-forest-50 p-6">
                <h2 className="font-serif text-xl font-bold text-forest-900">
                  E-Transfer Instructions
                </h2>
                <div className="mt-3">
                  <Prose content={donate.etransferInstructions} />
                </div>
              </div>
            )}
          </div>

          <div>
            <DonateForm suggestedAmounts={suggestedAmounts.length > 0 ? suggestedAmounts : [25, 50, 100, 250]} />
          </div>
        </Container>
      </section>
    </>
  )
}
