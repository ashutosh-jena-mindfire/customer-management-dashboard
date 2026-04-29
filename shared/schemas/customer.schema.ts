import { z } from 'zod';

const phoneDigitRangeMessage = 'Phone number must be valid';
const normalizePhone = (phone: string) => phone.replace(/[\s()+-]/g, '');

export const customerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Email must be valid').toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine(phone => /^[0-9\s()+-]+$/.test(phone), 'Phone number must be valid')
    .refine(phone => {
      const normalizedPhone = normalizePhone(phone);

      return normalizedPhone.length >= 10 && normalizedPhone.length <= 13;
    }, phoneDigitRangeMessage)
});

export type CustomerInput = z.infer<typeof customerSchema>;
