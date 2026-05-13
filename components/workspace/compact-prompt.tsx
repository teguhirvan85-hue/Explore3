"use client";
import { useState } from "react";
import { Sparkles, Link2, Image as ImageIcon, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function CompactPrompt() {
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!value.trim()) {
      toast({ tone: "warning", title: "Type something to iterate" });
      return;
    }
    toast({ tone: "info", title: "Generating…", description: "Your new variation will appear in the canvas." });
    setValue("");
  };

  const handleAttachLink = () => {
    toast({ tone: "info", title: "Paste a URL", description: "Drop a Figma/Dribbble link to use as reference." });
  };

  const handleAttachImage = () => {
    toast({ tone: "info", title: "Upload an image", description: "PNG/JPG up to 5MB for AI reference." });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-line-200 shadow-lifted overflow-hidden">
      <div className="px-4 pt-4">
        <div className="flex items-start gap-2">
          <Sparkles size={14} className="mt-[2px] text-ink-900" strokeWidth={1.5} />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Iterate this design or describe a new screen..."
            rows={3}
            className="flex-1 resize-none bg-transparent outline-none text-sm placeholder:text-ink-500 text-ink-900"
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-1">
          <button
            onClick={handleAttachLink}
            className="h-8 w-8 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-surface-100"
            aria-label="Attach link"
          >
            <Link2 size={14} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleAttachImage}
            className="h-8 w-8 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-surface-100"
            aria-label="Attach image"
          >
            <ImageIcon size={14} strokeWidth={1.5} />
          </button>
        </div>
        <button
          onClick={handleSend}
          aria-label="Send"
          className="h-8 w-8 rounded-pill inline-flex items-center justify-center bg-brand-gradient btn-glass-brand text-white hover:brightness-110"
        >
          <ArrowUp size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
