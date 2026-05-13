"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Share2, MoreHorizontal, Star, Copy, FileCode, FileImage, Trash2, History } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import { ShareDialog } from "@/components/ui/share-dialog";
import { cn } from "@/lib/cn";

interface WorkspaceTopbarProps {
  title?: string;
  userName?: string;
}

export function WorkspaceTopbar({ title = "Zoromi Landingpage", userName = "Jimmy Sullivan" }: WorkspaceTopbarProps) {
  const { toast } = useToast();
  const [shareOpen, setShareOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    if (moreOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [moreOpen]);

  const url = typeof window !== "undefined" ? window.location.href : "https://uxpilot.ai/workspace/example";

  const handleExport = (format: string) => {
    toast({ tone: "info", title: `Exporting as ${format}`, description: "Your file will download shortly." });
  };

  const toggleFavorite = () => {
    setFavorite((v) => !v);
    toast({ title: favorite ? "Removed from favorites" : "Added to favorites" });
  };

  return (
    <>
      <div className="flex items-center justify-between h-10 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link
            href="/"
            aria-label="Back"
            className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-pill inline-flex items-center justify-center bg-white border border-line-200 hover:bg-surface-50 shadow-edge"
          >
            <ArrowLeft size={16} strokeWidth={1.5} className="text-ink-900" />
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <div className="text-sm sm:text-md font-medium text-ink-900 truncate">{title}</div>
            <button
              onClick={toggleFavorite}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              className={cn("flex-shrink-0 hover:scale-110 transition", favorite ? "text-amber-500" : "text-ink-500 hover:text-ink-900")}
            >
              <Star size={14} strokeWidth={1.5} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => setShareOpen(true)}
            aria-label="Share"
            className="h-[37px] w-[37px] sm:w-auto sm:px-4 inline-flex items-center justify-center sm:gap-2 rounded-pill bg-white border border-line-200 hover:bg-surface-50 text-sm font-medium text-ink-900 shadow-edge"
          >
            <Share2 size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Share</span>
          </button>

          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-label="Export"
              className="h-[37px] w-[37px] sm:w-auto sm:px-4 inline-flex items-center justify-center sm:gap-2 rounded-pill bg-white border border-line-200 hover:bg-surface-50 text-sm font-medium text-ink-900 shadow-edge"
            >
              <Download size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">Export</span>
            </button>
            {moreOpen && (
              <div className="absolute right-0 mt-2 min-w-[200px] bg-white border border-line-200 rounded-2xl shadow-lifted-md py-1 z-50">
                <MenuItem
                  onClick={() => {
                    setMoreOpen(false);
                    handleExport("PNG");
                  }}
                  icon={<FileImage size={14} strokeWidth={1.5} />}
                  label="Export as PNG"
                />
                <MenuItem
                  onClick={() => {
                    setMoreOpen(false);
                    handleExport("React + Tailwind");
                  }}
                  icon={<FileCode size={14} strokeWidth={1.5} />}
                  label="Export to React"
                />
                <MenuItem
                  onClick={() => {
                    setMoreOpen(false);
                    handleExport("Figma");
                  }}
                  icon={<FileCode size={14} strokeWidth={1.5} />}
                  label="Export to Figma"
                />
              </div>
            )}
          </div>

          <button
            aria-label="More options"
            onClick={() => {
              toast({ tone: "info", title: "Coming soon", description: "Rename, duplicate, archive options live here." });
            }}
            className="hidden sm:inline-flex h-[37px] w-[37px] rounded-pill items-center justify-center bg-white border border-line-200 hover:bg-surface-50 shadow-edge"
          >
            <MoreHorizontal size={16} strokeWidth={1.5} className="text-ink-900" />
          </button>
          <Avatar name={userName} size={36} tone="blue" />
        </div>
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} title={title} url={url} />
    </>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 flex items-center gap-2 text-sm text-ink-900 hover:bg-surface-100"
    >
      <span className="text-ink-500">{icon}</span>
      {label}
    </button>
  );
}
