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
import Spinner from "../components/Spinner";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    } else {
      showToast("Successfully Logged in!");
    }

    setIsLoading(false);
  };

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Welcome to Note"
          description="Please login to continue"
        />

        <AuthForm mode="login" onSubmit={handleLogin} isLoading={isLoading} />

        <LoginWithGoogle />

        <VerticalDivider />

        <AuthSwitch
          message="No account yet? "
          path="/signup"
          linkText="Sign Up"
        />
      </Section>
    </Main>
  );
}
