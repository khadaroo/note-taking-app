import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import DesktopLayout from "./DesktopLayout";
import Layout from "./Layout";
import useIsDesktop from "../hooks/useIsDesktop";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const isDesktop = useIsDesktop();

  if (loading) return <Spinner />;

  if (!session) return <Navigate to="/login" replace />;

  const LayoutWrapper = isDesktop ? DesktopLayout : Layout;

  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
