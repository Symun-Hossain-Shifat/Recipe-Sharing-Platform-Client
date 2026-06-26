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
    <div className="space-y-6 p-5">
      {/* Header */}
      <div >
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-default-500">
            Welcome back! Here's a quick summary of your activity.
          </p>
        </div>

       
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Recipes */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Recipes</p>
              <h2 className="text-3xl font-bold">
                {stats.Recipe}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-orange-100">
              <BiBookOpen size={32} />
            </div>
          </div>
        </Card>

        {/* Total report */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Report</p>
              <h2 className="text-3xl font-bold">
                {stats.Report}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-pink-100">
              <MdReport size={32} />
            </div>
          </div>
        </Card>

        {/* Total User */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total User</p>
              <h2 className="text-3xl font-bold">
                {stats.Users}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-blue-100">
              <FaUserShield size={32} />
            </div>
          </div>
        </Card>


         {/* Total Premium Member */}
        <Card className="shadow-lg border">
          <div className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-default-500">Total Premium User</p>
              <h2 className="text-3xl font-bold">
                {stats.PremiumMember}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-blue-100">
              <MdOutlineWorkspacePremium size={32} />
            </div>
          </div>
        </Card>



      </div>
    </div>
  );
}