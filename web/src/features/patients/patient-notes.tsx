import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { ErrorMessage } from '../../components/error-message';
import { TextInput } from '../../components/text-input';
import { api } from '../../lib/api';
import { queryKeys } from '../../lib/query-client';
import { createNoteSchema, type CreateNoteInput } from '../../lib/schemas';

export function PatientNotes({ patientId }: { patientId: number }) {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isPending,
    error,
  } = useQuery({
    queryKey: queryKeys.patients.notes(patientId),
    queryFn: () => api.listNotes(patientId),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { body: '' },
  });

  const createNote = useMutation({
    mutationFn: (input: CreateNoteInput) => api.createNote(patientId, input),
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({
        queryKey: queryKeys.patients.notes(patientId),
      });
    },
  });

  return (
    <section className="space-y-4 rounded border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Notes</h2>

      {isPending && <p>Loading…</p>}
      {error && <ErrorMessage error={error} />}
      {notes?.length === 0 && <p className="text-gray-600">No notes yet.</p>}

      {notes && notes.length > 0 && (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="border-l-2 border-blue-200 pl-3">
              <p>{note.body}</p>
              <p className="text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit((values) => createNote.mutate(values))}
        noValidate
        className="space-y-3"
      >
        <TextInput
          label="New note"
          error={errors.body?.message}
          {...register('body')}
        />
        {createNote.error && <ErrorMessage error={createNote.error} />}
        <Button type="submit" disabled={createNote.isPending}>
          {createNote.isPending ? 'Adding…' : 'Add note'}
        </Button>
      </form>
    </section>
  );
}
