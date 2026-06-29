"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaGoogle,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { PiBracketsCurlyBold } from "react-icons/pi";

function Signuppage() {
  const router = useRouter();

 const Handlesignup = async (e) => {
  e.preventDefault();

  const FormData = e.target;

  const name = FormData.Name.value;
  const email = FormData.Email.value;
  const image = FormData.Image.value;
  const password = FormData.Password.value;

  // Password Validation
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters.");
  }

  if (!/[A-Z]/.test(password)) {
    return toast.error("Password must contain at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    return toast.error("Password must contain at least one lowercase letter.");
  }

  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    image,
    callbackURL: "/signin",
  });

  if (data?.user) {
    toast.success("Registration Successful 🎉");
    router.push("/signin");
  } else if (error) {
    toast.error(`Registration Failed! ${error.message}`);
  }
};

const HandleGoogleSignin = async () => {
  await authClient.signIn.social({
    provider: "google",
  });

  const session = await authClient.getSession();

  if (session.data?.user?.isBlocked) {
    toast.error(
      "You cannot login! Your account has been blocked by the admin.",
      {
        duration: 10000,
      }
    );

    await authClient.signOut();

    router.push("/");
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl transition-colors duration-300 p-8">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-500/20 text-3xl">
            🍽️
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Join RecipeHub and start sharing delicious recipes
          </p>
        </div>

        <form onSubmit={Handlesignup} className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <FaUser className="mr-3 text-gray-400 dark:text-gray-500" />

              <input
                name="Name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <FaEnvelope className="mr-3 text-gray-400 dark:text-gray-500" />

              <input
                name="Email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image URL
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <PiBracketsCurlyBold className="mr-3 text-gray-400 dark:text-gray-500" />

              <input
                name="Image"
                type="url"
                required
                placeholder="Enter profile image URL"
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

        <div>
  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
    Password
  </label>

  <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
    <FaLock className="mr-3 text-gray-400 dark:text-gray-500" />

    <input
      name="Password"
      type="password"
      required
      placeholder="Create a strong password"
      className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
    />
  </div>

  <ul className="mt-2 ml-2 list-disc text-xs text-gray-500 dark:text-gray-400 space-y-1">
    <li>Minimum 6 characters</li>
    <li>At least one uppercase letter (A-Z)</li>
    <li>At least one lowercase letter (a-z)</li>
  </ul>
</div>
                    {/* Terms */}
          <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              required
              className="mt-1 accent-orange-500"
            />

            <span>
              I agree to the{" "}
              <span className="font-medium text-orange-500 hover:text-orange-600">
                Terms &amp; Conditions
              </span>{" "}
              and{" "}
              <span className="font-medium text-orange-500 hover:text-orange-600">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Create Account */}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">


            <span className="relative   px-4 text-sm text-orange-500 ">
              Or continue with
            </span>
          </div>
          {/* Google Signup */}
          <button
            type="button"
            onClick={HandleGoogleSignin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
          >
            <FaGoogle className="text-red-500" />

            <span className="font-medium">
              Continue with Google
            </span>
          </button>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-orange-500 transition hover:text-orange-600"
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