import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "sm" | "md";
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ leftIcon, rightIcon, size = "md", className, ...props }, ref) => {
    const h = size === "sm" ? "h-9" : "h-10";
    return (
      <label className={cn("inline-flex items-center bg-white border border-line-200 rounded-pill px-3 gap-2 hover:border-line-300 focus-within:border-brand-500 transition", h, className)}>
        {leftIcon && <span className="text-ink-500">{leftIcon}</span>}
        <input
          ref={ref}
          {...props}
          className="flex-1 bg-transparent outline-none text-sm text-ink-900 placeholder:text-ink-500"
        />
        {rightIcon && <span className="text-ink-500">{rightIcon}</span>}
      </label>
    );
  }
);
TextInput.displayName = "TextInput";
