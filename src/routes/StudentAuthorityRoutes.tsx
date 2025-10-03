import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard-student-authority/dashboard/Dashboard';
import MyProfile from '../components/dashboard-student-authority/my-profile/MyProfile';
import ChatRoom from '../components/dashboard-student-authority/chat-room/ChatRoom';
import ComplaintRoom from '../components/dashboard/complaints/ComplaintRoom';
import CheatingIncidentsList from '../components/dashboard/cheating-record/CheatingIncident';
import ApplicationPage from '../components/dashboard-student-authority/applications/ApplicationPage';
import ResultPage from '../components/dashboard-student-authority/election/result/ResultPage';
import CreateElection from '../components/dashboard-student-authority/election/create-election/CreateElection';
import LeavePage from '../components/dashboard-student-authority/leave/LeavePage';
import DashboardLayoutStudentAuthority from '../components/dashboard-student-authority/DashboardLayoutStudentAuthority';

const StudentAuthorityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayoutStudentAuthority />}>
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

export default StudentAuthorityRoutes;
