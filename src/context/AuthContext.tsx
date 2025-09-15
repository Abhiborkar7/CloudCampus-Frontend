import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../services/auth.service";
import { Student, StudentAuthority, FacultyAuthority, Faculty, LoginResponse } from "../types/types";
import toast from "react-hot-toast";
import { ErrorToast } from "../components/toast/ToastComponent";

interface AuthContextType {
  loading: boolean;
  role: string | null;
  loginAccount: (data: { email: string; password: string }, role: string) => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(localStorage.getItem("position") || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

 const loginAccount = async (
    data: { email: string; password: string },
    loginRole: string
  ) => {
    setLoading(true);
    try {
      const response: LoginResponse = await loginUser(data.email, data.password, loginRole);

      const { role: userRole, faculty: facultyData, authority, student: studentData, token } = response;

      setRole(userRole);
      localStorage.setItem("position", userRole);
      localStorage.setItem("token", token || "");
      setIsAuthenticated(true);

      if (userRole === "faculty") setFaculty(facultyData ?? null);
      else if (userRole === "faculty authority") setFacultyAuthority(authority ?? null);
      else if (userRole === "student") setStudent(studentData ?? null);
      else if (userRole === "student authority") setStudentAuthority(authority ?? null);

      // Success toast
      toast.custom((t) => <ErrorToast t={t} message="Login successful!" type="success" />, {
        duration: 4000,
        position: "top-right",
      });
    } catch (err: any) {
      console.error("Login failed:", err);
      setIsAuthenticated(false);

      const message = err?.response?.data?.message || err.message || "Login failed";

      // Error toast
      toast.custom((t) => <ErrorToast t={t} message={message} type="error" />, {
        duration: 4000,
        position: "top-right",
      });
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

  return (
    <AuthContext.Provider
      value={{ loading, role, loginAccount, logout, isAuthenticated, student, faculty, studentAuthority, facultyAuthority }}
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