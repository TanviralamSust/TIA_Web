import Link from 'next/link'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { Container } from './Container'
import { MediaImage } from './MediaImage'
import { MobileNav } from './MobileNav'
import { navLinks } from '@/lib/navLinks'

export async function Header() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <header className="relative z-50 bg-forest-800">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-cream-50">
          {settings.logo && typeof settings.logo === 'object' ? (
            <MediaImage
              media={settings.logo}
              size="thumbnail"
              fallbackAlt={settings.schoolName}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-cream-100" />
          )}
          <span className="hidden font-serif text-lg font-bold leading-tight sm:block">
            {settings.schoolName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream-100 transition-colors hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admissions"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-600"
          >
            Apply Now
          </Link>
          <Link
            href="/donate"
            className="rounded-full border-2 border-cream-50 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50 hover:text-forest-800"
          >
            Donate
          </Link>
        </div>

        <MobileNav />
      </Container>
    </header>
  )
}
