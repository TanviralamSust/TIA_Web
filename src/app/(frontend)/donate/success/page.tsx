import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export default function DonateSuccessPage() {
  return (
    <section className="py-24">
      <Container className="max-w-xl text-center">
        <h1 className="font-serif text-3xl font-bold text-forest-900">JazakAllah Khair!</h1>
        <p className="mt-4 text-forest-700">
          Your donation has been received. Thank you for supporting Toronto Islamic Academy and
          our students.
        </p>
        <div className="mt-8">
          <Button href="/">Return Home</Button>
        </div>
      </Container>
    </section>
  )
}
