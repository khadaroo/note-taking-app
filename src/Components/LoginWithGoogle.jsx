export default function LoginWithGoogle() {
  return (
    <div className="space-y-4 border-t border-neutral-200 pt-6 text-center">
      <p className="text-center text-sm font-light text-neutral-600">
        Or login with:
      </p>
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-4 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none">
        <img src="src/assets/images/icon-google.svg" alt="Google icon" />
        <span className="tracking-wide">Google</span>
      </button>
    </div>
  );
}
