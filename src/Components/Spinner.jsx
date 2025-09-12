export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center space-x-2">
      <div className="h-3 w-3 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-blue-700"></div>
    </div>
  );
}
