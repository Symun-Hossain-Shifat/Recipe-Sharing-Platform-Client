'use client';

import { authClient } from "@/lib/auth-client";
import { Card, Chip } from "@heroui/react";
import {
  BiBookOpen,
  BiHeart,
  BiLike,
  BiCrown,
} from "react-icons/bi";

export default function DashboardOverview({Data , Datas , likes}) {
  // Dummy Data
  
    const { data: session } = authClient.useSession();
    const user = session?.user?.isPremium;
  
  
    const stats = {
    totalRecipes:  Data.length ,
    totalFavorites: Datas.length ,
    totalLikes: likes.length ,
    
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-default-500">
            Welcome back! Here's a quick summary of your activity.
          </p>
        </div>

        { user === false ? (
          <Chip color="warning" variant="shadow">
            <div className="flex items-center p-3 gap-2">
              <BiCrown size={18} />
              <span>Premium Member</span>
            </div>
          </Chip>
        ) :(
          <Chip color="warning" variant="shadow">
          <div className="flex items-center p-3 gap-2">
            <BiCrown size={18} />
            <span>Premium Member</span>
          </div>
        </Chip>
        ) }
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Recipes */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Recipes</p>
              <h2 className="text-3xl font-bold">
                {stats.totalRecipes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-orange-100">
              <BiBookOpen size={32} />
            </div>
          </div>
        </Card>

        {/* Total Favorites */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Favorites</p>
              <h2 className="text-3xl font-bold">
                {stats.totalFavorites}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-pink-100">
              <BiHeart size={32} />
            </div>
          </div>
        </Card>

        {/* Total Likes */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Likes Received</p>
              <h2 className="text-3xl font-bold">
                {stats.totalLikes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-blue-100">
              <BiLike size={32} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}