import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      

      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        Page Not Found
      </h2>

      <p className="mt-3 text-center text-gray-600 dark:text-gray-400 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
      >
        Back to Home
      </Link>
    </section>
  );
}