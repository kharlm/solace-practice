import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../../components/error-message';
import { api } from '../../lib/api';
import { queryKeys } from '../../lib/query-client';

export function HomePage() {
  const {
    data: count,
    isPending,
    error,
  } = useQuery({
    queryKey: queryKeys.patients.count(),
    queryFn: api.getUserCount,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="text-gray-600">
        A small practice app for managing patients.
      </p>

      {isPending && <p>Loading count…</p>}
      {error && <ErrorMessage error={error} />}
      {count !== undefined && (
        <p className="text-lg">
          Total users: <span className="font-semibold">{count}</span>
        </p>
      )}

      <Link to="/patients" className="text-blue-700 underline">
        View patients
      </Link>
    </div>
  );
}
