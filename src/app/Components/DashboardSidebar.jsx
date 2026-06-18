'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";

import {
  BiBookOpen,
  BiHeart,
  BiPlusCircle,
} from "react-icons/bi";
import { BsHouse, BsPerson } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";


export function SideNavigation() {
  const pathname = usePathname();
   const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user?.role)
  const UserNavItems = [
    {
      href: "/Dashboard/User",
      icon: BsHouse,
      label: "Overview",
    },
    {
      href: "/dashboard/add-recipe",
      icon: BiPlusCircle,
      label: "Add Recipe",
    },
    {
      href: "/dashboard/my-recipes",
      icon: BiBookOpen,
      label: "My Recipes",
    },
    {
      href: "/dashboard/purchased-recipes",
      icon: CgShoppingCart,
      label: "Purchased Recipes",
    },
    {
      href: "/dashboard/favorites",
      icon: BiHeart,
      label: "Favorites",
    },
    {
      href: "/Dashboard/User/profile",
      icon: BsPerson,
      label: "Profile",
    },
  ];

  const Navmenu = (
    <div className="w-full">
      <nav className="flex flex-col gap-2">

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50 border border-orange-100 mb-4">
          
          <div className="w-15 h-15 rounded-full bg-orange-200 overflow-hidden">
            <img
              src={user?.image || "/default-avatar.png"}
              alt="User Image"
             
            />
          </div>

          <div>
            <h1 className="font-semibold text-gray-800">
             {user?.name}
            </h1>
            <p className="text-xs text-gray-500">
              Welcome back 👋
            </p>
          </div>
        </div>

        {/* Nav Items */}
        {UserNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              <item.icon className="text-lg" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-100 p-4 bg-white">
        {Navmenu}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden flex items-center gap-3 m-4 bg-orange-500 text-white">
         <span><IoMenu /></span> Sidebar
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-white">
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-gray-800">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                {Navmenu}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}