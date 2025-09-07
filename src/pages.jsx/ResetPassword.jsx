import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";

export default function ResetYourPassword() {
  const handleReset = async () => {};

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
