import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginUser } from '../services/auth.service';
import { Student, StudentAuthority, FacultyAuthority, Faculty } from '../types/types';

interface AuthContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  role: string | null;
  setRole: (role: string) => void;
  openFailedAlert: boolean;
  setOpenFailedAlert: (open: boolean) => void;
  openSuccessAlert: boolean;
  setOpenSuccessAlert: (open: boolean) => void;
  loginAccount: (
    data: { email: string; password: string; persistent: boolean },
    role: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  student: Student | null;
  faculty: Faculty | null;
  studentAuthority: StudentAuthority | null;
  facultyAuthority: FacultyAuthority | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [studentAuthority, setStudentAuthority] = useState<StudentAuthority | null>(null);
  const [facultyAuthority, setFacultyAuthority] = useState<FacultyAuthority | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(localStorage.getItem('position') || null);
  const [openFailedAlert, setOpenFailedAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const loginAccount = async (
    data: { email: string; password: string; persistent: boolean },
    loginRole: string
  ) => {
    setLoading(true);
    try {
      const response = await loginUser(data.email, data.password, loginRole);

      if (response.status !== 200) {
        console.log("Login failed:", response.status);
        setOpenFailedAlert(true);
        setIsAuthenticated(false);
      } else {
        const { role, faculty, authority, student, token } = response.data;

        console.log("Login successful:", response);

        setRole(role);
        localStorage.setItem("position", role);
        localStorage.setItem("token", token);
        setOpenSuccessAlert(true);
        setIsAuthenticated(true);

        if (role === "faculty") {
          setFaculty(faculty);
        } else if (role === "faculty authority") {
          setFacultyAuthority(authority);
        } else if (role === "student") {
          setStudent(student);
        } else if (role === "student authority") {
          setStudentAuthority(authority);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setOpenFailedAlert(true);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("position");
    setStudent(null);
    setFaculty(null);
    setStudentAuthority(null);
    setFacultyAuthority(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        role,
        setRole,
        openFailedAlert,
        setOpenFailedAlert,
        openSuccessAlert,
        setOpenSuccessAlert,
        loginAccount,
        logout,
        isAuthenticated,
        student,
        faculty,
        studentAuthority,
        facultyAuthority
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
