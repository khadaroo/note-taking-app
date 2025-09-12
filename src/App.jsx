import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Notes from "./pages/Notes";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import PublicRoutes from "./components/PublicRoutes";
import Tags from "./pages/Tags";
import Setting from "./pages/Setting";
import { NotesProvider } from "./context/NotesContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Notes filter="all" />} />
                <Route path="/archive" element={<Notes filter="archive" />} />
                <Route path="/tags/:tag" element={<Notes filter="tag" />} />
                <Route path="/search" element={<Notes filter="search" />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/setting" element={<Setting />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
