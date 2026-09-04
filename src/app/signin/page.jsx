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
    <section className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-8 sm:p-10">
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-3xl shadow-inner">
            🍳
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your RecipeHub account
          </p>
        </div>

        <form onSubmit={Handlesignin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
              <FaEnvelope className="mr-3 text-zinc-500 shrink-0" />

              <input
                type="email"
                name="Email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent text-white placeholder:text-zinc-600 text-sm outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
              <FaLock className="mr-3 text-zinc-500 shrink-0" />

              <input
                type="password"
                name="Password"
                required
                placeholder="Enter your password"
                className="w-full bg-transparent text-white placeholder:text-zinc-600 text-sm outline-none"
              />
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-zinc-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-emerald-500"
              />
              Remember me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white text-sm shadow-lg shadow-emerald-950/50 transition-colors hover:bg-emerald-500"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <span className="relative bg-zinc-900 px-3 text-xs text-zinc-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={HandleGoogleSignin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 py-3 text-zinc-200 text-sm font-medium transition-colors hover:bg-zinc-800"
          >
            <FaGoogle className="text-red-400" />
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Redirect */}
          <p className="text-center text-xs text-zinc-400 pt-2">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-400 transition hover:underline"
            >
              Create Free Account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SigninPage;