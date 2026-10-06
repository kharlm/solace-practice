import { z } from 'zod';

export const patientSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const patientListSchema = z.array(patientSchema);

export const createPatientSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  email: z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email')),
});

export type Patient = z.infer<typeof patientSchema>;
export type CreatePatientInput = z.infer<typeof createPatientSchema>;
