'use client';


import { Card, Chip } from "@heroui/react";
import {
  BiBookOpen,
  BiHeart,
  BiLike,
  BiCrown,
} from "react-icons/bi";
import { GiFreedomDove } from "react-icons/gi";

export default function DashboardOverview({Data , Datas , likes , User}) {
  // Dummy Data
  
  
    const user = User?.isPremium
   console.log(user)
    const stats = {
    totalRecipes:  Data.length ,
    totalFavorites: Datas.length ,
    totalLikes: likes.length ,
    
  };

  return (
    <div className="space-y-8 p-6 bg-black text-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Welcome back! Here's a quick summary of your culinary activity on RecipeHub.
          </p>
        </div>
        <div>
          { user === 'Free' ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-semibold shadow-sm">
              <GiFreedomDove size={18} />
              <span>Free Member</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/70 border border-amber-800/60 text-amber-400 text-xs font-semibold shadow-sm">
              <BiCrown size={18} />
              <span>Premium Member</span>
            </div>
          ) }
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Recipes */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Total Recipes</p>
              <h2 className="text-4xl font-extrabold text-white mt-2">
                {stats.totalRecipes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
              <BiBookOpen size={30} />
            </div>
          </div>
        </Card>

        {/* Total Favorites */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Total Favorites</p>
              <h2 className="text-4xl font-extrabold text-white mt-2">
                {stats.totalFavorites}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800/50 text-rose-400">
              <BiHeart size={30} />
            </div>
          </div>
        </Card>

        {/* Total Likes */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Total Likes Received</p>
              <h2 className="text-4xl font-extrabold text-white mt-2">
                {stats.totalLikes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-800/50 text-amber-400">
              <BiLike size={30} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}