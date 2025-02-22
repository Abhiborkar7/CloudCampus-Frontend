import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fontsource/inter';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)


export const VITE_BASE_URL = "http://localhost:5000"
export const VITE_BLOCKCHAIN_URL = "http://192.168.40.63:5000"
export const VITE_ML_URL = "http://192.168.40.63:5001"