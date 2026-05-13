"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown2, Crown, Add, Setting2, Wallet2, User as UserIcon, LogoutCurve } from "iconsax-react";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-nav";

interface TopbarProps {
  userName?: string;
  userAvatar?: string;
  className?: string;
}

export function Topbar({
  userName = "Jimmy Sullivan",
  userAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&q=80&auto=format&fit=crop&crop=face",
  className,
}: TopbarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className={cn("flex items-start justify-between gap-2", className)}>
      {/* Left: mobile menu + user dropdown */}
      <div className="flex items-center gap-2 min-w-0">
        <MobileMenu />
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 bg-white border border-[#E1E1E1] pl-1 pr-2 sm:pr-4 py-1 rounded-[52px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] hover:brightness-[0.98] transition"
          >
            <span className="relative w-8 h-8 rounded-full overflow-hidden bg-[#EBEBEB] block">
              <Image src={userAvatar} alt={userName} fill sizes="32px" className="object-cover" />
            </span>
            <span className="hidden sm:inline text-[14px] font-medium text-[#1A243A] [text-shadow:0px_1px_1px_rgba(0,0,0,0.08)]">
              {userName}
            </span>
            <ArrowDown2 size={16} color="#1A243A" variant="Bold" className="hidden sm:inline-block" />
          </button>
          {open && (
            <div className="absolute z-50 mt-2 min-w-[220px] left-0 bg-white border border-line-200 rounded-2xl shadow-lifted-md py-2">
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-ink-900">{userName}</div>
                <div className="text-xs text-ink-500">jimmy@zoromi.com</div>
              </div>
              <div className="h-px bg-line-100 my-1" />
              <MenuItem href="/settings" icon={<UserIcon size={14} variant="Outline" />} label="Profile & account" />
              <MenuItem href="/settings" icon={<Setting2 size={14} variant="Outline" />} label="Settings" />
              <MenuItem href="/plans" icon={<Wallet2 size={14} variant="Outline" />} label="Plan & billing" />
              <div className="h-px bg-line-100 my-1" />
              <MenuItem href="/signin" icon={<LogoutCurve size={14} variant="Outline" />} label="Sign out" />
            </div>
          )}
        </div>
      </div>

      {/* Right: Upgrade Pro + Create New */}
      <div className="flex items-start gap-2">
        <Link href="/plans" className="hidden sm:block">
          <button className="relative h-[37px] px-4 py-2 inline-flex items-center gap-2 rounded-[52px] border border-[#E1E1E1] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] hover:brightness-[0.98] transition overflow-hidden">
            <Crown size={16} color="#1A243A" variant="Bold" />
            <span className="text-[14px] font-medium text-[#1A243A] [text-shadow:0px_1px_1px_rgba(0,0,0,0.08)]">
              Upgrade Pro
            </span>
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                boxShadow:
                  "inset -4px 0px 16px 0px rgba(17,17,17,0.12), inset 4px 0px 16px 0px rgba(0,153,255,0.12)",
              }}
            />
          </button>
        </Link>
        <Link href="/workspace/new">
          <button className="relative h-[37px] px-3 sm:px-4 py-2 inline-flex items-center gap-2 rounded-[52px] border border-[#59BDFF] bg-[#0099FF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] hover:brightness-110 transition overflow-hidden">
            <Add size={16} color="#FFFFFF" variant="Outline" />
            <span className="text-[14px] font-medium text-white [text-shadow:0px_1px_1px_rgba(0,0,0,0.08)]">
              <span className="sm:hidden">New</span>
              <span className="hidden sm:inline">Create New</span>
            </span>
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{ boxShadow: "inset -4px 0px 16px 0px #fff, inset 4px 0px 16px 0px #fff" }}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

function MenuItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 text-sm text-ink-900 hover:bg-surface-100">
      <span className="text-ink-500">{icon}</span>
      {label}
    </Link>
  );
}
