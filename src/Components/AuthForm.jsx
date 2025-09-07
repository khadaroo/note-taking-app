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

export default function AuthForm({ mode, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let newError = { ...error };

    if (mode === "signup" || mode === "reset") {
      if (!email) {
        newError.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newError.email = "Please enter a valid email address.";
      } else {
        newError.email = "";
      }

      if (!password) {
        newError.password = "Password is required";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        newError.password =
          "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
      } else {
        newError.password = "";
      }

      if (!confirmPassword) {
        newError.confirmPassword = "Confirm password is required";
      } else if (confirmPassword && password !== confirmPassword) {
        newError.confirmPassword = "Password do not match";
      } else {
        newError.confirmPassword = "";
      }
    }

    if (mode === "login" || mode === "forgot") {
      if (!email) newError.email = "Email is required";
      if (!password) newError.password = "Password is required";
    }

    setError(newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();

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
            className={`w-full rounded-lg border border-neutral-300 px-4 py-3 ring-neutral-500 ring-offset-2 outline-neutral-950 hover:bg-neutral-50 focus:ring-2 focus:outline-none ${email && error.email ? "border-red-500" : ""}`}
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              validate();
              setEmail(e.target.value);
            }}
          />

          {email && error.email && (
            <div className="mt-1 flex items-center gap-2">
              <svg
                className="size-4 stroke-red-500 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
                />
              </svg>
              <span className="inline-block text-xs text-red-500">
                {error.email}
              </span>
            </div>
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
              className="absolute top-0 right-0 cursor-pointer text-sm font-light text-neutral-600 underline hover:text-blue-500"
            >
              Forgot
            </Link>
          )}
          <div className="relative">
            <input
              className={`w-full rounded-lg border border-neutral-300 px-4 py-3 ring-neutral-500 ring-offset-2 outline-neutral-950 hover:bg-neutral-50 focus:ring-2 focus:outline-none ${password && error.password ? "border-red-500" : ""}`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                validate();
                setPassword(e.target.value);
              }}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <img
                  className="absolute top-0 right-4 translate-y-1/2"
                  src="src/assets/images/icon-hide-password.svg"
                  alt="Hide password icon"
                />
              ) : (
                <img
                  className="absolute top-0 right-4 translate-y-1/2"
                  src="src/assets/images/icon-show-password.svg"
                  alt="Show password icon"
                />
              )}
            </div>

            {(mode !== "login" || (password && error.password)) && (
              <div className="mt-1.5 flex items-center gap-2">
                <svg
                  className={`size-4 ${error.password ? "stroke-red-500" : "stroke-neutral-600"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
                  />
                </svg>
                <span
                  className={`text-xs ${password && error.password ? "text-red-500" : "text-neutral-600"}`}
                >
                  {error.password || "At least 8 characters"}
                </span>
              </div>
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
              className={`w-full rounded-lg border border-neutral-300 px-4 py-3 ring-neutral-500 ring-offset-2 outline-neutral-950 hover:bg-neutral-50 focus:ring-2 focus:outline-none ${confirmPassword && error.confirmPassword ? "border-red-500" : ""}`}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                validate();
                setConfirmPassword(e.target.value);
              }}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer"
            >
              {showConfirmPassword ? (
                <img
                  className="absolute top-0 right-4 translate-y-1/2"
                  src="src/assets/images/icon-hide-password.svg"
                  alt="Hide password icon"
                />
              ) : (
                <img
                  className="absolute top-0 right-4 translate-y-1/2"
                  src="src/assets/images/icon-show-password.svg"
                  alt="Show password icon"
                />
              )}
            </div>
          </div>

          {confirmPassword && error.confirmPassword && (
            <div className="mt-1 flex items-center gap-2">
              <svg
                className="size-4 stroke-red-500 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
                />
              </svg>
              <span className="inline-block text-xs text-red-500">
                {error.confirmPassword}
              </span>
            </div>
          )}
        </div>
      )}

      <button className="w-full rounded-lg bg-blue-500 px-4 py-3 text-base leading-tight font-normal text-white ring-neutral-500 ring-offset-2 transition-colors hover:bg-blue-700 focus:ring-2">
        {getButtonText(mode)}
      </button>
    </form>
  );
}
