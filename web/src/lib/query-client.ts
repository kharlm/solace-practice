import { QueryClient } from '@tanstack/react-query';
import type { PatientListFilters } from './schemas';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

// Every query key in the app comes from here, so invalidation always matches.
export const queryKeys = {
  patients: {
    all: ['patients'] as const,
    // lists() matches every filtered list, so invalidating it refreshes them all.
    lists: () => [...queryKeys.patients.all, 'list'] as const,
    list: (filters: PatientListFilters = {}) =>
      [...queryKeys.patients.lists(), filters] as const,
    detail: (id: number) => [...queryKeys.patients.all, 'detail', id] as const,
    // Nested under detail(id), so removing a patient's detail also removes its notes.
    notes: (id: number) => [...queryKeys.patients.detail(id), 'notes'] as const,
  },
};
