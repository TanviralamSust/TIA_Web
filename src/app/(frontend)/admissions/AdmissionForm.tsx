'use client'

import { useState, type FormEvent } from 'react'
import { submitAdmissionInquiry } from './actions'

const inputClasses =
  'w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 text-forest-900 placeholder:text-forest-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500'

export function AdmissionForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const result = await submitAdmissionInquiry({
      parentName: String(formData.get('parentName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      studentName: String(formData.get('studentName') || ''),
      studentAge: String(formData.get('studentAge') || ''),
      gradeApplyingFor: String(formData.get('gradeApplyingFor') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
    })

    if (result.success) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
      setError(result.error || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-forest-100 p-6 text-forest-800">
        <p className="font-semibold">Thank you for your inquiry!</p>
        <p className="mt-1 text-sm">
          Our admissions team has received your submission and will be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="admission-website">Website</label>
        <input type="text" id="admission-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="mb-1 block text-sm font-medium text-forest-800">
            Parent/Guardian Name *
          </label>
          <input id="parentName" name="parentName" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-forest-800">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-forest-800">
            Phone *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="studentName" className="mb-1 block text-sm font-medium text-forest-800">
            Student Name *
          </label>
          <input id="studentName" name="studentName" type="text" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="studentAge" className="mb-1 block text-sm font-medium text-forest-800">
            Student Age / Current Grade *
          </label>
          <input id="studentAge" name="studentAge" type="text" required className={inputClasses} />
        </div>
        <div>
          <label
            htmlFor="gradeApplyingFor"
            className="mb-1 block text-sm font-medium text-forest-800"
          >
            Grade Applying For *
          </label>
          <input
            id="gradeApplyingFor"
            name="gradeApplyingFor"
            type="text"
            required
            placeholder="e.g. Junior Kindergarten, Grade 3"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-forest-800">
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-600 disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
