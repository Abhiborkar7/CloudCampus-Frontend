import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './auth/Login';
import { Box, CircularProgress } from '@mui/joy';
import StudentRoutes from './routes/StudentRoutes';
import FacultyRoutes from './routes/FacultyRoutes';
import FacultyAuthorityRoutes from './routes/FacultyAuthorityRoutes';
import StudentAuthorityRoutes from './routes/StudentAuthorityRoutes';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/student/*" element={<ProtectedRoute allowedRoles={["student"]}><StudentRoutes /></ProtectedRoute>} />
          <Route path="/faculty/*" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyRoutes /></ProtectedRoute>} />
          <Route path="/student-authority/*" element={<ProtectedRoute allowedRoles={["student-authority"]}><StudentAuthorityRoutes /></ProtectedRoute>} />
          <Route path="/faculty-authority/*" element={<ProtectedRoute allowedRoles={["faculty-authority"]}><FacultyAuthorityRoutes /></ProtectedRoute>} />
          {/* <Route path="/coordinator/*" element={<ProtectedRoute><FacultyRoutes /></ProtectedRoute>} /> */}
          {/* <Route path="/doctor/*" element={<ProtectedRoute><FacultyRoutes /></ProtectedRoute>} /> */}

          {/* Catch-all Route */}
          <Route path="/*" element={<h1>404 - Not Found</h1>} />
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