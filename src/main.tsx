import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CssVarsProvider } from '@mui/joy/styles';

createRoot(document.getElementById("root")!).render(
  <CssVarsProvider>
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </CssVarsProvider>
);
