'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { isRateLimited } from '@/lib/rateLimit'

export type AdmissionFormState = {
  success: boolean
  error?: string
}

export async function submitAdmissionInquiry(data: {
  parentName: string
  email: string
  phone: string
  studentName: string
  studentAge: string
  gradeApplyingFor: string
  message: string
  website: string // honeypot
}): Promise<AdmissionFormState> {
  if (data.website) {
    return { success: true }
  }

  if (
    !data.parentName ||
    !data.email ||
    !data.phone ||
    !data.studentName ||
    !data.studentAge ||
    !data.gradeApplyingFor
  ) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'

  if (isRateLimited(ip)) {
    return { success: false, error: 'Too many submissions. Please try again later.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'admission-inquiries',
      data: {
        parentName: data.parentName,
        email: data.email,
        phone: data.phone,
        studentName: data.studentName,
        studentAge: data.studentAge,
        gradeApplyingFor: data.gradeApplyingFor,
        message: data.message,
      },
      overrideAccess: true,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to save admission inquiry:', error)
    return { success: false, error: 'Something went wrong. Please try again or call us directly.' }
  }
}
