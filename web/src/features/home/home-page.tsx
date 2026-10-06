import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="text-gray-600">A small practice app for managing patients.</p>
      <Link to="/patients" className="text-blue-700 underline">
        View patients
      </Link>
    </div>
  );
}
