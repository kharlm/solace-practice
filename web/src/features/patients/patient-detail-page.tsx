import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { ErrorMessage } from '../../components/error-message';
import { api } from '../../lib/api';
import { queryKeys } from '../../lib/query-client';
import { PatientNotes } from './patient-notes';

export function PatientDetailPage() {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: patient,
    isPending,
    error,
  } = useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => api.getPatient(id),
  });

  const deletePatient = useMutation({
    mutationFn: () => api.deletePatient(id),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: queryKeys.patients.detail(id) });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.patients.lists(),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.patients.count(),
      });
      navigate('/patients');
    },
  });

  return (
    <div className="space-y-4">
      <Link to="/patients" className="text-sm text-blue-700 underline">
        ← All patients
      </Link>

      {isPending && <p>Loading…</p>}
      {error && <ErrorMessage error={error} />}

      {patient && (
        <div className="space-y-4 rounded border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt className="text-gray-600">ID</dt>
            <dd>{patient.id}</dd>
            <dt className="text-gray-600">Email</dt>
            <dd>{patient.email}</dd>
            <dt className="text-gray-600">Phone</dt>
            <dd>{patient.phone}</dd>
          </dl>
          {deletePatient.error && <ErrorMessage error={deletePatient.error} />}
          <Button
            variant="danger"
            onClick={() => deletePatient.mutate()}
            disabled={deletePatient.isPending}
          >
            {deletePatient.isPending ? 'Deleting…' : 'Delete patient'}
          </Button>
        </div>
      )}

      {patient && <PatientNotes patientId={patient.id} />}
    </div>
  );
}
