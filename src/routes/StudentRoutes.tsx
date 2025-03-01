import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayoutStudent from '../components/dashboard-student/DashboardLayoutStudent';
import Dashboard from '../components/dashboard-student/dashboard/Dashboard';
import MyProfile from '../components/dashboard/my-profile/MyProfile';
import ChatRoom from '../components/dashboard-student/chat-room/ChatRoom';
import ComplaintRoom from '../components/dashboard/complaints/ComplaintRoom';
import CheatingIncidentsList from '../components/dashboard/cheating-record/CheatingIncident';
import ApplicationPage from '../components/dashboard/applications/ApplicationPage';
import CurrentElection from '../components/dashboard-student/election/current-election/CurrentElection';
import ResultPage from '../components/dashboard-student/election/result/ResultPage';
import CampusFacilityBooking from '../components/dashboard-student/facility-booking/CampusFacilityBooking';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="messages" element={<ChatRoom />} />
        <Route path="cheatings" element={<CheatingIncidentsList />} />
        <Route path="complaints" element={<ComplaintRoom />} />
        <Route path="applications" element={<ApplicationPage />} />
        <Route path="current-election" element={<CurrentElection />} />
        <Route path="election-result" element={<ResultPage />} />
        <Route path="facility-booking" element={<CampusFacilityBooking />} />
        <Route path="coming-soon" element={<h1>Coming Soon</h1>} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
