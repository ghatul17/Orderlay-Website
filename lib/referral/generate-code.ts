/**
 * Generates a unique referral code in the format OL-XXXXXX
 * e.g. OL-RAM4829
 */
export function generateReferralCode(name: string): string {
  const prefix = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 3)
    .padEnd(3, 'X')

  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `OL-${prefix}${suffix}`
}
