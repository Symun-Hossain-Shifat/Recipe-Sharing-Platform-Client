'use client';

import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-950 text-gray-100 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#18181b] border border-gray-800 shadow-xl">
        
        {/* Animated Visual Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-full animate-pulse">
            <ShieldAlert size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Access Denied
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Oops! You don't have permission to access this page. It looks like you're signed in with an account that lacks the required credentials.
          </p>
        </div>

        {/* Smart Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-xl border border-gray-700 transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-lg shadow-purple-600/20"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        {/* Helpful Hint */}
        <p className="text-xs text-gray-500">
          Think this is a mistake? Try logging out and signing back in with a recruiter or authorized account.
        </p>
      </div>
    </div>
  );
}