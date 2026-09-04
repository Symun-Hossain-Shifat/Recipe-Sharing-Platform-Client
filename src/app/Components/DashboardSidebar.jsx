'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";

import {
  BiBookOpen,
  BiHeart,
  BiPlusCircle,
} from "react-icons/bi";
import { BsFileEarmarkBarGraph, BsHouse, BsPeople, BsPerson } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";

import { FiBookOpen } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";


export function SideNavigation({plan , Userinfo}) { 
  const pathname = usePathname();

  const user = Userinfo;
  const UserNavItems = [
    {
      href: "/Dashboard/User",
      icon: BsHouse,
      label: "Overview",
    },
    {
      href: (plan?.length < 2 || user?.isPremium === "Premium") ? "/Dashboard/User/addrecipe" : "/plans",
      icon: BiPlusCircle,
      label: "Add Recipe",
    },
    {
      href: "/Dashboard/User/Myrecipe",
      icon: BiBookOpen,
      label: "My Recipes",
    },
    {
      href: "/Dashboard/User/MyBuyrecipe",
      icon: CgShoppingCart,
      label: "Purchased Recipes",
    },
    {
      href: "/Dashboard/User/favourite",
      icon: BiHeart,
      label: "Favorites",
    },
    {
      href: "/Dashboard/User/profile",
      icon: BsPerson,
      label: "Profile",
    },
  ];
  const AdminNavItems = [
    {
      href: "/Dashboard/Admin",
      icon: BsHouse,
      label: "Overview",
    },
    {
      href: "/Dashboard/Admin/User",
      icon: BsPeople,
      label: "Manage Users",
    },
    {
      href: "/Dashboard/Admin/Recipes",
      icon: FiBookOpen,
      label: "Manage Recipes",
    },
    {
      href: "/Dashboard/Admin/report",
      icon: BsFileEarmarkBarGraph,
      label: "Recipe Reports",
    },
    {
      href: "/Dashboard/Admin/Payments",
      icon: AiOutlineTransaction,
      label: "Transactions",
    },
    {
      href: "/Dashboard/Admin/profile",
      icon: BsPerson,
      label: "Profile",
    },
  ];

  const FinalLinks = user?.role === 'Admin' ? AdminNavItems : UserNavItems;

  const Navmenu = (
    <div className="w-full">
      <nav className="flex flex-col gap-1.5">

        {/* User Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white mb-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center">
            {user?.image ? (
              <img
                src={user?.image}
                alt={user?.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <BsPerson className="text-zinc-400 text-xl" />
            )}
          </div>

          <div className="overflow-hidden">
            <h2 className="font-semibold text-sm text-white truncate">
              {user?.name || "User Account"}
            </h2>
            <p className="text-xs text-zinc-400 truncate">
              {user?.role === 'Admin' ? 'System Administrator' : 'Recipe Creator'}
            </p>
          </div>
        </div>

        {/* Nav Items */}
        {FinalLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 font-semibold shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon className={`text-lg ${isActive ? "text-emerald-400" : "text-zinc-400"}`} />
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
      <aside className="hidden lg:block w-64 shrink-0 border-r border-zinc-800/80 p-4 bg-zinc-950 min-h-screen">
        {Navmenu}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden flex items-center gap-2 m-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl px-4 py-2 text-sm font-medium">
          <IoMenu className="text-lg text-emerald-400" /> Navigation Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-zinc-950 text-white border-r border-zinc-800">
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-white font-bold">
                  Dashboard Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="p-4 bg-zinc-950">
                {Navmenu}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}