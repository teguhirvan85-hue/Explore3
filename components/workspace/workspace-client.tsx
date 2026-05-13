"use client";
import { useState } from "react";
import { MessageText, Eye } from "iconsax-react";
import { WorkspaceTopbar } from "@/components/workspace/workspace-topbar";
import { ChatPanel } from "@/components/workspace/chat-panel";
import { PreviewCanvas } from "@/components/workspace/preview-canvas";
import type { Project } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

interface WorkspaceClientProps {
  project: Project;
}

export function WorkspaceClient({ project }: WorkspaceClientProps) {
  // Mobile-only state: switch between Chat & Preview
  const [mobileTab, setMobileTab] = useState<"chat" | "preview">("preview");

  return (
    <main className="flex-1 min-w-0 h-screen lg:py-2 lg:pr-2">
      <div className="h-full w-full lg:rounded-3xl bg-surface-200 lg:border lg:border-line-200 lg:shadow-edge overflow-hidden flex flex-col">
        <div className="px-3 sm:px-4 lg:px-6 pt-3 lg:pt-4">
          <WorkspaceTopbar title={project.title} />
        </div>

        {/* Mobile-only tab switcher */}
        <div className="lg:hidden px-3 sm:px-4 pt-3">
          <div className="inline-flex w-full bg-surface-100 border border-line-200 rounded-pill p-[2px]">
            <MobileTab active={mobileTab === "chat"} onClick={() => setMobileTab("chat")} icon={<MessageText size={14} variant="Outline" />} label="Chat" />
            <MobileTab active={mobileTab === "preview"} onClick={() => setMobileTab("preview")} icon={<Eye size={14} variant="Outline" />} label="Preview" />
          </div>
        </div>

        {/* Body — split on desktop, single panel on mobile */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
          {/* Chat panel: hidden on mobile unless tab=chat */}
          <div className={cn("flex-1 lg:flex-none min-h-0", mobileTab === "chat" ? "block" : "hidden lg:block")}>
            <ChatPanel project={project} />
          </div>
          {/* Preview: hidden on mobile unless tab=preview */}
          <div className={cn("flex-1 min-h-0", mobileTab === "preview" ? "block" : "hidden lg:block")}>
            <PreviewCanvas project={project} />
          </div>
        </div>
      </div>
    </main>
  );
}

function MobileTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-pill text-sm transition",
        active ? "bg-white text-ink-900 font-medium shadow-edge" : "text-ink-500"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
