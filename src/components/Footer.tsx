import Link from 'next/link'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from './Container'
import { navLinks } from '@/lib/navLinks'

export async function Footer() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <footer className="bg-forest-950 text-cream-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-cream-50">{settings.schoolName}</h3>
          <p className="mt-2 text-sm text-cream-200">{settings.footerNote}</p>
          <div className="mt-4 flex gap-4">
            {settings.social?.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cream-100 hover:text-gold-400"
              >
                Instagram
              </a>
            )}
            {settings.social?.facebook && (
              <a
                href={settings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cream-100 hover:text-gold-400"
              >
                Facebook
              </a>
            )}
            {settings.social?.youtube && (
              <a
                href={settings.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cream-100 hover:text-gold-400"
              >
                YouTube
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream-200 hover:text-cream-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream-200">
            <li>{settings.address}</li>
            <li>
              <a href={`tel:${settings.phone}`} className="hover:text-cream-50">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-cream-50">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-400">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-cream-200 hover:text-cream-50">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-forest-800 py-6 text-center text-xs text-cream-300">
        © {new Date().getFullYear()} {settings.schoolName}. All rights reserved.
      </div>
    </footer>
  )
}
