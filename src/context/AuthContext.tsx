import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { ROLES } from '../config/routesConfig';
// import { User } from '../types/user.types';



interface AuthContextType {
  // user: User | null;
  // login: (userData: User) => void;
  // logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface User {
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  // const login = (userData: User) => setUser(userData);
  // const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{
      //  user, login, logout, 
    loading, setLoading }}>
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
