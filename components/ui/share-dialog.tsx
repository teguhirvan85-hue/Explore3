"use client";
import { useState } from "react";
import { Copy, Link21, GlobalEdit, Lock1 } from "iconsax-react";
import { Dialog } from "./dialog";
import { Avatar } from "./avatar";
import { useToast } from "./toast";
import { cn } from "@/lib/cn";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const collaborators = [
  { name: "Jimmy Sullivan", role: "Owner", tone: "blue" as const, email: "jimmy@zoromi.com" },
  { name: "Lena Park", role: "Editor", tone: "violet" as const, email: "lena@zoromi.com" },
  { name: "Marc Olsen", role: "Viewer", tone: "amber" as const, email: "marc@acme.com" },
];

export function ShareDialog({ open, onClose, title, url }: ShareDialogProps) {
  const [access, setAccess] = useState<"private" | "link">("link");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: url });
    } catch {
      toast({ tone: "error", title: "Couldn't copy link", description: "Permission denied." });
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Invitation sent", description: `${email} will get an email with viewer access.` });
    setEmail("");
  };

  return (
    <Dialog open={open} onClose={onClose} title={`Share "${title}"`} description="Anyone with access can view this project." size="md">
      <div className="space-y-5">
        {/* Invite by email */}
        <form onSubmit={handleInvite} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="invite by email"
            className="flex-1 h-10 px-3 bg-white border border-[#E1E1E1] rounded-pill text-sm text-[#1A243A] placeholder:text-[#757E91] outline-none focus:border-[#0099FF]"
          />
          <button
            type="submit"
            disabled={!email.trim()}
            className="h-10 px-4 rounded-pill bg-[#0099FF] text-white text-sm font-medium disabled:bg-[#F1F1F1] disabled:text-[#757E91] hover:brightness-110 transition"
          >
            Invite
          </button>
        </form>

        {/* People with access */}
        <div>
          <div className="text-xs font-medium text-[#757E91] uppercase tracking-wide mb-2">People with access</div>
          <ul className="bg-[#F9F9F9] border border-[#F1F1F1] rounded-2xl divide-y divide-[#F1F1F1] overflow-hidden">
            {collaborators.map((c) => (
              <li key={c.email} className="flex items-center gap-3 px-3 py-2.5">
                <Avatar name={c.name} tone={c.tone} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1A243A] truncate">{c.name}</div>
                  <div className="text-xs text-[#757E91] truncate">{c.email}</div>
                </div>
                <span className="text-xs text-[#757E91]">{c.role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Access setting */}
        <div>
          <div className="text-xs font-medium text-[#757E91] uppercase tracking-wide mb-2">General access</div>
          <div className="bg-[#F9F9F9] border border-[#F1F1F1] rounded-2xl p-3 space-y-2">
            <AccessOption
              active={access === "link"}
              onClick={() => setAccess("link")}
              icon={<GlobalEdit size={18} color="#0099FF" variant="Bold" />}
              title="Anyone with the link"
              description="Anyone on the internet can view"
            />
            <AccessOption
              active={access === "private"}
              onClick={() => setAccess("private")}
              icon={<Lock1 size={18} color="#1A243A" variant="Bold" />}
              title="Private"
              description="Only invited people can view"
            />
          </div>
        </div>

        {/* Copy link */}
        <div className="flex items-center gap-2 p-2 pl-3 bg-[#F9F9F9] border border-[#F1F1F1] rounded-pill">
          <Link21 size={14} color="#757E91" variant="Outline" />
          <span className="flex-1 truncate text-xs text-[#757E91] font-mono">{url}</span>
          <button
            onClick={copyLink}
            className="h-8 px-3 inline-flex items-center gap-1.5 rounded-pill bg-white border border-[#E1E1E1] text-xs font-medium text-[#1A243A] hover:bg-white/80"
          >
            <Copy size={12} variant="Outline" />
            Copy
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function AccessOption({ active, onClick, icon, title, description }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; description: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-2 rounded-xl text-left transition",
        active ? "bg-white border border-[#0099FF]/30" : "border border-transparent hover:bg-white"
      )}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-[#F1F1F1] grid place-items-center">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[#1A243A]">{title}</div>
        <div className="text-xs text-[#757E91]">{description}</div>
      </div>
      {active && <span className="text-xs text-[#0099FF] font-medium mt-1">Selected</span>}
    </button>
  );
}
