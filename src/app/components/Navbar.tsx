"use client";
import React from "react";
import {
  Search,
  Settings,
  CalendarDays,
  User2,
  CircleAlert,
  ChevronDown,
} from "lucide-react";

import ActivityLog from "@/assets/svg/activity-log.svg";
import ChangePassword from "@/assets/svg/change-password.svg";
import ManageAccount from "@/assets/svg/manage-account.svg";
import Logout from "@/assets/svg/logout.svg";
import UserLogo from "@/assets/user.png";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Navbar = () => {
  const notificationDropdown = [
    {
      title: "Settings",
      subTitle: "Edit Dashboard",
      icon: Settings,
      bg1: "#4E96FF",
      bg2: "#80C9FC",
    },
    {
      title: "Event update",
      subTitle: "An event date update again",
      icon: CalendarDays,
      bg1: "#F97FD9",
      bg2: "#FFC1E6",
    },
    {
      title: "Profile",
      subTitle: "Update your profile",
      icon: User2,
      bg1: "#9E8FFF",
      bg2: "#EBCBFF",
    },
    {
      title: "Application error",
      subTitle: "Check your running application",
      icon: CircleAlert,
      bg1: "#FF8F8F",
      bg2: "#EBCBFF",
    },
  ];

  const userDropdown = [
    {
      title: "Activity Log",
      icon: ActivityLog,
    },
    {
      title: "Change Password",
      icon: ChangePassword,
    },
    {
      title: "Manage Account",
      icon: ManageAccount,
    },
    {
      title: "Logout",
      icon: Logout,
    },
  ];

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-1/2 flex justify-end relative">
        <SearchInput />
      </div>

      <div className="w-1/2 px-20">
        <div className="w-[60%] flex justify-between items-center mx-auto">
          <DropdownMenu>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div>
                {notificationDropdown.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${item.bg1}, ${item.bg2})`,
                      }}
                    >
                      <item.icon className="text-white w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-gray-800">
                        {item.title}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {item.subTitle}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[#A8A8A8] font-medium text-center text-xs">
                See All Notification
              </DropdownMenuLabel>
            </DropdownMenuContent>
            <Notifications />
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuContent>
              <div>
                {userDropdown.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      width={50}
                      height={50}
                      src={item.icon}
                      alt={item.title}
                      className="w-5 h-5"
                    />
                    <span className="text-sm text-gray-800">{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
            <User />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const Notifications = () => {
  return (
    <div className="relative w-fit cusror-pointer">
      <DropdownMenuTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#199fb1"
          viewBox="0 0 24 24"
          stroke="#FFF"
          width="40"
          height="40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </DropdownMenuTrigger>

      <div className="absolute right-0 top-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold shadow-md">
        6
      </div>
    </div>
  );
};

const User = () => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar className="w-10 h-10">
        <AvatarImage height={50} width={50} src={UserLogo.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-bold text-[#404040]">Kalyani Kumar</h1>

        <div className="flex justify-between items-center">
          <h3 className="text-xs font-normal text-[#565656]">Admin</h3>
          <DropdownMenuTrigger>
            <ChevronDown className="w-4 h-4 border-[#A4A5A8] rounded-full border-[1px] cursor-pointer" />
          </DropdownMenuTrigger>
        </div>
      </div>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="relative w-96">
      <Input className="w-full h-8 outline-none pl-10 pr-5 border-[#A4A5A8]" />
      <Search
        color="#A4A5A8"
        className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
