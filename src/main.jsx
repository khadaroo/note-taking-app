import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotesProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </NotesProvider>
    </AuthProvider>
  </StrictMode>,
);
