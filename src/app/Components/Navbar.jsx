"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Navbarpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = useMemo(() => {
    const base = [
      { label: "Home", href: "/" },
      { label: "Browse Recipes", href: "/Recipes" },
      { label: "Pricing Plans", href: "/plans" },
    ];

    if (user) {
      base.push({ label: "Dashboard", href: `/Dashboard/${user?.role}` });
    }

    return base;
  }, [user]);

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl group-hover:border-emerald-500/50 transition-colors">
            🍳
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Recipe<span className="text-emerald-500">Hub</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Auth Button */}
          {user ? (
            <Link 
              href={`/Dashboard/${user?.role}/profile`} 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-800 transition-colors"
            > 
              <FaUser className="text-emerald-400 text-xs" />
              <span>Profile</span> 
            </Link>
          ) : (
            <Link
              href="/signin"
              className="hidden md:flex px-5 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-950/40 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2.5 text-zinc-300 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
          >
            {menuOpen ? <IoMdClose className="text-xl" /> : <IoMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 pb-4 border-t border-zinc-800/80 bg-zinc-950 rounded-2xl px-4 shadow-2xl border border-zinc-800">
          <div className="flex flex-col gap-1.5 py-2">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            {user ? (
              <Link
                href={`/Dashboard/${user?.role}/profile`}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-zinc-800"
              > 
                <FaUser className="text-emerald-400 text-xs" />
                Profile
              </Link>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-center text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-950/40"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}