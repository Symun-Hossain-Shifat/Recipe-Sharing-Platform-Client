'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaGoogle, FaLock } from 'react-icons/fa';

function SigninPage() {
 
const router = useRouter()
   const Handlesignin = async(e) => {
    e.preventDefault()
    const FormData = e.target 
   
    const email = FormData.Email.value 
   
    const password = FormData.Password.value 
    
    const { data, error } = await authClient.signIn.email({
    email: email , // required
    password: password , // required
    rememberMe: false ,
    
}); 
  
  if(data?.user?.isBlocked === true){
   toast.error(
    "You cannot login! Your account has been blocked by the admin. Please wait until the admin unblocks your account.",
    {
      duration: 10000, // 10 seconds
    }
  );
    setTimeout(async () => {
      await authClient.signOut();
      router.push("/"); 
    }, 10000);

    return;
    
  }else if (data?.user) {
    toast.success("Login Successful 🎉");
    router.push("/");
  } else if (error) {
    toast.error(`Login Failed! ${error?.message}`);
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
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to access your RecipeHub account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={Handlesignin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
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
                type="password"
                name="Password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-orange-500"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-orange-500 hover:text-orange-600 font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute w-full border-t border-gray-200"></div>

            <span className="relative bg-white px-4 text-sm text-gray-400">
              Or continue with
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full border border-gray-200 bg-white py-3 rounded-xl flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            <FaGoogle className="text-red-500" />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-orange-500 font-semibold hover:text-orange-600 transition"
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