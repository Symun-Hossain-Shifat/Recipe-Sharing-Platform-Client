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
    <section className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-8 sm:p-10">

        {/* Logo Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-3xl shadow-inner">
            🍳
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Join RecipeHub and start sharing delicious recipes
          </p>
        </div>

        <form onSubmit={Handlesignup} className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors">
              <FaUser className="mr-3 text-zinc-500 shrink-0" />

              <input
                name="Name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors">
              <FaEnvelope className="mr-3 text-zinc-500 shrink-0" />

              <input
                name="Email"
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Profile Image URL
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors">
              <PiBracketsCurlyBold className="mr-3 text-zinc-500 shrink-0" />

              <input
                name="Image"
                type="url"
                required
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors">
              <FaLock className="mr-3 text-zinc-500 shrink-0" />

              <input
                name="Password"
                type="password"
                required
                placeholder="Create a password"
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-600"
              />
            </div>

            <ul className="mt-2 ml-2 list-disc text-xs text-zinc-500 space-y-0.5">
              <li>Minimum 6 characters</li>
              <li>At least one uppercase letter (A-Z)</li>
              <li>At least one lowercase letter (a-z)</li>
            </ul>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-2 text-xs text-zinc-400 pt-1">
            <input
              type="checkbox"
              required
              className="mt-0.5 rounded border-zinc-700 bg-zinc-950 accent-emerald-500"
            />

            <span>
              I agree to the{" "}
              <span className="font-medium text-emerald-400 hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-medium text-emerald-400 hover:underline">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white text-sm shadow-lg shadow-emerald-950/50 transition-colors hover:bg-emerald-500 mt-2"
          >
            Create Account
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

          {/* Google Signup */}
          <button
            type="button"
            onClick={HandleGoogleSignin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 py-3 text-zinc-200 text-sm font-medium transition-colors hover:bg-zinc-800"
          >
            <FaGoogle className="text-red-400" />
            <span>Continue with Google</span>
          </button>

          {/* Sign In Redirect */}
          <p className="text-center text-xs text-zinc-400 pt-2">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-emerald-400 transition hover:underline"
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