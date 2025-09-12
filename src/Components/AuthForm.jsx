import { useState } from "react";
import { Link } from "react-router";

function getButtonText(mode) {
  switch (mode) {
    case "login":
      return "Login";
    case "signup":
      return "Sign up";
    case "forgot":
      return "Send Reset Link";
    case "reset":
      return "Reset Password";
    default:
      return "Submit";
  }
}

export default function AuthForm({ mode, onSubmit, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const validateField = (field, value) => {
    let newError = { ...error };

    if (field === "email") {
      if (!value) newError.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        newError.email = "Please enter a valid email address";
      else newError.email = "";
    }

    if (field === "password") {
      if (!value) newError.password = "Password is required";
      else if (
        (mode === "signup" || mode === "reset") &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
      )
        newError.password =
          "Password must be at least 8 characters, include uppercase, lowercase, and a number";
      else newError.password = "";
    }

    if (
      field === "confirmPassword" &&
      (mode === "signup" || mode === "reset")
    ) {
      if (!value) newError.confirmPassword = "Confirm password is required";
      else if (value !== password)
        newError.confirmPassword = "Passwords do not match";
      else newError.confirmPassword = "";
    }

    setError(newError);
    return newError;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setTouched((prev) => ({ ...prev, email: true }));
    validateField("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setTouched((prev) => ({ ...prev, password: true }));
    validateField("password", e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
    if (mode === "signup" || mode === "reset")
      validateField("confirmPassword", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    let newError = {};

    // Email
    if (mode !== "reset") {
      if (!email) newError.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newError.email = "Please enter a valid email address";
      else newError.email = "";
    }

    // Password
    if (mode !== "forgot") {
      if (!password) newError.password = "Password is required";
      else if (
        (mode === "signup" || mode === "reset") &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
      )
        newError.password =
          "Password must be at least 8 characters, include uppercase, lowercase, and a number";
      else newError.password = "";
    }

    // Confirm password only for signup/reset
    if (mode === "reset") {
      if (!confirmPassword)
        newError.confirmPassword = "Confirm password is required";
      else if (confirmPassword !== password)
        newError.confirmPassword = "Passwords do not match";
      else newError.confirmPassword = "";
    }

    setError(newError);

    const hasError = Object.values(newError).some((e) => e);
    if (hasError) return;

    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
      {mode !== "reset" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-950">
            Email Address
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmailChange}
            className={`w-full rounded-lg border px-4 py-3 ring-neutral-500 ring-offset-2 outline-none hover:bg-neutral-50 focus:ring-2 ${
              (touched.email || submitted) && error.email
                ? "border-red-500"
                : "border-neutral-300"
            }`}
          />
          {(touched.email || submitted) && error.email && (
            <p className="mt-1 text-xs text-red-500">{error.email}</p>
          )}
        </div>
      )}

      {mode !== "forgot" && (
        <div className="relative flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-950">
            Password
          </label>
          {mode === "login" && (
            <Link
              to="/forgot-password"
              className="absolute top-0 right-0 text-sm font-light text-neutral-600 underline hover:text-blue-500"
            >
              Forgot
            </Link>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full rounded-lg border px-4 py-3 ring-neutral-500 ring-offset-2 outline-none hover:bg-neutral-50 focus:ring-2 ${
                (touched.password || submitted) && error.password
                  ? "border-red-500"
                  : "border-neutral-300"
              }`}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-0 right-4 translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <img
                  src="src/assets/images/icon-hide-password.svg"
                  alt="Hide password icon"
                />
              ) : (
                <img
                  src="src/assets/images/icon-show-password.svg"
                  alt="Show password icon"
                />
              )}
            </div>
            {(touched.password || submitted) && error.password && (
              <p className="mt-1 text-xs text-red-500">{error.password}</p>
            )}
          </div>
        </div>
      )}

      {mode === "reset" && (
        <div className="relative flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-950">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmChange}
              className={`w-full rounded-lg border px-4 py-3 ring-neutral-500 ring-offset-2 outline-none hover:bg-neutral-50 focus:ring-2 ${
                (touched.confirmPassword || submitted) && error.confirmPassword
                  ? "border-red-500"
                  : "border-neutral-300"
              }`}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-0 right-4 translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <img
                  src="src/assets/images/icon-hide-password.svg"
                  alt="Hide password icon"
                />
              ) : (
                <img
                  src="src/assets/images/icon-show-password.svg"
                  alt="Show password icon"
                />
              )}
            </div>
            {(touched.confirmPassword || submitted) &&
              error.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {error.confirmPassword}
                </p>
              )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full rounded-lg px-4 py-3 text-base font-normal text-white ring-neutral-500 ring-offset-2 transition-colors focus:ring-2 ${
          isLoading
            ? "cursor-not-allowed bg-blue-400"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {getButtonText(mode)}
          </div>
        ) : (
          getButtonText(mode)
        )}
      </button>
    </form>
  );
}
