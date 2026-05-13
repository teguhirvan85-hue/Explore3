"use client";
import { useState } from "react";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { cn } from "@/lib/cn";

type Device = "mobile" | "desktop" | "tablet";

const items: { id: Device; label: string; icon: React.ReactNode }[] = [
  { id: "mobile", label: "Mobile", icon: <Smartphone size={16} strokeWidth={1.5} /> },
  { id: "desktop", label: "Desktop", icon: <Monitor size={16} strokeWidth={1.5} /> },
  { id: "tablet", label: "Tablet", icon: <Tablet size={16} strokeWidth={1.5} /> },
];

interface DeviceToggleProps {
  value?: Device;
  onChange?: (d: Device) => void;
  className?: string;
}

export function DeviceToggle({ value, onChange, className }: DeviceToggleProps) {
  const [internal, setInternal] = useState<Device>("desktop");
  const active = value ?? internal;

  return (
    <div
      className={cn(
        "inline-flex items-center bg-surface-100 rounded-pill p-[2px] border border-line-200",
        className
      )}
    >
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => {
              setInternal(it.id);
              onChange?.(it.id);
            }}
            className={cn(
              "h-[33px] px-3 inline-flex items-center gap-2 rounded-pill text-sm transition",
              isActive
                ? "bg-white text-ink-900 shadow-edge font-medium"
                : "text-ink-500 hover:text-ink-900"
            )}
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
