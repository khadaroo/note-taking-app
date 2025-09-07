export default function AuthHeader({ title, description }) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-center text-2xl/7 font-bold tracking-tight text-neutral-950">
        {title}
      </h1>
      <p className="text-center text-sm font-light text-neutral-600">
        {description}
      </p>
    </div>
  );
}
