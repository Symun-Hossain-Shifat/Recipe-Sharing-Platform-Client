"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTheme } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Navbarpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user?.role)
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ FIX: dynamic links safely (NO PUSH)
  const links = useMemo(() => {
    const base = [
      { label: "Home", href: "/" },
      { label: "Browse Recipes", href: "/Recipes" },
    ];

    if (user) {
      base.push({ label: "Dashboard", href: `/Dashboard/${user?.role}` });
    }

    return base;
  }, [user]);

  return (
    <div className="sticky top-0 z-50 px-4 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-orange-100 dark:border-gray-700 shadow-sm rounded-3xl">
        <div className="h-16 px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
              🍽️
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Recipe<span className="text-orange-500">Hub</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="hidden md:flex p-2 rounded-xl border border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? (
                  <BsSun className="text-yellow-400" />
                ) : (
                  <BsMoonStars />
                )}
              </button>
            )}

            {/* Auth Button */}
            {user ? (
              <Link href={`/Dashboard/${user?.role}/profile`} className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors" > <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg> <span>Profile</span> </Link>
            ) : (
              <Link
                href="/signin"
                className="hidden md:flex px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg"
              >
                Login
              </Link>
            )}

            {/* Mobile Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-700"
            >
              {menuOpen ? <IoMdClose /> : <IoMenu /> }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-orange-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">

            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm ${
                      isActive
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile auth */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">

              {user ? (
                <Link
                  href={`/Dashboard/${user?.role}/profile`}
                  className="px-4 flex items-center justify-center gap-2 py-3 text-center bg-gray-100 rounded-xl"
                > 
                <FaUser />
                  Profile
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="px-4 py-3 text-center bg-orange-100 text-orange-600 rounded-xl"
                >
                  Login
                </Link>
              )}

              {/* Theme mobile */}
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="px-4 py-3 flex items-center justify-center gap-2 border rounded-xl"
                > {theme === "dark" ? (
                  <BsSun className="text-yellow-400" />
                ) : (
                  <BsMoonStars />
                )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              )}
            </div>

          </div>
        )}
      </nav>
    </div>
  );
}