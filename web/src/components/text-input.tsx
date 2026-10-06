import { useId, type ComponentProps } from 'react';

type TextInputProps = ComponentProps<'input'> & {
  label: string;
  error?: string;
};

export function TextInput({ label, error, ...props }: TextInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none aria-invalid:border-red-500"
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
