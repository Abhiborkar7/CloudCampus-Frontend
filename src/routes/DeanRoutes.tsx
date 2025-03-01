import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard-faculty/dashboard/Dashboard';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const DeanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="coming-soon" element={<h1>Coming Soon</h1>} />
      </Route>
    </Routes>
  );
};

export default DeanRoutes;
