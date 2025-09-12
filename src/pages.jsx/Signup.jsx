import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";
import LoginWithGoogle from "../components/LoginWithGoogle";
import AuthSwitch from "../components/AuthSwitch";
import VerticalDivider from "../components/VerticalDivider";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useToast } from "../context.jsx/ToastContext";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleSignup = async ({ email, password }) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      { redirectTo: "http://localhost:5173/login" },
    );

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    } else {
      showToast("Check your email to confirm your account", "success");
    }

    setIsLoading(false);
  };

  // if (loading) return <Spinner />;

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Create Your Account"
          description="Sign up to start organizing your notes and boost your productivity."
        />

        <AuthForm mode="signup" onSubmit={handleSignup} isLoading={isLoading} />

        <LoginWithGoogle />

        <VerticalDivider />

        <AuthSwitch
          message="Already have an account? "
          path="/login"
          linkText="Login"
        />
      </Section>
    </Main>
  );
}
