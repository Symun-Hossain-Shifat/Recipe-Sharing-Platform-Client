'use client';

import { authClient } from '@/lib/auth-client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaGoogle, FaLock, FaUser } from 'react-icons/fa';
import { PiBracketsCurlyBold } from 'react-icons/pi';

function Signuppage() {

  const Handlesignup = async(e) => {
  e.preventDefault()
  const FormData = e.target 
  const name = FormData.Name.value 
  const email = FormData.Email.value 
  const image = FormData.Image.value 
  const password = FormData.Password.value 
  console.log(name , email , image , password )
  const { data, error } = await authClient.signUp.email({
    name: name , // required
    email: email , // required
    password: password , // required
    image: image ,
    callbackURL: '/signin',
});
if (data?.user) {
  toast.success("Registration Successful 🎉");
  redirect('/signin')
} else if (error) {
  toast.error(`Registration Failed! ${error?.message}`);
}

console.log(error)
console.log(data )
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">
            🍽️
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join RecipeHub and start sharing delicious recipes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={Handlesignup} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <FaUser className="text-gray-400 mr-3" />

              <input
                name="Name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                name="Email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image URL
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <PiBracketsCurlyBold className="text-gray-400 mr-3" />

              <input
                name="Image"
                type="url"
                required
                placeholder="Enter profile image URL"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <FaLock className="text-gray-400 mr-3" />

              <input
                name="Password"
                type="password"
                required
                placeholder="Create a strong password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 accent-orange-500"
            />
            <span>
              I agree to the{" "}
              <span className="text-orange-500 font-medium">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-orange-500 font-medium">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute w-full border-t border-gray-200"></div>

            <span className="relative bg-white px-4 text-sm text-gray-400">
              Or continue with
            </span>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="w-full border border-gray-200 bg-white py-3 rounded-xl flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            <FaGoogle className="text-red-500" />
            <span className="font-medium">
              Continue with Google
            </span>
          </button>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-orange-500 font-semibold hover:text-orange-600 transition"
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