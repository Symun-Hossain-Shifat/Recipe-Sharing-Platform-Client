'use client'

import Link from "next/link";
import React from "react";
import { FaEnvelope, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { PiBracketsCurlyBold } from "react-icons/pi";


function Signuppage() {



  return (
    <section className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#111111] border border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">
            Join us and start your journey today
          </p>
        </div>

        {/* Form */}
        <form    className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <FaUser className="text-gray-500 mr-3" />

              <input
                name="Name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <FaEnvelope className="text-gray-500 mr-3" />

              <input
                name="Email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Image URL
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <PiBracketsCurlyBold className="text-gray-500 mr-3" />

              <input
                name="Image"
                type="url"
                required
                placeholder="Enter profile image URL"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <FaLock className="text-gray-500 mr-3" />

              <input
                name="Password"
                type="password"
                required
                placeholder="Create a strong password"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

         
          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium transition duration-300"
          >
            Create Account
          </button>


          {/* Divider */}
          <div className="relative text-center text-sm text-gray-500">
            <span className="bg-[#111111] px-3 relative z-10">
              Or continue with
            </span>

            <div className="absolute top-1/2 left-0 w-full border-t border-gray-700"></div>
          </div>

          {/* Google Button */}
          <button
      
            type="button"
            className="w-full border border-gray-700 bg-[#1A1A1A] py-3 rounded-lg flex items-center justify-center gap-2 text-gray-300 hover:bg-[#222222] transition"
          >
            <FaGoogle className="text-red-500" />
            <span className="text-sm">Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signuppage;
