import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Toronto Islamic Academy',
  description: 'Get in touch with Toronto Islamic Academy. Find our address, phone, email, and office hours.',
}

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const [contact, settings] = await Promise.all([
    payload.findGlobal({ slug: 'contact-page' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  return (
    <>
      <section className="bg-forest-800 py-16">
        <Container>
          <h1 className="font-serif text-4xl font-bold text-cream-50 sm:text-5xl">Contact Us</h1>
          {contact.intro && <p className="mt-4 max-w-2xl text-cream-100">{contact.intro}</p>}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Send a Message" title="Get In Touch" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Visit or Call" title="School Information" />
            <ul className="mt-6 space-y-4 text-forest-800">
              <li>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Address</p>
                <p className="mt-1">{settings.address}</p>
              </li>
              <li>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Phone</p>
                <a href={`tel:${settings.phone}`} className="mt-1 block hover:text-forest-600">
                  {settings.phone}
                </a>
              </li>
              <li>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Email</p>
                <a href={`mailto:${settings.email}`} className="mt-1 block hover:text-forest-600">
                  {settings.email}
                </a>
              </li>
              {settings.officeHours && (
                <li>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                    Office Hours
                  </p>
                  <p className="mt-1">{settings.officeHours}</p>
                </li>
              )}
              {(settings.social?.instagram || settings.social?.facebook || settings.social?.youtube) && (
                <li>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Follow Us</p>
                  <div className="mt-2 flex gap-4">
                    {settings.social?.instagram && (
                      <a
                        href={settings.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-forest-600"
                      >
                        Instagram
                      </a>
                    )}
                    {settings.social?.facebook && (
                      <a
                        href={settings.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-forest-600"
                      >
                        Facebook
                      </a>
                    )}
                    {settings.social?.youtube && (
                      <a
                        href={settings.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-forest-600"
                      >
                        YouTube
                      </a>
                    )}
                  </div>
                </li>
              )}
            </ul>

            {contact.mapEmbedUrl && (
              <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-forest-100">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School location map"
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
