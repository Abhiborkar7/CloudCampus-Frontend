import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fontsource/inter';
import { AuthProvider } from './context/AuthContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <ToastProvider>
    <App />
    </ToastProvider>
  </AuthProvider>
  // </StrictMode>,
)


export const VITE_BASE_URL = "http://172.31.91.63:5000"
export const VITE_BLOCKCHAIN_URL = "http://172.31.91.63:5000"
export const VITE_ML_URL = "http://172.31.91.63:5001"

