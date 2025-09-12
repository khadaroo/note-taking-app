import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import DesktopLayout from "./DesktopLayout";
import Layout from "./Layout";
import useIsDesktop from "../hooks/useIsDesktop";

export default function ProtectedRoutes() {
  const { session, loading } = useAuth();
  const isDesktop = useIsDesktop();

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (isDesktop) {
    return (
      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    );
  } else {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
}
