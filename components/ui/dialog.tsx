"use client";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseCircle } from "iconsax-react";
import { cn } from "@/lib/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Dialog({ open, onClose, title, description, children, footer, size = "md" }: DialogProps) {
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

  if (!open || typeof window === "undefined") return null;

  const widthClass = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-md";

  return createPortal(
    <div className="fixed inset-0 z-[150] grid place-items-center p-4">
      <button
        aria-label="Close dialog overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-sm anim-dialog-overlay"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full bg-white rounded-3xl border border-[#E1E1E1] shadow-lifted-md anim-dialog",
          widthClass
        )}
      >
        {(title || description) && (
          <header className="px-6 pt-5 pb-3 pr-12 border-b border-[#F1F1F1]">
            {title && <div className="text-md font-medium text-[#1A243A]">{title}</div>}
            {description && <div className="text-sm text-[#757E91] mt-1">{description}</div>}
          </header>
        )}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full grid place-items-center text-[#757E91] hover:bg-[#F5F5F5]"
        >
          <CloseCircle size={18} variant="Outline" />
        </button>
        <div className="px-6 py-5">{children}</div>
        {footer && <footer className="px-6 py-4 border-t border-[#F1F1F1] flex justify-end gap-2">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
}
