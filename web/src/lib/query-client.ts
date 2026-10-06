import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

// Every query key in the app comes from here, so invalidation always matches.
export const queryKeys = {
  patients: {
    all: ['patients'] as const,
    list: () => [...queryKeys.patients.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.patients.all, 'detail', id] as const,
  },
};
