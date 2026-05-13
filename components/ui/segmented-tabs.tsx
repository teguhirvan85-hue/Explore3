"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedTab {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
}

interface SegmentedTabsProps {
  tabs: SegmentedTab[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  size?: "sm" | "md";
  className?: string;
}

export function SegmentedTabs({ tabs, value, defaultValue, onChange, size = "md", className }: SegmentedTabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = value ?? internal;

  const handleClick = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };

  const heightClass = size === "sm" ? "h-[33px]" : "h-[33px]";
  const padX = size === "sm" ? "px-3" : "px-3";

  return (
    <div
      className={cn(
        "inline-flex items-center bg-surface-100 rounded-pill p-[2px] border border-line-200",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={cn(
              heightClass,
              padX,
              "inline-flex items-center gap-2 rounded-pill text-sm transition",
              isActive
                ? "bg-white text-ink-900 shadow-edge font-medium"
                : "text-ink-500 hover:text-ink-900"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
