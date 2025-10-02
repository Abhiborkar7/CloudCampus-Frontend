import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard-faculty-authority/dashboard/Dashboard';
import MyProfile from '../components/dashboard-faculty-authority/my-profile/MyProfile';
import ChatRoom from '../components/dashboard-faculty-authority/chat-room/ChatRoom';
import ComplaintRoom from '../components/dashboard/complaints/ComplaintRoom';
import CheatingIncidentsList from '../components/dashboard/cheating-record/CheatingIncident';
import ApplicationPage from '../components/dashboard-faculty-authority/applications/ApplicationPage';
import ResultPage from '../components/dashboard-faculty-authority/election/result/ResultPage';
import CreateElection from '../components/dashboard-faculty-authority/election/create-election/CreateElection';
import LeavePage from '../components/dashboard-faculty-authority/leave/LeavePage';
import DashboardLayoutFacultyAuthority from '../components/dashboard-faculty-authority/DashboardLayoutFacultyAuthority';

const FacultyAuthorityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayoutFacultyAuthority />}>
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

export default FacultyAuthorityRoutes;
