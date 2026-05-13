"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Monitor,
  Element3,
  SearchNormal1,
  Layer,
  Folder2,
  Global,
  MessageQuestion,
  Logout,
} from "iconsax-react";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  icon: typeof Monitor;
  label: string;
}

const primaryNav: NavItem[] = [
  { href: "/", icon: Monitor, label: "Home" },
  { href: "/templates", icon: Element3, label: "Templates" },
  { href: "/explore", icon: SearchNormal1, label: "Explore" },
  { href: "/designs", icon: Layer, label: "Designs" },
  { href: "/projects", icon: Folder2, label: "Projects" },
  { href: "/community", icon: Global, label: "Community" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[60px] h-screen flex-shrink-0 flex-col justify-between px-[10px] py-4 bg-white">
      {/* Top: Logo + Nav */}
      <div className="flex flex-col items-center gap-10 w-full">
        {/* Logo */}
        <Link href="/" className="w-10 h-10 rounded-lg bg-[#1A243A] flex items-center justify-center">
          <DotsLogo />
        </Link>

        {/* Primary nav */}
        <nav className="flex flex-col items-stretch w-full">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "w-10 h-10 rounded-lg inline-flex items-center justify-center transition",
                  isActive ? "bg-[#EBEBEB]" : "hover:bg-[#F5F5F5]"
                )}
              >
                <Icon
                  size={16}
                  color="#1A243A"
                  variant={isActive ? "Bold" : "Outline"}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: help + logout */}
      <div className="flex flex-col items-center gap-2 w-full">
        <Link
          href="/settings"
          aria-label="Help"
          className="w-10 h-10 rounded-lg inline-flex items-center justify-center hover:bg-[#F5F5F5]"
        >
          <MessageQuestion size={16} color="#1A243A" variant="Outline" />
        </Link>
        <div className="w-6 h-px bg-line-200" />
        <Link
          href="/signin"
          aria-label="Sign out"
          className="w-10 h-10 rounded-lg inline-flex items-center justify-center hover:bg-[#F5F5F5]"
        >
          <Logout size={16} color="#1A243A" variant="Outline" />
        </Link>
      </div>
    </aside>
  );
}

function DotsLogo() {
  // 6 dots in 2 rows × 3 columns — matches Figma "Dots" pattern
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
      <circle cx="11" cy="2.5" r="2.5" fill="white" />
      <circle cx="19.5" cy="2.5" r="2.5" fill="white" />
      <circle cx="2.5" cy="11.5" r="2.5" fill="white" />
      <circle cx="11" cy="11.5" r="2.5" fill="white" />
      <circle cx="19.5" cy="11.5" r="2.5" fill="white" />
    </svg>
  );
}
