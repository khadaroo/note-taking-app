import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginWithGoogle() {
  const [error, setError] = useState("");

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
      },
    });

    if (error) setError(error.message);

    console.log(data, error);
  };

  return (
    <div className="space-y-4 border-t border-neutral-200 pt-6 text-center">
      <p className="text-center text-sm font-light text-neutral-600">
        Or login with:
      </p>
      <button
        onClick={handleGoogleLogin}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-4 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none"
      >
        <img src="src/assets/images/icon-google.svg" alt="Google icon" />
        <span className="tracking-wide">Google</span>
      </button>
      {error && <p>{Error}</p>}
    </div>
  );
}
