import { ArrowLeft2 } from "iconsax-react";
import { Sidebar } from "@/components/shared/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-screen bg-white">
      <Sidebar />
      {/* Sidebar collapse chevron — Figma frame 69:1010 at x=48, y=64 (desktop only) */}
      <button
        aria-label="Collapse sidebar"
        className="hidden lg:grid absolute top-[64px] left-[48px] w-6 h-6 rounded-full place-items-center text-[#757E91] hover:text-[#1A243A] z-20"
      >
        <ArrowLeft2 size={12} variant="Outline" />
      </button>
      {children}
    </div>
  );
}
