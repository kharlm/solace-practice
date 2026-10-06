import { z } from 'zod';

export const patientSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
});

export const patientListSchema = z.array(patientSchema);

export const createPatientSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .pipe(z.email('Enter a valid email')),
  phone: z
    .string()
    .trim()
    .max(20, 'Phone must be 20 characters or fewer')
    .transform((value) => value || null),
});

export type Patient = z.infer<typeof patientSchema>;
export type CreatePatientForm = z.input<typeof createPatientSchema>;
export type CreatePatientInput = z.output<typeof createPatientSchema>;
