import Main from "../Components/Main";
import Section from "../Components/Section";
import Logo from "../Components/Logo";
import AuthHeader from "../Components/AuthHeader";
import AuthForm from "../Components/AuthForm";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import Spinner from "../Components/Spinner";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleForgot = async ({ email }) => {
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Sent a reset link to your email, please check!");
    }

    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Forgotten your password?"
          description="Enter your email below, and we'll send you a link to reset it."
        />

        <AuthForm mode="forgot" onSubmit={handleForgot} />
      </Section>
    </Main>
  );
}
