// src/main.tsx or index.tsx
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </AuthProvider>
);





