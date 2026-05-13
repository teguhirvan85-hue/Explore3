"use client";
import { useState } from "react";
import Image from "next/image";
import { Sparkles, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  thumbnail?: string;
  imageBg?: string;
  imageFit?: "top" | "center";
  generating?: boolean;
}

export function ChatMessage({ role, content, thumbnail, imageBg = "#F9F9F9", imageFit = "top", generating }: ChatMessageProps) {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({ title: "Copied to clipboard" });
    } catch {
      toast({ tone: "error", title: "Couldn't copy" });
    }
  };

  const handleRegenerate = () => {
    toast({ tone: "info", title: "Regenerating…", description: "A new variation will appear in a few seconds." });
  };

  const handleFeedback = (kind: "up" | "down") => {
    setFeedback(kind);
    toast({
      title: kind === "up" ? "Thanks for the feedback!" : "Got it — we'll do better.",
      description: kind === "up" ? "Your designs help us improve the AI." : "Click regenerate to try again.",
    });
  };

  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-surface-100 border border-line-200 px-4 py-3 text-sm text-ink-900">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0 w-7 h-7 rounded-pill bg-brand-gradient btn-glass-brand grid place-items-center mt-1">
        <Sparkles size={12} className="text-white" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "rounded-2xl rounded-tl-md bg-white border border-line-200 px-4 py-3 text-sm text-ink-900",
            generating && "animate-pulse"
          )}
        >
          {content}
          {thumbnail && (
            <div
              className="relative mt-3 h-36 rounded-xl overflow-hidden"
              style={{ backgroundColor: imageBg }}
            >
              {imageFit === "top" ? (
                <Image
                  src={thumbnail}
                  alt="Generated preview"
                  fill
                  quality={95}
                  sizes="(min-width: 1280px) 640px, 50vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[150px] h-[112px]">
                    <Image
                      src={thumbnail}
                      alt="Generated preview"
                      fill
                      quality={95}
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!generating && (
          <div className="mt-2 flex items-center gap-1 pl-1">
            <button onClick={handleCopy} className="w-6 h-6 rounded-md inline-flex items-center justify-center text-ink-500 hover:bg-surface-100" aria-label="Copy">
              <Copy size={12} strokeWidth={1.5} />
            </button>
            <button onClick={handleRegenerate} className="w-6 h-6 rounded-md inline-flex items-center justify-center text-ink-500 hover:bg-surface-100" aria-label="Regenerate">
              <RefreshCw size={12} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => handleFeedback("up")}
              className={cn(
                "w-6 h-6 rounded-md inline-flex items-center justify-center hover:bg-surface-100",
                feedback === "up" ? "text-emerald-600" : "text-ink-500"
              )}
              aria-label="Good"
            >
              <ThumbsUp size={12} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => handleFeedback("down")}
              className={cn(
                "w-6 h-6 rounded-md inline-flex items-center justify-center hover:bg-surface-100",
                feedback === "down" ? "text-danger-500" : "text-ink-500"
              )}
              aria-label="Bad"
            >
              <ThumbsDown size={12} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
