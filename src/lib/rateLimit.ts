// Simple in-memory rate limiter for public form submissions.
// Good enough for a low-traffic school site; resets on server restart.
const submissions = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_PER_WINDOW) {
    submissions.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  submissions.set(ip, timestamps)
  return false
}
