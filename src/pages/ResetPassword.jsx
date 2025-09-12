import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";
import { supabase } from "../lib/supabase";
import { useToast } from "../context/ToastContext";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ResetYourPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();
  const { session, loading, authEvent } = useAuth();

  useEffect(() => {
    const handleRecovery = async () => {
      await supabase.auth.getSessionFromUrl({ storeSession: true });
    };
    handleRecovery();
  }, []);

  const handleReset = async (password) => {
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Successfully changed the password!");
    }

    setIsLoading(false);
  };

  if (loading || authEvent === null || isLoading) return <Spinner />;

  if (session && authEvent !== "PASSWORD_RECOVERY") {
    return <Navigate to="/" replace />;
  }

  if (!session && authEvent !== "PASSWORD_RECOVERY") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Reset Your Password"
          description="Choose a new password to secure your account."
        />

        <AuthForm mode="reset" onSubmit={handleReset} />
      </Section>
    </Main>
  );
}
