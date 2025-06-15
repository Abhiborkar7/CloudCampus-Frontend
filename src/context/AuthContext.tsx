import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Authority } from '../types/types';
import { loginUser } from '../services/auth.service';
// import { ROLES } from '../config/routesConfig';
// import { User } from '../types/user.types';



interface AuthContextType {
  // user: User | null;
  // login: (userData: User) => void;
  // logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  postiton: string | null;
  setPosition: (role: string) => void;
  openFailedAlert: boolean;
  setOpenFailedAlert: (openFailedAlert: boolean) => void;
  openSuccessAlert: boolean;
  setOpenSuccessAlert: (openSuccessAlert: boolean) => void;
  loginAccount: (data: { email: string; password: string; persistent: boolean }, role: string) => void;
}

interface User {
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [postiton, setPosition] = useState<string | null>(null);
  const [authority, setAuthority] = useState<Authority | null>(null);

  const [openFailedAlert, setOpenFailedAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);


  async function loginAccount(data: { email: string; password: string; persistent: boolean }, role: string) {
    console.log('Logging in with:', data);
    try {
      // let response, result;
      const response = await loginUser(data.email, data.password, role);
      if (response.status != 200) {
        console.log('Login failed:', response);
        setOpenFailedAlert(true);
      } else {
        console.log('Login successful:', response);
        setPosition(response.data.role);
        localStorage.setItem('position', response.data.role);
        setOpenSuccessAlert(true);
        // setAuthority(response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <AuthContext.Provider value={{
      //  user, login, logout, 
      loading, setLoading, postiton, setPosition,
      openFailedAlert, setOpenFailedAlert, openSuccessAlert, setOpenSuccessAlert,
      loginAccount
    }}>
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
