import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function PublicRoutes() {
  const { session, loading } = useAuth();

  if (loading) return <Spinner />;

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
