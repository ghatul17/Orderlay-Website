import { z } from 'zod'

export const referralSignupSchema = z.object({
  restaurant_name: z.string().min(2, 'Restaurant name must be at least 2 characters').max(100),
  owner_name: z.string().min(2, 'Owner name must be at least 2 characters').max(100),
  owner_phone: z
    .string()
    .min(7, 'Invalid phone number')
    .max(20, 'Phone number too long')
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format'),
  owner_email: z.string().email('Invalid email').optional().or(z.literal('')),
  referral_code: z.string().min(1, 'Referral code is required').max(50),
})

export type ReferralSignupInput = z.infer<typeof referralSignupSchema>
