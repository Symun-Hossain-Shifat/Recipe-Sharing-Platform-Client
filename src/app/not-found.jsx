import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-black px-4 text-center">
      <div className="rounded-full bg-zinc-900 border border-zinc-800 p-4 mb-4 text-emerald-400 font-mono text-2xl font-bold">
        404
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Page Not Found
      </h2>
      <p className="mt-3 text-zinc-400 max-w-md text-sm sm:text-base">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
      >
        Back to Home
      </Link>
    </section>
  );
}