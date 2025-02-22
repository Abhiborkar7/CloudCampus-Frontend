import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MyProfile from './components/dashboard/my-profile/MyProfile';
import ChatRoom from './components/dashboard/chat-room/ChatRoom';
import ComplaintRoom from './components/dashboard/complaints/ComplaintRoom';
import ResultPage from './components/dashboard/election/result/ResultPage';
import CurrentElection from './components/dashboard/election/current-election/CurrentElection';
import CampusFacilityBooking from './components/dashboard/facility-booking/CampusFacilityBooking';
import Login from './auth/Login';
import CheatingIncidentsList from './components/dashboard/cheating-record/CheatingIncident';
import { Box, CircularProgress } from '@mui/joy';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Navigate to="profile" replace />} /> */}
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