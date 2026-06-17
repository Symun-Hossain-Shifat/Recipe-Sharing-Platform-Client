"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
{ label: "Home", href: "/" },
{ label: "Browse Recipes", href: "/recipes" },
{ label: "Dashboard", href: "/Dashboard/User" },
];

export default function Navbarpage() {
const [menuOpen, setMenuOpen] = useState(false);
const pathname = usePathname();

return ( 
<div className="sticky top-0 z-50 px-4 py-4 bg-white/70 backdrop-blur-md">
<nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-orange-100 shadow-sm rounded-3xl"> 
<div className="h-16 px-6 flex items-center justify-between">
{/* Logo */} 
<Link href="/" className="flex items-center gap-3"> 
<div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-lg">
🍽️ 
</div>

        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Recipe<span className="text-orange-500">Hub</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {links.map(({ label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Desktop Actions */}
      <div className="flex items-center gap-3">
       {/* <Link href="/profile" className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors" > <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg> <span>Profile</span> </Link>  */}
        <Link
          href="/signin"
          className="hidden md:flex px-3 py-2  border-orange-200 text-orange-600 font-medium hover:bg-orange-50 transition"
        >
         Login
        </Link>

       

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-orange-50 transition"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden border-t border-orange-100 bg-white rounded-b-3xl px-4 py-4">
        <div className="flex flex-col gap-2">
          {links.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-orange-100 flex flex-col gap-3">
          <Link
            href="/signin"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center py-3 rounded-xl border border-orange-200 text-orange-600 font-medium hover:bg-orange-50 transition"
          >
            Login
          </Link>

          
        </div>
      </div>
    )}
  </nav>
</div>

);
}
  