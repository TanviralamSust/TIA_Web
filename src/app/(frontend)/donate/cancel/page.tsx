import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export default function DonateCancelPage() {
  return (
    <section className="py-24">
      <Container className="max-w-xl text-center">
        <h1 className="font-serif text-3xl font-bold text-forest-900">Donation Cancelled</h1>
        <p className="mt-4 text-forest-700">
          Your donation was not completed. No charge was made. Feel free to try again whenever
          you&apos;re ready.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/donate">Try Again</Button>
          <Button href="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Container>
    </section>
  )
}
