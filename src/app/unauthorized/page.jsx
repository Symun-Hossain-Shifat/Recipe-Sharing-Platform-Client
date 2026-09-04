'use client';

import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-black px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
        
        {/* Animated Visual Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-full animate-pulse border border-red-500/20">
            <ShieldAlert size={48} strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex justify-center">
          <span className="px-3 py-1 bg-red-950/60 border border-red-800/50 text-red-400 font-mono text-xs uppercase tracking-widest rounded-full font-bold">
            Access Denied
          </span>
        </div>
         
        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Unauthorized Access
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Oops! You don't have permission to access this page. It looks like your account lacks the required privileges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-2.5 px-4 rounded-xl border border-zinc-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-950/40"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        {/* Helpful Hint */}
        <p className="text-xs text-zinc-500">
          Think this is a mistake? Try signing in with an authorized account.
        </p>
      </div>
    </div>
  );
}