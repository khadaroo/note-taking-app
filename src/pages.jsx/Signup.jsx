import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";
import LoginWithGoogle from "../components/LoginWithGoogle";
import AuthSwitch from "../components/AuthSwitch";
// import { supabase } from "../supabaseClient";
import VerticalDivider from "../components/VerticalDivider";

export default function Signup() {
  const handleSignup = async ({ email, password }) => {
    console.log("signup", email, password);
  };

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Create Your Account"
          description="Sign up to start organizing your notes and boost your productivity."
        />

        <AuthForm mode="signup" onSubmit={handleSignup} />

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
