import { SideNavigation } from "../Components/DashboardSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className=" md:flex   min-h-screen">
      <SideNavigation></SideNavigation>
      <main className="flex-1">{children}</main>
      
    </div>
  );
}