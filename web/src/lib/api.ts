import type { z } from 'zod';
import {
  noteListSchema,
  noteSchema,
  patientListSchema,
  patientSchema,
  type CreateNoteInput,
  type CreatePatientInput,
  type Note,
  type Patient,
  type PatientListFilters,
} from './schemas';

// Patients are stored as users in the API for now.
const BASE_URL = '/api/users';

async function request(path: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(message ?? `Request failed with status ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

async function requestParsed<T extends z.ZodType>(schema: T, path: string, init?: RequestInit) {
  return schema.parse(await request(path, init));
}

export const api = {
  listPatients: (filters: PatientListFilters = {}): Promise<Patient[]> => {
    const params = new URLSearchParams();
    if (filters.type) params.set('type', filters.type);
    const query = params.size > 0 ? `?${params}` : '';
    return requestParsed(patientListSchema, query);
  },

  getPatient: (id: number): Promise<Patient> => requestParsed(patientSchema, `/${id}`),

  createPatient: (input: CreatePatientInput): Promise<Patient> =>
    requestParsed(patientSchema, '', { method: 'POST', body: JSON.stringify(input) }),

  updatePatient: (id: number, input: Partial<CreatePatientInput>): Promise<Patient> =>
    requestParsed(patientSchema, `/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),

  deletePatient: async (id: number): Promise<void> => {
    await request(`/${id}`, { method: 'DELETE' });
  },

  listNotes: (patientId: number): Promise<Note[]> =>
    requestParsed(noteListSchema, `/${patientId}/notes`),

  createNote: (patientId: number, input: CreateNoteInput): Promise<Note> =>
    requestParsed(noteSchema, `/${patientId}/notes`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};
