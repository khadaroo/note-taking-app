import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";
import LoginWithGoogle from "../components/LoginWithGoogle";
import AuthSwitch from "../components/AuthSwitch";
import VerticalDivider from "../components/VerticalDivider";

export default function Login() {
  const handleLogin = async () => {};

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Welcome to Note"
          description="Please login to continue"
        />

        <AuthForm mode="login" onSubmit={handleLogin} />

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
