'use client';

import React from 'react';
import { Button, Card } from '@heroui/react';
import { FaCheck, FaCrown } from 'react-icons/fa';

export default function PlansPage() {
  const handleUpgrade = () => {
    
  };

  return (
    <div className="min-h-screen  dark:bg-black flex flex-col items-center py-10 px-4">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 mt-2">
          Upgrade your account to unlock premium features
        </p>
      </div>

      {/* Plans Container */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* FREE PLAN */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Free Plan</h2>
          <p className="text-gray-500 mt-1">Basic access for everyone</p>

          <div className="mt-6 space-y-3">
            <Feature text="Create recipes" />
            <Feature text="View public recipes" />
            <Feature text="Like recipes" />
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-bold text-gray-800">$0</h3>
            <p className="text-sm text-gray-500">Forever free</p>
          </div>

          <Button
            className="w-full mt-auto bg-gray-200 text-gray-700 cursor-not-allowed"
            disabled
          >
            Current Plan
          </Button>
        </Card>

        {/* PREMIUM PLAN */}
        <Card className="p-6 rounded-2xl border-2 border-yellow-400 shadow-xl bg-white relative">

          {/* Badge */}
          <div className="absolute -top-3 right-4 bg-yellow-400 text-white px-3 py-1 text-xs rounded-full flex items-center gap-1">
            <FaCrown /> Popular
          </div>

          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Premium Plan <FaCrown className="text-yellow-500" />
          </h2>

          <p className="text-gray-500 mt-1">
            Unlock all advanced features
          </p>

          <div className="mt-6 space-y-3">
            <Feature text="Everything in Free Plan" />
            <Feature text="Verified badge" />
            <Feature text="Unlimited recipe uploads" />
            <Feature text="Priority support" />
            <Feature text="Boosted visibility" />
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-bold text-gray-800">$10.99</h3>
            <p className="text-sm text-gray-500">per month</p>
          </div>
          
           <form action="/api/checkout_sessions" method="POST">
            <section>
                <button className="w-full p-2 rounded-3xl mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" type="submit" role="link">
                Upgrade Now
                </button>
            </section>
            </form>
         
        </Card>

      </div>
    </div>
  );
}

/* Feature Component */
function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <FaCheck className="text-green-500" />
      <span>{text}</span>
    </div>
  );
}