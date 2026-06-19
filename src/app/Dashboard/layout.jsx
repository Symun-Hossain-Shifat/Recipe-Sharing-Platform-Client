import { GetspecificrecipesByuserEmail } from "@/lib/GetApiData/recipe";
import { SideNavigation } from "../Components/DashboardSidebar";
import { GetUserInserver } from "@/lib/GetUser/Getuserinfo";


export default async function DashboardLayout({ children }) { 
  const Userinfo = await GetUserInserver() 
  const email = Userinfo?.email
  const plan = await GetspecificrecipesByuserEmail(email) 

  return (
    <div className=" md:flex   min-h-screen">
      <SideNavigation plan={plan} Userinfo={Userinfo}></SideNavigation>
      <main className="flex-1">{children}</main>
      
    </div>
  );
}