'use client'

import { EditUserInfo } from '@/lib/EditData/User'
import { Button, Card } from '@heroui/react'

import React, { useState } from 'react'
import toast from 'react-hot-toast';

function SubUserpage ({result}) {
  const [users, setUsers] = useState(result);

const Blockuser = async (user) => {
  try {
    const data = {
      isBlocked: true,
      name: user?.name,
      isPremium: user?.isPremium,
      image: user?.image,
    };

    const result = await EditUserInfo(data, user?.email);

    if (result.modifiedCount > 0) {
      toast.success("User blocked successfully"); 
       setUsers((prev) =>
        prev.map((u) =>
          u.email === user.email
            ? { ...u, isBlocked: true }
            : u
        )
      );
    } else {
      toast("No changes were made.");
    }

    console.log(result);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


const unBlockuser = async (user) => {
  try {
    const data = {
      isBlocked: false ,
      name: user?.name,
      isPremium: user?.isPremium,
      image: user?.image,
    };

    const result = await EditUserInfo(data, user?.email);

    if (result.modifiedCount > 0) {
      toast.success("User unblocked successfully"); 
       setUsers((prev) =>
        prev.map((u) =>
          u.email === user.email
            ? { ...u, isBlocked: false }
            : u
        )
      );
    } else {
      toast("No changes were made.");
    }

    console.log(result);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {users.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">
            No Users Found 😢
          </h2>
          <p className="text-zinc-400 text-sm">
            There are currently no registered users matching the criteria.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="pb-6 border-b border-zinc-800">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage All Users</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Monitor, block, or unblock user accounts across RecipeHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            {users.map((user) => (
              <Card key={user._id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition-all text-white space-y-4">

                {/* User Info */}
                <div className="flex items-center gap-4 pb-4 border-b border-zinc-800/80">
                  <img
                    src={user.image || "/default-avatar.png"}
                    alt="user avatar"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-800 shrink-0"
                  />

                  <div className="overflow-hidden">
                    <h2 className="text-lg font-bold text-white truncate">{user.name}</h2>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Extra Info */}
                <div className="text-xs text-zinc-300 space-y-2 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-medium">Role:</span>
                    <span className="font-semibold text-white px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">{user.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-medium">Subscription:</span>
                    <span className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${user.isPremium === "Premium" ? "bg-amber-950/70 border border-amber-800/60 text-amber-400" : "bg-zinc-800 text-zinc-300"}`}>
                      {user.isPremium ? "Premium Member" : "Free Member"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-medium">Account Status:</span>
                    {user.isBlocked ? (
                      <span className="text-rose-400 font-bold px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-800/60 text-[11px]">Blocked</span>
                    ) : (
                      <span className="text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[11px]">Active</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-800/80">
                    <span className="text-zinc-500 font-medium">Joined Date:</span>
                    <span className="text-zinc-400 font-mono">{new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-1 flex gap-3">
                  {!user.isBlocked ? (
                    <Button
                      onClick={() => Blockuser(user)}
                      className="w-full bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                    >
                      Block User Account
                    </Button>
                  ) : (
                    <Button
                      onClick={() => unBlockuser(user)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
                    >
                      Unblock User Account
                    </Button>
                  )}
                </div>

              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubUserpage 