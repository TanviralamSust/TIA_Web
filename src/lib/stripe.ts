import Stripe from 'stripe'

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key.includes('placeholder')) {
    return null
  }
  return new Stripe(key)
}
