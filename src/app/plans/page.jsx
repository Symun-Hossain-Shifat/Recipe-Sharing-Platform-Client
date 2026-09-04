'use client';

import React from 'react';
import { Button, Card } from '@heroui/react';
import { FaCheck, FaCrown } from 'react-icons/fa';

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">

      {/* Header */}
      <div className="text-center mb-12 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
          Membership Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
          Upgrade your account to unlock unlimited recipe publishing and premium community perks
        </p>
      </div>

      {/* Plans Container */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* FREE PLAN */}
        <Card className="p-8 rounded-3xl border border-zinc-800 shadow-xl bg-zinc-900 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Free Plan</h2>
            <p className="text-zinc-400 text-sm mt-1">Basic access for home enthusiasts</p>

            <div className="mt-6 space-y-3">
              <Feature text="Create up to 2 recipes" />
              <Feature text="View public community recipes" />
              <Feature text="Like & favorite dishes" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-4xl font-extrabold text-white">$0</h3>
            <p className="text-xs text-zinc-500 mt-1">Forever free</p>

            <Button
              className="w-full mt-6 bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50 font-medium py-3 rounded-xl"
              disabled
            >
              Current Plan
            </Button>
          </div>
        </Card>

        {/* PREMIUM PLAN */}
        <Card className="p-8 rounded-3xl border-2 border-amber-500/80 shadow-2xl bg-zinc-900 relative flex flex-col justify-between">

          {/* Badge */}
          <div className="absolute -top-3.5 right-6 bg-amber-500 text-black px-3.5 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
            <FaCrown /> Most Popular
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Premium Plan <FaCrown className="text-amber-400" />
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Unlock all advanced culinary features
            </p>

            <div className="mt-6 space-y-3">
              <Feature text="Everything in Free Plan" />
              <Feature text="Verified Chef Badge" />
              <Feature text="Unlimited recipe uploads" />
              <Feature text="Priority customer support" />
              <Feature text="Boosted recipe visibility" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-4xl font-extrabold text-white">$10.99</h3>
            <p className="text-xs text-zinc-500 mt-1">per month (billed monthly)</p>
            
            <form action="/api/checkout_sessions" method="POST" className="mt-6">
              <button className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-950/40 transition-colors cursor-pointer" type="submit" role="link">
                Upgrade Now 🎉
              </button>
            </form>
          </div>
         
        </Card>

      </div>
    </div>
  );
}

/* Feature Component */
function Feature({ text }) {
  return (
    <div className="flex items-center gap-2.5 text-zinc-300 text-sm">
      <FaCheck className="text-emerald-400 shrink-0" />
      <span>{text}</span>
    </div>
  );
}