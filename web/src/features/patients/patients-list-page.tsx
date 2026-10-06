import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../../components/error-message';
import { api } from '../../lib/api';
import { queryKeys } from '../../lib/query-client';

export function PatientsListPage() {
  const {
    data: patients,
    isPending,
    error,
  } = useQuery({
    queryKey: queryKeys.patients.list(),
    queryFn: api.listPatients,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Link
          to="/patients/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New patient
        </Link>
      </div>

      {isPending && <p>Loading…</p>}
      {error && <ErrorMessage error={error} />}
      {patients?.length === 0 && (
        <p className="text-gray-600">No patients yet.</p>
      )}

      {patients && patients.length > 0 && (
        <ul className="divide-y divide-gray-200 rounded border border-gray-200 bg-white">
          {patients.map((patient) => (
            <li key={patient.id}>
              <Link
                to={`/patients/${patient.id}`}
                className="flex justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium">{patient.name}</span>
                <span className="text-gray-600">{patient.email}</span>
                <span className="text-gray-600">{patient.phone}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
