import Main from "../components/Main";
import Section from "../components/Section";
import Logo from "../components/Logo";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";

export default function ForgotPassword() {
  const handleForget = async () => {};

  return (
    <Main>
      <Section>
        <Logo />

        <AuthHeader
          title="Forgotten your password?"
          description="Enter your email below, and we'll send you a link to reset it."
        />

        <AuthForm mode="forgot" onSubmit={handleForget} />
      </Section>
    </Main>
  );
}
