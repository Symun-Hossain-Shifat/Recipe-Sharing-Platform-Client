
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";

function SigninPage() {
  const router = useRouter();

  const Handlesignin = async (e) => {
    e.preventDefault();

    const FormData = e.target;

    const email = FormData.Email.value;
    const password = FormData.Password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: false,
    });

    if (data?.user?.isBlocked === true) {
      toast.error(
        "You cannot login! Your account has been blocked by the admin. Please wait until the admin unblocks your account.",
        {
          duration: 10000,
        }
      );

      setTimeout(async () => {
        await authClient.signOut();
        router.push("/");
      }, 10000);

      return;
    }

    if (data?.user) {
      toast.success("Login Successful 🎉");
      router.push("/");
    } else if (error) {
      toast.error(`Login Failed! ${error.message}`);
    }

    console.log(data);
    console.log(error);
  };

  const HandleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 py-10 px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl transition-colors duration-300 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl dark:bg-orange-500/20">
            🍽️
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to access your RecipeHub account
          </p>
        </div>

        <form onSubmit={Handlesignin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <FaEnvelope className="mr-3 text-gray-400 dark:text-gray-500" />

              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <FaLock className="mr-3 text-gray-400 dark:text-gray-500" />

              <input
                type="password"
                name="Password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 accent-orange-500"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="font-medium text-orange-500 hover:text-orange-600 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">


            <span className="relative   px-4 text-sm text-orange-500 ">
              Or continue with
            </span>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={HandleGoogleSignin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
          >
            <FaGoogle className="text-red-500" />
            <span className="font-medium">Continue with Google</span>
          </button> 
                    {/* Sign Up */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-orange-500 transition hover:text-orange-600"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SigninPage;