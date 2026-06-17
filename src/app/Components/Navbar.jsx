// components/Navbar.jsx
"use client";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { label: "Home", href: "/" },
  { label: "Browse Recipes", href: "/recipes" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbarpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
  <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
 <nav className="bg-orange-50 px-3  mt-5 mb-5 mx-5  w-11/12 rounded-3xl mx-auto  font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
{/* Logo */}
<Link href="/" className="flex items-center gap-2 flex-shrink-0">
 
  <span className="text-lg font-medium text-gray-900">
    Recipes <span className="text-green-600">Hub</span>
  </span>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {Links.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? "text-green-600 bg-green-50 font-medium"
                    : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Profile Button - Desktop */}
          {/* <Link
            href="/profile"
            className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </Link> */}
          <Link
            href="/signin"
            className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200"
          >
            Login
          </Link>
          

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {Links.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                  isActive
                    ? "text-green-600 bg-green-50 font-medium"
                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                {label}
                <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}

          {/* Mobile Profile + CTA */}
          <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            
          </div>
        </div>
      )}
    </nav>
    </div>
   
  );
}