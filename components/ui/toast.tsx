"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { TickCircle, InfoCircle, CloseCircle, Warning2 } from "iconsax-react";
import { cn } from "@/lib/cn";

export type ToastTone = "success" | "info" | "error" | "warning";

interface Toast {
  id: number;
  tone: ToastTone;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (t: { tone?: ToastTone; title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast = useCallback<ToastContextValue["toast"]>(({ tone = "success", title, description }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, tone, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed z-[200] bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 flex flex-col items-end gap-2 pointer-events-none">
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const iconMap: Record<ToastTone, { icon: ReactNode; color: string; bg: string }> = {
    success: {
      icon: <TickCircle size={18} color="#10B981" variant="Bold" />,
      color: "#10B981",
      bg: "bg-white",
    },
    info: {
      icon: <InfoCircle size={18} color="#0099FF" variant="Bold" />,
      color: "#0099FF",
      bg: "bg-white",
    },
    error: {
      icon: <CloseCircle size={18} color="#FF3B30" variant="Bold" />,
      color: "#FF3B30",
      bg: "bg-white",
    },
    warning: {
      icon: <Warning2 size={18} color="#F59E0B" variant="Bold" />,
      color: "#F59E0B",
      bg: "bg-white",
    },
  };
  const cfg = iconMap[toast.tone];

  return (
    <div
      className={cn(
        "pointer-events-auto min-w-[260px] max-w-[420px] w-full sm:w-auto flex items-start gap-3 px-4 py-3 rounded-2xl border border-[#E1E1E1] shadow-lifted-md anim-toast",
        cfg.bg
      )}
      role="status"
    >
      <span className="mt-0.5 flex-shrink-0">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[#1A243A]">{toast.title}</div>
        {toast.description && <div className="text-xs text-[#757E91] mt-0.5">{toast.description}</div>}
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="w-6 h-6 rounded-md grid place-items-center text-[#757E91] hover:bg-[#F5F5F5] flex-shrink-0"
      >
        <CloseCircle size={14} variant="Outline" />
      </button>
    </div>
  );
}
