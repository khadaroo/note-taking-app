import Main from "../Components/Main";
import Section from "../Components/Section";
import Logo from "../Components/Logo";
import AuthHeader from "../Components/AuthHeader";
import AuthForm from "../Components/AuthForm";
import LoginWithGoogle from "../Components/LoginWithGoogle";
import AuthSwitch from "../Components/AuthSwitch";
import VerticalDivider from "../Components/VerticalDivider";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import Spinner from "../Components/Spinner";

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
