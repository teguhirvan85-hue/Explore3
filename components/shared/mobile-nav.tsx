"use client";
import { useState, useEffect } from "react";
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
  Add,
  Crown,
  CloseCircle,
  HambergerMenu,
} from "iconsax-react";
import { cn } from "@/lib/cn";

const primaryNav = [
  { href: "/", icon: Monitor, label: "Home" },
  { href: "/templates", icon: Element3, label: "Templates" },
  { href: "/explore", icon: SearchNormal1, label: "Explore" },
  { href: "/designs", icon: Layer, label: "Designs" },
  { href: "/projects", icon: Folder2, label: "Projects" },
  { href: "/community", icon: Global, label: "Community" },
];

export function MobileNavTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open menu"
      className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-pill bg-white border border-[#E1E1E1] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]"
    >
      <HambergerMenu size={18} color="#1A243A" variant="Outline" />
    </button>
  );
}

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        aria-label="Close menu overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#F1F1F1]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#1A243A] grid place-items-center">
              <DotsLogo />
            </div>
            <span className="text-md font-medium text-[#1A243A]">UX Pilot</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[#F5F5F5]"
          >
            <CloseCircle size={20} color="#1A243A" variant="Outline" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition mb-1",
                  isActive ? "bg-[#EBEBEB] text-[#1A243A] font-medium" : "text-[#1A243A] hover:bg-[#F5F5F5]"
                )}
              >
                <Icon size={18} color="#1A243A" variant={isActive ? "Bold" : "Outline"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3 pt-2 border-t border-[#F1F1F1] space-y-1">
          <Link
            href="/plans"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#1A243A] hover:bg-[#F5F5F5]"
          >
            <Crown size={18} color="#0099FF" variant="Bold" />
            Upgrade Pro
          </Link>
          <Link
            href="/workspace/new"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bg-[#0099FF] text-white font-medium hover:brightness-110"
          >
            <Add size={18} color="#fff" variant="Outline" />
            Create New
          </Link>
          <div className="h-px bg-[#F1F1F1] my-2" />
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#1A243A] hover:bg-[#F5F5F5]"
          >
            <MessageQuestion size={18} color="#1A243A" variant="Outline" />
            Help & support
          </Link>
          <Link
            href="/signin"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#1A243A] hover:bg-[#F5F5F5]"
          >
            <Logout size={18} color="#1A243A" variant="Outline" />
            Sign out
          </Link>
        </div>
      </aside>
    </div>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobileNavTrigger onOpen={() => setOpen(true)} />
      <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function DotsLogo() {
  return (
    <svg width="20" height="13" viewBox="0 0 22 14" fill="none">
      <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
      <circle cx="11" cy="2.5" r="2.5" fill="white" />
      <circle cx="19.5" cy="2.5" r="2.5" fill="white" />
      <circle cx="2.5" cy="11.5" r="2.5" fill="white" />
      <circle cx="11" cy="11.5" r="2.5" fill="white" />
      <circle cx="19.5" cy="11.5" r="2.5" fill="white" />
    </svg>
  );
}
