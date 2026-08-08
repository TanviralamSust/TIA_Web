import { MediaImage } from './MediaImage'
import { Button } from './Button'
import { Container } from './Container'

export function Hero({
  bannerImage,
  heading,
  subheading,
}: {
  bannerImage: unknown
  heading: string
  subheading?: string | null
}) {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-forest-900">
      <div className="absolute inset-0">
        {bannerImage ? (
          <MediaImage
            media={bannerImage as never}
            size="hero"
            fallbackAlt={heading}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-900/60 to-forest-900/30" />
      </div>

      <Container className="relative py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
            Junior Kindergarten – Grade 8
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-cream-50 sm:text-5xl">
            {heading}
          </h1>
          {subheading && <p className="mt-6 text-lg text-cream-100">{subheading}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/admissions" variant="gold">
              Admissions
            </Button>
            <Button href="/academics" variant="outline">
              Academics
            </Button>
            <Button href="/donate" variant="outline">
              Donate
            </Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
