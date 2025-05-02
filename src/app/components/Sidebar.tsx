"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { sidebarContent } from "@/constants/sidebar-menu";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interfaces
interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  logo: LucideIcon;
  subMenu: string[] | SubMenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
  setActive: (title: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  setActive,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  const toggleSubmenu = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (hasSubMenu) {
      e.preventDefault();
      setOpen(!open);
    }
    setActive(item.title);
  };

  const Icon = item.logo;

  return (
    <div className="w-full">
      <Link
        href={item.href}
        className={`flex items-center justify-between p-3 w-full rounded-lg transition-all duration-200 ${
          isActive ? "bg-[#199fb1] text-white" : "text-gray-700"
        }`}
        onClick={toggleSubmenu}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.title}</span>
        </div>
        {hasSubMenu && (
          <div className="text-gray-500">
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        )}
      </Link>

      {hasSubMenu && open && (
        <div className="ml-8 mt-1 space-y-1">
          {item.subMenu.map((subItem, index) => (
            <Link
              key={index}
              href={typeof subItem === "string" ? "#" : subItem.href}
              className="block p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
            >
              {typeof subItem === "string" ? subItem : subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  return (
    <div className="bg-white border-r border-gray-200 shadow-sm px-4 overflow-y-auto">
      <div className="">
        {/* <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1> */}
        <img
          src={`${
            process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"
          }/logo.png`}
          alt="Logo"
          height={150}
          width={150}
        />
      </div>

      <div className="space-y-1">
        {sidebarContent.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isActive={activeItem === item.title}
            setActive={setActiveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
