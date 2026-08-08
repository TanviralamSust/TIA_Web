import Link from 'next/link'
import { type ReactNode } from 'react'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'gold' | 'outline'
  className?: string
}

const variants = {
  primary: 'bg-forest-700 text-cream-50 hover:bg-forest-800',
  secondary: 'bg-cream-100 text-forest-800 hover:bg-cream-200',
  gold: 'bg-gold-500 text-forest-950 hover:bg-gold-600',
  outline: 'border-2 border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-forest-800',
}

export function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
