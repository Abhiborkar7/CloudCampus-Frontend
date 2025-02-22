import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard-student/DashboardLayoutStudent';
import MyProfile from './components/dashboard-student/my-profile/MyProfile';
import ChatRoom from './components/dashboard-student/chat-room/ChatRoom';
import ComplaintRoom from './components/dashboard-student/complaints/ComplaintRoom';
import ResultPage from './components/dashboard-student/election/result/ResultPage';
import CurrentElection from './components/dashboard-student/election/current-election/CurrentElection';
import CampusFacilityBooking from './components/dashboard-student/facility-booking/CampusFacilityBooking';
import Login from './auth/Login';
import CheatingIncidentsList from './components/dashboard-student/cheating-record/CheatingIncident';
import { Box, CircularProgress } from '@mui/joy';
import Dashboard from './components/dashboard-student/dashboard/Dashboard';
import DashboardLayoutStudent from './components/dashboard-student/DashboardLayoutStudent';
import DashboardLayoutFaculty from './components/dashboard-faculty/DashboardLayoutFaculty';
import LeavePage from './components/dashboard-faculty/leave/LeavePage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <DashboardLayoutStudent />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Navigate to="profile" replace />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="messages" element={<ChatRoom />} />
            <Route path="cheatings" element={<CheatingIncidentsList />} />

            <Route path="complaints" element={<ComplaintRoom />} />
            <Route path="current-election" element={<CurrentElection />} />
            <Route path="election-result" element={<ResultPage />} />
            <Route path="facility-booking" element={<CampusFacilityBooking />} />

            <Route path="coming-soon" element={<h1>Coming Soon</h1>} />
            {/* <Route path="*" element={<h1>404 - Not Found</h1>} /> */}
          </Route>



          <Route
            path="/faculty"
            element={
              <ProtectedRoute>
                <DashboardLayoutFaculty />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Navigate to="profile" replace />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="messages" element={<ChatRoom />} />
            <Route path="cheatings" element={<CheatingIncidentsList />} />

            <Route path="complaints" element={<ComplaintRoom />} />
            <Route path="current-election" element={<CurrentElection />} />
            <Route path="election-result" element={<ResultPage />} />
            <Route path="facility-booking" element={<CampusFacilityBooking />} />
            <Route path="leave" element={<LeavePage />} />

            <Route path="coming-soon" element={<h1>Coming Soon</h1>} />
            {/* <Route path="*" element={<h1>404 - Not Found</h1>} /> */}
          </Route>
          {/* Catch-all Route */}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;


export const CircularLoading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)', // Adding glassmorphic effect
        WebkitBackdropFilter: 'blur(10px)', // For Safari support
        zIndex: 10,
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CircularProgress />
    </Box>
  )
} 