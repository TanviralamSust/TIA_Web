'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { isRateLimited } from '@/lib/rateLimit'

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContactForm(data: {
  name: string
  email: string
  phone: string
  message: string
  website: string // honeypot
}): Promise<ContactFormState> {
  // Honeypot: bots fill every field, humans never see this one.
  if (data.website) {
    return { success: true }
  }

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: 'Please fill in your name, email, and message.' }
  }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'

  if (isRateLimited(ip)) {
    return { success: false, error: 'Too many submissions. Please try again later.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
      overrideAccess: true,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to save contact submission:', error)
    return { success: false, error: 'Something went wrong. Please try again or call us directly.' }
  }
}
