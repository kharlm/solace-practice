import { z } from 'zod';

// Mirrors the API's UserType enum.
export const userTypeSchema = z.enum([
  'patient',
  'physician',
  'advocate',
  'internal',
]);

export const patientSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  type: userTypeSchema,
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

export const userCountSchema = z.object({ count: z.number() });

export const noteSchema = z.object({
  id: z.number(),
  body: z.string(),
  createdAt: z.string(),
  userId: z.number(),
});

export const noteListSchema = z.array(noteSchema);

export const createNoteSchema = z.object({
  body: z.string().trim().min(1, 'Note is required').max(5000),
});

export type UserType = z.infer<typeof userTypeSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type PatientListFilters = { type?: UserType };
export type CreatePatientForm = z.input<typeof createPatientSchema>;
export type CreatePatientInput = z.output<typeof createPatientSchema>;
export type Note = z.infer<typeof noteSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
