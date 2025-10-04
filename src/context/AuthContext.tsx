import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Student, StudentAuthority, FacultyAuthority, Faculty } from "../types/types";
import { loginUser } from "../services/auth.service";
import axiosInstance from "../services/axiosInstance";
import { LoginResponse } from "../types/types";

interface AuthContextType {
  loading: boolean;
  role: string | null;
  isAuthenticated: boolean;
  student: Student | null;
  faculty: Faculty | null;
  studentAuthority: StudentAuthority | null;
  facultyAuthority: FacultyAuthority | null;
  loginAccount: (data: { email: string; password: string }, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [studentAuthority, setStudentAuthority] = useState<StudentAuthority | null>(null);
  const [facultyAuthority, setFacultyAuthority] = useState<FacultyAuthority | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // true initially while checking /me
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Restore state on reload
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/auth/me", { withCredentials: true });
        const { role: userRole, faculty: facultyData, student: studentData, authority } = res.data;
        setRole(userRole);
        setIsAuthenticated(true);

        if (userRole === "faculty") setFaculty(facultyData ?? null);
        else if (userRole === "faculty-authority") setFacultyAuthority(authority ?? null);
        else if (userRole === "student") setStudent(studentData ?? null);
        else if (userRole === "student-authority") setStudentAuthority(authority ?? null);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setIsAuthenticated(false);
        setRole(null);
        setStudent(null);
        setFaculty(null);
        setStudentAuthority(null);
        setFacultyAuthority(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const loginAccount = async (data: { email: string; password: string }, loginRole: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await loginUser(data.email, data.password, loginRole);
      const { role: userRole, faculty: facultyData, authority, student: studentData } = response;

      setRole(userRole);
      setIsAuthenticated(true);

      if (userRole === "faculty") setFaculty(facultyData ?? null);
      else if (userRole === "faculty-authority") setFacultyAuthority(authority ?? null);
      else if (userRole === "student") setStudent(studentData ?? null);
      else if (userRole === "student-authority") setStudentAuthority(authority ?? null);
    } catch (err) {
      console.error("Login failed:", err);
      setIsAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setStudent(null);
      setFaculty(null);
      setStudentAuthority(null);
      setFacultyAuthority(null);
      setRole(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        role,
        isAuthenticated,
        student,
        faculty,
        studentAuthority,
        facultyAuthority,
        loginAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
