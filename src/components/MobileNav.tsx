'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navLinks } from '@/lib/navLinks'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md text-cream-50"
      >
        <span
          className={`h-0.5 w-6 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span
          className={`h-0.5 w-6 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-forest-600 bg-forest-800 shadow-lg">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-forest-700 py-3 text-cream-100 last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gold-500 px-4 py-2 text-center font-semibold text-forest-950"
            >
              Apply Now
            </Link>
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="my-3 rounded-full border-2 border-cream-50 px-4 py-2 text-center font-semibold text-cream-50"
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
