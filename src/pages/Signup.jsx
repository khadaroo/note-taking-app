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
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleSignup = async ({ email, password }) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    } else {
      showToast("Successfully your account has been created", "success");
    }

    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

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
