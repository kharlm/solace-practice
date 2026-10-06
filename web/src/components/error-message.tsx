export function ErrorMessage({ error }: { error: Error }) {
  return <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error.message}</p>;
}
