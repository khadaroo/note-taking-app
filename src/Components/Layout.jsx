import { Outlet } from "react-router";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <header className="h-14 bg-neutral-100 px-4 py-3 md:h-18 md:px-8 md:py-4">
        <Logo position="left" />
      </header>

      <main className="flex min-h-screen flex-col gap-4 rounded-t-xl bg-white px-4 py-5 md:rounded-t-2xl md:px-8 md:py-6">
        <Outlet />
      </main>

      <footer className="shadow-blur fixed bottom-0 w-screen border border-neutral-200 bg-white px-4 py-3">
        <Navbar />
      </footer>
    </>
  );
}
