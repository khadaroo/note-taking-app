import Main from "../Components/Main";
import Section from "../Components/Section";
import Logo from "../Components/Logo";
import AuthHeader from "../Components/AuthHeader";
import AuthForm from "../Components/AuthForm";
import { supabase } from "../lib/supabase";
import { useToast } from "../context/ToastContext";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
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
