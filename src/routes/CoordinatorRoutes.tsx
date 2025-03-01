import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard-faculty/dashboard/Dashboard';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const CoordinatorRoutes = () => {
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

export default CoordinatorRoutes;
