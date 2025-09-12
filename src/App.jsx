import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages.jsx/Login";
import Signup from "./pages.jsx/Signup";
import ForgotPassword from "./pages.jsx/ForgotPassword";
import ResetPassword from "./pages.jsx/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notes from "./pages.jsx/Notes";
import { AuthProvider } from "./context.jsx/AuthContext";
import { ToastProvider } from "./context.jsx/ToastContext";
import PublicRoutes from "./components/PublicRoutes";
import { NotesProvider } from "./context.jsx/NotesContext";
import Note from "./pages.jsx/Note";
import Tags from "./pages.jsx/Tags";

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Notes filter="all" />} />
                <Route path="/archive" element={<Notes filter="archive" />} />
                <Route path="/tags/:tag" element={<Notes filter="tag" />} />
                <Route path="/search" element={<Notes filter="search" />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/setting" />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
