import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { ErrorMessage } from '../../components/error-message';
import { TextInput } from '../../components/text-input';
import { api } from '../../lib/api';
import { queryKeys } from '../../lib/query-client';
import { createPatientSchema, type CreatePatientInput } from '../../lib/schemas';

export function NewPatientPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientInput>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: { name: '', email: '' },
  });

  const createPatient = useMutation({
    mutationFn: api.createPatient,
    onSuccess: async (patient) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.patients.list() });
      navigate(`/patients/${patient.id}`);
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">New patient</h1>
      <form
        onSubmit={handleSubmit((values) => createPatient.mutate(values))}
        noValidate
        className="space-y-4 rounded border border-gray-200 bg-white p-6"
      >
        <TextInput label="Name" error={errors.name?.message} {...register('name')} />
        <TextInput label="Email" type="email" error={errors.email?.message} {...register('email')} />
        {createPatient.error && <ErrorMessage error={createPatient.error} />}
        <Button type="submit" disabled={createPatient.isPending}>
          {createPatient.isPending ? 'Saving…' : 'Create patient'}
        </Button>
      </form>
    </div>
  );
}
