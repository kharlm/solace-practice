import { NavLink, Outlet } from 'react-router-dom';

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'font-semibold text-blue-700' : 'text-gray-600 hover:text-gray-900';
}

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-3xl gap-6 px-4 py-3">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/patients" end className={navClass}>
            Patients
          </NavLink>
          <NavLink to="/patients/new" className={navClass}>
            New patient
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
