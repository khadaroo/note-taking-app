import { useState } from "react";
import { Link } from "react-router-dom";
import VerticalDivider from "../Components/VerticalDivider";
import { supabase } from "../lib/supabase";
import { useToast } from "../context/ToastContext";
import Spinner from "../Components/Spinner";

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    } else {
      showToast("Successfully Logout");
    }

    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
        Settings
      </h1>

      <div className="flex flex-col gap-2 border-neutral-200 pb-2">
        <Link to="color-theme">
          <div className="flex items-center gap-2 py-2">
            <img src="src/assets/images/icon-sun.svg" alt="" />
            <span className="text-sm leading-[1.2] font-medium text-neutral-950">
              Color Theme
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 py-2">
          <img src="src/assets/images/icon-font.svg" alt="" />
          <span className="text-sm leading-[1.2] font-medium text-neutral-950">
            Font Theme
          </span>
        </div>

        <div className="flex items-center gap-2 py-2">
          <img src="src/assets/images/icon-lock.svg" alt="" />
          <span className="text-sm leading-[1.2] font-medium text-neutral-950">
            Change Password
          </span>
        </div>

        <VerticalDivider />

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 py-2"
        >
          <img src="src/assets/images/icon-logout.svg" alt="" />
          <span className="text-sm leading-[1.2] font-medium text-neutral-950">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
