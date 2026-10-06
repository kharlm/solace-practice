import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'danger';
};

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  danger: 'bg-red-600 hover:bg-red-700',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
