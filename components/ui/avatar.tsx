import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
  tone?: "blue" | "violet" | "amber" | "emerald" | "rose";
}

const tones: Record<NonNullable<AvatarProps["tone"]>, string> = {
  blue: "bg-[#DCEEFF] text-[#0066B3]",
  violet: "bg-[#E7DEFF] text-[#4F2DB5]",
  amber: "bg-[#FFE9C7] text-[#7A4B00]",
  emerald: "bg-[#D7F4E1] text-[#106B3C]",
  rose: "bg-[#FFDDE3] text-[#9C1F33]",
};

export function Avatar({ name, size = 32, className, tone = "blue" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-medium select-none",
        tones[tone],
        className
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </div>
  );
}
