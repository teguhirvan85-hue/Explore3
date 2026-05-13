"use client";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  prefix?: ReactNode;
  className?: string;
}

export function Dropdown({ options, value, onChange, prefix, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-10 px-3 inline-flex items-center gap-2 bg-white border border-line-200 rounded-pill text-sm font-medium text-ink-900 hover:border-line-300 transition"
      >
        {prefix && <span className="text-ink-500">{prefix}</span>}
        <span>{current?.label}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={cn("text-ink-500 transition", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 min-w-[180px] right-0 bg-white border border-line-200 rounded-xl shadow-lifted-md py-1">
          {options.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 flex items-center justify-between gap-2 text-sm text-ink-900 hover:bg-surface-100"
              >
                <span>{opt.label}</span>
                {isActive && <Check size={14} strokeWidth={1.5} className="text-brand-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
