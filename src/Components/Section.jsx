export default function Section({ children }) {
  return (
    <section className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-10 shadow-lg md:px-8 md:py-12 lg:max-w-xl lg:p-12">
      {children}
    </section>
  );
}
