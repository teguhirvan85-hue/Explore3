import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost-pill" | "icon" | "icon-pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "h-[37px] px-4 gap-2 rounded-pill text-white text-sm font-medium bg-brand-gradient btn-glass-brand hover:brightness-110 active:brightness-95",
  "ghost-pill":
    "h-[37px] px-4 gap-2 rounded-pill bg-white text-ink-900 text-sm font-medium border border-line-300/70 btn-glass-white hover:bg-surface-50",
  icon:
    "h-[37px] w-[37px] rounded-pill bg-white text-ink-900 border border-line-300/70 btn-glass-white hover:bg-surface-50 inline-flex items-center justify-center",
  "icon-pill":
    "h-[33px] w-[33px] rounded-pill bg-white text-ink-900 inline-flex items-center justify-center hover:bg-surface-50",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", leftIcon, rightIcon, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition select-none",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";
