import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard-faculty/dashboard/Dashboard';
import MyProfile from '../components/dashboard-faculty/my-profile/MyProfile';
import ChatRoom from '../components/dashboard-faculty/chat-room/ChatRoom';
import ComplaintRoom from '../components/dashboard/complaints/ComplaintRoom';
import CheatingIncidentsList from '../components/dashboard/cheating-record/CheatingIncident';
import ApplicationPage from '../components/dashboard/applications/ApplicationPage';
import ResultPage from '../components/dashboard-faculty/election/result/ResultPage';
import CreateElection from '../components/dashboard-faculty/election/create-election/CreateElection';
import LeavePage from '../components/dashboard-faculty/leave/LeavePage';
import DashboardLayoutFaculty from '../components/dashboard-faculty/DashboardLayoutFaculty';

const FacultyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayoutFaculty />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="messages" element={<ChatRoom />} />
        <Route path="cheatings" element={<CheatingIncidentsList />} />
        <Route path="complaints" element={<ComplaintRoom />} />
        <Route path="create-election" element={<CreateElection />} />
        <Route path="election-result" element={<ResultPage />} />
        <Route path="applications" element={<ApplicationPage />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="coming-soon" element={<h1>Coming Soon</h1>} />
      </Route>
    </Routes>
  );
};

export default FacultyRoutes;
