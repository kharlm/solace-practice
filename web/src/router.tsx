import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './features/home/home-page';
import { NewPatientPage } from './features/patients/new-patient-page';
import { PatientDetailPage } from './features/patients/patient-detail-page';
import { PatientsListPage } from './features/patients/patients-list-page';
import { RootLayout } from './layouts/root-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'patients', element: <PatientsListPage /> },
      { path: 'patients/new', element: <NewPatientPage /> },
      { path: 'patients/:id', element: <PatientDetailPage /> },
      { path: '*', element: <p>Page not found.</p> },
    ],
  },
]);
