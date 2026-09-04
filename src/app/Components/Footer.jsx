import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiPhoneForwarded } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

function FooterPage() {
  return (
    <footer className="bg-black text-zinc-400 pt-16 pb-8 px-4 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-zinc-800/80 pb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              Recipe<span className="text-emerald-500">Hub</span>
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Explore thousands of homemade recipes from around the world. Whether
            you are a beginner or a professional chef, RecipeHub helps you find,
            share, and save your favorites.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Recipes" className="hover:text-emerald-400 transition-colors">
                Browse Recipes
              </Link>
            </li>
            <li>
              <Link href="/plans" className="hover:text-emerald-400 transition-colors">
                Subscription Plans
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-emerald-400 transition-colors">
                Account Sign In
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex items-center space-x-3">
              <span className="text-emerald-400"><IoLocationOutline className="text-lg" /></span>
              <span>123 Culinary Way, Suite 500</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-emerald-400"><FiPhoneForwarded /></span>
              <a
                href="tel:+15551234567"
                className="hover:text-white transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-emerald-400"><MdOutlineMarkEmailUnread /></span>
              <a
                href="mailto:support@recipehub.com"
                className="hover:text-white transition-colors"
              >
                support@recipehub.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">
            Connect With Us
          </h3>

          <div className="flex space-x-3 mb-4">
            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 border border-zinc-800 hover:bg-emerald-600 hover:border-emerald-500 text-zinc-300 hover:text-white rounded-xl flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 border border-zinc-800 hover:bg-emerald-600 hover:border-emerald-500 text-zinc-300 hover:text-white rounded-xl flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 border border-zinc-800 hover:bg-emerald-600 hover:border-emerald-500 text-zinc-300 hover:text-white rounded-xl flex items-center justify-center transition-all"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>

          <p className="text-xs text-zinc-500">
            Join our community for weekly recipes & tips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
        <p>&copy; 2026 RecipeHub Inc. All rights reserved.</p>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Cookie Preferences
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;