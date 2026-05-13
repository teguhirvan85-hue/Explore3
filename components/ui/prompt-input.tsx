"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Mobile,
  Monitor,
  Link21,
  MagicStar,
  Magicpen,
} from "iconsax-react";
import { cn } from "@/lib/cn";
import { useToast } from "./toast";

function Tablet({ size = 18, variant = "Outline" as "Outline" | "Bold" }) {
  const stroke = "#1A243A";
  const fill = variant === "Bold" ? stroke : "none";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2.5" width="14" height="19" rx="3" stroke={stroke} strokeWidth="1.5" fill={fill === "none" ? "none" : fill} />
      <path d="M10 18.5h4" stroke={variant === "Bold" ? "#fff" : stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type Device = "mobile" | "desktop" | "tablet";
type Tab = "single" | "flow";

export function PromptInput() {
  const [tab, setTab] = useState<Tab>("single");
  const [device, setDevice] = useState<Device>("desktop");
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerate = () => {
    if (!value.trim()) {
      toast({ tone: "warning", title: "Describe what you want", description: "Type a prompt to start generating." });
      return;
    }
    toast({ tone: "info", title: "Generating…", description: "Opening your new workspace." });
    setTimeout(() => router.push("/workspace/new"), 600);
  };

  const handleHistory = () => {
    toast({ tone: "info", title: "Prompt history", description: "You haven't generated anything yet." });
  };

  const handleAttachLink = () => {
    toast({ tone: "info", title: "Paste a URL", description: "Drop a Figma/Dribbble link as reference." });
  };

  const handleAttachPrompt = () => {
    toast({ tone: "info", title: "Prompt library", description: "Pick from curated example prompts." });
  };

  return (
    <div
      className="w-full max-w-[944px] bg-[#F9F9F9] border border-[#F1F1F1] p-[2px] flex flex-col gap-[2px] drop-shadow-[0px_4px_6px_rgba(0,0,0,0.08)]"
      style={{ borderRadius: "20px 20px 26px 26px" }}
    >
      {/* Header row: tabs + history + device toggle.
          Wraps on mobile so the long toolbar stays usable. */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1 rounded-lg">
        <div className="bg-[#F1F1F1] border border-[#F1F1F1] flex gap-[2px] items-center p-[2px] rounded-[14px]">
          <TabPill active={tab === "single"} onClick={() => setTab("single")}>
            Single Screen
          </TabPill>
          <TabPill active={tab === "flow"} onClick={() => setTab("flow")}>
            Create Flow
          </TabPill>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <div className="bg-[#F1F1F1] p-[2px] rounded-2xl w-[37px] h-[37px] flex items-center">
              <button
                onClick={handleHistory}
                aria-label="History"
                className="flex-1 h-full flex items-center justify-center rounded-[14px] border border-white bg-gradient-to-b from-[#F7F7F7] to-white drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)] hover:brightness-[0.98]"
              >
                <Clock size={18} color="#1A243A" variant="Outline" />
              </button>
            </div>

            <div className="w-px h-5 bg-[#E1E1E1]" />
          </div>

          {/* Device toggle: shrinks on mobile (icon-only) */}
          <div className="bg-[#F1F1F1] border border-[#F1F1F1] flex gap-[2px] h-[37px] items-center p-[2px] rounded-[14px]">
            <DevicePill active={device === "mobile"} onClick={() => setDevice("mobile")} icon={<Mobile size={18} color="#1A243A" variant={device === "mobile" ? "Bold" : "Outline"} />} label="Mobile" />
            <DevicePill active={device === "desktop"} onClick={() => setDevice("desktop")} icon={<Monitor size={18} color="#1A243A" variant={device === "desktop" ? "Bold" : "Outline"} />} label="Desktop" />
            <DevicePill active={device === "tablet"} onClick={() => setDevice("tablet")} icon={<Tablet size={18} variant={device === "tablet" ? "Bold" : "Outline"} />} label="Tablet" />
          </div>
        </div>
      </div>

      {/* Inner textarea card */}
      <div className="bg-white border border-[#F1F1F1] rounded-3xl h-[200px] w-full px-4 pt-6 pb-4 flex flex-col justify-between overflow-hidden shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <MagicStar size={16} color="#1A243A" variant="Outline" />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write whatever you want here"
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-[14px] placeholder:text-[#757E91] text-[#1A243A]"
          />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <ToolButton aria-label="Attach link" onClick={handleAttachLink}>
              <Link21 size={18} color="#1A243A" variant="Outline" />
            </ToolButton>
            <ToolButton aria-label="Prompt library" onClick={handleAttachPrompt}>
              <Magicpen size={18} color="#1A243A" variant="Outline" />
            </ToolButton>
          </div>

          <button
            onClick={handleGenerate}
            className="relative h-[37px] px-4 py-2 inline-flex items-center gap-2 rounded-[52px] border border-[#59BDFF] bg-[#0099FF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] hover:brightness-110 transition overflow-hidden"
          >
            <MagicStar size={16} color="#FFFFFF" variant="Bold" />
            <span className="text-[14px] font-medium text-white [text-shadow:0px_1px_1px_rgba(0,0,0,0.08)]">
              Generate
            </span>
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{ boxShadow: "inset -4px 0px 16px 0px #fff, inset 4px 0px 16px 0px #fff" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function TabPill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-[33px] px-3 py-2 rounded-[12px] flex items-center justify-center transition",
        active
          ? "bg-white border border-white drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)]"
          : "bg-[#F5F5F5] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)]"
      )}
    >
      <span className={cn("text-[13px] sm:text-[14px] whitespace-nowrap", active ? "text-[#1A243A]" : "text-[#757E91]")}>
        {children}
      </span>
    </button>
  );
}

function DevicePill({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "h-full px-2 sm:px-3 py-2 rounded-[12px] flex items-center justify-center transition",
        active
          ? "bg-white border border-white gap-2 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)]"
          : "bg-[#F5F5F5] gap-1 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)]"
      )}
    >
      {icon}
      <span className={cn("hidden sm:inline text-[14px] whitespace-nowrap", active ? "text-[#1A243A]" : "text-[#757E91]")}>
        {label}
      </span>
    </button>
  );
}

function ToolButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="bg-[#F1F1F1] p-[2px] rounded-[14px] h-[37px] flex items-center">
      <button
        {...props}
        className="w-[33px] h-full flex items-center justify-center rounded-[12px] bg-white border border-white drop-shadow-[0px_4px_2px_rgba(0,0,0,0.06)] hover:brightness-[0.98]"
      >
        {children}
      </button>
    </div>
  );
}
