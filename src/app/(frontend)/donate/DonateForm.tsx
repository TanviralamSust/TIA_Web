'use client'

import { useState } from 'react'

export function DonateForm({ suggestedAmounts }: { suggestedAmounts: number[] }) {
  const [selected, setSelected] = useState<number | null>(suggestedAmounts[0] ?? null)
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amount = customAmount ? Number(customAmount) : selected

  async function handleDonate() {
    if (!amount || amount <= 0) {
      setError('Please select or enter a donation amount.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
        One-Time Donation
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestedAmounts.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setSelected(value)
              setCustomAmount('')
            }}
            className={`rounded-lg border-2 px-4 py-3 text-center font-semibold transition-colors ${
              selected === value && !customAmount
                ? 'border-forest-700 bg-forest-700 text-cream-50'
                : 'border-forest-200 text-forest-800 hover:border-forest-400'
            }`}
          >
            ${value}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="customAmount" className="mb-1 block text-sm font-medium text-forest-800">
          Or enter a custom amount (CAD)
        </label>
        <input
          id="customAmount"
          type="number"
          min={1}
          step="1"
          placeholder="$"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value)
            setSelected(null)
          }}
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 text-forest-900 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleDonate}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {loading ? 'Redirecting to secure checkout...' : `Donate${amount ? ` $${amount}` : ''}`}
      </button>
      <p className="mt-3 text-center text-xs text-forest-500">
        Payments are securely processed by Stripe. We never store your card details.
      </p>
    </div>
  )
}
