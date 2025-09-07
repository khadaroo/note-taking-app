import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages.jsx/Login";
import Signup from "./pages.jsx/Signup";
import ForgotPassword from "./pages.jsx/ForgotPassword";
import ResetPassword from "./pages.jsx/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
