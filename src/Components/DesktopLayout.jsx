import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function DesktopLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[272px_1fr]">
      <Sidebar />
      <main className="grid h-screen grid-cols-[290px_1fr] grid-rows-[81px_1fr]">
        <Outlet />
      </main>
    </div>
  );
}
