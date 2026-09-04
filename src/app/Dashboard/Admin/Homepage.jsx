'use client';

import { authClient } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import {
  BiBookOpen,
 
  BiLike,
  
} from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineWorkspacePremium, MdReport } from "react-icons/md";

export default function DashboardOverview({Users , Recipe , Report , PremiumMember}) {
  // Dummy Data
  
    const { data: session } = authClient.useSession();
    const user = session?.user?.isPremium;
  
  
    const stats = {
    Users : Users.length , 
    Recipe: Recipe.length , 
    Report : Report.length , 
    PremiumMember : PremiumMember.length 
    
  };

  return (
    <div className="space-y-8 p-6 bg-black text-white min-h-screen">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Overview</h1>
        <p className="text-zinc-400 text-sm mt-1">
          System overview and platform performance statistics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Recipes */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Total Recipes</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">
                {stats.Recipe}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
              <BiBookOpen size={28} />
            </div>
          </div>
        </Card>

        {/* Total Report */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Flagged Reports</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">
                {stats.Report}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800/50 text-rose-400">
              <MdReport size={28} />
            </div>
          </div>
        </Card>

        {/* Total User */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Total Users</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">
                {stats.Users}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-800/50 text-blue-400">
              <FaUserShield size={28} />
            </div>
          </div>
        </Card>

        {/* Total Premium Member */}
        <Card className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-zinc-700 transition-all p-6 text-white">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Premium Users</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">
                {stats.PremiumMember}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-800/50 text-amber-400">
              <MdOutlineWorkspacePremium size={28} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}